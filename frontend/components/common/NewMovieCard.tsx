import { anotherMoviePic } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NewMovieCardProps {
  data: { title: string; poster_path: string,   id?: number; };
  index: number;
  genre: string;

}

const NewMovieCard: React.FC<NewMovieCardProps> = ({ data, index, genre}) => {
  return (
    <Link href={`/movie/genre/${data.id}`} key={index}>
      <div className="space-y-3">
        <Image
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          width={300}
          height={300}
          alt="movie-pic"
          className="w-full h-[30vh] xl:h-[50vh]"
        />
        <div className="flex items-center justify-between">
          <h2>{data.title}</h2>
          <span className="bg-red-500 text-white p-2 text-xs rounded-lg">
            {genre}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NewMovieCard;
