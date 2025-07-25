from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Movie, FavoriteMovie, Genre
from .services import get_trending_movies, save_trending_movies, search_movies
from .serializers import MovieSerializer, FavoriteMovieSerializer
from django.contrib.auth.models import User
import django_filters
from django.db.models import Count

# Implement Filtering by Genre, Date, and Trending
class MovieFilter(django_filters.FilterSet):
    genre = django_filters.NumberFilter(method='filter_by_genre')
    release_year = django_filters.NumberFilter(field_name='release_date', lookup_expr='year')
    trending = django_filters.BooleanFilter(field_name='is_trending')

    class Meta:
        model = Movie
        fields = ['genre', 'release_year', 'trending']

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