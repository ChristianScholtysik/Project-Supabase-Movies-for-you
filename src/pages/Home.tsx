import Search from "../components/Search";

const Home = () => {
  return (
    <section className="flex flex-col justify center items-center m-20">
      <h1 className="text-5xl font-bold mb-8">Movies for you</h1>
      <h2 className="text-xl font-bold mb-20">The best MovieDB</h2>
      <Search />
    </section>
  );
};

export default Home;
