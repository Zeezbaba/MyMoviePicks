import { movies } from "@/constants";
import { SearchModalProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";

const SearchModal: React.FC<SearchModalProps> = ({ action }) => {
  const [search, setSearch] = useState("");
  const [fetchedData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(true);

  const FetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/tryFetch", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setFetchData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    FetchMovies();
  }, []);

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center">
      <div className="w-full h-full md:w-1/3 md:rounded-xl md:h-2/3 bg-black z-10 p-5 space-y-5">
        <div className="flex justify-between items-center ">
          <h2>My Movie Picks</h2>
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
        <div className="search-results flex flex-col gap-5 overflow-hidden ">
          {loading ? (
            <div className="flex items-center justify-center">
               <BiLoaderCircle size={30} className="animate-spin" />
            </div>
           
          ) : (
            fetchedData?.map(({ name, id, imageUrl, categories }, index) => (
              <div key={index} className="h-14 flex gap-2">
                <Image src={imageUrl} alt="movie-image" width={60} height={60} className="object-cover h-full rounded-lg" />
                <div>
                  <Link href={`/movie/${name}`} onClick={action} className="text-gray-500">{name}</Link>
                  <div className="space-x-1">
                    {
                      categories?.map(category => (
                          <span className="text-xs bg-red-500 text-white p-1 rounded-full">{category}</span>
                      ))
                    }
                  </div>
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
