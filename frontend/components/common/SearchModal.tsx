import { movies } from "@/constants";
import useFetch from "@/hooks/useFetch";
import { SearchModalProps } from "@/interfaces";
import axiosInstance from "@/services/axios";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";

const SearchModal: React.FC<SearchModalProps> = ({ action }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>("");
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (search: string) => {
    console.log(`Fetching...`);
    setLoading(true);
    try {
      const response = await axiosInstance.get("/movies/search/", {
        params: {
          query: search,
        },
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(`Starting...`);
    const debouncingSearch = setTimeout(() => {
      if (search !== "") {
        console.log(`Searching...`);
        fetchData(search);
      }
    }, 500);

    return () => {
      clearTimeout(debouncingSearch);
    };
  }, [search]);

  console.log(data);

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center">
      <div className="w-full h-full md:w-2/5 md:rounded-xl md:h-2/3 bg-black z-10 p-5 space-y-5 overflow-hidden overflow-y-scroll no-scrollbar">
        <div className="flex justify-between items-center ">
          <h2 className="text-yellow-600">My Movie Picks</h2>
          <IoClose size={30} onClick={action} className="cursor-pointer" />
        </div>
        <form>
          <span className="bg-white flex items-center justify-between rounded-full px-5">
            <input
              name="search"
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
              placeholder="Search movies...."
              className="outline-none py-2 w-full
              text-black"
            />
            <RiSearchLine color="black" className="cursor-pointer" />
          </span>
        </form>
        <div className="search-results flex flex-col gap-5 overflow-hidden overflow-y-scroll">
          {loading ? (
            <div className="flex items-center justify-center h-[30vh]">
              <BiLoaderCircle
                size={30}
                color="white"
                className="animate-spin"
              />
            </div>
          ) : (
            data &&
            data?.map((data: any, index: number) => (
              <div key={index} className="h-14 flex gap-2 ">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                  alt="movie-image"
                  width={60}
                  height={60}
                  className="object-cover rounded-lg"
                />
                <div>
                  <Link
                    href={`/movie/trending/${data?.id}`}
                    onClick={action}
                    className="text-gray-400 font-semibold"
                  >
                    {data?.title}
                  </Link>
                  
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
