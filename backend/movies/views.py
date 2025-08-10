from rest_framework import generics, permissions
import requests
import os
from drf_yasg import openapi
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Movie, FavoriteMovie, Genre, MovieRating
from .services import get_trending_movies, save_trending_movies, search_movies
from .serializers import MovieSerializer, FavoriteMovieSerializer, GenreSerializer, MovieRatingSerializer
from django.contrib.auth.models import User
import django_filters
from django.db.models import Count
from rest_framework import status
from decouple import config

TMDB_API_KEY = os.getenv('TMDB_API_KEY')

# Implement Filtering by Genre, Date, and Trending
class MovieFilter(django_filters.FilterSet):
    genre = django_filters.NumberFilter(method='filter_by_genre')
    release_year = django_filters.NumberFilter(field_name='release_date', lookup_expr='year')
    trending = django_filters.BooleanFilter(field_name='is_trending')
    search = django_filters.CharFilter(method='filter_by_text')

    class Meta:
        model = Movie
        fields = ['genre', 'release_year', 'trending']

    def filter_by_text(self, queryset, name, value):
        return queryset.filter(
            title__icontains=value
        )

class MovieListView(generics.ListAPIView):
    serializer_class = MovieSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = MovieFilter

    def get_queryset(self):
        queryset = Movie.objects.all().order_by('-release_date')
        query = self.request.query_params.get('search')

        if query:
            queryset = queryset.filter(title__icontains=query)
        return queryset

class FavoriteMovieListCreateView(generics.ListCreateAPIView):
    serializer_class = FavoriteMovieSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FavoriteMovie.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        movie_id = self.request.data.get('movie_id')
        movie = Movie.objects.get(id=movie_id)
        serializer.save(user=self.request.user, movie=movie)

class TrendingMoviesView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        movies = get_trending_movies()
        return Response(movies)

class SaveTrendingMoviesView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        saved_movies = save_trending_movies()
        serializer = MovieSerializer(saved_movies, many=True)
        return Response(serializer.data)


class SearchMovieView(APIView):
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'query', openapi.IN_QUERY,
                description="Search term for the movie",

                type=openapi.TYPE_STRING, required=True
            )
        ],
        response={200: 'List of movies'}
    )

    def get(self, request):
        query = request.GET.get("query")
        if not query:
            return Response({"error":"Query Parameter is required"}, status=400)

        movies = search_movies(query)
        return Response(movies)

class RecommendedMoviesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        favorite_movies = Movie.objects.filter(favoritemovie__user=user)
        favorite_genres = Genre.objects.filter(movies__in=favorite_movies).distinct()

        recommended_movies = Movie.objects.filter(
            genres__in=favorite_genres
        ).exclude(
            favoritemovie__user=user
        ).distinct().annotate(
            genre_match_count=Count('genres')
        ).order_by('-genre_match_count')[:10]

        serializer = MovieSerializer(recommended_movies, many=True)
        return Response(serializer.data)

class GenreListView(APIView):
    def get(self, request):
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GenreMoviesFromTMDb(APIView):
    def get(self, request, tmdb_id):
        try:
            genre = Genre.objects.get(tmdb_id=tmdb_id)
        except Genre.DoesNotExist:
            return Response({"error": "Genre not found"}, status=status.HTTP_404_NOT_FOUND)

        url = "https://api.themoviedb.org/3/discover/movie"
        params = {
            "api_key": TMDB_API_KEY,
            "with_genres": genre.tmdb_id,
            "sort_by": "popularity.desc",
        }

        response = requests.get(url, params=params)
        if response.status_code == 200:
            return Response(response.json()["results"])
        return Response({"error": "Failed to fetch movies"}, status=response.status_code)

class MovieRatingAPIView(generics.CreateAPIView):
    queryset = MovieRating.objects.all()
    serializer_class = MovieRatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)