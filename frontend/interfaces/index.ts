import React from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  name: string;
  styles: string;
  icon?: React.ReactNode;
  action?: () => void;
}

export interface MovieDetails {
  imageUrl: any;
  title: string;
  category: string[];
  release_year: number;
  duration: string;
  rating: number;
  description: string;
  country: string;
  genre: string;
  release_date: string;
  production: string;
  cast: string;
}

export interface MovieCardProps {
  data: {
    id: number;
    name: string;
    imageUrl: string;
    duration: string;
    rating: number;
    categories: string[];
  };
  index: number;
}

export interface SearchModalProps {
  action: () => void;
}

export interface createAuguments<T> {
  data: T;
  error: string;
}

export interface createAccountAug {
  username: string;
  email: string;
  password: string;
}

export interface loginAug {
  username: string;
  password: string;
}
