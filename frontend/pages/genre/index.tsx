import NewMovieCard from "@/components/common/NewMovieCard";
import { useMyContext } from "@/context";
import useFetch from "@/hooks/useFetch";
import axiosInstance from "@/services/axios";
import React, { lazy, useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";

const Genre: React.FC = () => {
  const { data, error, loading } = useFetch("/movies/genres/");
  const [genreData, setGenreData] = useState([]);
  const [genreLoading, setGenreLoading] = useState<boolean>(false);
  const [genre, setGenre] = useState<string>("Action");
  const context = useMyContext()

  const fetchData = async (id: number) => {
    setGenreLoading(true);

    try {
      const response = await axiosInstance.get(`/movies/genres/${id}/movies/`);
      setGenreData(response.data);
    } catch (err) {
      console.log(error);
    } finally {
      setGenreLoading(false);
    }

    return { data, loading, error };
  };

  console.log(data);

  useEffect(() => {
    if (data && genre == data?.data[0].name) {
      context?.handleGenreThumbId(data?.data[0].tmdb_id)
      fetchData(data?.data[0].tmdb_id);
    }
    // fetchData("");
  }, [genre, data]);

  console.log(genre);
  return (
    <div className="movies-list w-screen text-white px-5 md:px-[5%] xl:px-[10%] py-10 space-y-5">
      <div className="flex flex-col  justify-between gap-5">
        <h2 className="text-xl font-semibold text-yellow-600">Genre</h2>
        <div className="genre-category grid grid-cols-3 md:grid-cols-5 xl:grid-cols-10 gap-1">
          {data?.data.map((content: any, index: number) => (
            <span
              key={index}
              className={`border text-white  p-1 text-sm cursor-pointer text-center ${
                genre == content.name
                  ? "bg-red-500 border-red-500"
                  : "border-white"
              }`}
              onClick={() => {
                setGenre(content.name);
                console.log(content.tmdb_id)
                context?.handleGenreThumbId(content.tmdb_id)
                localStorage.setItem("tmdb_id", JSON.stringify(content.tmdb_id))
                fetchData(content.tmdb_id);
              }}
            >
              {content.name}
            </span>
          ))}
        </div>
      </div>

      {genreLoading ? (
        <div className="w-full h-[30vh] flex items-center justify-center">
          <BiLoaderCircle
            size={30}
            color="white"
            className={`${genreLoading ? "animate-spin" : "hidden"}`}
          />
        </div>
      ) : (
        <div className="movieCard grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          {genreData?.map((data, index: number) => (
            <NewMovieCard data={data} index={index} genre={genre} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Genre;
