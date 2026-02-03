import profilePhoto from "/Users/lilywallace/my-elite-portfolio/src/assets/LilyPhoto1.jpeg";
import HoverHearts from "../components/HoverHearts";


function Hero() {
  return (
    <section id="about" className="grid items-center gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
          Computer Science • Software Dev • Data Science minor
        </div>

        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Hi, I’m{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent px-1">
            Lily  
          </span> 
          .
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
          I’m a frontend developer who loves building polished React + TypeScript
          interfaces with thoughtful UX and clean component systems. I enjoy
          blending design and engineering to make web apps feel smooth, modern,
          and “expensive.”
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_-22px_rgba(236,72,153,0.7)] transition hover:brightness-105 active:scale-[0.98]"
          >
            Get in touch
          </a>

          <a
            href="#highlights"
            className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-black/5 active:scale-[0.98]"
          >
            View highlights
          </a>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-300/35 via-purple-300/20 to-transparent" />
          <div className="relative p-4">
            <HoverHearts>
            <img
              src={profilePhoto}
              alt="Portrait of Lily Wallace"
              className="h-[360px] w-full rounded-2xl object-cover object-top"
            />
            </HoverHearts>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">
          {/* ✅ Optional: Add a caption like “Kansas City, MO” */}
        </p>
      </div>
    </section>
  );
}

export default Hero;
