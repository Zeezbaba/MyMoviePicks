import MovieCard from '@/components/common/MovieCard';
import { movies } from '@/constants';
import React from 'react'

const Favorite: React.FC = () => {
  return (
    <div className="movies-list text-white px-5 md:px-[5%] xl:px-[10%] py- md:py-20 space-y-5">
      <h2 className="text-xl font-semibold">Favorites</h2>
      <div className="movieCard grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {movies.map((data, index: number) => {
          return <MovieCard data={data} index={index} />;
        })}
      </div>
    </div>
  )
}

export default Favorite