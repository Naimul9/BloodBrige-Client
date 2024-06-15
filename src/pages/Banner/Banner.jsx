import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <div className=" hero min-h-screen bg-no-repeat container mx-auto bg-cover mb-5" style={{backgroundImage: 'url(https://i.ibb.co/r4hn4rP/pexels-karolina-grabowska-4226925.jpg)'}}>
  <div className="hero-overlay bg-opacity-20"></div>
  <div className="hero-content text-center ">
    <div className="max-w-2xl text-white mt-10">
      <h1 className="mb-5 text-5xl font-bold">DONATE BLOOD AND<span className="text-red-600"> GET REAL BLESSINGS.</span> </h1>
      <p className="mb-5">Blood is the most precious gift that anyone can give to another person.
Donating blood not only saves the life also save donors lives.</p>

<div className="flex gap-5 justify-center mt-10">

<Link to='register'><button className="btn bg-red-500 hover:bg-red-700 text-white ">Join as a donor </button></Link>
      <Link to={'/search-page'}><button className="btn bg-red-500 hover:bg-red-700 text-white">Search Donors</button></Link>
</div>
    </div>


  </div>
</div>
    );
};

export default Banner;