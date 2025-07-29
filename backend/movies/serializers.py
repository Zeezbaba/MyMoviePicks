from rest_framework import serializers
from .models import Movie, FavoriteMovie, Genre, MovieRating

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'tmdb_id', 'name']

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

class MovieRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieRating
        fields = ['id', 'user', 'movie', 'rating', 'created_at']
        read_only_fields = ['id', 'created_at']