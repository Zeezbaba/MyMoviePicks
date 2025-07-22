import requests
from django.conf import settings
from .models import Movie

TMDB_API_URL = "https://api.themoviedb.org/3"

def get_trending_movies():
    url = f"{TMDB_API_URL}/trending/movie/week"
    params = {
        "api_key": settings.TMDB_API_KEY
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json().get("results", [])
    else:
        return []

def save_trending_movies():
    movies = get_trending_movies()
    saved_movies = []

    for movie_data in movies:
        tmdb_id = movie_data.get('id')
        title = movie_data.get('title')
        overview = movie_data.get('overview', '')
        release_date = movie_data.get('release_date', None)
        poster_path = movie_data.get('poster_path', '')

        movie, created = Movie.objects.get_or_create(
            tmdb_id=tmdb_id,
            defaults={
                "title": title,
                "overview": overview,
                "release_date": release_date,
                "poster_path": poster_path
            }
        )
        saved_movies.append(movie)
    return saved_movies

# Search for movies
def search_movies(query):
    url = f"{TMDB_API_URL}/search/movie"
    params = {
        "api_key": TMDB_API_URL,
        "query": query
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json().get("results", [])
    else:
        return []