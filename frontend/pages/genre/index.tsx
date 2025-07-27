import NewMovieCard from "@/components/common/NewMovieCard";
import { movies } from "@/constants";
import Link from "next/link";
import React, { lazy, Suspense } from "react";

const GenreMovie = lazy(() => import("@/components/common/GenreMovie"));

const Genre: React.FC = () => {
  return (
    <div className="movies-list text-white px-5 md:px-[5%] xl:px-[10%] py-10 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <h2 className="text-xl font-semibold">Genre</h2>
        <div className="genre-category space-x-2">
          <span className="bg-red-500 text-white py-2 px-4 text-sm md:text-base rounded-lg">
            All
          </span>
          <span className="border text-white border-white p-2 text-sm md:text-base rounded-lg">
            Action
          </span>
          <span className="border text-white border-white p-2 text-sm md:text-base rounded-lg">
            Horror
          </span>
          <span className="border text-white border-white p-2 text-sm md:text-base rounded-lg">
            Comedy
          </span>
          <span className="border text-white border-white p-2 text-sm md:text-base rounded-lg">
            Fantasy
          </span>
        </div>
      </div>
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <GenreMovie />
      </Suspense>
    </div>
  );
};

export default Genre;
