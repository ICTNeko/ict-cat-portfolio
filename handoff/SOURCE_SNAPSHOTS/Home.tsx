import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, BOOKS, COLLABORATIVE_BOOKS, YOUTUBE_VIDEOS, SERVICES, PORTFOLIO_ITEMS, KINDED_EVENTS } from "../../../shared/const";
import { Youtube, Mail, Menu, X, ChevronRight, Send, CheckCircle2, Calendar, MapPin, ArrowUpRight, Bookmark, Leaf } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"own" | "collab">("own");
  const [currentSection, setCurrentSection] = useState("00");

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const bookmarkY = useTransform(smoothProgress, [0, 1], ["-40%", "40%"]);

  const sections = ["hero", "books", "youtube", "kinded", "design", "services", "contact-form"];
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
    { name: "書棚", en: "Archive", href: "#books", id: "books" },
    { name: "装丁", en: "Design", href: "#design", id: "design" },
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
            <span className="text-[9px] font-black font-display italic text-primary/60 tracking-widest vertical-text">{currentSection}</span>
            <div className="absolute -bottom-3 left-0 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[#b89c6d]"></div>
          </div>
          {/* Label */}
          <div className="absolute -left-28 top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none whitespace-nowrap">
            <span className="bg-primary/90 text-white text-[8px] font-bold uppercase tracking-[0.4em] px-3 py-2 rounded-full shadow-xl flex items-center gap-2">
              <Leaf size={8} className="text-accent" /> Open Chapter
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
                <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 group-hover:text-accent transition-colors mt-1 font-display italic">{link.en}</span>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></span>
              </a>
            ))}
            <Button 
              onClick={() => scrollToSection("contact-form")}
              variant="outline" size="sm" className="btn-cafe py-4 px-10 border-primary/10 text-primary hover:border-primary">
              Contact
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-primary/60 hover:text-primary transition-colors"
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
              <p className="mb-12 max-w-xl mx-auto lg:mx-0 text-lg md:text-xl leading-relaxed text-muted-foreground/80 font-medium border-l-2 border-accent/20 pl-8 italic">
                {SITE_CONFIG.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-10 items-center justify-center lg:justify-start">
                <Button 
                  onClick={() => scrollToSection("books")}
                  size="lg" className="btn-cafe bg-primary text-white hover:bg-primary/90">
                  Explore Archive
                </Button>
                <a 
                  href="#design" 
                  onClick={(e) => { e.preventDefault(); scrollToSection("design"); }}
                  className="group flex flex-col items-start gap-1"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                    Design Works <ArrowUpRight size={12} className="opacity-40" />
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
              <div className="relative z-10 w-full max-w-[500px] aspect-[16/9] lg:aspect-[4/3] specimen-frame overflow-hidden">
                <img src={SITE_CONFIG.assets.hero} alt="Komorebi Cafe" className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
              </div>
              {/* Floating Element */}
              <div className="absolute -bottom-8 -left-8 z-20 bg-white p-8 md:p-12 shadow-2xl rounded-lg border border-border/30 hidden sm:block">
                <div className="text-6xl font-black font-display italic text-primary leading-none tracking-tighter">16<span className="text-2xl not-italic ml-1 text-accent">❦</span></div>
                <div className="text-[7px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60 mt-4 text-center border-t border-border/30 pt-3">Curated Volumes</div>
              </div>
            </motion.div>
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
                <span className="section-number">01</span>
                <div className="cafe-line w-16"></div>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Bookshelf</span>
              </div>
              <h2 className="mb-6 text-4xl md:text-7xl font-black tracking-tight font-serif italic text-primary">Archive</h2>
              <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-md italic border-l-2 border-accent/10 pl-6 mx-auto md:mx-0">
                現役教員の知見を編み直す、Kindle本アーカイブ。
              </p>
            </motion.div>
            <div className="flex gap-10 border-b border-border/40 pb-4">
              <button 
                onClick={() => { triggerHaptic(10); setActiveTab("own"); }}
                className={`flex flex-col items-center group transition-all relative pb-2 ${activeTab === "own" ? "text-primary" : "text-muted-foreground/30 hover:text-foreground"}`}
              >
                <span className="text-[11px] font-bold tracking-[0.2em]">自著</span>
                <span className="text-[7px] font-bold uppercase tracking-[0.3em] mt-1 font-display italic">Personal</span>
                {activeTab === "own" && <motion.div layoutId="tab-cafe" className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />}
              </button>
              <button 
                onClick={() => { triggerHaptic(10); setActiveTab("collab"); }}
                className={`flex flex-col items-center group transition-all relative pb-2 ${activeTab === "collab" ? "text-primary" : "text-muted-foreground/30 hover:text-foreground"}`}
              >
                <span className="text-[11px] font-bold tracking-[0.2em]">共著</span>
                <span className="text-[7px] font-bold uppercase tracking-[0.3em] mt-1 font-display italic">Collective</span>
                {activeTab === "collab" && <motion.div layoutId="tab-cafe" className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />}
              </button>
            </div>
          </div>
          
          <div className="grid gap-x-12 gap-y-32 md:grid-cols-3">
            <AnimatePresence mode="wait">
              {(activeTab === "own" ? BOOKS : COLLABORATIVE_BOOKS).map((book, index) => (
                <motion.div 
                  key={book.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex flex-col items-center"
                >
                  <div className="w-[60%] md:w-[75%] aspect-[3/4] mb-10 shadow-xl border border-border/30 group-hover:shadow-primary/5 transition-all duration-700 relative bg-white p-4 md:p-6 rounded-sm overflow-hidden">
                    <div className="w-full h-full overflow-hidden border border-border/10 shadow-inner rounded-sm">
                      <img src={book.image} alt={book.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    </div>
                  </div>
                  
                  <div className="w-full px-4 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-accent font-display italic">{book.year}</span>
                      <div className="h-[1px] bg-border/40 w-8"></div>
                      <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40">{book.category}</span>
                    </div>
                    <h3 className="text-xl font-black tracking-tight leading-snug font-serif italic mb-8 group-hover:text-primary transition-colors min-h-[3rem] text-primary">{book.title}</h3>
                  </div>

                  {/* Cafe Memo with Haptic */}
                  <div className="w-full px-6">
                    <div 
                      className="cafe-memo w-full cursor-pointer"
                      onClick={() => triggerHaptic(8)}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Leaf size={8} className="text-accent opacity-60" />
                        <span className="text-[7px] font-bold uppercase tracking-widest text-accent/60">Curator's Note</span>
                      </div>
                      <p className="text-[10px] leading-relaxed text-muted-foreground font-medium italic">
                        {activeTab === "own" 
                          ? "教育の現場から生まれた言葉を、最も伝わりやすい形で編集しました。"
                          : "共同制作による知の化学反応。多様な視点が重なり合う一冊です。"}
                      </p>
                    </div>
                  </div>

                  <div className="w-full px-4 mt-8 text-center">
                    <a href={book.url} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="group/link inline-flex items-center gap-3 text-[8px] font-bold uppercase tracking-[0.3em] text-primary hover:text-accent transition-all">
                      Details <ArrowUpRight size={10} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 opacity-40" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
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
              <span className="section-number">02</span>
              <div className="cafe-line w-16"></div>
            </div>
            <h2 className="mb-6 text-4xl md:text-7xl font-black tracking-tight font-serif italic text-primary">Studio</h2>
            <p className="text-lg text-muted-foreground/80 max-w-md mx-auto leading-relaxed italic border-t border-border/40 pt-10">
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
                className="group block w-full max-w-[280px]"
              >
                <div className="relative aspect-video overflow-hidden mb-6 shadow-lg border border-border/20 group-hover:shadow-primary/5 transition-all duration-700 bg-white p-2 rounded-sm">
                  <div className="w-full h-full overflow-hidden rounded-sm">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Youtube size={20} className="text-white opacity-80" />
                  </div>
                </div>
                <h3 className="font-bold text-[9px] leading-relaxed group-hover:text-primary transition-colors line-clamp-2 px-2 tracking-wider text-center italic border-t border-border/10 pt-4 text-primary/80">{video.title}</h3>
              </motion.a>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <a href={SITE_CONFIG.links.youtube} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="btn-cafe inline-flex items-center gap-6 px-16 border-primary/10 text-primary">
              Visit Channel <ArrowUpRight size={14} className="opacity-40" />
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
                <span className="section-number">03</span>
                <div className="cafe-line w-16"></div>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Group</span>
              </div>
              <div className="mb-12 flex items-center gap-8">
                <img src={SITE_CONFIG.assets.kinded_mark} alt="KindEd Logo" className="h-20 w-20 grayscale opacity-70" />
                <div className="border-l border-border/40 pl-8">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight font-serif italic leading-none text-primary">KindEd</h2>
                  <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-accent mt-3 font-display italic">Research Group</p>
                </div>
              </div>
              <p className="text-lg md:text-xl leading-relaxed mb-16 text-muted-foreground/80 font-medium italic border-l-2 border-accent/10 pl-10">
                教育実践知を研究・編集・発信し、社会へ届ける。未来の学びを共に創る知的共同体。
              </p>
              <div className="space-y-12 mb-20">
                {KINDED_EVENTS.map((event) => (
                  <div key={event.title} className="group border-b border-border/20 pb-10">
                    <div className="flex items-center gap-4 text-[9px] font-bold mb-6 text-primary uppercase tracking-[0.4em]">
                      <Leaf size={10} className="text-accent opacity-60" /> {event.date}
                    </div>
                    <h3 className="text-2xl font-black mb-6 font-serif italic group-hover:text-primary transition-colors leading-tight text-primary/90">{event.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[9px] opacity-40 font-bold uppercase tracking-[0.1em]">
                        <MapPin size={12} /> {event.venue}
                      </div>
                      <a href={event.link} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent hover:text-primary transition-colors flex items-center gap-3">
                        Join <ArrowUpRight size={14} className="opacity-40" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-10">
                <Button asChild size="lg" className="btn-cafe bg-primary text-white hover:bg-primary/90">
                  <a href={SITE_CONFIG.links.kinded} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)}>Official Site</a>
                </Button>
                <a 
                  href="#contact-form" 
                  onClick={(e) => { e.preventDefault(); scrollToSection("contact-form"); }}
                  className="group flex flex-col items-start gap-1"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                    Request Lecture <ArrowUpRight size={12} className="opacity-40" />
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
                    <p className="text-3xl md:text-5xl font-serif italic font-black leading-tight text-primary/80">
                      「一人じゃ難しいことも、<br />
                      <span className="text-accent italic underline decoration-[1px] underline-offset-[15px]">仲間となら</span>越えてゆける。」
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
                <span className="section-number">04</span>
                <div className="cafe-line w-16"></div>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Design</span>
              </div>
              <h2 className="mb-6 text-4xl md:text-7xl font-black tracking-tight font-serif italic text-primary">Portfolio</h2>
              <p className="text-lg text-muted-foreground/80 leading-relaxed italic border-l-2 border-accent/10 pl-6 mx-auto md:mx-0 max-w-md">
                想いを視覚化し、読者へ届ける装丁美。
              </p>
            </div>
            <a href={SITE_CONFIG.links.coconala} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="group flex flex-col items-center md:items-end gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary group-hover:text-accent transition-colors flex items-center gap-3">
                Full Portfolio <ArrowUpRight size={14} className="opacity-40" />
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
                  <h3 className="text-2xl font-black mb-6 font-serif italic leading-tight group-hover:text-primary transition-colors text-primary/90">{item.title}</h3>
                </div>

                {/* Cafe Memo with Haptic */}
                <div className="px-4 w-full">
                  <div 
                    className="cafe-memo w-full cursor-pointer"
                    onClick={() => triggerHaptic(8)}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Leaf size={8} className="text-accent opacity-60" />
                      <span className="text-[7px] font-bold uppercase tracking-widest text-accent/60">Creative Intent</span>
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
              <span className="section-number">05</span>
              <div className="cafe-line w-16"></div>
            </div>
            <h2 className="mb-6 text-4xl md:text-7xl xl:text-8xl font-black tracking-tight font-serif italic text-primary leading-none">Services</h2>
            <p className="text-lg text-muted-foreground/80 max-w-md mx-auto italic pt-8 border-t border-border/30">
              出版から装丁、研修まで。あなたの「伝える」を伴走サポート。
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
                  <p className="text-muted-foreground/80 mb-12 text-sm leading-relaxed font-medium border-l-2 border-border/20 pl-6 italic">{service.description}</p>
                  <div className="flex items-center justify-between border-t border-border/10 pt-8 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 mb-1">Estimate</span>
                      <span className="text-xl font-black font-serif italic text-primary tracking-tight">{service.price}</span>
                    </div>
                    <a 
                      href={service.link} 
                      onClick={(e) => { if(service.link.startsWith("#")) { e.preventDefault(); scrollToSection(service.link.substring(1)); } else { triggerHaptic(10); } }}
                      target={service.link.startsWith("#") ? undefined : "_blank"} 
                      rel="noopener noreferrer" 
                      className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent hover:text-primary transition-colors flex items-center gap-3"
                    >
                      Consult <ChevronRight size={14} className="opacity-40" />
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
              <span className="section-number">06</span>
              <div className="cafe-line w-16"></div>
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Inquiry</span>
            </div>
            
            <div className="mb-24 text-center md:text-left">
              <h2 className="mb-6 text-4xl md:text-8xl font-black tracking-tight font-serif italic leading-none text-primary">Contact</h2>
              <p className="text-xl text-muted-foreground/80 italic max-w-md leading-relaxed border-l-2 border-accent/10 pl-10 mt-10 mx-auto md:mx-0">
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
                <h3 className="text-3xl font-black mb-6 font-serif italic text-primary">Message Ready</h3>
                <p className="text-muted-foreground/80 mb-12 text-lg max-w-sm mx-auto leading-relaxed italic">メールアプリが起動します。内容を確認し、送信してください。</p>
                <Button onClick={() => { triggerHaptic(10); setSubmitted(false); }} variant="outline" className="btn-cafe border-primary/10 hover:bg-primary hover:text-white px-16">
                  New Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-16">
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="space-y-6">
                    <label htmlFor="name" className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Full Name</label>
                    <input type="text" id="name" name="name" required className="w-full bg-transparent border-b border-border/40 py-4 focus:border-primary outline-none transition-all font-medium text-lg placeholder:text-muted-foreground/10" placeholder="結月 汐音" />
                  </div>
                  <div className="space-y-6">
                    <label htmlFor="email" className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Email Address</label>
                    <input type="email" id="email" name="email" required className="w-full bg-transparent border-b border-border/40 py-4 focus:border-primary outline-none transition-all font-medium text-lg placeholder:text-muted-foreground/10" placeholder="example@gmail.com" />
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
                  <textarea id="message" name="message" rows={4} required className="w-full bg-transparent border-b border-border/40 py-4 focus:border-primary outline-none transition-all font-medium text-lg resize-none placeholder:text-muted-foreground/10" placeholder="ご相談内容の詳細をご記入ください。"></textarea>
                </div>
                <div className="pt-12">
                  <Button type="submit" size="lg" className="btn-cafe w-full bg-primary text-white hover:bg-primary/90 shadow-xl py-10 text-xs tracking-[0.5em]">
                    <Send className="mr-6 h-5 w-5 opacity-60" /> PREPARE MESSAGE
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
                    <a key={link.name} href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }} className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors text-primary/60">{link.name}</a>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Social</span>
                <div className="flex flex-col gap-5">
                  <a href={SITE_CONFIG.links.x} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors text-primary/60">X Archive</a>
                  <a href={SITE_CONFIG.links.youtube} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors text-primary/60">YouTube</a>
                  <a href={SITE_CONFIG.links.amazon_author} target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic(10)} className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors text-primary/60">Amazon</a>
                  <a href={SITE_CONFIG.links.email} onClick={() => triggerHaptic(10)} className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors text-primary/60">Mail</a>
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
    </div>
  );
}
