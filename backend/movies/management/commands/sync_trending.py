from django.core.management.base import BaseCommand
from movies.services import save_trending_movies

class Command(BaseCommand):
    help = "Sync Trending movies from Tmdb"

    def handle(self, *args, **kwargs):
        movies = save_trending_movies
        self.stdout.write(self.style.SUCCESS(f"{len(movies)} movies synced successfully."))