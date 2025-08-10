import Button from "@/components/common/Button";
import List from "@/components/common/List";
import { moviePic } from "@/constants";
import useFetch from "@/hooks/useFetch";
import { MovieDetails } from "@/interfaces";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineAvTimer } from "react-icons/md";

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
const TrendingMovie = () => {
  const movieInfo: MovieDetails = {
    imageUrl: moviePic,
    title: "Silo",
    category: ["Drama", "Science Fiction"],
    release_year: 2023,
    duration: "50:38",
    rating: 8.5,
    description:
      "In a ruined and toxic future, a community exists in a giant underground silo that plunges hundreds of stories deep. There, men and women live in a society full of regulations they believe are meant to protect them.",
    country: "United States",
    genre: "Drama, Science Fiction",
    release_date: "May 05 2023",
    production: "AMC Studios",
    cast: "Tim Robbins, Rebecca Ferguson,  Avi Nash",
  };
  const [movie, setMovie] = useState<Movie>();
  const router = useRouter();
  const query = router.query;

  const { data, loading, error } = useFetch("/movies/trending/");
  console.log(data?.data.find((content: any) => content.id == query.id), query)

  useEffect(() => {
    if (data) {
      const findMovie: Movie = data?.data.find((content: any) => content.id == query.id);
      setMovie(findMovie);
    }
  }, [data]);

  console.log(movie);

  return (
    <div className="text-white px-5 md:px-[5%] xl:px-[15%] mt-10 ">
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
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt="video"
            width={600}
            height={600}
            className="w-full h-[30vh] md:h-[60vh]"
          />
          <h2 className="text-xl mt-10">Movie Description</h2>
          <div className="my-10 flex flex-col md:flex-row gap-5">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              width={600}
              height={600}
              alt="movie"
              className="h-[30vh] md:h-[50vh] w-full md:w-1/3 rounded-2xl"
            />
            <div className="right flex-grow">
              <div className="head flex justify-between items-center w-full">
                <h2 className="text-xl md:text-3xl">{movie?.title}</h2>
                <Button
                  name="Add to Favorite"
                  styles="bg-red-500 text-white py-1 px-2 md:p-3 text-s md:text-base cursor-pointer md:font-semibold flex flex-row-reverse items-center md:gap-3 rounded-lg hover:opacity-90"
                  icon={<IoIosAdd size={25} />}
                />
              </div>
              <div className="rest md:mt-7 xl:mt-14 flex flex-col md:flex-row gap-5 md:items-center">
                {/* <div className="space-x-2 md:space-x-5 mt-5 md:mt-0">
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
                </div> */}
                <div className="flex flex-row gap-3">
                  <div className="date flex items-center gap-2">
                    <IoCalendarOutline size={20} />
                    <span>{movie?.release_date}</span>
                  </div>
                  <div className="date flex items-center gap-2">
                    <MdOutlineAvTimer />
                    {movieInfo.duration}
                  </div>
                  <div className="date flex items-center gap-2">
                    <FaStar />
                    {movieInfo.rating}
                  </div>
                </div>
              </div>
              <p className="my-4 max-w-2xl">{movie?.overview}</p>
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

export default TrendingMovie;
