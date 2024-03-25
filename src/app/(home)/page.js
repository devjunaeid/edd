import AboutUs from "@/components/AboutUs";
import Hero from "@/components/Hero";
import Service from "@/components/Service";
import WeDo from "@/components/WeDo";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <div id="services">
        <Service />
      </div>
      <WeDo />
    </main>
  );
}
