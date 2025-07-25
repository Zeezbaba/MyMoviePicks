from django.db import models
from django.contrib.auth.models import User

class Genre(models.Model):
    tmdb_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=255)
    overview = models.TextField(blank=True)
    release_date = models.DateField(null=True, blank=True)
    poster_path = models.CharField(max_length=255, blank=True)
    tmdb_id = models.IntegerField(unique=True)
    is_trending = models.BooleanField(default=False)
    genres = models.ManyToManyField(Genre, related_name='movies')

    def __str__(self):
        return self.title

class FavoriteMovie(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} -> {self.movie.title}"