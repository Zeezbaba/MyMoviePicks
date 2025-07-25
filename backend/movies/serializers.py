from rest_framework import serializers
from .models import Movie, FavoriteMovie, Genre

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'overview', 'release_date', 'poster_path', 'tmdb_id', 'is_trending', 'genres']

class FavoriteMovieSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(read_only=True)

    class Meta:
        model = FavoriteMovie
        fields = ['id', 'movie', 'added_at']