// import { useParams } from "react-router-dom";

// import { MovieComplete } from "../types/supabase-types.own";
// import { useEffect, useState } from "react";
// import supabaseClient from "../lib/supabaseClient";

// const MovieDetailPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const [movie, setMovie] = useState<MovieComplete | null>(null);

//   useEffect(() => {
//     const fetchSingleMovie = async () => {
//       if (!id) {
//         console.error("No movie id given.");
//         return;
//       }

//       //   const supabaseResponseShort = await supabaseClient
//       //     .from("movies")
//       //     .select("*, directors")
//       //     .eq("id", id)
//       //     .single();

//       const supabaseResponse = await supabaseClient
//         .from("movies")
//         .select(
//           `
//             id,
//             title,
//             year,
//             length,
//             rating,
//             image_Url,
//             genres,
//             created_at,
//             director_id,
//             directors(
//               id,
//               firstName,
//               lastName,
//               numberOfAwards,
//               created_at
//             ) | null
//   `
//         )
//         .eq("id", id)
//         .single();

//       if (supabaseResponse.error) {
//         console.error("Movie not found in database", supabaseResponse.error);
//         return;
//       }
//       if (supabaseResponse.data) {
//         setMovie(supabaseResponse.data);
//         console.log(supabaseResponse.data);
//       }
//     };
//     fetchSingleMovie();
//   }, []);

//   if (!movie) {
//     return <p>No result</p>;
//   }
//   return (
//     <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-24">
//       <img
//         src={`${movie.image_Url}`}
//         alt={movie.title}
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-4">
//         <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
//         <p className="text-gray-700 mb-1">Length: {movie.length} min</p>
//         <p className="text-gray-700 mb-1 font-semibold">
//           Director: {movie.directors.firstName} {movie.directors.lastName}
//         </p>
//         <p className="text-gray-700 mb-1">Genres: {movie.genres}</p>
//         <p className="text-yellow-600 font-semibold mb-2">
//           Rating: {movie.rating}/10
//         </p>
//         <h3 className="text-gray-800">
//           Awards: {movie.directors.numberOfAwards}
//         </h3>
//       </div>
//     </div>
//   );
// };

// export default MovieDetailPage;

import { useParams } from "react-router-dom";
import { MovieComplete } from "../types/supabase-types.own";
import { useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieComplete | null>(null);

  useEffect(() => {
    const fetchSingleMovie = async () => {
      if (!id) {
        console.error("No movie id given.");
        return;
      }

      const supabaseResponse = await supabaseClient
        .from("movies")
        .select(
          `
            id,
            title,
            year,
            length, 
            rating,
            image_Url,
            genres,
            created_at,
            director_id,  
            directors(
              id,
              firstName,
              lastName,
              numberOfAwards,
              created_at
            )
          `
        )
        .eq("id", id)
        .single();

      if (supabaseResponse.error) {
        console.error("Movie not found in database", supabaseResponse.error);
        return;
      }

      if (supabaseResponse.data) {
        const fetchedMovie = supabaseResponse.data;
        setMovie({
          ...fetchedMovie,
          directors: fetchedMovie.directors || {
            id: "",
            firstName: "Unknown",
            lastName: "",
            numberOfAwards: 0,
            created_at: "",
          },
        });
        console.log(supabaseResponse.data);
      }
    };
    fetchSingleMovie();
  }, [id]);

  if (!movie) {
    return <p>No result</p>;
  }

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-24">
      <img
        src={movie.image_Url || ""}
        alt={movie.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <p className="text-gray-700 mb-1">Length: {movie.length} min</p>
        {movie.directors && (
          <p className="text-gray-700 mb-1 font-semibold">
            Director: {movie.directors.firstName} {movie.directors.lastName}
          </p>
        )}
        <p className="text-gray-700 mb-1">Genres: {movie.genres}</p>
        <p className="text-yellow-600 font-semibold mb-2">
          Rating: {movie.rating}/10
        </p>
        {movie.directors && (
          <h3 className="text-gray-800">
            Awards: {movie.directors.numberOfAwards}
          </h3>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
