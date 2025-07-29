# 🎬 Movie Recommender API

A feature-rich backend API for a **Movie Recommender Platform** built with **Django REST Framework**, powered by **The Movie Database (TMDb)** API. This backend allows users to:

- Search and explore trending movies
- View genres and filter movies
- Favorite and rate movies
- Get personalized recommendations
- Sync data from TMDb
- Use caching for better performance
- Schedule background tasks with Celery

---

## 🚀 Features

✅ Fetch and display trending movies  
✅ Search movies via TMDb API  
✅ Sync genres and movies to the local database  
✅ Favorite/Unfavorite movies (authenticated users only)  
✅ Personalized movie recommendations based on user preferences  
✅ Rate movies  
✅ Filter movies by genre, release year, trending  
✅ Efficient caching using Redis  
✅ Background tasks with Celery and Celery Beat  
✅ Dockerized for easy deployment

---

## 🛠️ Tech Stack

- **Backend:** Django, Django REST Framework
- **Task Queue:** Celery + Redis
- **Cache:** Redis
- **Scheduler:** Celery Beat
- **Database:** PostgreSQL (recommended), SQLite (dev)
- **API Provider:** [The Movie Database (TMDb)](https://developers.themoviedb.org/3)
- **Containerization:** Docker & Docker Compose
- **Environment Management:** `python-decouple`

---

## 📁 Project Structure


.
├── MyMoviePicks/                    # Main Django app
│   ├── models.py           # Movie, Genre, Favorite, Rating models
│   ├── views.py            # DRF views (APIViews and ListViews)
│   ├── serializers.py      # DRF serializers
│   ├── services.py         # External API interaction logic
│   ├── tasks.py            # Celery background tasks
├── manage.py
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── README.md

## 🔑 Environment Variables

- Create a `.env` file (or use `config()` from `python-decouple`) and define the following:


- DEBUG=True
- SECRET_KEY=your-django-secret-key
- TMDB_API_KEY=your-tmdb-api-key
- ALLOWED_HOSTS=*
- REDIS_URL=redis://redis:6379
- DATABASE_URL=postgres://username:password@localhost:5432/dbname

## 🐳 Run Locally with Docker

Make sure **Redis** and **PostgreSQL** services are defined in your `docker-compose.yml` file.


# Build and start the containers
- docker-compose up --build

## 🧪 API Endpoints

### 🔍 Public Endpoints

| Method | URL                                 | Description                     |
|--------|-------------------------------------|---------------------------------|
| GET    | `/api/trending/`                    | Get trending movies from TMDb  |
| GET    | `/api/search/?query=your_query`     | Search movies from TMDb        |
| GET    | `/api/genres/`                      | List all local genres          |
| GET    | `/api/genres/tmdb/<tmdb_id>/`       | Movies by TMDb genre           |


## 🔐 Authenticated Endpoints

| Method | URL                               | Description                        |
|--------|-----------------------------------|------------------------------------|
| GET    | `/api/favorites/`                 | List user's favorite movies        |
| POST   | `/api/favorites/`                 | Add a movie to favorites           |
| POST   | `/api/movies/save-trending/`      | Save trending movies to DB         |
| GET    | `/api/movies/recommended/`        | Get personalized recommendations   |
| POST   | `/api/ratings/`                   | Rate a movie                       |


## 📦 Background Tasks (Celery)

| Task                        | Description                          |
|-----------------------------|--------------------------------------|
| `sync_trending_movies_daily` | Sync trending movies daily           |
| `sync_genres_from_tmdb`      | Sync genres from TMDb                |
| *(Planned)* `recommend_movies_task` | Background recommendation logic |

> **Note**: Celery Beat is used to schedule recurring tasks. Task setup is defined in `celery.py`.

## 🧠 Caching

- To improve performance and reduce TMDb API calls, caching is implemented using **Redis** through **Django’s cache framework**.

### Cached Resources:

- 🔥 **Trending Movies**
- 🔍 **Search Results**
- 🎭 **Genre Movies**
- 🎯 **TMDb-based Movie Recommendations**

## 👥 Collaborators: Getting Started Locally

### 1. Clone the repository

- git clone https://github.com/yourusername/movie-api.git
- cd movie-api

### 2. Set up a virtual environment and install dependencies

- python -m venv venv
- source venv/bin/activate
- pip install -r requirements.txt

### 3. Set up your .env file
- Refer to the 🔑 Environment Variables section above.

### 4. Apply database migrations
- python manage.py migrate

### 5. Start the development server

- python manage.py runserver

## Alternatively, you can run the project using Docker:
- docker-compose up

## 📈 Roadmap

- ✅ **Caching External API Results**
- ✅ **Movie Recommendation System**
- ✅ **Background Task Scheduling**
- ⏳ **User Watch History**
- ⏳ **Pagination and Sorting**
- ⏳ **Rate-Limiting & Throttling**


## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

## 📬 Contact

Built with ❤️ by **[Okeleji Azeez]**

Questions? Reach out: **[okeleji.azeez@gmail.com]**
