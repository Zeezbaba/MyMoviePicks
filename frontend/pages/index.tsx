import Button from "@/components/common/Button";
import { background, movies, moviesSlides } from "@/constants";
import Image from "next/image";
import { useState } from "react";
import { FaCirclePlay, FaStar } from "react-icons/fa6";
import { MdWatchLater } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/router";

import MovieCard from "@/components/common/MovieCard";
import Link from "next/link";
import NewMovieCard from "@/components/common/NewMovieCard";

export default function Home() {
  const [index, setIndex] = useState<number>(0);
  const router = useRouter();
  return (
    <div className="bg-[#171717] space-y-20 w-full h-full">
      <div className="w-full h-[70vh] relative">
        {moviesSlides
          .filter((data, i) => index === i)
          .map((data) => {
            return (
              <div className="w-full h-[55vh] md:h-[70vh] relative">
                <Image
                  src={background}
                  width={800}
                  height={800}
                  priority
                  style={{ objectFit: "cover" }}
                  alt="background"
                  className="w-full h-full -z-10 inset-x-0 inset-y-0 "
                />
                <div className="text-white inset-x-0 flex flex-col absolute bottom-5 md:bottom-10">
                  <div className="button-group flex gap-5 justify-start md:justify-center items-center px-5">
                    <Button
                      name="Watch Now"
                      styles="bg-red-500 text-white p-3 cursor-pointer font-semibold flex items-center gap-3 rounded-lg hover:opacity-90"
                      icon={<FaCirclePlay />}
                      action={() => router.push("/movie/5")}
                    />
                    <Button
                      name="Watch Later"
                      styles="border border-red-600 bg-transparent text-white p-3 cursor-pointer font-semibold flex items-center gap-3 rounded-lg"
                      icon={<MdWatchLater />}
                    />
                  </div>
                  <div className="px-5 md:px-[5%] xl:px-[10%] py-5 space-y-5">
                    <h2 className="text-xl md:text-3xl font-semibold">
                      {data.title}
                    </h2>
                    <div className="category space-x-3">
                      {data.categories.map((data, i) => (
                        <span className="bg-white text-gray-800 p-2 rounded-2xl text-xs md:text-base">
                          {data}
                        </span>
                      ))}
                    </div>
                    <p className="max-w-xl font-mon">{data.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="movies-list text-white px-5 md:px-[5%] xl:px-[10%]  space-y-5">
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
            return  <NewMovieCard />;
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
       
      </div>
    </div>
  );
}

//<h2 className="text-xl">Movie Description</h2>
