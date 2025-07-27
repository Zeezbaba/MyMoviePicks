import { movies } from '@/constants';
import React from 'react'
import NewMovieCard from './NewMovieCard';

const GenreMovies = () => {
  return (
    <div className="movieCard grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
      {movies.map((data, index: number) => {
        return <NewMovieCard />;
      })}
    </div>
  );
};

export default GenreMovies