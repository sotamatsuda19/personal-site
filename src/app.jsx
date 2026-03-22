const { useState, useEffect, useRef, useCallback, createContext, useContext } = React;

// ─── i18n ─────────────────────────────────────────────────────────────────────

const STRINGS = {
  en: {
    navProfile: "Profile",
    navWorks: "Works",
    navContact: "Contact",
    heroButton: "View Projects",
    worksHeading: "Works",
    comingSoon: "Coming soon...",
    profileHeading: "Profile",
    profileBio:
      "Sota Matsuda\n\n" +
      "University of Rochester (2025 - Present)\n" +
      "- B.S. in Computer Science\n\n" +
      "The University of Tokyo (2025)\n" +
      "- Completed coursework prior to transferring to the U.S.\n\n" +
      "Shogi (Japanese chess): Amateur 4-dan\n" +
      "Chess.com rating: 2000+\n\n" +
      "Focus Areas:\n" +
      "Solving Tech-driven Problems with Art & Creativity\n" +
      "- Artificial Intelligence, Human-AI collaboration\n" +
      "- Unexplored ideas, Creative design\n",
    profileLinks: "Links",
    contactHeading: "Contact",
  },
  ja: {
    navProfile: "プロフィール",
    navWorks: "作品",
    navContact: "お問い合わせ",
    heroButton: "作品を見る",
    worksHeading: "作品",
    comingSoon: "準備中...",
    profileHeading: "プロフィール",
    profileBio:
      "松田颯太\n\n" +
      "ロチェスター大学 コンピュータサイエンス専攻 (2025 - 現在)\n" +
      "東京大学在籍 (2025)\n\n" +
      "将棋アマチュア四段\n" +
      "Chess.com レーティング 2000+\n\n" +
      "専門課題\n" +
      "技術が生んだ問題を、アート・創造性で解決する\n" +
      "- 人工知能、人間とAIのコラボレーション\n" +
      "- 未開拓のアイデア、クリエイティブデザイン",
    profileLinks: "リンク",
    contactHeading: "お問い合わせ",
  },
};

const LangContext = createContext("en");

function useLang() {
  return useContext(LangContext);
}

function t(lang, key) {
  return STRINGS[lang][key] || STRINGS.en[key] || key;
}

// ─── Data ────────────────────────────────────────────────────────────────────

// Add your projects here. Each entry needs: title (en/ja), src, description (en/ja)
const PROJECTS = [
  {
    title: { en: "Word Vector Explorer", ja: "単語ベクトルエクスプローラー" },
    src: "assets/screenshots/words.png",
    link: "https://words.sotamatsuda.com",
    description: {
      en: "Discover how words relate to each other through vector space.",
      ja: "ベクトル空間で単語の関係を発見",
    },
  },
  {
    title: { en: "UR chatbot", ja: "ロチェスター大学AI" },
    src: "assets/screenshots/urchatbot.png",
    link: "https://urchatbot.sotamatsuda.com",
    description: {
      en: "RAG-powered chatbot built for U of R.",
      ja: "RAGを活用したロチェスター大学向けチャットbot",
    },
  },
  {
    title: { en: "Nonsense AI", ja: "馬鹿AI" },
    src: "assets/screenshots/nonsense.png",
    link: "https://nonsense-bot.onrender.com/",
    description: {
      en: "LoRA trained AI model that makes no sense",
      ja: "論理が壊れるように学習されたAI",
    },
  },
];

// Add your artwork here. Drop images in assets/artwork/ and add entries below.
const ARTWORK = [
  { title: { en: "Artwork 1", ja: "作品 1" }, src: null, description: { en: "A description of this artwork.", ja: "この作品の説明。" } },
  { title: { en: "Artwork 2", ja: "作品 2" }, src: null, description: { en: "A description of this artwork.", ja: "この作品の説明。" } },
  { title: { en: "Artwork 3", ja: "作品 3" }, src: null, description: { en: "A description of this artwork.", ja: "この作品の説明。" } },
  { title: { en: "Artwork 4", ja: "作品 4" }, src: null, description: { en: "A description of this artwork.", ja: "この作品の説明。" } },
  { title: { en: "Artwork 5", ja: "作品 5" }, src: null, description: { en: "A description of this artwork.", ja: "この作品の説明。" } },
  { title: { en: "Artwork 6", ja: "作品 6" }, src: null, description: { en: "A description of this artwork.", ja: "この作品の説明。" } },
];

const GITHUB_URL = "https://github.com/sotamatsuda19";

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

    el.style.opacity = "0";
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}

// ─── Routing ─────────────────────────────────────────────────────────────────

function getRoute() {
  const hash = location.hash.replace("#", "");
  if (hash === "works" || hash === "profile" || hash === "contact") {
    return { page: hash };
  }
  return { page: "home" };
}

// ─── Components ──────────────────────────────────────────────────────────────

function LangToggle({ lang, setLang }) {
  return (
    <button
      onClick={() => setLang(lang === "en" ? "ja" : "en")}
      className="rounded-lg border border-black/20 px-2 py-1 text-xs font-semibold text-black/60 transition hover:text-black hover:border-black/40"
      aria-label="Toggle language"
    >
      {lang === "en" ? "日本語" : "EN"}
    </button>
  );
}

function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t(lang, "navProfile"), href: "#profile" },
    { label: t(lang, "navWorks"), href: "#works" },
    { label: t(lang, "navContact"), href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => setMenuOpen(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white shadow-glow"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-display text-xl font-bold text-black"
        >
          SotaMatsuda
        </a>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-black/60 transition hover:text-black"
            >
              {link.label}
            </a>
          ))}
          <LangToggle lang={lang} setLang={setLang} />
        </div>

        {/* Mobile buttons */}
        <div className="flex sm:hidden items-center gap-2">
          <LangToggle lang={lang} setLang={setLang} />
          <button
            className="p-2 text-black/60 transition hover:text-black"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-black/10 bg-white px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium text-black/60 transition hover:text-black"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const lang = useLang();
  const images = ARTWORK.filter((a) => a.src);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section className="relative flex min-h-[50vh] items-center justify-center px-6 overflow-hidden">
      {/* Background slides */}
      {images.length > 0 &&
        images.map((img, i) => (
          <div
            key={i}
            className="hero-slide absolute inset-0"
            style={{
              backgroundImage: `url(${img.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: i === current ? 1 : 0,
              filter: "grayscale(100%)",
            }}
          />
        ))}

      {/* Semi-transparent overlay for readability */}
      {images.length > 0 && (
        <div className="absolute inset-0 bg-white/60" />
      )}

      <div className="relative text-center">
        <h1 className="fade-in font-display text-6xl font-bold tracking-tight text-black sm:text-7xl">
          SotaMatsuda
        </h1>
        <div className="fade-in fade-in-delay-1 mt-8 flex items-center justify-center gap-4">
          <a
            href="#works"
            className="inline-flex items-center gap-2 rounded-2xl border border-black/20 px-6 py-3 text-base font-semibold text-black transition hover:bg-black/5"
          >
            {t(lang, "heroButton")}
          </a>
        </div>
        <a
          href="#works"
          className="fade-in fade-in-delay-3 mt-16 inline-block animate-bounce text-black/30"
          aria-label="Scroll down"
        >
          <ArrowDownIcon className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
}

function Card({ item }) {
  const lang = useLang();
  if (!item.src && !item.link) return null;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-glow">
      {item.src && (
        <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
          <img
            src={item.src}
            alt={item.title[lang]}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-display text-lg font-bold text-black">{item.title[lang]}</h3>
        <p className="mt-1 text-sm text-black/50 line-clamp-2">{item.description[lang]}</p>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-black/70 hover:text-black transition"
          >
            View Project <ExternalLinkIcon className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

function Works() {
  const lang = useLang();
  const headingRef = useScrollFadeIn();
  const hasContent = PROJECTS.some((p) => p.src || p.link) || ARTWORK.some((a) => a.src);

  return (
    <section id="works" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div ref={headingRef} className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold text-black sm:text-5xl">
            {t(lang, "worksHeading")}
          </h2>
        </div>

        {hasContent ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <Card key={`project-${i}`} item={project} />
            ))}
            {ARTWORK.map((item, i) => (
              <Card key={`artwork-${i}`} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-black/40">{t(lang, "comingSoon")}</p>
        )}
      </div>
    </section>
  );
}

function Profile() {
  const lang = useLang();
  const headingRef = useScrollFadeIn();

  return (
    <section id="profile" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div ref={headingRef} className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold text-black sm:text-5xl">
            {t(lang, "profileHeading")}
          </h2>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white p-8 shadow-glow sm:p-12">
          <p className="text-lg leading-relaxed text-black/70 whitespace-pre-line">
            {t(lang, "profileBio")}
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl bg-white p-8 shadow-glow sm:p-12">
          <h3 className="font-display text-xl font-bold text-black mb-4">{t(lang, "profileLinks")}</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-base font-semibold text-white transition hover:bg-black/80"
            >
              <GitHubIcon />
              GitHub
              <ExternalLinkIcon />
            </a>
            <a
              href="https://note.com/sota_matsuda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-base font-semibold text-white transition hover:bg-black/80"
            >
              note
              <ExternalLinkIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const lang = useLang();
  const headingRef = useScrollFadeIn();

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div ref={headingRef} className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold text-black sm:text-5xl">
            {t(lang, "contactHeading")}
          </h2>
        </div>

        <div className="text-center">
          <a
            href="mailto:sotamatsuda19@gmail.com"
            className="text-lg font-medium text-black/70 transition hover:text-black"
          >
            sotamatsuda19@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

function App() {
  const [route, setRoute] = useState(getRoute);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <LangContext.Provider value={lang}>
      <div className="min-h-screen bg-white font-body text-black">
        <Navbar lang={lang} setLang={setLang} />
        {route.page === "home" && <Hero />}
        {route.page === "works" && <Works />}
        {route.page === "profile" && <Profile />}
        {route.page === "contact" && <Contact />}
      </div>
    </LangContext.Provider>
  );
}

// ─── Mount ───────────────────────────────────────────────────────────────────

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
