from django.urls import path
from .views import MovieListView, FavoriteMovieListCreateView, TrendingMoviesView, SaveTrendingMoviesView, SearchMovieView

urlpatterns = [
    path('', MovieListView.as_view(), name='movie-list'),
    path('favorites/', FavoriteMovieListCreateView.as_view(), name='favorites'),
    path('trending/', TrendingMoviesView.as_view(), name='trending-movies'),
    path('save-trending/', SaveTrendingMoviesView.as_view(), name='save-trending-movies'),
    path('search/', SearchMovieView.as_view(), name='search-movies'),
]