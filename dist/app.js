const { useState, useEffect, useRef, useCallback, createContext, useContext } = React;
const STRINGS = {
  en: {
    navProfile: "Profile",
    navWorks: "Works",
    navContact: "Contact",
    heroButton: "View Projects",
    worksHeading: "Works",
    comingSoon: "Coming soon...",
    profileHeading: "Profile",
    profileBio: "Sota Matsuda\n\nUniversity of Rochester (2025 - Present)\n- B.S. in Computer Science\n\nThe University of Tokyo (2025)\n- Completed coursework prior to transferring to the U.S.\n\nShogi (Japanese chess): Amateur 4-dan\nChess.com rating: 2000+\n\nFocus Areas:\nReimagining the Digital Experience:\nSolving Tech-driven Problems with Art, Logic & Creativity\n- Artificial Intelligence, Human-AI collaboration\n- Unexplored ideas, Creative design\n",
    profileLinks: "Links",
    contactHeading: "Contact"
  },
  ja: {
    navProfile: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB",
    navWorks: "\u4F5C\u54C1",
    navContact: "\u304A\u554F\u3044\u5408\u308F\u305B",
    heroButton: "\u4F5C\u54C1\u3092\u898B\u308B",
    worksHeading: "\u4F5C\u54C1",
    comingSoon: "\u6E96\u5099\u4E2D...",
    profileHeading: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB",
    profileBio: "\u677E\u7530\u98AF\u592A\n\n\u30ED\u30C1\u30A7\u30B9\u30BF\u30FC\u5927\u5B66 \u30B3\u30F3\u30D4\u30E5\u30FC\u30BF\u30B5\u30A4\u30A8\u30F3\u30B9\u5C02\u653B (2025 - \u73FE\u5728)\n\u6771\u4EAC\u5927\u5B66\u5728\u7C4D (2025)\n\n\u5C06\u68CB\u30A2\u30DE\u30C1\u30E5\u30A2\u56DB\u6BB5\nChess.com \u30EC\u30FC\u30C6\u30A3\u30F3\u30B0 2000+\n\n\u5C02\u9580\u8AB2\u984C\n\u30C7\u30B8\u30BF\u30EB\u7A7A\u9593\u3092\u518D\u5B9A\u7FA9:\n\u6280\u8853\u304C\u751F\u3093\u3060\u554F\u984C\u3092\u3001\u30A2\u30FC\u30C8\u30FB\u8AD6\u7406\u30FB\u5275\u9020\u6027\u3067\u89E3\u6C7A\u3059\u308B\n- \u4EBA\u5DE5\u77E5\u80FD\u3001\u4EBA\u9593\u3068AI\u306E\u30B3\u30E9\u30DC\u30EC\u30FC\u30B7\u30E7\u30F3\n- \u672A\u958B\u62D3\u306E\u30A2\u30A4\u30C7\u30A2\u3001\u30AF\u30EA\u30A8\u30A4\u30C6\u30A3\u30D6\u30C7\u30B6\u30A4\u30F3",
    profileLinks: "\u30EA\u30F3\u30AF",
    contactHeading: "\u304A\u554F\u3044\u5408\u308F\u305B"
  }
};
const LangContext = createContext("en");
function useLang() {
  return useContext(LangContext);
}
function t(lang, key) {
  return STRINGS[lang][key] || STRINGS.en[key] || key;
}
const PROJECTS = [
  {
    title: { en: "Word Vector Explorer", ja: "\u5358\u8A9E\u30D9\u30AF\u30C8\u30EB\u30A8\u30AF\u30B9\u30D7\u30ED\u30FC\u30E9\u30FC" },
    src: "assets/screenshots/words.png",
    link: "https://words.sotamatsuda.com",
    description: {
      en: "Discover how words relate to each other through vector space.",
      ja: "\u30D9\u30AF\u30C8\u30EB\u7A7A\u9593\u3067\u5358\u8A9E\u306E\u95A2\u4FC2\u3092\u767A\u898B"
    }
  }
];
const ARTWORK = [
  { title: { en: "Artwork 1", ja: "\u4F5C\u54C1 1" }, src: null, description: { en: "A description of this artwork.", ja: "\u3053\u306E\u4F5C\u54C1\u306E\u8AAC\u660E\u3002" } },
  { title: { en: "Artwork 2", ja: "\u4F5C\u54C1 2" }, src: null, description: { en: "A description of this artwork.", ja: "\u3053\u306E\u4F5C\u54C1\u306E\u8AAC\u660E\u3002" } },
  { title: { en: "Artwork 3", ja: "\u4F5C\u54C1 3" }, src: null, description: { en: "A description of this artwork.", ja: "\u3053\u306E\u4F5C\u54C1\u306E\u8AAC\u660E\u3002" } },
  { title: { en: "Artwork 4", ja: "\u4F5C\u54C1 4" }, src: null, description: { en: "A description of this artwork.", ja: "\u3053\u306E\u4F5C\u54C1\u306E\u8AAC\u660E\u3002" } },
  { title: { en: "Artwork 5", ja: "\u4F5C\u54C1 5" }, src: null, description: { en: "A description of this artwork.", ja: "\u3053\u306E\u4F5C\u54C1\u306E\u8AAC\u660E\u3002" } },
  { title: { en: "Artwork 6", ja: "\u4F5C\u54C1 6" }, src: null, description: { en: "A description of this artwork.", ja: "\u3053\u306E\u4F5C\u54C1\u306E\u8AAC\u660E\u3002" } }
];
const GITHUB_URL = "https://github.com/sotamatsuda19";
function GitHubIcon({ className = "w-5 h-5" }) {
  return /* @__PURE__ */ React.createElement("svg", { className, viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" }));
}
function ArrowDownIcon({ className = "w-5 h-5" }) {
  return /* @__PURE__ */ React.createElement("svg", { className, fill: "none", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor" }, /* @__PURE__ */ React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" }));
}
function ExternalLinkIcon({ className = "w-4 h-4" }) {
  return /* @__PURE__ */ React.createElement("svg", { className, fill: "none", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor" }, /* @__PURE__ */ React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" }));
}
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
function getRoute() {
  const hash = location.hash.replace("#", "");
  if (hash === "works" || hash === "profile" || hash === "contact") {
    return { page: hash };
  }
  return { page: "home" };
}
function LangToggle({ lang, setLang }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setLang(lang === "en" ? "ja" : "en"),
      className: "rounded-lg border border-black/20 px-2 py-1 text-xs font-semibold text-black/60 transition hover:text-black hover:border-black/40",
      "aria-label": "Toggle language"
    },
    lang === "en" ? "\u65E5\u672C\u8A9E" : "EN"
  );
}
function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { label: t(lang, "navProfile"), href: "#profile" },
    { label: t(lang, "navWorks"), href: "#works" },
    { label: t(lang, "navContact"), href: "#contact" }
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
  return /* @__PURE__ */ React.createElement(
    "nav",
    {
      className: `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled || menuOpen ? "bg-white shadow-glow" : "bg-transparent"}`
    },
    /* @__PURE__ */ React.createElement("div", { className: "mx-auto flex max-w-5xl items-center justify-between px-6 py-4" }, /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "#",
        className: "font-display text-xl font-bold text-black"
      },
      "SotaMatsuda"
    ), /* @__PURE__ */ React.createElement("div", { className: "hidden sm:flex items-center gap-6" }, navLinks.map((link) => /* @__PURE__ */ React.createElement(
      "a",
      {
        key: link.href,
        href: link.href,
        className: "text-sm font-medium text-black/60 transition hover:text-black"
      },
      link.label
    )), /* @__PURE__ */ React.createElement(LangToggle, { lang, setLang })), /* @__PURE__ */ React.createElement("div", { className: "flex sm:hidden items-center gap-2" }, /* @__PURE__ */ React.createElement(LangToggle, { lang, setLang }), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "p-2 text-black/60 transition hover:text-black",
        onClick: () => setMenuOpen(!menuOpen),
        "aria-label": "Toggle menu"
      },
      /* @__PURE__ */ React.createElement("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor" }, menuOpen ? /* @__PURE__ */ React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" }))
    ))),
    menuOpen && /* @__PURE__ */ React.createElement("div", { className: "sm:hidden border-t border-black/10 bg-white px-6 py-4 flex flex-col gap-4" }, navLinks.map((link) => /* @__PURE__ */ React.createElement(
      "a",
      {
        key: link.href,
        href: link.href,
        className: "text-base font-medium text-black/60 transition hover:text-black"
      },
      link.label
    )))
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
    }, 4e3);
    return () => clearInterval(id);
  }, [images.length]);
  return /* @__PURE__ */ React.createElement("section", { className: "relative flex min-h-[50vh] items-center justify-center px-6 overflow-hidden" }, images.length > 0 && images.map((img, i) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: i,
      className: "hero-slide absolute inset-0",
      style: {
        backgroundImage: `url(${img.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: i === current ? 1 : 0,
        filter: "grayscale(100%)"
      }
    }
  )), images.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-white/60" }), /* @__PURE__ */ React.createElement("div", { className: "relative text-center" }, /* @__PURE__ */ React.createElement("h1", { className: "fade-in font-display text-6xl font-bold tracking-tight text-black sm:text-7xl" }, "SotaMatsuda"), /* @__PURE__ */ React.createElement("div", { className: "fade-in fade-in-delay-1 mt-8 flex items-center justify-center gap-4" }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "#works",
      className: "inline-flex items-center gap-2 rounded-2xl border border-black/20 px-6 py-3 text-base font-semibold text-black transition hover:bg-black/5"
    },
    t(lang, "heroButton")
  )), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "#works",
      className: "fade-in fade-in-delay-3 mt-16 inline-block animate-bounce text-black/30",
      "aria-label": "Scroll down"
    },
    /* @__PURE__ */ React.createElement(ArrowDownIcon, { className: "w-6 h-6" })
  )));
}
function Card({ item }) {
  const lang = useLang();
  if (!item.src && !item.link) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "overflow-hidden rounded-2xl bg-white shadow-glow" }, item.src && /* @__PURE__ */ React.createElement("div", { className: "aspect-[4/3] w-full overflow-hidden bg-gray-100" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: item.src,
      alt: item.title[lang],
      className: "h-full w-full object-cover"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "p-4" }, /* @__PURE__ */ React.createElement("h3", { className: "font-display text-lg font-bold text-black" }, item.title[lang]), /* @__PURE__ */ React.createElement("p", { className: "mt-1 text-sm text-black/50 line-clamp-2" }, item.description[lang]), item.link && /* @__PURE__ */ React.createElement(
    "a",
    {
      href: item.link,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "mt-3 inline-flex items-center gap-1 text-sm font-semibold text-black/70 hover:text-black transition"
    },
    "View Project ",
    /* @__PURE__ */ React.createElement(ExternalLinkIcon, { className: "w-3.5 h-3.5" })
  )));
}
function Works() {
  const lang = useLang();
  const headingRef = useScrollFadeIn();
  const hasContent = PROJECTS.some((p) => p.src || p.link) || ARTWORK.some((a) => a.src);
  return /* @__PURE__ */ React.createElement("section", { id: "works", className: "px-6 py-24" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-5xl" }, /* @__PURE__ */ React.createElement("div", { ref: headingRef, className: "mb-12 text-center" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-4xl font-bold text-black sm:text-5xl" }, t(lang, "worksHeading"))), hasContent ? /* @__PURE__ */ React.createElement("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" }, PROJECTS.map((project, i) => /* @__PURE__ */ React.createElement(Card, { key: `project-${i}`, item: project })), ARTWORK.map((item, i) => /* @__PURE__ */ React.createElement(Card, { key: `artwork-${i}`, item }))) : /* @__PURE__ */ React.createElement("p", { className: "text-center text-lg text-black/40" }, t(lang, "comingSoon"))));
}
function Profile() {
  const lang = useLang();
  const headingRef = useScrollFadeIn();
  return /* @__PURE__ */ React.createElement("section", { id: "profile", className: "px-6 py-24" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-3xl" }, /* @__PURE__ */ React.createElement("div", { ref: headingRef, className: "mb-12 text-center" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-4xl font-bold text-black sm:text-5xl" }, t(lang, "profileHeading"))), /* @__PURE__ */ React.createElement("div", { className: "overflow-hidden rounded-3xl bg-white p-8 shadow-glow sm:p-12" }, /* @__PURE__ */ React.createElement("p", { className: "text-lg leading-relaxed text-black/70 whitespace-pre-line" }, t(lang, "profileBio"))), /* @__PURE__ */ React.createElement("div", { className: "mt-6 overflow-hidden rounded-3xl bg-white p-8 shadow-glow sm:p-12" }, /* @__PURE__ */ React.createElement("h3", { className: "font-display text-xl font-bold text-black mb-4" }, t(lang, "profileLinks")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-3" }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: GITHUB_URL,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-base font-semibold text-white transition hover:bg-black/80"
    },
    /* @__PURE__ */ React.createElement(GitHubIcon, null),
    "GitHub",
    /* @__PURE__ */ React.createElement(ExternalLinkIcon, null)
  ), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://note.com/sota_matsuda",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-base font-semibold text-white transition hover:bg-black/80"
    },
    "note",
    /* @__PURE__ */ React.createElement(ExternalLinkIcon, null)
  )))));
}
function Contact() {
  const lang = useLang();
  const headingRef = useScrollFadeIn();
  return /* @__PURE__ */ React.createElement("section", { id: "contact", className: "px-6 py-24" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-3xl" }, /* @__PURE__ */ React.createElement("div", { ref: headingRef, className: "mb-12 text-center" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-4xl font-bold text-black sm:text-5xl" }, t(lang, "contactHeading"))), /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "mailto:sotamatsuda19@gmail.com",
      className: "text-lg font-medium text-black/70 transition hover:text-black"
    },
    "sotamatsuda19@gmail.com"
  ))));
}
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
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: lang }, /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-white font-body text-black" }, /* @__PURE__ */ React.createElement(Navbar, { lang, setLang }), route.page === "home" && /* @__PURE__ */ React.createElement(Hero, null), route.page === "works" && /* @__PURE__ */ React.createElement(Works, null), route.page === "profile" && /* @__PURE__ */ React.createElement(Profile, null), route.page === "contact" && /* @__PURE__ */ React.createElement(Contact, null)));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
