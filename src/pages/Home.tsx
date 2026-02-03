import Hero from "../components/Hero";
import InfoGrid from "../components/InfoGrid";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
        <Hero />
        <InfoGrid />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
