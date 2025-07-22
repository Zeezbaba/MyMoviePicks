import Button from "@/components/common/Button";
import { background, moviesSlides } from "@/constants";
import Image from "next/image";
import { useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { MdWatchLater } from "react-icons/md";

export default function Home() {
  const [index, setIndex] = useState<number>(0);
  return (
    <div className="bg-[#171717] flex-grow w-full h-full">
      <div className="w-full h-[70vh] relative">
        {moviesSlides
          .filter((data, i) => index === i)
          .map((data) => {
            return (
              <div className="w-full h-[55vh] md:h-[70vh] relative">
                <Image
                  src={background}
                  alt="background"
                  className="w-full h-full backdrop-blur-2xl -z-10 inset-x-0 inset-y-0 brightness-60 "
                />
                <div className="text-white inset-x-0 flex flex-col absolute bottom-5 md:bottom-10">
                  <div className="button-group flex gap-5 justify-start md:justify-center items-center px-5">
                    <Button
                      name="Watch Now"
                      styles="bg-red-500 text-white p-3 cursor-pointer font-semibold flex items-center gap-3 rounded-lg hover:opacity-90"
                      icon={<FaCirclePlay />}
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
                      {data.category.map((data, i) => (
                        <span className="bg-white text-gray-800 p-2 rounded-2xl text-sm">
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
      <div className="movies-list text-white px-5 md:px-[5%] xl:px-[10%] py-10">
        <h2>Trending</h2>
      </div>
    </div>
  );
}
