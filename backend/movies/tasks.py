from celery import shared_task
import requests
import os
from django_celery_beat.models import PeriodicTask, IntervalSchedule
from django.utils.timezone import now
from decouple import config
from .models import Movie, Genre
import json

TMDB_API_KEY = os.getenv('TMDB_API_KEY')
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

@shared_task
def sync_all_genre_movies():
    genres = Genre.objects.all()
    for genre in genres:
        sync_genre_movies.delay(genre.tmdb_id)

def create_or_update_genre_sync_task():
    # Create or get the interval (e.g., every 6 hours)
    interval, _ = IntervalSchedule.objects.get_or_create(
        every=6,
        period=IntervalSchedule.HOURS,
    )

    # Now use update_or_create (NOT get_or_create)
    PeriodicTask.objects.update_or_create(
        name='Sync Genre Movies',
        defaults={
            'interval': interval,
            'task': 'movies.tasks.sync_all_genre_movies',
            'args': json.dumps([]),
        }
    )