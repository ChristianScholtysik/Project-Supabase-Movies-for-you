const Search = () => {
  return (
    <>
      <div className="flex items-center mb-10">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-blue-500"
        />
        <button className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-r-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Search
        </button>
      </div>
      <div className="flex gap-6">
        <button className="px-10 py-2 border-2 border-amber-500 text-gray-700 font-semibold rounded-full hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-colors duration-300">
          Year Up
        </button>
        <button className="px-10 py-2 border-2 border-amber-500 text-gray-700 font-semibold rounded-full hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-colors duration-300">
          Year Down
        </button>
        <button className="px-10 py-2 border-2 border-amber-500 text-gray-700 font-semibold rounded-full hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-colors duration-300">
          Best Rate
        </button>
      </div>
    </>
  );
};

export default Search;
