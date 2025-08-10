import requests
import os
from django.conf import settings
from django.core.cache import cache
from .models import Movie, Genre

TMDB_API_URL = "https://api.themoviedb.org/3"
TMDB_API_KEY = settings.TMDB_API_KEY

CACHE_TIMEOUT = 60 * 60 # 1 hour

def get_trending_movies():
    if not TMDB_API_KEY:
        raise ValueError("TMDB_API_KEY is missing from environment variables.")

    cache_key = 'trending_movies'
    cached_data = cache.get(cache_key)
    if cached_data:
        return cached_data

    url = f"{TMDB_API_URL}/trending/movie/week"
    params = {"api_key": TMDB_API_KEY}

    try:
        response = requests.get(url, params=params, timeout=10)
    except requests.RequestException as e:
        print(f"Network error when calling TMDb: {e}")
        return []

    if response.status_code != 200:
        print(f"TMDb API error: {response.status_code} - {response.text}")
        return []

    data = response.json().get("results", [])
    cache.set(cache_key, data, CACHE_TIMEOUT)
    return data

# Unified function to fetch & sync genres
def sync_genres_from_tmdb():
    """
    Fetches genres from TMDB and stores them in the database.
    """
    if not TMDB_API_KEY:
        return []

    try:
        response = requests.get(
            f"https://api.themoviedb.org/3/genre/movie/list",
            params={"api_key": TMDB_API_KEY, "language": "en-US"},
            timeout=10
        )
        if response.status_code == 200:
            genres_data = response.json().get("genres", [])
            for g in genres_data:
                Genre.objects.update_or_create(
                    tmdb_id=g["id"], defaults={"name": g["name"]}
                )
            return genres_data
    except requests.RequestException as e:
        print(f"Error fetching genres: {e}")

    return []

# Save trending movies & refresh cache
def save_trending_movies():
    """
    Fetch trending movies from TMDB, update DB, and refresh cache.
    """
    if not TMDB_API_KEY:
        return []

    sync_genres_from_tmdb()  # ensure genres are updated

    try:
        response = requests.get(
            f"https://api.themoviedb.org/3/trending/movie/day",
            params={"api_key": TMDB_API_KEY},
            timeout=10
        )
        if response.status_code != 200:
            print(f"Error fetching trending movies: {response.status_code}")
            return []

        movies_data = response.json().get("results", [])
        saved_movies = []

        for item in movies_data:
            movie, created = Movie.objects.update_or_create(
                tmdb_id=item["id"],
                defaults={
                    "title": item["title"],
                    "overview": item.get("overview", ""),
                    "release_date": item.get("release_date"),
                    "poster_path": item.get("poster_path"),
                    "is_trending": True,
                }
            )

            genre_ids = item.get("genre_ids", [])
            if genre_ids:
                movie.genres.set(Genre.objects.filter(tmdb_id__in=genre_ids))

            saved_movies.append(movie)

        # ✅ Refresh cache so get_trending_movies() is always up-to-date
        cache.set(
            "trending_movies",
            [
                {
                    "id": m.id,
                    "title": m.title,
                    "overview": m.overview,
                    "release_date": m.release_date,
                    "poster_path": m.poster_path,
                }
                for m in saved_movies
            ],
            timeout=60 * 15  # 15 min
        )

        return saved_movies

    except requests.RequestException as e:
        print(f"Error fetching trending movies: {e}")
        return []

# Search for movies
def search_movies(query):
    cache_key = f"search_movies:{query.lower()}"
    cached_data = cache.get(cache_key)

    if cached_data:
        return cached_data

    url = f"{TMDB_API_URL}/search/movie"
    params = {
        "api_key": TMDB_API_KEY, # settings.TMDB_API_KEY,
        "query": query
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json().get("results", [])
        cache.set(cache_key, data, CACHE_TIMEOUT)
        return data
    else:
        return []

def get_recommended_movies(movie_id):
    cache_key = f"recommended_movies:{movie_id}"
    cached_data = cache.get(cache_key)

    if cached_data:
        return cached_data

    url = f"{TMDB_API_URL}/movie/{movie_id}/recommendations"
    params = {"api_key": TMDB_API_KEY} #settings.TMDB_API_KEY
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json().get("results", [])
        cache.set(cache_key, data, CACHE_TIMEOUT)
        return data
    return []