import Button from "@/components/common/Button";
import List from "@/components/common/List";
import { moviePic } from "@/constants";
import { MovieDetails } from "@/interfaces";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineAvTimer } from "react-icons/md";

const Movie = () => {
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
  return (
    <div className="text-white px-5 md:px-[5%] xl:px-[15%] mt-10 ">
    
      <video controls className="w-full h-full" preload="none">
        <source src="/video.mp4" type="video/mp4" />
      </video>
      {/* <Image
        src={`https://play-lh.googleusercontent.com/proxy/WQyur-siNk7NP8WrVpKp_urxs6V8K3z8iIvGdrrsBlAedYS5qqmuuIbE4DufL2N9Ak5je7JY9tnGPiSWT06jikhTiq8HYNyDYTVln9FKwd4LP3TLUCnZ=s1920-w1920-h1080`}
        alt="video"
        width={600}
        height={600}
        className="w-full h-[30vh] md:h-[80vh]"
      /> */}
      <h2 className="text-xl mt-10">Movie Description</h2>
      <div className="my-10 flex flex-col md:flex-row gap-5">
        <Image
          src={movieInfo.imageUrl}
          alt="movie"
          className="h-[30vh] md:h-[50vh] w-full md:w-1/3 rounded-2xl"
        />
        <div className="right flex-grow">
          <div className="head flex justify-between items-center w-full">
            <h2 className="text-xl md:text-3xl">{movieInfo.title}</h2>
            <Button
              name="Add to Favorite"
              styles="bg-red-500 text-white py-1 px-2 md:p-3 text-s md:text-base cursor-pointer md:font-semibold flex flex-row-reverse items-center md:gap-3 rounded-lg hover:opacity-90"
              icon={<IoIosAdd size={25} />}
            />
          </div>
          <div className="rest md:mt-7 xl:mt-14 flex flex-col md:flex-row gap-5 md:items-center">
            <div className="space-x-2 md:space-x-5 mt-5 md:mt-0">
              {movieInfo.category.map((category, index: number) => {
                return (
                  <span
                    className="bg-white text-gray-800 p-2 text-sm font-semibold md:text-base rounded-lg"
                    key={index}
                  >
                    {category}
                  </span>
                );
              })}
            </div>
            <div className="flex flex-row gap-3">
              <div className="date flex items-center gap-2">
                <IoCalendarOutline size={20} />
                <span>{movieInfo.release_year}</span>
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
          <p className="my-4 max-w-2xl">{movieInfo.description}</p>
          <List name="Country" value="United States" />
          <List name="Genre" value="Drama, Science Fiction" />
          <List name="Date Release" value="May 05 2023" />
          <List name="Production" value="AMC Studios" />
          <List name="Cast " value="Tim Robbins, Rebecca Ferguson, Avi Nash" />
        </div>
      </div>
    </div>
  );
};

export default Movie;
