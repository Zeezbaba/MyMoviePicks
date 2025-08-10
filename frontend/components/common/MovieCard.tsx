import { MovieCardProp } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa6";
import { IoMdPlayCircle } from "react-icons/io";
import { MdFavorite } from "react-icons/md";

const MovieCard: React.FC<MovieCardProp> = ({ data, path }) => {
  return (
    <div className="">
      <div className="h-[30vh] xl:h-[40vh] rounded-2xl overflow-hidden cursor-pointer relative group">
        <Image
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          width={300}
          height={300}
          alt="movie-image"
          className="h-full w-full inset-0 -z-10 group-hover:brightness-80 group-hover:scale-105 transition-all duration-200 ease-in"
        />
        <div className="duration-rating absolute top-5 left-5 right-5  flex justify-between">
          <span>
            {data.is_trending ? (
              <span className="bg-white px-2 py-1 rounded-full text-amber-600 text-sm">
                Trending
              </span>
            ) : (
              "."
            )}
          </span>
        </div>
        <Link href={path}>
          <span className="absolute inset-0 flex items-center justify-center ">
            <IoMdPlayCircle
              size={50}
              className="group-hover:scale-150 transition-all duration-200 ease-in"
            />
          </span>
        </Link>
      </div>

      <div className="flex justify-between my-2">
        <h2 className="md:text-lg text-white ">{data.title}</h2>
        <div className="category flex space-x-3">
          {data?.genres?.slice(0, 3).map((genre, key: number) => {
            return (
              <span
                key={key}
                className="bg-red-500 text-white p-1 text-xs  rounded-lg m-auto"
              >
                {genre.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
