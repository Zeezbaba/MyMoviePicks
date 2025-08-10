import Button from "@/components/common/Button";
import MovieCard from "@/components/common/MovieCard";
import { movies } from "@/constants";
import useFetch from "@/hooks/useFetch";
import { Movie } from "@/interfaces";
import React, { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";

const Trending: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [loadIndex, setLoadIndex] = useState(6);
  const { data, loading, error } = useFetch("/movies/trending/");

  console.log(data);

  const movies = data?.data;

  return (
    <div className="movies-list text-white px-5 md:px-[5%] xl:px-[10%] py- md:py-20 space-y-5">
      <h2 className="text-xl font-semibold text-yellow-600">Trending</h2>
      {loading ? (
        <div className="w-full h-[30vh] flex items-center justify-center">
          <BiLoaderCircle
            size={30}
            color="white"
            className={`${loading ? "animate-spin" : "hidden"}`}
          />
        </div>
      ) : (
        <>
          <div className="movieCard grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {movies?.slice(0, loadIndex)?.map((data: any, index: number) => (
              <MovieCard data={data} path={`/movie/trending/${data?.id}`} />
            ))}
          </div>
          <div className="options flex items-center justify-end gap-5">
            <Button
              name="Load more"
              styles="border border-red-600 bg-transparent text-white text-xs md:text-sm p-2 cursor-pointer font-semibold rounded-lg hover:opacity-90"
              action={() =>
                setLoadIndex((prev) => {
                  return prev < movies?.length ? prev + 3 : prev;
                })
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Trending;
