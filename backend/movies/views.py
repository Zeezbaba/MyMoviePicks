from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Movie, FavoriteMovie
from .services import get_trending_movies, save_trending_movies, search_movies
from .serializers import MovieSerializer, FavoriteMovieSerializer
from django.contrib.auth.models import User

class MovieListView(generics.ListAPIView):
    serializer_class = MovieSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Movie.objects.all()
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
