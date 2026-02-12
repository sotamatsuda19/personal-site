const { useState, useEffect, useRef, useCallback } = React;

// ─── Data ────────────────────────────────────────────────────────────────────

// Add your projects here. Copy an object and fill in the details to add more.
const PROJECTS = [
  {
    title: "Word Vector Explorer",
    description:
      "An interactive tool for exploring word embeddings and semantic relationships. Search for words, discover analogies, and visualize clusters in a rich 3D space.",
    tags: ["Python", "FastAPI", "React", "Gensim", "Word2Vec"],
    // Replace with your own screenshot path, e.g. "assets/screenshots/wve.png"
    screenshot: null,
    github: "https://github.com/sotamatsuda19",
    // Replace with your deployed app URL, e.g. "https://wve.yourdomain.com"
    demoUrl: null,
  },
];

// Add your artwork here. Drop images in assets/artwork/ and add entries below.
// Example: { title: "Sunset Study", src: "assets/artwork/sunset.jpg" }
const ARTWORK = [
  { title: "Artwork 1", src: null },
  { title: "Artwork 2", src: null },
  { title: "Artwork 3", src: null },
  { title: "Artwork 4", src: null },
  { title: "Artwork 5", src: null },
  { title: "Artwork 6", src: null },
];

const GITHUB_URL = "https://github.com/sotamatsuda19";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Artwork", href: "#artwork" },
];

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function GitHubIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}


function ArrowDownIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function CloseIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// ─── Scroll-triggered fade-in ────────────────────────────────────────────────

function useScrollFadeIn() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("fade-in");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    // Start hidden
    el.style.opacity = "0";
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}

// ─── Components ──────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 shadow-glow backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-display text-xl font-bold text-slate-900"
        >
          Sota
        </a>

        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 transition hover:text-slate-900"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="fade-in font-display text-6xl font-bold tracking-tight text-slate-900 sm:text-7xl">
          Sota
        </h1>
        <p className="fade-in fade-in-delay-1 mt-4 font-body text-xl text-slate-600 sm:text-2xl">
          Developer &amp; Artist
        </p>
        <div className="fade-in fade-in-delay-2 mt-8 flex items-center justify-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-base font-semibold text-amber-100 transition hover:bg-slate-800"
          >
            <GitHubIcon />
            GitHub
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            View Projects
          </a>
        </div>
        <a
          href="#projects"
          className="fade-in fade-in-delay-3 mt-16 inline-block animate-bounce text-slate-400"
          aria-label="Scroll down"
        >
          <ArrowDownIcon className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const ref = useScrollFadeIn();

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-3xl bg-white/90 shadow-glow backdrop-blur"
    >
      {/* Screenshot area */}
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="text-sm font-medium">Add a screenshot</span>
            <span className="text-xs opacity-60">Drop image in assets/screenshots/</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h3 className="font-display text-2xl font-bold text-slate-900">
          {project.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-6 flex flex-wrap gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              Live Demo
              <ExternalLinkIcon />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-amber-100 transition hover:bg-slate-800"
            >
              <GitHubIcon className="w-4 h-4" />
              View on GitHub
              <ExternalLinkIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const headingRef = useScrollFadeIn();

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div ref={headingRef} className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold text-slate-900 sm:text-5xl">
            Projects
          </h2>
          <p className="mt-3 text-lg text-slate-500">
            Things I've been building
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-1">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtworkCard({ artwork, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-white/90 shadow-glow backdrop-blur transition hover:scale-[1.02] hover:shadow-xl"
    >
      {artwork.src ? (
        <img
          src={artwork.src}
          alt={artwork.title}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 to-amber-50 text-slate-400">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
          </svg>
          <span className="text-sm font-medium">Add artwork</span>
          <span className="text-xs opacity-60">assets/artwork/</span>
        </div>
      )}

      {/* Title overlay for images with src */}
      {artwork.src && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
          <p className="text-sm font-semibold text-white">{artwork.title}</p>
        </div>
      )}
    </button>
  );
}

function Lightbox({ artwork, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!artwork) return null;

  return (
    <div
      className="lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <CloseIcon />
      </button>

      <div
        className="max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {artwork.src ? (
          <img
            src={artwork.src}
            alt={artwork.title}
            className="max-h-[85vh] w-auto object-contain"
          />
        ) : (
          <div className="flex h-64 w-80 flex-col items-center justify-center gap-3 rounded-2xl bg-slate-800 text-slate-400">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
            <p className="text-sm font-medium">No image yet</p>
            <p className="text-xs text-slate-500">Add an image to assets/artwork/</p>
          </div>
        )}
      </div>

      {artwork.src && (
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium text-white/80">
          {artwork.title}
        </p>
      )}
    </div>
  );
}

function Artwork() {
  const [lightboxItem, setLightboxItem] = useState(null);
  const headingRef = useScrollFadeIn();

  return (
    <section id="artwork" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div ref={headingRef} className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold text-slate-900 sm:text-5xl">
            Artwork
          </h2>
          <p className="mt-3 text-lg text-slate-500">
            Illustrations, sketches, and visual experiments
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ARTWORK.map((item, i) => (
            <ArtworkCard
              key={i}
              artwork={item}
              onClick={() => setLightboxItem(item)}
            />
          ))}
        </div>
      </div>

      {lightboxItem && (
        <Lightbox artwork={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 transition hover:text-slate-700"
          aria-label="GitHub"
        >
          <GitHubIcon className="w-6 h-6" />
        </a>
        <p className="text-sm text-slate-500">
          Built by Sota
        </p>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="min-h-screen bg-light font-body text-slate-900">
      <Navbar />
      <Hero />
      <Projects />
      <Artwork />
      <Footer />
    </div>
  );
}

// ─── Mount ───────────────────────────────────────────────────────────────────

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
