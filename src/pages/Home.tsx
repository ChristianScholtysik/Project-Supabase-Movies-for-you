// import { useEffect, useState } from "react";

// import { Link } from "react-router-dom";
// import { Movie } from "../types/supabase-types.own";
// import supabaseClient from "../lib/supabaseClient";
// import MovieCard from "../components/SingleMovie";

// const Home = () => {
//   //   const searchContext = useContext(SearchTermContext);
//   const [searchInput, setSearchInput] = useState<string>("");
//   const [movies, setMovies] = useState<Movie[]>([]);

//   const [rating, setRating] = useState<string>("rating");
//   const [sortYear, setSortYear] = useState<string>("created_at");

//   useEffect(() => {
//     const fetchMoviesBySearchTerm = async () => {
//       let selectQuery = supabaseClient.from("movies").select("*");
//       if (searchInput) {
//         selectQuery = selectQuery.ilike("title", `%${searchInput}`);
//       }
//       if (rating) {
//         selectQuery = selectQuery.eq("rating", rating);
//       }
//       if (sortYear) {
//         selectQuery = selectQuery.order(sortYear, { ascending: true });
//       }

//       const result = await selectQuery;
//       if (result.error) {
//         console.error(result.error);
//         setMovies([]);
//       } else {
//         setMovies(result.data);
//       }
//     };
//     fetchMoviesBySearchTerm();
//   }, [searchInput, rating, sortYear]);
//   console.log(movies);

//   return (
//     <>
//       <section className="flex flex-col justify-center items-center m-20 ">
//         <h1 className="text-5xl font-bold mb-8">Movies for you</h1>
//         <h2 className="text-xl font-bold mb-20">The best MovieDB</h2>
//         <section className="flex flex-col items-center">
//           <div className="flex items-center mb-10">
//             <input
//               type="text"
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               placeholder="Search..."
//               className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-blue-500"
//             />
//             <button className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-r-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
//               Search
//             </button>
//           </div>
//           <div className="flex gap-6">
//             <button className="px-10 py-2 border-2 border-amber-500 text-gray-700 font-semibold rounded-full hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-colors duration-300">
//               Year Up
//             </button>
//             <button
//               className="px-10 py-2 border-2 border-amber-500 text-gray-700 font-semibold rounded-full hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-colors duration-300"
//               value={sortYear}
//               onClick={(e) => setSortYear(e.target.value)}>
//               Year Down
//             </button>
//             <button
//               className="px-10 py-2 border-2 border-amber-500 text-gray-700 font-semibold rounded-full hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-colors duration-300"
//               value={rating}
//               onClick={(e) => setRating(e.target.value)}>
//               Best Rate
//             </button>
//           </div>
//         </section>
//       </section>
//       <section className="ivide-slate-100 > * + *">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-10">
//           {movies.map((movie) => (
//             <div key={movie.id}>
//               <Link to={`movies/${movie.id}`}>
//                 {movie ? <MovieCard movie={movie} /> : <p>Loading...</p>}
//               </Link>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types/supabase-types.own";
import supabaseClient from "../lib/supabaseClient";
import MovieCard from "../components/SingleMovie";

const Home = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [rating, setRating] = useState<string | null>(null);
  const [sortYear, setSortYear] = useState<string>("created_at");

  const fetchMoviesBySearchTerm = async () => {
    let selectQuery = supabaseClient.from("movies").select("*");
    if (searchInput) {
      selectQuery = selectQuery.ilike("title", `%${searchInput}%`);
    }

    //   if (searchInput) {
    //     const yearSearch = Number(searchInput);
    //     if (!isNaN(yearSearch)) {
    //       selectQuery = selectQuery.eq("year", yearSearch);
    //     }

    //     try {

    //       selectQuery = selectQuery.or(
    //         `director_id.eq.${searchInput},title.ilike.%${searchInput}%`
    //       );
    //     } catch (error) {
    //       console.error("Invalid UUID format for director_id search");
    //     }

    if (rating) {
      selectQuery = selectQuery.order("rating", { ascending: false });
    }

    if (sortYear) {
      selectQuery = selectQuery.order("year", {
        ascending: sortYear === "asc",
      });
    }

    const result = await selectQuery;
    if (result.error) {
      console.error(result.error);
      setMovies([]);
    } else {
      setMovies(result.data);
    }
  };

  useEffect(() => {
    fetchMoviesBySearchTerm();
  }, [searchInput, rating, sortYear]);

  return (
    <>
      <section className="flex flex-col justify-center items-center m-20">
        <h1 className="text-5xl font-bold mb-8">Movies for you</h1>
        <h2 className="text-xl font-bold mb-20">The best MovieDB</h2>
        <section className="flex flex-col items-center">
          <div className="flex items-center mb-10">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-blue-500"
            />
            <button
              onClick={fetchMoviesBySearchTerm}
              className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-r-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Search
            </button>
          </div>
          <div className="flex gap-6">
            <button
              onClick={() => setSortYear("asc")}
              className={`px-10 py-2 border-2 ${
                sortYear === "asc"
                  ? "bg-amber-400 text-white"
                  : "border-amber-500 text-gray-700"
              } font-semibold rounded-full hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-colors duration-300`}>
              Year Up
            </button>
            <button
              onClick={() => setSortYear("desc")}
              className={`px-10 py-2 border-2 ${
                sortYear === "desc"
                  ? "bg-amber-400 text-white"
                  : "border-amber-500 text-gray-700"
              } font-semibold rounded-full hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-colors duration-300`}>
              Year Down
            </button>
            <button
              onClick={() => setRating(rating === null ? "rating" : null)}
              className={`px-10 py-2 border-2 ${
                rating
                  ? "bg-amber-400 text-white"
                  : "border-amber-500 text-gray-700"
              } font-semibold rounded-full hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-colors duration-300`}>
              Best Rate
            </button>
          </div>
        </section>
      </section>
      <section className="divide-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-10">
          {movies.map((movie) => (
            <div key={movie.id}>
              <Link to={`movies/${movie.id}`}>
                {movie ? <MovieCard movie={movie} /> : <p>Loading...</p>}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
