import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'MyMoviePicks.settings')

app = Celery('MyMoviePicks')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'sync-trending-movies-daily': {
        'task': 'movies.sync_trending_movies',
        'schedule': crontab(hour=0, minute=0),
    },
}