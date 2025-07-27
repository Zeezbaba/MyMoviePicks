import { MovieCardProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { IoMdPlayCircle } from "react-icons/io";

const MovieCard: React.FC<MovieCardProps> = ({data, index}) => {
  return (
    <div className="" key={index}>
      <Link href={`/movie/${data.id}`}>
        <div className="h-[30vh] xl:h-[40vh] rounded-2xl overflow-hidden cursor-pointer relative group">
          <Image
            src={data.imageUrl}
            width={300}
            height={300}
            alt="movie-image"
            className="h-full w-full inset-0 -z-10 group-hover:brightness-80 group-hover:scale-105 transition-all duration-200 ease-in"
          />
          <div className="duration-rating absolute top-5 left-5 right-5  flex justify-between">
            <span>{data.duration}</span>
            <span className="flex items-center justify-center gap-1 text-sm md:text-base">
              <FaStar size={13} />
              {data.rating}
            </span>
          </div>
          <span className="absolute inset-0 flex items-center justify-center ">
            <IoMdPlayCircle
              size={50}
              className="group-hover:scale-150 transition-all duration-200 ease-in"
            />
          </span>
        </div>
      </Link>
      <div className="flex justify-between my-2">
        <h2 className="md:text-lg text-white ">{data.name}</h2>
        <div className="category space-x-3">
          {data.categories.map((category, key: number) => {
            return (
              <span
                key={key}
                className="bg-red-500 text-white p-2 text-sm md:text-base rounded-lg"
              >
                {category}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
