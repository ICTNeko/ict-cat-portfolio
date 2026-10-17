import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, PROFILE_TIMELINE, BOOKS, COLLABORATIVE_BOOKS, YOUTUBE_VIDEOS, SERVICES, PORTFOLIO_ITEMS, KINDED_EVENTS, NEWS_ITEMS } from "../../../shared/const";
import { Youtube, Mail, Menu, X, ChevronRight, Send, CheckCircle2, Calendar, MapPin, ArrowUpRight, Bookmark, Leaf, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"own" | "collab">("own");
  const [currentSection, setCurrentSection] = useState("00");
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const { theme, toggleTheme } = useTheme();

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const bookmarkY = useTransform(smoothProgress, [0, 1], ["-40%", "40%"]);

  const sections = ["hero", "profile", "news", "books", "youtube", "kinded", "design", "services", "contact-form"];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const triggerHaptic = useCallback((pattern: number | number[] = 10) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  const playPageFlip = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      triggerHaptic(15);
      playPageFlip();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 300) {
          setCurrentSection(String(i).padStart(2, "0"));
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "News", en: "Updates", href: "#news", id: "news" },
    { name: "書棚", en: "Archive", href: "#books", id: "books" },
    { name: "デザイン実績", en: "Portfolio", href: "#design", id: "design" },
    { name: "研究会", en: "Group", href: "#kinded", id: "kinded" },
    { name: "映像", en: "Studio", href: "#youtube", id: "youtube" },
    { name: "相談", en: "Inquiry", href: "#contact-form", id: "contact-form" },
  ];

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    triggerHaptic([20, 10, 20]);
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const category = String(form.get("category") ?? "お問い合わせ");
    const message = String(form.get("message") ?? "");
    const subject = `KindEd・ICTのねこへの${category}`;
    const body = `お名前：${name}\n返信先：${email}\nご相談内容：${category}\n\nお問い合わせ内容：\n${message}`;
    window.location.href = `mailto:neyrateacher@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/10 overflow-x-hidden relative">
      {/* Audio Element for Page Flip */}
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3" preload="auto" />
      
      {/* Komorebi Light & Shadow Overlay */}
      <div className="komorebi-overlay"></div>

      {/* Wooden Floating Bookmark */}
      <motion.div 
        style={{ y: bookmarkY }}
        className="fixed right-8 top-1/2 z-[100] hidden xl:flex flex-col items-center group cursor-pointer"
        onClick={() => scrollToSection(sections[parseInt(currentSection)])}
        onMouseEnter={() => triggerHaptic(5)}
      >
        <div className="relative flex flex-col items-center">
          {/* Oak Bookmark */}
          <div className="w-6 h-36 wood-gradient shadow-2xl relative flex flex-col items-center pt-8 border-[0.5px] border-black/5 rounded-t-sm">
            <span className="text-[9px] font-black font-display italic text-primary tracking-widest vertical-text">{currentSection}</span>
            <div className="absolute -bottom-3 left-0 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[#b89c6d]"></div>
          </div>
          {/* Label */}
          <div className="absolute -left-28 top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none whitespace-nowrap">
            <span className="bg-primary/90 text-white text-[8px] font-bold uppercase tracking-[0.4em] px-3 py-2 rounded-full shadow-xl flex items-center gap-2">
              <Leaf size={8} className="text-accent" /> 章をひらく
            </span>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className={`fixed top-0 z-50 w-full transition-all duration-1000 ${scrolled ? "bg-background/80 backdrop-blur-md py-4 border-b border-border/30 shadow-sm" : "bg-transparent py-8"}`}>
        <div className="container-custom flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => { triggerHaptic(10); scrollToSection("hero"); }}
          >
            <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center border border-primary/10 group-hover:bg-primary/10 transition-colors">
              <img src={SITE_CONFIG.assets.logo} alt="Logo" className="w-6 h-6 opacity-80" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight font-serif italic leading-none text-primary">ICTのねこ</span>
              <span className="text-[7px] font-bold uppercase tracking-[0.5em] text-accent mt-1">Komorebi Editorial Cafe</span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                className="flex flex-col items-center group relative"
              >
                <span className="text-[10px] font-bold tracking-[0.1em] group-hover:text-primary transition-colors">{link.name}</span>
                <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-muted-foreground group-hover:text-accent transition-colors mt-1 font-display italic">{link.en}</span>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></span>
              </a>
            ))}
            <Button 
              onClick={() => scrollToSection("contact-form")}
              variant="outline" size="sm" className="btn-cafe py-4 px-10 border-primary/10 text-primary hover:border-primary">
              Contact
            </Button>
            {toggleTheme && (
              <button
                type="button"
                aria-label={theme === "dark" ? "ライトモードに切り替える" : "ダークモードに切り替える"}
                onClick={() => { triggerHaptic(10); toggleTheme(); }}
                className="rounded-full border border-primary/10 p-3 text-primary transition-colors hover:border-primary hover:bg-primary/5"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-primary hover:text-primary transition-colors"
            onClick={() => { triggerHaptic(10); setIsMenuOpen(!isMenuOpen); }}
          >
            {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-xl pt-32 px-12"
          >
            <div className="flex flex-col space-y-10">
              {navLinks.map((link, i) => (
                <motion.a 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => { e.preventDefault(); triggerHaptic(15); scrollToSection(link.id); setIsMenuOpen(false); }}
                  className="flex flex-col border-l-2 border-primary/5 pl-8"
                >
                  <span className="text-4xl font-black tracking-tight font-serif italic text-primary">{link.name}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mt-2 font-display italic">{link.en}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="mb-10 flex items-center justify-center lg:justify-start gap-4">
                <span className="section-number">00</span>
                <div className="cafe-line w-16"></div>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Komorebi</span>
              </div>
              <h1 className="mb-10 text-5xl md:text-7xl xl:text-9xl font-black leading-[1.1] tracking-tight font-serif italic text-primary">
                Learning<br />
                <span className="text-accent not-italic">Editorial.</span>
              </h1>
              <div className="mb-12 max-w-xl mx-auto lg:mx-0 border-l-2 border-accent/20 pl-8 italic">
                <p className="text-lg md:text-xl leading-relaxed text-primary font-black mb-6">
                  19冊の著書と多数のベストセラー実績。<br />
                  「伝える」をデザインする、教育と出版の表現者。
                </p>

              </div>
              <div className="flex flex-col sm:flex-row gap-10 items-center justify-center lg:justify-start">
                <Button 
                  onClick={() => scrollToSection("books")}
                  size="lg" className="btn-cafe bg-primary text-white hover:bg-primary/90">
                  書棚をひらく
                </Button>
                <a 
                  href="#design" 
                  onClick={(e) => { e.preventDefault(); scrollToSection("design"); }}
                  className="group flex flex-col items-start gap-1"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                    デザイン実績を見る <ArrowUpRight size={12} className="opacity-40" />
                  </span>
                  <div className="h-[1px] w-full bg-primary/10 group-hover:bg-accent transition-colors"></div>
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
              className="flex-1 relative w-full flex justify-center lg:justify-end"
            >
              <div className="relative z-10 w-full max-w-[520px] hero-shelf-frame">
                <div className="hero-shelf-label">
                  <span>SELECTED CATALOG</span>
                  <span>ICT / 2026</span>
                </div>
                <div className="hero-shelf-stage">
                  {BOOKS.slice(0, 3).map((book, index) => (
                    <a
                      key={book.title}
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => triggerHaptic(10)}
                      className={`hero-cover hero-cover-${index} group/hero-cover`}
                    >
                      <img src={book.image ?? ""} alt={`${book.title} 表紙`} />
                      <span className="hero-cover-tag">{String(index + 1).padStart(2, "0")}</span>
                    </a>
                  ))}
                </div>
                <div className="hero-shelf-caption">
                  <span>本と学びを、デザインする。</span>
                  <span className="font-display italic">A quiet shelf of ideas</span>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-24 bg-secondary/10 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center md:text-left">
              <div className="mb-8 flex items-center justify-center md:justify-start gap-4">
                <span className="section-number">01</span>
                <div className="cafe-line w-16"></div>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Profile</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black font-serif italic text-primary mb-4">Profile</h2>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl italic border-l-2 border-accent/20 pl-6 mx-auto md:mx-0">
                教育・出版・デザインをつなぐ、これまでの活動の記録。
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-16 items-start">
              <div className="w-full md:w-1/3">
                <div className="aspect-square bg-primary/5 rounded-full flex items-center justify-center border border-primary/10 relative overflow-hidden grayscale">
                  <img src={SITE_CONFIG.assets.logo} alt="Profile" className="w-1/2 h-1/2 opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent"></div>
                </div>
                <div className="mt-8 text-center md:text-left">
                  <h3 className="text-2xl font-black font-serif italic text-primary">{SITE_CONFIG.author}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mt-2">Social Educationist</p>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="cafe-memo">
                  <div className="flex items-center gap-2 mb-6">
                    <Leaf size={12} className="text-accent opacity-60" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Profile / 経歴</span>
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground font-medium italic mb-8">
                    {SITE_CONFIG.bio}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/70 border border-primary/10 px-4 py-2">Kindle 16 Volumes</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/70 border border-primary/10 px-4 py-2">Bestseller Author</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/70 border border-primary/10 px-4 py-2">Social Educationist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 md:mt-32">
            <div className="mb-12 flex items-end justify-between gap-6 border-b border-primary/20 pb-6">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent mb-3">Selected Timeline</p>
                <h3 className="text-3xl md:text-4xl font-black font-serif italic text-primary">出版と活動の歩み</h3>
              </div>
              <span className="hidden md:block text-[9px] font-bold tracking-[0.25em] text-primary/70">A QUIET RECORD OF MAKING</span>
            </div>
            <div className="profile-timeline">
              {PROFILE_TIMELINE.map((item, index) => (
                <motion.article
                  key={`${item.year}-${item.title}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.06 }}
                  className="profile-timeline-item"
                >
                  <div className="profile-timeline-marker" aria-hidden="true">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="profile-timeline-year">{item.year}</div>
                  <div className="profile-timeline-card">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-accent">{item.category}</span>
                      {index === PROFILE_TIMELINE.length - 1 && (
                        <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-2 py-1">Now</span>
                      )}
                    </div>
                    <h4 className="text-xl md:text-2xl font-black font-serif italic text-primary mb-3">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="section-padding bg-secondary/20 border-y border-border/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
          >
            <div>
              <div className="mb-8 flex items-center gap-4">
                <span className="section-number">02</span>
                <div className="cafe-line w-16"></div>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">News</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black font-serif italic text-primary">News</h2>
            </div>
            <p className="max-w-sm border-l-2 border-accent/20 pl-6 text-base leading-relaxed text-muted-foreground italic">
              出版とKindEdから届く、これからの予定。
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {NEWS_ITEMS.map((item, index) => (
              <motion.a
                key={`${item.date}-${item.title}`}
                href={item.link}
                target={item.link.startsWith("#") ? undefined : "_blank"}
                rel="noopener noreferrer"
                onClick={(event) => { if (item.link.startsWith("#")) { event.preventDefault(); scrollToSection(item.link.slice(1)); } triggerHaptic(10); }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="group rounded-sm border border-border/50 bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-accent">{item.date}</span>
                  <span className="rounded-full bg-primary/5 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.2em] text-primary">{item.category}</span>
                </div>
                <h3 className="mb-4 text-xl font-black font-serif italic leading-tight text-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <div className="mt-8 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-accent">
                  詳細を見る <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="section-padding relative border-t border-border/20">
        <div className="container-custom">
          <div className="mb-32 flex flex-col md:flex-row justify-between items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <div className="mb-8 flex items-center justify-center md:justify-start gap-4">
                <span className="section-number">03</span>
                <div className="cafe-line w-16"></div>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Bookshelf</span>
              </div>
              <h2 className="mb-6 text-4xl md:text-7xl font-black tracking-tight font-serif italic text-primary">Archive</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md italic border-l-2 border-accent/10 pl-6 mx-auto md:mx-0">
                現役教員の知見を編み直す、19冊のKindle本アーカイブ。
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="rounded-full bg-primary px-4 py-2 text-[10px] font-black tracking-[0.16em] text-primary-foreground">19 TITLES</span>
                <span className="text-[10px] font-bold tracking-[0.16em] text-accent">気になる表紙をクリック</span>
              </div>
            </motion.div>
            <div className="flex gap-10 border-b border-border/40 pb-4">
              <button 
                aria-label={`自著 ${BOOKS.length}冊を表示`}
                onClick={() => { triggerHaptic(10); setActiveTab("own"); }}
                className={`flex flex-col items-center group transition-all relative pb-2 ${activeTab === "own" ? "text-primary" : "text-muted-foreground/30 hover:text-foreground"}`}
              >
                <span className="text-[11px] font-bold tracking-[0.2em]">自著 <small className="ml-1 text-accent">{BOOKS.length}</small></span>
                <span className="text-[7px] font-bold uppercase tracking-[0.3em] mt-1 font-display italic">Personal</span>
                {activeTab === "own" && <motion.div layoutId="tab-cafe" className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />}
              </button>
              <button 
                aria-label={`共著 ${COLLABORATIVE_BOOKS.length}冊を表示`}
                onClick={() => { triggerHaptic(10); setActiveTab("collab"); }}
                className={`flex flex-col items-center group transition-all relative pb-2 ${activeTab === "collab" ? "text-primary" : "text-muted-foreground/30 hover:text-foreground"}`}
              >
                <span className="text-[11px] font-bold tracking-[0.2em]">共著 <small className="ml-1 text-accent">{COLLABORATIVE_BOOKS.length}</small></span>
                <span className="text-[7px] font-bold uppercase tracking-[0.3em] mt-1 font-display italic">Collective</span>
                {activeTab === "collab" && <motion.div layoutId="tab-cafe" className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />}
              </button>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {activeTab === "own" ? (
              <motion.div 
                key="own"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bookshelf-grid grid gap-x-10 gap-y-24 md:grid-cols-3"
              >
                {BOOKS.map((book, index) => (
                  <motion.div 
                    key={book.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex flex-col items-center"
                  >
                    <div 
                      className="book-card-frame w-[56%] sm:w-[48%] md:w-[65%] lg:w-[70%] aspect-[3/4] mb-8 shadow-xl border border-border/30 group-hover:-translate-y-2 group-hover:shadow-primary/10 transition-all duration-700 relative bg-[#faf7ee] p-3 md:p-4 rounded-sm overflow-hidden cursor-pointer"
                      onClick={() => { triggerHaptic(15); setSelectedBook(book); }}
                    >
                      <div className="w-full h-full overflow-hidden border border-border/10 shadow-inner rounded-sm bg-[#eee7d8]">
                        {book.image ? (
                          <img src={book.image} alt={`${book.title} 表紙`} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]" />
                        ) : (
                          <div className="book-cover-missing h-full w-full p-4 md:p-5 flex flex-col justify-between text-left">
                            <span className="text-[7px] font-bold uppercase tracking-[0.24em] text-accent">Cover file / {book.year}</span>
                            <span className="font-serif italic text-base md:text-lg leading-tight text-primary">{book.title}</span>
                            <span className="text-[7px] font-bold tracking-[0.12em] text-muted-foreground">表紙情報を確認中</span>
                          </div>
                        )}
                      </div>
                      <div className="book-spine-shadow" aria-hidden="true" />
                    </div>
                    
                    <div className="w-full px-4 text-center">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-accent font-display italic">{book.year}</span>
                        <div className="h-[1px] bg-border/40 w-8"></div>
                        <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-muted-foreground">{book.category}</span>
                      </div>
                      <h3 className="text-xl font-black tracking-tight leading-snug font-serif italic mb-8 group-hover:text-primary transition-colors min-h-[3rem] text-primary">{book.title}</h3>
                    </div>

                    <div className="w-full px-6">
                      <div 
                        className="cafe-memo w-full cursor-pointer"
                        onClick={() => { triggerHaptic(15); setSelectedBook(book); }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Leaf size={8} className="text-accent opacity-60" />
                          <span className="text-[7px] font-bold uppercase tracking-widest text-accent">選書メモ</span>
                        </div>
                        <p className="text-[10px] leading-relaxed text-muted-foreground font-medium italic">
                          教育の現場から生まれた言葉を、最も伝わりやすい形で編集しました。
                        </p>
                      </div>
                    </div>

                    <div className="w-full px-4 mt-8 text-center">
                      <a href={book.url} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="group/link inline-flex items-center gap-3 text-[8px] font-bold uppercase tracking-[0.3em] text-primary hover:text-accent transition-all">
                        書誌を見る <ArrowUpRight size={10} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 opacity-40" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="collab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap justify-center gap-x-12 gap-y-24"
              >
                {COLLABORATIVE_BOOKS.map((book, index) => (
                  <motion.div
                    key={book.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative w-[160px] sm:w-[200px]"
                  >
                    <div 
                      className="relative w-full aspect-[3/4] cursor-pointer shadow-lg group-hover:shadow-2xl transition-all duration-500 rounded-sm overflow-hidden border border-border/20"
                      style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
                      onClick={() => { triggerHaptic(15); setSelectedBook(book); }}
                    >
                      {book.image ? (
                        <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#fdfcf8] p-4 text-center border border-primary/5">
                          <Leaf className="text-accent/20 mb-2" size={16} />
                          <span className="text-[8px] font-serif italic text-primary leading-tight">{book.title}</span>
                          <div className="mt-4 text-[6px] font-bold uppercase tracking-widest text-accent/70">No Image</div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="mt-6 text-center">
                      <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-accent block mb-2">{book.year}</span>
                      <h4 className="text-xs font-black font-serif italic text-primary leading-tight line-clamp-2 min-h-[2rem]">{book.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-20 flex flex-col items-center justify-center gap-5 border-t border-border/30 pt-10 text-center">
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">読んでみたい一冊が見つかったら、表紙または「書誌を見る」からAmazonの商品ページへ。購入前に内容・価格をご確認ください。</p>
            <a href={SITE_CONFIG.links.amazon_author} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-[10px] font-black tracking-[0.2em] text-accent-foreground shadow-lg transition-transform hover:-translate-y-1">著者ページで19冊を見る <ArrowUpRight size={13} /></a>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section id="youtube" className="section-padding bg-secondary/30 border-y border-border/20">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 text-center"
          >
            <div className="mb-8 flex items-center justify-center gap-4">
              <div className="cafe-line w-16"></div>
                <span className="section-number">04</span>
              <div className="cafe-line w-16"></div>
            </div>
            <h2 className="mb-6 text-4xl md:text-7xl font-black tracking-tight font-serif italic text-primary">Studio</h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed italic border-t border-border/40 pt-10">
              AI活用と業務効率化を、未来の古典として映像に刻む。
            </p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 justify-items-center">
            {YOUTUBE_VIDEOS.map((video, index) => (
              <motion.a 
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic(10)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group block w-full max-w-[224px]"
              >
                <div className="relative aspect-video overflow-hidden mb-5 shadow-lg border border-border/20 group-hover:-translate-y-1 group-hover:shadow-primary/10 transition-all duration-700 bg-[#faf7ee] p-2 rounded-sm">
                  <div className="w-full h-full overflow-hidden rounded-sm">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Youtube size={20} className="text-white opacity-80" />
                  </div>
                </div>
                <h3 className="font-bold text-[9px] leading-relaxed group-hover:text-primary transition-colors line-clamp-2 px-2 tracking-wider text-center italic border-t border-border/10 pt-4 text-primary">{video.title}</h3>
              </motion.a>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <a href={SITE_CONFIG.links.youtube} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="btn-cafe inline-flex items-center gap-6 px-16 border-primary/10 text-primary">
              映像アーカイブ <ArrowUpRight size={14} className="opacity-40" />
            </a>
          </div>
        </div>
      </section>

      {/* KindEd Section */}
      <section id="kinded" className="section-padding relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-10 flex items-center gap-4">
                <span className="section-number">05</span>
                <div className="cafe-line w-16"></div>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Group</span>
              </div>
              <div className="mb-12 flex items-center gap-8">
                <img src={SITE_CONFIG.assets.kinded_mark} alt="KindEd Logo" className="h-20 w-20 grayscale opacity-70" />
                <div className="border-l border-border/40 pl-8">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight font-serif italic leading-none text-primary">KindEd</h2>
                  <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-accent mt-3 font-display italic">Hosted by ICTのねこ</p>
                </div>
              </div>
              <p className="text-lg md:text-xl leading-relaxed mb-16 text-muted-foreground font-medium italic border-l-2 border-accent/10 pl-10">
                著者が主催する、教員の「書く」と「学ぶ」を支援するコミュニティ。<br />
                教育実践知を研究・編集し、社会へ届ける活動を「KindEd」として展開しています。
              </p>
              <div className="space-y-12 mb-20">
                {KINDED_EVENTS.map((event) => (
                  <div key={event.title} className="group border-b border-border/20 pb-10">
                    <div className="flex items-center gap-4 text-[9px] font-bold mb-6 text-primary uppercase tracking-[0.4em]">
                      <Leaf size={10} className="text-accent opacity-60" /> {event.date}
                    </div>
                    <h3 className="text-2xl font-black mb-6 font-serif italic group-hover:text-primary transition-colors leading-tight text-primary">{event.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[9px] opacity-70 font-bold uppercase tracking-[0.1em]">
                        <MapPin size={12} /> {event.venue}
                      </div>
                      <a href={event.link} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent hover:text-primary transition-colors flex items-center gap-3">
                        詳細を見る <ArrowUpRight size={14} className="opacity-40" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-10">
                <Button asChild size="lg" className="btn-cafe bg-primary text-white hover:bg-primary/90">
                  <a href={SITE_CONFIG.links.kinded} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)}>KindEdを訪ねる</a>
                </Button>
                <a 
                  href="#contact-form" 
                  onClick={(e) => { e.preventDefault(); scrollToSection("contact-form"); }}
                  className="group flex flex-col items-start gap-1"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                    講座を依頼する <ArrowUpRight size={12} className="opacity-40" />
                  </span>
                  <div className="h-[1px] w-full bg-primary/10 group-hover:bg-accent transition-colors"></div>
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.99 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative flex justify-center items-center"
            >
              <div className="relative z-10 w-full max-w-[450px] aspect-[4/5] bg-white shadow-xl border border-border/30 p-8 md:p-12 rounded-lg overflow-hidden">
                <div className="w-full h-full overflow-hidden relative rounded-md border border-border/10">
                  <img src={SITE_CONFIG.assets.hero} alt="Collective" className="w-full h-full object-cover grayscale opacity-30 contrast-[1.2]" />
                  <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                    <p className="text-3xl md:text-5xl font-serif italic font-black leading-tight text-primary">
                      「一人では見つけにくいことも、<br />
                      <span className="text-accent italic underline decoration-[1px] underline-offset-[15px]">対話の中で</span>少しずつ見えてくる。」
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Portfolio Section */}
      <section id="design" className="section-padding bg-background border-t border-border/20">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 flex flex-col md:flex-row justify-between items-center gap-12 border-b border-border/20 pb-16"
          >
            <div className="text-center md:text-left">
              <div className="mb-8 flex items-center justify-center md:justify-start gap-4">
                <span className="section-number">06</span>
                <div className="cafe-line w-16"></div>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Design</span>
              </div>
              <h2 className="mb-6 text-4xl md:text-7xl font-black tracking-tight font-serif italic text-primary">Portfolio</h2>
              <div className="border-l-2 border-accent/10 pl-6 mx-auto md:mx-0 max-w-md">
                <p className="text-lg text-muted-foreground leading-relaxed italic mb-4">
                  「つい手に取りたくなる」を形に。<br />
                  Kindle出版を中心に、数多くの書籍デザインを手掛けています。
                </p>
                <div className="flex gap-4">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-primary/5 rounded-full text-primary border border-primary/10">Bestseller Designs</span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-primary/5 rounded-full text-primary border border-primary/10">Editorial Works</span>
                </div>
              </div>
            </div>
            <a href={SITE_CONFIG.links.coconala} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="group flex flex-col items-center md:items-end gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary group-hover:text-accent transition-colors flex items-center gap-3">
                実績を一覧する <ArrowUpRight size={14} className="opacity-40" />
              </span>
              <div className="h-[1px] w-full bg-primary/10 group-hover:bg-accent transition-colors"></div>
            </a>
          </motion.div>

          <div className="grid gap-12 gap-y-32 md:grid-cols-3 justify-items-center">
            {PORTFOLIO_ITEMS.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group w-full max-w-[300px]"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-10 shadow-xl border border-border/30 group-hover:shadow-primary/5 transition-all duration-700 bg-white p-6 md:p-8 rounded-sm">
                  <div className="w-full h-full overflow-hidden rounded-sm border border-border/10 shadow-inner">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                </div>
                <div className="px-4 text-center">
                  <div className="flex items-center gap-3 mb-6 justify-center">
                    <Leaf size={10} className="text-accent opacity-40" />
                    <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-accent font-display italic">{item.category}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-6 font-serif italic leading-tight group-hover:text-primary transition-colors text-primary">{item.title}</h3>
                </div>

                {/* Cafe Memo with Haptic */}
                <div className="px-4 w-full">
                  <div 
                    className="cafe-memo w-full cursor-pointer"
                    onClick={() => triggerHaptic(8)}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Leaf size={8} className="text-accent opacity-60" />
                      <span className="text-[7px] font-bold uppercase tracking-widest text-accent">デザインノート</span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-muted-foreground font-medium italic">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-secondary/20 relative border-y border-border/20">
        <div className="container-custom">
          <div className="mb-32 text-center">
            <div className="mb-8 flex items-center justify-center gap-4">
              <div className="cafe-line w-16"></div>
              <span className="section-number">07</span>
              <div className="cafe-line w-16"></div>
            </div>
            <h2 className="mb-6 text-4xl md:text-7xl xl:text-8xl font-black tracking-tight font-serif italic text-primary leading-none">Services</h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto italic pt-8 border-t border-border/30">
              出版からデザイン、研修まで。あなたの「伝える」を伴走サポート。
            </p>
          </div>
          
          <div className="grid gap-12 md:grid-cols-3">
            {SERVICES.map((service, index) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="h-full bg-white p-10 md:p-14 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-700 group relative overflow-hidden rounded-lg">
                  <div className="absolute top-0 right-0 w-[2px] h-full bg-accent/10 group-hover:bg-accent transition-colors duration-700"></div>
                  <div className="mb-10 w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-700 border border-primary/10">
                    <Leaf size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-black font-serif italic mb-6 tracking-tight leading-tight text-primary">{service.title}</h3>
                  <p className="text-muted-foreground mb-12 text-sm leading-relaxed font-medium border-l-2 border-border/20 pl-6 italic">{service.description}</p>
                  <div className="flex items-center justify-between border-t border-border/10 pt-8 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-1">Estimate</span>
                      <span className="text-xl font-black font-serif italic text-primary tracking-tight">{service.price}</span>
                    </div>
                    <a 
                      href={service.link} 
                      onClick={(e) => { if(service.link.startsWith("#")) { e.preventDefault(); scrollToSection(service.link.substring(1)); } else { triggerHaptic(10); } }}
                      target={service.link.startsWith("#") ? undefined : "_blank"} 
                      rel="noopener noreferrer" 
                      className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent hover:text-primary transition-colors flex items-center gap-3"
                    >
                      相談する <ChevronRight size={14} className="opacity-40" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="section-padding relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-white p-10 md:p-24 border border-border/50 shadow-2xl relative overflow-hidden rounded-xl">
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-primary/20"></div>
            
            <div className="mb-16 flex items-center gap-4">
              <span className="section-number">08</span>
              <div className="cafe-line w-16"></div>
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Inquiry</span>
            </div>
            
            <div className="mb-24 text-center md:text-left">
              <h2 className="mb-6 text-4xl md:text-8xl font-black tracking-tight font-serif italic leading-none text-primary">Contact</h2>
              <p className="text-xl text-muted-foreground italic max-w-md leading-relaxed border-l-2 border-accent/10 pl-10 mt-10 mx-auto md:mx-0">
                あなたの「想い」を、この場所でお聞かせください。
              </p>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/5 text-primary mb-10 border border-primary/10">
                  <CheckCircle2 size={48} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-black mb-6 font-serif italic text-primary">送信の準備ができました</h3>
                <p className="text-muted-foreground mb-12 text-lg max-w-sm mx-auto leading-relaxed italic">メールアプリが起動します。内容を確認し、送信してください。</p>
                <Button onClick={() => { triggerHaptic(10); setSubmitted(false); }} variant="outline" className="btn-cafe border-primary/10 hover:bg-primary hover:text-white px-16">
                  新しいお問い合わせ
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-16">
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="space-y-6">
                    <label htmlFor="name" className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Full Name</label>
                    <input type="text" id="name" name="name" required className="w-full bg-transparent border-b border-border/40 py-4 focus:border-primary outline-none transition-all font-medium text-lg placeholder:text-muted-foreground/50" placeholder="結月 汐音" />
                  </div>
                  <div className="space-y-6">
                    <label htmlFor="email" className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Email Address</label>
                    <input type="email" id="email" name="email" required className="w-full bg-transparent border-b border-border/40 py-4 focus:border-primary outline-none transition-all font-medium text-lg placeholder:text-muted-foreground/50" placeholder="example@gmail.com" />
                  </div>
                </div>
                <div className="space-y-6">
                  <label htmlFor="category" className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Category</label>
                  <div className="relative">
                    <select id="category" name="category" className="w-full bg-transparent border-b border-border/40 py-4 focus:border-primary outline-none transition-all font-medium text-lg appearance-none cursor-pointer">
                      <option value="KindEd 講座・研修依頼">KindEd 講座・研修依頼</option>
                      <option value="Kindle出版サポート">Kindle出版サポート</option>
                      <option value="書籍表紙デザイン">書籍表紙デザイン</option>
                      <option value="その他のお問い合わせ">その他のお問い合わせ</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                      <ChevronRight size={20} strokeWidth={1} className="rotate-90" />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <label htmlFor="message" className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Message</label>
                  <textarea id="message" name="message" rows={4} required className="w-full bg-transparent border-b border-border/40 py-4 focus:border-primary outline-none transition-all font-medium text-lg resize-none placeholder:text-muted-foreground/50" placeholder="ご相談内容の詳細をご記入ください。"></textarea>
                </div>
                <div className="pt-12">
                  <Button type="submit" size="lg" className="btn-cafe w-full bg-primary text-white hover:bg-primary/90 shadow-xl py-10 text-xs tracking-[0.5em]">
                    <Send className="mr-6 h-5 w-5 opacity-60" /> 内容を送信する
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 bg-background border-t border-border/20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start gap-24">
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-4 cursor-pointer group" onClick={() => { triggerHaptic(10); scrollToSection("hero"); }}>
                <div className="w-8 h-8 bg-primary/5 rounded-full flex items-center justify-center border border-primary/10">
                  <img src={SITE_CONFIG.assets.logo} alt="Logo" className="w-5 h-5 opacity-60" />
                </div>
                <span className="text-3xl font-black tracking-tight font-serif italic leading-none text-primary">ICTのねこ</span>
              </div>
              <p className="text-xs text-muted-foreground/50 font-medium max-w-xs leading-relaxed tracking-[0.1em] italic border-l border-border/20 pl-8">
                学びを、もっと心地よく。現役教員作家・デザイナーとして、教育の未来を静かに創ります。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-24">
              <div className="flex flex-col gap-8">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Index</span>
                <div className="flex flex-col gap-5">
                  {navLinks.map(link => (
                    <a key={link.name} href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }} className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors text-primary">{link.name}</a>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Social</span>
                <div className="flex flex-col gap-5">
                  <a href={SITE_CONFIG.links.x} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors text-primary">X Archive</a>
                  <a href={SITE_CONFIG.links.youtube} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors text-primary">YouTube</a>
                  <a href={SITE_CONFIG.links.amazon_author} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors text-primary">Amazon</a>
                  <a href={SITE_CONFIG.links.email} onClick={() => triggerHaptic(10)} className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors text-primary">Mail</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-32 pt-16 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[9px] text-muted-foreground/30 font-bold uppercase tracking-[0.4em]">© 2026 ICTのねこ (結月汐音)</p>
            <div className="flex gap-12 text-[9px] text-muted-foreground/30 font-bold uppercase tracking-[0.2em]">
              <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12"
          >
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setSelectedBook(null)}></div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-background shadow-2xl overflow-hidden rounded-lg flex flex-col md:flex-row border border-border/50"
            >
              <button 
                className="absolute top-6 right-6 z-10 p-2 bg-background/50 backdrop-blur-sm rounded-full hover:bg-primary hover:text-white transition-all"
                onClick={() => setSelectedBook(null)}
              >
                <X size={20} />
              </button>
              
              <div className="w-full md:w-[40%] bg-[#faf7ee] p-12 flex items-center justify-center relative overflow-hidden">
                <div className="komorebi-overlay opacity-10"></div>
                <div className="relative z-10 w-full aspect-[3/4] shadow-2xl border-4 border-white rounded-sm overflow-hidden">
                  {selectedBook.image ? (
                    <img src={selectedBook.image} alt={selectedBook.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f0ead6] to-[#e6dfcc] p-8 text-center">
                      <Leaf className="text-accent/70 mb-4" size={32} />
                      <span className="text-xs font-serif italic text-primary/70">{selectedBook.title}</span>
                      <div className="mt-6 text-[8px] font-bold uppercase tracking-widest text-accent/40">No Image Available</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-full md:w-[60%] p-12 md:p-16 flex flex-col">
                <div className="mb-10 flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">{selectedBook.year}</span>
                  <div className="w-1 h-1 bg-accent/30 rounded-full"></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60">{selectedBook.category}</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-black font-serif italic mb-6 leading-tight text-primary">
                  {selectedBook.title}
                </h2>
                
                {selectedBook.subtitle && (
                  <p className="text-lg text-accent font-bold mb-8 italic">{selectedBook.subtitle}</p>
                )}
                
                {selectedBook.authors && (
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-10">
                    Author: <span className="text-primary">{selectedBook.authors}</span>
                  </p>
                )}
                
                <div className="flex-1">
                  <div className="cafe-memo mb-12">
                    <p className="text-sm leading-relaxed text-muted-foreground italic">
                      {selectedBook.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 mt-auto">
                  <Button 
                    asChild
                    className="btn-cafe bg-primary text-white hover:bg-primary/90 flex-1 py-6"
                  >
                    <a href={selectedBook.url} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(15)}>
                      Amazonで詳しく見る
                    </a>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedBook(null)}
                    className="btn-cafe border-primary/10 text-primary hover:border-primary flex-1 py-6"
                  >
                    閉じる
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
