import Button from "@/components/common/Button";
import List from "@/components/common/List";
import { useMyContext } from "@/context";
import axiosInstance from "@/services/axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";

interface Movie {
  id: number;
  is_trending: boolean;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  tmdb_id: number;
  genres: {
    id: number;
    tmdb_id: number;
    name: string;
  }[];
}

interface Favorite {
  movie: {
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    tmdb_id: number;
    is_trending: boolean;
  };
}

const Movie = () => {
  const [movie, setMovie] = useState<any>();
  const router = useRouter();
  const query = router.query;
  const context = useMyContext();
  console.log(context?.genreThumbId);

  //Function
  const [genreData, setGenreData] = useState([]);
  const [genreLoading, setGenreLoading] = useState<boolean>(false);

  const fetchData = async (id: number) => {
    setGenreLoading(true);
    console.log(`Rendering...`);
    try {
      const response = await axiosInstance.get(`/movies/genres/${id}/movies/`);
      console.log(response);
      setGenreData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setGenreLoading(false);
    }
  };

  useEffect(() => {
    console.log(`Fetching...`);
    fetchData(context?.genreThumbId as number);
    if (genreData) {
      setMovie(genreData);
    }
  }, []);

  const filteredData: any = genreData?.find(
    (content: any) => content?.id == query.id
  );
  console.log(genreData?.find((content: any) => content?.id == query.id));

  const addFavorite = async (data: number) => {
    console.log(data);
    try {
      const response = await axiosInstance.post("/movies/favorites/", {movie_id: data});
      console.log(response);
      toast.success("Added to favorites");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-white px-5 md:px-[5%] xl:px-[15%] mt-10 ">
      {genreLoading ? (
        <div className="w-full h-[30vh] flex items-center justify-center">
          <BiLoaderCircle
            size={30}
            color="white"
            className={`${genreLoading ? "animate-spin" : "hidden"}`}
          />
        </div>
      ) : (
        <>
          <Image
            src={`https://image.tmdb.org/t/p/w500${filteredData?.poster_path}`}
            alt="video"
            width={600}
            height={600}
            className="w-full h-[30vh] md:h-[60vh]"
          />
          <h2 className="text-xl mt-10">Movie Description</h2>
          <div className="my-10 flex flex-col md:flex-row gap-5">
            <Image
              src={`https://image.tmdb.org/t/p/w500${filteredData?.poster_path}`}
              width={600}
              height={600}
              alt="movie"
              className="h-[30vh] md:h-[50vh] w-full md:w-1/3 rounded-2xl"
            />
            <div className="right flex-grow">
              <div className="head flex justify-between items-center w-full">
                <h2 className="text-xl md:text-xl w-2/3">
                  {filteredData?.title}
                </h2>
                <Button
                  name="Add Favorite"
                  styles="bg-red-500 text-white py-1 px-2 text-sm cursor-pointer md:font-semibold flex items-center justify-center flex-row-reverse items-center md:gap-3 rounded-lg hover:opacity-90"
                  icon={<IoIosAdd size={25} />}
                  action={() => {
                    addFavorite(filteredData?.id);
                  }}
                />
              </div>
              {/* <div className="rest md:mt-7 xl:mt-14 flex flex-col md:flex-row gap-5 md:items-center">
                <div className="space-x-2 md:space-x-5 mt-5 md:mt-0">
                  {movie?.genres.map(({ name }, index: number) => {
                    return (
                      <span
                        className="bg-white text-gray-800 p-2 text-sm font-semibold md:text-base rounded-lg"
                        key={index}
                      >
                        {name}
                      </span>
                    );
                  })}
                </div>
              </div> */}
              <p className="my-4 max-w-2xl">{filteredData?.overview}</p>
              <List name="Country" value="United States" />
              <List name="Genre" value="Drama, Science Fiction" />
              <List name="Date Release" value="May 05 2023" />
              <List name="Production" value="AMC Studios" />
              <List
                name="Cast "
                value="Tim Robbins, Rebecca Ferguson, Avi Nash"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
