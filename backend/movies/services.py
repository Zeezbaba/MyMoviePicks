import requests
from django.conf import settings
from django.core.cache import cache
from .models import Movie, Genre

TMDB_API_URL = "https://api.themoviedb.org/3"

CACHE_TIMEOUT = 60 * 60 # 1 hour

def get_trending_movies():
    cache_key = 'trending_movies'
    cached_data = cache.get(cache_key)

    if cached_data:
        return cached_data

    url = f"{TMDB_API_URL}/trending/movie/week"
    params = {
        "api_key": settings.TMDB_API_KEY
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json().get("results", [])
        cache.set(cache_key, data, CACHE_TIMEOUT)
        return data
    else:
        return []

# def sync_tmdb_genres():
#     url = f"{TMDB_API_URL}/genre/movie/list"
#     params = {"api_key": settings.TMDB_API_KEY}
#     response = requests.get(url, params=params)

#     if response.status_code == 200:
#         for genre_data in response.json().get("genres", []):
#             Genre.objects.get_or_create(
#                 tmdb_id=genre_data["id"],
#                 defaults={"name": genre_data["name"]}
#             )

def sync_genres_from_tmdb():
    cache_key = "tmdb_genres"
    cached_data = cache.get(cache_key)

    if cached_data:
        genres = cached_data

    else:
        url = "https://api.themoviedb.org/3/genre/movie/list"
        params = {"api_key": settings.TMDB_API_KEY}

        response = requests.get(url, params=params)
        if response.status_code == 200:
            genres = response.json().get("genres", [])
            cache.set(cache_key, genres, CACHE_TIMEOUT)
        else:
            print(f"Failed to fetch genres: {response.status_code} - {response.text}")
            return

    for genre in genres:
        Genre.objects.update_or_create(
            tmdb_id=genre["id"],
            defaults={"name": genre["name"]}
        )

def save_trending_movies():
    movies = get_trending_movies()
    saved_movies = []

    for movie_data in movies:
        tmdb_id = movie_data.get('id')
        title = movie_data.get('title')
        overview = movie_data.get('overview', '')
        release_date = movie_data.get('release_date', None)
        poster_path = movie_data.get('poster_path', '')
        genre_ids = movie_data.get('genre_ids', [])

        print(f"\nSaving movie: {title}")
        print(f"Genre IDs: {genre_ids}")

        movie, created = Movie.objects.get_or_create(
            tmdb_id=tmdb_id,
            defaults={
                "title": title,
                "overview": overview,
                "release_date": release_date,
                "poster_path": poster_path
            }
        )

        # Only if newly created or you want to reset genres
        if not created:
            movie.genres.clear()

        matched_genres = []
        for genre_id in genre_ids:
            genre = Genre.objects.filter(tmdb_id=genre_id).first()
            if genre:
                movie.genres.add(genre)
                matched_genres.append(genre.name)

        print(f"Matched genres: {matched_genres}")

        saved_movies.append(movie)
    return saved_movies

# Search for movies
def search_movies(query):
    cache_key = f"search_movies:{query.lower()}"
    cached_data = cache.get(cache_key)

    if cached_data:
        return cached_data

    url = f"{TMDB_API_URL}/search/movie"
    params = {
        "api_key": settings.TMDB_API_KEY,
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
    params = {"api_key": settings.TMDB_API_KEY}
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json().get("results", [])
        cache.set(cache_key, data, CACHE_TIMEOUT)
        return data
    return []