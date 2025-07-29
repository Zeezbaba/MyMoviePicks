import requests
from django.conf import settings
from .models import Movie, Genre

TMDB_API_URL = "https://api.themoviedb.org/3"

def get_trending_movies():
    url = f"{TMDB_API_URL}/trending/movie/week"
    params = {
        "api_key": settings.TMDB_API_KEY
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json().get("results", [])
    else:
        return []

# def sync_tmdb_genres():
#     url = f"{TMDB_API_URL}/genre/movie/list"
#     params = {"api_key": settings.TMDB_API_KEY}
#     response = requests.get(url, params=params)

#     if response.status_code == 200:
#         for genre_data in response.json().get("genres", []):
#             Genre.objects.get_or_create(
#                 tmdb_id=genre_data["id"],
#                 defaults={"name": genre_data["name"]}
#             )

def sync_genres_from_tmdb():
    url = "https://api.themoviedb.org/3/genre/movie/list"
    params = {"api_key": settings.TMDB_API_KEY}

    response = requests.get(url, params=params)
    if response.status_code == 200:
        genres = response.json().get("genres", [])
        for genre in genres:
            Genre.objects.update_or_create(
                tmdb_id=genre["id"],
                defaults={"name": genre["name"]}
            )
    else:
        print(f"Failed to fetch genres: {response.status_code} - {response.text}")

def save_trending_movies():
    movies = get_trending_movies()
    saved_movies = []

    for movie_data in movies:
        tmdb_id = movie_data.get('id')
        title = movie_data.get('title')
        overview = movie_data.get('overview', '')
        release_date = movie_data.get('release_date', None)
        poster_path = movie_data.get('poster_path', '')
        genre_ids = movie_data.get('genre_ids', [])

        print(f"\nSaving movie: {title}")
        print(f"Genre IDs: {genre_ids}")

        movie, created = Movie.objects.get_or_create(
            tmdb_id=tmdb_id,
            defaults={
                "title": title,
                "overview": overview,
                "release_date": release_date,
                "poster_path": poster_path
            }
        )

        # Only if newly created or you want to reset genres
        if not created:
            movie.genres.clear()

        matched_genres = []
        for genre_id in genre_ids:
            genre = Genre.objects.filter(tmdb_id=genre_id).first()
            if genre:
                movie.genres.add(genre)
                matched_genres.append(genre.name)

        print(f"Matched genres: {matched_genres}")

        saved_movies.append(movie)
    return saved_movies

# Search for movies
def search_movies(query):
    url = f"{TMDB_API_URL}/search/movie"
    params = {
        "api_key": settings.TMDB_API_KEY,
        "query": query
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json().get("results", [])
    else:
        return []