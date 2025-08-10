import { LayoutProps } from "@/interfaces";
import React, { createContext, useContext, useEffect, useState } from "react";

interface MainContextProps {
  isAuthorized: boolean;
  handleIsAuthorized: (data: boolean) => void;
  handleGenreThumbId: (data: number) => void;
  genreThumbId: number;
}

const MainContext = createContext<MainContextProps | null>(null);

const MainContextWrapper: React.FC<LayoutProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [genreThumbId, setGenreThumbId] = useState<number>(0);

  const handleGenreThumbId = (data: number) => {
    setGenreThumbId(data);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);
    return storedToken ? setIsAuthorized(true) : setIsAuthorized(false);
  }, []);

  const handleIsAuthorized = (data: boolean) => {
    setIsAuthorized(data);
  };

  return (
    <MainContext.Provider
      value={{
        isAuthorized,
        handleIsAuthorized,
        handleGenreThumbId,
        genreThumbId,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMyContext = () => {
  const data: MainContextProps | null = useContext(MainContext);
  if (data) {
    return data as MainContextProps;
  }
};
export default MainContextWrapper;
