from django.contrib import admin
from .models import Movie, FavoriteMovie

admin.site.register(Movie)
admin.site.register(FavoriteMovie)
