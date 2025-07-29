from django.apps import AppConfig

class MoviesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'movies'

    def ready(self):
        from django.conf import settings
        if settings.SCHEDULER_AUTOSTART:  # Optional toggle
            from .tasks import create_or_update_genre_sync_task
            # create_or_update_genre_sync_task()