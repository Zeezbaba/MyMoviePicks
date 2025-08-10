import { movies } from "@/constants";
import React from "react";
import NewMovieCard from "./NewMovieCard";

interface GenreMovieProps {
  data: any[];
  index: number;
}

const GenreMovies = ({ data, index }: GenreMovieProps) => {
  return (
    <div key={index}>
      {data?.map((data, index: number) => {
        return <NewMovieCard data={data} index={index} />;
      })}
    </div>
  );
};

export default GenreMovies;
