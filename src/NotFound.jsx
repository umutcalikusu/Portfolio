import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
import Wren from "./components/Wren.jsx";

// 404: the çalıkuşu has flown off with the page.
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-bg text-fg">
      <Navbar />
      <main className="relative flex flex-1 items-center justify-center px-5 pb-16 pt-[140px] lg:px-16">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow" />
        <div className="max-w-2xl text-center">
          <Wren className="mx-auto mb-8 h-16 w-16 origin-bottom text-accent motion-safe:animate-[wren-hop_600ms_cubic-bezier(.3,.7,.4,1)_300ms_both]" />
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-[-.05em] [text-wrap:balance] sm:text-7xl">
            This page flew away.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-fg-2 sm:text-lg">
            The page you’re looking for isn’t here anymore. Maybe it never was.
          </p>
          <a
            href="/"
            className="mt-10 inline-flex rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-bg shadow-cta transition hover:-translate-y-0.5 hover:bg-accent-hover"
          >
            Back to home
          </a>
        </div>
      </main>
      <div className="mx-auto w-full max-w-[1500px] px-5 pb-10 lg:px-16">
        <Footer />
      </div>
    </div>
  );
}
