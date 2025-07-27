from django.core.management.base import BaseCommand
from movies.services import sync_genres_from_tmdb, save_trending_movies

class Command(BaseCommand):
    help = "Sync genre and Trending movies from Tmdb"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE('Syncing genre from TMDb...'))
        sync_genres_from_tmdb()
        self.stdout.write(self.style.SUCCESS('Genre synced successfully.'))

        self.stdout.write(self.style.NOTICE('Syncing trending movies from TMDb...'))
        save_trending_movies()
        self.stdout.write(self.style.SUCCESS('Trending movies synced successfully.'))