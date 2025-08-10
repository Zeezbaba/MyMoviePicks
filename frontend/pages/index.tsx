import Button from "@/components/common/Button";
import { background, moviesSlides } from "@/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdWatchLater,
} from "react-icons/md";
import { useRouter } from "next/router";
import MovieCard from "@/components/common/MovieCard";
import useFetch from "@/hooks/useFetch";
import { Movie } from "@/interfaces";
import { BiLoaderCircle } from "react-icons/bi";


export default function Home() {
  const [index, setIndex] = useState<number>(0);
  const [showMovie, setShowMovie] = useState<any>([]);
  const router = useRouter();

  const { data, loading, error } = useFetch("/movies/", {
    params: { page: index + 1 },
  });
  const movies = data?.data?.results;

  useEffect(() => {
    if (index == 0) {
      setShowMovie(data?.data?.results[0]);
    }
  }, [data]);

  return (
    <div className="bg-[#171717] space-y-10 md:space-y-72 lg:space-y-60 w-full h-full">
      <div className="w-full h-[70v] md:h-[50vh] ">
        <div className="w-full h-full md:h-[70vh] relative">
          <Image
            src={`https://image.tmdb.org/t/p/w500${showMovie?.poster_path}`}
            width={800}
            height={800}
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
            alt="background"
            className="w-full h-full -z-10 inset-x-0 inset-y-0 brightness-50"
          />
          {/* <div className="arrows absolute inset-0 flex items-center justify-between p-5 -z-10">
            <MdArrowBackIos
              size={30}
              color="white"
              className="cursor-pointer z-50"
              onClick={() => {
                
              }}
            />
            <MdArrowForwardIos
              size={30}
              color="white"
              className="cursor-pointer z-50"
            />
          </div> */}
          <div className="text-white inset-x-0 flex flex-col absolute bottom-5 md:bottom-10">
            <div className="button-group flex gap-5 justify-start md:justify-center items-center px-5">
              <Button
                name="Watch Now"
                styles="bg-red-500 text-white p-3 cursor-pointer font-semibold flex items-center gap-3 rounded-lg hover:opacity-90"
                icon={<FaCirclePlay />}
                action={() => router.push(`/movie/${showMovie?.id}`)}
              />
              <Button
                name="Watch Later"
                styles="border border-red-600 bg-transparent text-white p-3 cursor-pointer font-semibold flex items-center gap-3 rounded-lg"
                icon={<MdWatchLater />}
              />
            </div>
            <div className="px-5 md:px-[5%] xl:px-[10%] py-5 space-y-5">
              <h2 className="text-xl md:text-3xl font-semibold">
                {showMovie?.title}
              </h2>
              <div className="category space-x-3">
                {showMovie?.genres?.map((data: any, i: number) => (
                  <span
                    className="bg-white text-gray-800 p-2 rounded-2xl text-xs md:text-base"
                    key={i}
                  >
                    {data.name}
                  </span>
                ))}
              </div>
              <p className="max-w-xl font-mon">{showMovie?.overview}</p>
            </div>
          </div>
        </div>
      </div>

      {/* All Movies */}

      <div className="movies-list text-white px-5 md:px-[5%] xl:px-[10%]  space-y-5">
        <h2 className="text-xl font-semibold text-yellow-600">All Movies</h2>

        {loading ? (
          <div className="w-full h-[30vh] flex items-center justify-center">
            <BiLoaderCircle
              size={30}
              color="white"
              className={`${loading ? "animate-spin" : "hidden"}`}
            />
          </div>
        ) : (
          <div className="movieCard grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {movies?.slice(0, 9)?.map((data: Movie, index: number) => (
              <MovieCard data={data} path={`/movie/${data.id}`} />
            ))}
          </div>
        )}

        <div className="options flex items-center justify-end gap-5">
          <Button
            name="Previous"
            styles="border border-red-600 bg-transparent text-white text-xs md:text-sm p-2 cursor-pointer font-semibold rounded-lg hover:opacity-90"
            action={() => (index > 0 ? setIndex((prev) => prev - 1) : null)}
          />
          <Button
            name="Next"
            styles="border border-red-600 bg-transparent text-white text-xs md:text-sm px-4 py-2 cursor-pointer font-semibold rounded-lg hover:opacity-90"
            action={() => setIndex((prev) => prev + 1)}
          />
        </div>
      </div>

      {/* <div className="movies-list text-white px-5 md:px-[5%] xl:px-[10%]  space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Trending</h2>
          <Link href={`/trending`}>
            <span className="text-gray-300 flex items-center gap-2">
              View All <GoArrowRight />
            </span>
          </Link>
        </div>

        <div className="movieCard grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {movies.map((data, index: number) => {
            return <MovieCard data={data} index={index} />;
          })}
        </div>
      </div>

      <div className="movies-list text-white px-5 md:px-[5%] xl:px-[10%] space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Genre</h2>
          <Link href={`/genre`}>
            <span className="text-gray-300 flex items-center gap-2">
              View All <GoArrowRight />
            </span>
          </Link>
        </div>
        <div className="movieCard grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          {movies.map((data, index: number) => {
            return <NewMovieCard />;
          })}
        </div>
      </div>
      <div className="movies-list text-white px-5 md:px-[5%] xl:px-[10%] space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recommended</h2>
          <Link href={`/trending`}>
            <span className="text-gray-300 flex items-center gap-2">
              View All <GoArrowRight />
            </span>
          </Link>
        </div>
        <div className="movieCard grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {movies.map((data, index: number) => {
            return <MovieCard data={data} index={index} />;
          })}
        </div>
      </div>*/}
    </div>
  );
}

{
  /* //<h2 className="text-xl">Movie Description</h2> */
}
