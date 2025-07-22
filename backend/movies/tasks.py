from celery import shared_task
import requests
from decouple import config
from .models import Movie

TMDB_API_KEY = config('TMDB_API_KEY')
TMDB_TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/day'

@shared_task
def sync_trending_movies():
    response = requests.get(TMDB_TRENDING_URL, params={"api_key": TMDB_API_KEY})
    
    if response.status_code == 200:
        data = response.json()
        for movie in data.get('results', []):
            Movie.objects.update_or_create(
                tmdb_id=movie['id'],
                defaults={
                    'title': movie['title'],
                    'overview': movie.get('overview', ''),
                    'release_date': movie.get('release_date'),
                    'poster_path': movie.get('poster_path'),
                }
            )