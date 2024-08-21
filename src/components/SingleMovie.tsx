const MovieCard = ({ movie }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover"
        src={movie.image_Url}
        alt={movie.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="font-semibold text-l mb-2">Director: </p>
        <p className="text-gray-700 text-base">
          {movie.year} • {movie.genres}
        </p>

        <p className="text-gray-600 text-sm">Length: {movie.length} min</p>
        {movie.rating && (
          <p className="text-yellow-600 font-semibold">
            Rating: {movie.rating}/10
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
