// import Image from "next/image";
import { fetchHome } from "../lib/fetchHome.js";

export default async function Home() {
  const homeData = await fetchHome();

  return (
    <div>
    <main className="bg-black text-white min-h-screen">
      <section className="flex flex-col justify-center items-center text-center  px-4 min-h-screen">
        <p className="uppercase tracking-widest text-sm text-gray-400">I am</p>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold break-words">{homeData.firstName} </h1>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold break-words">{homeData.lastName}</h2>
        <p className="uppercase text-sm mt-2 text-gray-400">FULLSTACK DEVELOPER</p>
      </section>
      
      <section className="bg-black text-white px-6 py-16" id="about">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">About Me</h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base text-left">
            {homeData.aboutMe}
          </p>
        </div>
      </section>


    </main>
    </div>
  );
}
