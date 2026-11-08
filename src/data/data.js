import CoronaApp from "../assets/projects/corona-app.webp";
import WeatherApp from "../assets/projects/weather-app.webp";
import Trex from "../assets/projects/trex-game2.png";
import MovieApp from "../assets/projects/movie-app.webp";
import KanbanApp from "../assets/projects/kanban_2.webp";
import RestaurantApp from "../assets/projects/restaurant.webp";

// None of these projects has a live deployment, so each entry links to its
// GitHub repository only. Leave `github` empty for a private repository.
// Optional `tech: ["React", ...]` renders stack badges under the description.
export const data = [
  {
    id: 1,
    name: "Restaurant & QR Menu Platform",
    image: RestaurantApp,
    desc: "A restaurant website with a menu that guests open by scanning a QR code at the table.",
    github: "https://github.com/umutcalikusu/RestaurantWebSite",
  },
  {
    id: 2,
    name: "Self-Playing Dino Game (AI)",
    image: Trex,
    desc: "The T-rex runner game, played by an AI agent that learns on its own when to jump.",
    github: "https://github.com/umutcalikusu/Trex-Game-AI",
  },
  {
    id: 3,
    name: "Kanban Application",
    image: KanbanApp,
    desc: "A task board with a column for each stage of work.",
    github: "https://github.com/umutcalikusu/Kanban-App",
  },
  {
    id: 4,
    name: "Weather Application",
    image: WeatherApp,
    desc: "Current conditions for a searched city, from a public weather API.",
    github: "https://github.com/umutcalikusu/React-Weather-App",
    tech: ["React"],
  },
  {
    id: 5,
    name: "Corona Application",
    image: CoronaApp,
    desc: "COVID-19 figures by country, from a public data API.",
    github: "https://github.com/umutcalikusu/React-Corona-App",
    tech: ["React"],
  },
  {
    id: 6,
    name: "Movie Application",
    image: MovieApp,
    desc: "Browse and search films from a movie database.",
    github: "",
  },
];
