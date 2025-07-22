import background from "@/public/background.png";

interface moviesSlideInterface {
  title: string;
  category: string[];
  release_year: number;
  duration: string;
  rating: number;
  description: string;
  url: string;
}

const moviesSlides: moviesSlideInterface[] = [
  {
    title: "Avatar I: The Way of Water",
    category: ["Action", "Adventure", "Science Fiction"],
    release_year: 2022,
    duration: "3:12:10",
    rating: 8.5,
    url: "https://m.media-amazon.com/images/M/MV5BNmI5NDgyZmQtNDc3YS00Mjg0LThmMzEtZjcyNzczOTJlYWY4XkEyXkFqcGc@._V1_.jpg",
    description: `Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.`,
  },
  {
    title: "Avatar: The Way of Water",
    category: ["Action", "Adventure", "Science Fiction"],
    release_year: 2022,
    duration: "3:12:10",
    rating: 8.5,
    url: "https://m.media-amazon.com/images/M/MV5BNmI5NDgyZmQtNDc3YS00Mjg0LThmMzEtZjcyNzczOTJlYWY4XkEyXkFqcGc@._V1_.jpg",
    description: `Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.`,
  },
];

export { background, moviesSlides };
