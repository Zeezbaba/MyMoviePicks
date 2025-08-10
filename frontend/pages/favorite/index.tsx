import MovieCard from "@/components/common/MovieCard";
import { movies } from "@/constants";
import useFetch from "@/hooks/useFetch";
import React from "react";

const Favorite: React.FC = () => {
  const { data, error, loading } = useFetch("/movies/favorites/", {
    params: { page: 1 },
  });
  console.log(data?.data?.results);

  return (
    <div className="movies-list text-white px-5 md:px-[5%] xl:px-[10%] py- md:py-20 space-y-5">
      <h2 className="text-xl font-semibold text-yellow-600">Favorites</h2>
      {data?.data?.results.length == 0 && (
        <div className="flex h-[30vh] items-center justify-center">
          <p>No favorite movies</p>
        </div>
      )}
      <div className="movieCard grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {/* {movies.map((data, index: number) => {
          return <MovieCard data={data} index={index} />;
        })} */}
      </div>
    </div>
  );
};

export default Favorite;
