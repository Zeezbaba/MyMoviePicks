import background from "@/public/background.png";
import moviePic from "@/public/moviepic.png";
import authbg from "@/public/authbg.jpeg";
import anotherMoviePic from "@/public/sample.png";

interface moviesSlideInterface {
  title: string;
  categories: string[];
  release_year?: number;
  duration?: string;
  rating?: number;
  description: string;
  backgroundImage: string;
}

const moviesSlides: moviesSlideInterface[] = [
  {
    backgroundImage:
      "https://m.media-amazon.com/images/M/MV5BNmI5NDgyZmQtNDc3YS00Mjg0LThmMzEtZjcyNzczOTJlYWY4XkEyXkFqcGc@._V1_.jpg",
    title: "Inception",
    categories: ["Action", "Adventure", "Sci-Fi"],
    description:
      "A skilled thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
  },
  {
    backgroundImage:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwOC00ZjQ5LWFmNWItODM1ZGMzZjJlOTEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    title: "The Godfather",
    categories: ["Crime", "Drama"],
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    backgroundImage:
      "https://static1.srcdn.com/wordpress/wp-content/uploads/2020/04/Money-Heist-Berlin-Professor-Tokyo.jpg",
    title: "Interstellar",
    categories: ["Adventure", "Drama", "Sci-Fi"],
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    backgroundImage:
      "https://m.media-amazon.com/images/M/MV5BMTYxNTQ3NzU4NF5BMl5BanBnXkFtZTcwODIzMDU4Mg@@._V1_.jpg",
    title: "The Dark Knight",
    categories: ["Action", "Crime", "Drama"],
    description:
      "When the menace known as the Joker emerges, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
];

const movies = [
  {
    id: 1,
    name: "Merlin",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNmI5NDgyZmQtNDc3YS00Mjg0LThmMzEtZjcyNzczOTJlYWY4XkEyXkFqcGc@._V1_.jpg",
    duration: "2h 28m",
    rating: 8.8,
    categories: ["Action", "Adventure", "Sci-Fi"],
  },
  {
    id: 2,
    name: "The Godfather",
    imageUrl:
      "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/10/29/1414568178022/ce595af2-3bad-4b17-8f15-0cedc04ed3cd-1020x612.jpeg?width=700&quality=85&auto=format&fit=max&s=862945e8f31bcb6005b3ebe25a466ea9",
    duration: "2h 55m",
    rating: 9.2,
    categories: ["Crime", "Drama"],
  },
  {
    id: 3,
    name: "Money Heist",
    imageUrl:
      "https://static1.srcdn.com/wordpress/wp-content/uploads/2020/04/Money-Heist-Berlin-Professor-Tokyo.jpg",
    duration: "2h 49m",
    rating: 8.6,
    categories: ["Adventure", "Drama"],
  },
  {
    id: 4,
    name: "The Dark Knight",
    imageUrl:
      "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/10/29/1414568178022/ce595af2-3bad-4b17-8f15-0cedc04ed3cd-1020x612.jpeg?width=700&quality=85&auto=format&fit=max&s=862945e8f31bcb6005b3ebe25a466ea9",
    duration: "2h 32m",
    rating: 9.0,
    categories: ["Action", "Crime", "Drama"],
  },
];


export { background, moviesSlides, movies, moviePic, authbg, anotherMoviePic };
