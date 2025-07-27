from celery import shared_task
import requests
from decouple import config
from .models import Movie, Genre

TMDB_API_KEY = config('TMDB_API_KEY')
TMDB_TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/day'
TMDB_GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list'

def fetch_genres():
    """Fetch and cache genres from TMDb"""
    response = requests.get(TMDB_GENRE_URL, params={"api_key": TMDB_API_KEY})
    genre_map = {}
    if response.status_code == 200:
        for genre in response.json().get("genres", []):
            obj, _ = Genre.objects.get_or_create(tmdb_id=genre["id"], defaults={"name": genre["name"]})
            genre_map[genre["id"]] = obj
    return genre_map

@shared_task
def sync_trending_movies():
    # Get genre objects mapped by TMDb ID
    genre_map = fetch_genres()

    response = requests.get(TMDB_TRENDING_URL, params={"api_key": TMDB_API_KEY})
    
    if response.status_code == 200:
        data = response.json()
        for movie_data in data.get('results', []):
            movie, created = Movie.objects.update_or_create(
                tmdb_id=movie_data['id'],
                defaults={
                    'title': movie_data.get('title'),
                    'overview': movie_data.get('overview', ''),
                    'release_date': movie_data.get('release_date'),
                    'poster_path': movie_data.get('poster_path'),
                    'is_trending': True,
                }
            )

            # Update genres
            movie.genres.clear()  # Clear old genres to avoid duplicates
            for genre_id in movie_data.get('genre_ids', []):
                genre = genre_map.get(genre_id)
                if genre:
                    movie.genres.add(genre)

    return "Trending movies synced successfully."