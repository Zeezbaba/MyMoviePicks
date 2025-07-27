import { anotherMoviePic } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewMovieCard: React.FC = () => {
  return (
    <Link href={`/movie/genre`}>
      <div className="space-y-3">
        <Image
          src={anotherMoviePic}
          alt="movie-pic"
          className="w-full h-[30vh] xl:h-[50vh]"
        />
        <div className="flex items-center justify-between">
          <h2>Black Knight</h2>
          <span className="bg-red-500 text-white p-2 text-sm md:text-base rounded-lg">
            Action
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NewMovieCard;
