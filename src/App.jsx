import { useEffect, useRef, useState } from "react";
import {
  Calendar, Users, MessageSquare, CreditCard, BarChart3,
  Shield, Smartphone, Sparkles, Zap, MapPin, FileText,
  TrendingUp, Heart, Menu, X, CheckCircle2,
} from "lucide-react";
import { colors, MONO, SANS, sectionStyle, headingStyle, bodyStyle } from "./tokens";
import { useAnim, useMotion } from "./motion/useMotion.jsx";
import Rv from "./motion/Rv";
import AnimatedCounter from "./components/AnimatedCounter";
import PhoneMockup from "./components/PhoneMockup";
import HeroRig from "./components/HeroRig";
import TiltCard from "./components/TiltCard";
import Stepper from "./components/Stepper";
import Coverflow from "./components/Coverflow";
import AiChat from "./components/AiChat";
import FAQItem from "./components/FAQItem";
import { ProgressBar, Dock } from "./components/Chrome";

// ─── Store badges (inline SVG, shared by hero + download) ────
const AppleIcon = () => (
  <svg width="20" height="24" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
);
const PlayIcon = () => (
  <svg width="20" height="22" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
);

function Logo({ height = 56 }) {
  return <img src="/logo.png" alt="Xcleaners" style={{ height, width: "auto", display: "block" }} />;
}

// ─── Step Card (Get started) ─────────────────────────────────
function StepCard({ number, title, desc }) {
  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flex: "1 1 280px", minWidth: 260 }}>
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, fontWeight: 800, color: colors.white, fontFamily: MONO,
        flexShrink: 0, boxShadow: `0 8px 24px ${colors.blue}40`,
      }}>{number}</div>
      <div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: colors.navy, marginBottom: 6, fontFamily: SANS }}>{title}</h3>
        <p style={{ fontSize: 15, color: colors.gray600, lineHeight: 1.65, margin: 0, fontFamily: SANS }}>{desc}</p>
      </div>
    </div>
  );
}

// ─── Content (unchanged copy) ────────────────────────────────
// Back-of-card bullets reuse sentences already on this page (steps / why / AI / pricing).
const FEATURES = [
  { icon: Calendar, title: "Smart Scheduling", desc: "Drag and drop to organize your team. View by day, week, month, or map.", accent: colors.blue,
    back: ["Drag and drop bookings onto the calendar.", "Xcleaners groups jobs by geographic proximity, saving gas money.", "View by day, week, month, or map."] },
  { icon: MessageSquare, title: "Automated Communication", desc: "Confirmations, reminders, and notifications via SMS and email — sent automatically.", accent: colors.green,
    back: ["Every client gets an SMS and email confirming the date, time, and service details.", "Sends the client and your team the right notifications automatically.", "Zero manual work from you."] },
  { icon: CreditCard, title: "Billing & Payments", desc: "Invoice automatically and get paid by card right in the app.", accent: colors.blue,
    back: ["The client gets invoiced, pays through the app, and leaves a review.", "You get a notification with the day's financial summary.", "Get paid by card right in the app."] },
  { icon: Users, title: "Team Management", desc: "Your cleaners get all job details on their phone. No calls, no confusion.", accent: colors.green,
    back: ["Address, checklist, client notes, and optimized route.", "Your cleaners know exactly what to do.", "Your cleaners learn it in minutes, not hours."] },
  { icon: MapPin, title: "Routes by Location", desc: "Organize jobs by location so your team drives less.", accent: colors.blue,
    back: ["Xcleaners groups jobs by geographic proximity, saving gas money.", "Address, checklist, client notes, and optimized route.", "Add team members and locations as you grow."] },
  { icon: BarChart3, title: "Real-Time Reports", desc: "Revenue, team performance, and client retention rates at your fingertips.", accent: colors.green,
    back: ["Revenue, team performance, and client retention rates.", "You get a notification with the day's financial summary.", "Multi-location + advanced reports."] },
];

const WEEK = [
  { time: "Monday, 7 AM", title: "You open the app and see 12 new quote requests", desc: "While you were sleeping, your online booking form captured new clients automatically. Never miss a lead again.", tag: "Smart booking form", icon: Sparkles, color: colors.blue, screen: "requests" },
  { time: "Monday, 8 AM", title: "Schedule organized with one tap", desc: "Drag and drop bookings onto the calendar. Xcleaners groups jobs by geographic proximity, saving gas money.", tag: "Visual scheduling", icon: Calendar, color: colors.green, screen: "calendar" },
  { time: "Tuesday", title: "Confirmations sent automatically", desc: "Every client gets an SMS and email confirming the date, time, and service details. Zero manual work from you.", tag: "Automation", icon: MessageSquare, color: colors.blue, screen: "confirmations" },
  { time: "Day of service", title: "Your team gets everything on their phone", desc: "Address, checklist, client notes, and optimized route. Your cleaners know exactly what to do.", tag: "Team app", icon: Smartphone, color: colors.green, screen: "team" },
  { time: "After the job", title: "Payment and review — automatic", desc: "The client gets invoiced, pays through the app, and leaves a review. You get a notification with the day's financial summary.", tag: "Auto-billing", icon: CreditCard, color: colors.blue, screen: "payment" },
];

const WHY = [
  { icon: Heart, title: "Built for cleaning", desc: "Not a generic tool. Every feature is designed for the reality of the cleaning industry." },
  { icon: Zap, title: "Automation that works", desc: "Cut hours of manual texting, scheduling, and invoicing every week with automated communications, billing, and reports." },
  { icon: Shield, title: "Human support", desc: "Support from real people who understand your business. No bots, no waiting, no frustration." },
  { icon: TrendingUp, title: "Built for growth", desc: "Add team members and locations as you grow — without losing control of the day-to-day." },
  { icon: Smartphone, title: "An app your team loves", desc: "Clean and intuitive interface. Your cleaners learn it in minutes, not hours." },
  { icon: FileText, title: "Monthly updates", desc: "New features every month based on real feedback from our customers." },
];

const TESTIMONIALS = [
  { name: "Jennifer Martinez", company: "Sparkle Pro Cleaning", location: "Austin, TX", quote: "Before Xcleaners I spent 4 hours a day texting clients to organize my schedule. Now it takes 15 minutes. My revenue tripled in 8 months.", metric: "+200% revenue in 8 months" },
  { name: "David Thompson", company: "Elite Clean Services", location: "Denver, CO", quote: "Automated reminders eliminated 90% of our no-shows. My team of 15 runs like clockwork now.", metric: "90% fewer cancellations" },
  { name: "Patricia Williams", company: "Fresh Start Maids", location: "Atlanta, GA", quote: "I started solo and in one year built a team of 8. Xcleaners gave me the confidence to grow without losing quality.", metric: "From 1 to 8 employees in 1 year" },
];

const PLANS = [
  { name: "Starter", price: 49, period: "/month", desc: "For getting started", features: ["Up to 3 cleaners", "1 team", "AI owner assistant (chat)", "Online booking + client CRM", "500 SMS/month", "Email support"], cta: "Try Free for 14 Days", href: "https://app.xcleaners.app/register", accent: colors.gray600 },
  { name: "Pro", price: 99, period: "/month", desc: "For growing businesses", features: ["Unlimited cleaners & teams", "AI owner assistant (chat)", "Online booking + client CRM", "2,000 SMS/month", "Multi-location + advanced reports", "Priority support"], cta: "Try Free for 14 Days", href: "https://app.xcleaners.app/register", accent: colors.blue, popular: true },
  { name: "White Label", price: 199, period: "/mo", desc: "Done-for-you · $999 one-time setup", features: ["Everything in Pro", "Your brand, logo & domain", "Complete branded website", "AI assistant under your brand", "Assisted onboarding & migration"], cta: "Contact Us", href: "#", accent: colors.green },
];

const FAQS = [
  { question: "Is the trial really free?", answer: "Yes — 14 full days with every feature, no credit card required. We only ask for a card when you decide to subscribe." },
  { question: "Do I need any technical skills?", answer: "Not at all. If you can use your phone, you can use Xcleaners. Plus our team sets everything up with you for free." },
  { question: "Can I cancel anytime?", answer: "Yes. No contracts, no penalties, no red tape. Month to month, total freedom." },
  { question: "How do I import my existing clients?", answer: "Send us your client list by spreadsheet, photo of your notebook, or any format. Our team imports everything for you at no extra cost." },
  { question: "Does Xcleaners work for small businesses?", answer: "Yes. Solo operators start on Starter and add team members and locations as they grow." },
  { question: "Is my data secure?", answer: "We use bank-level encryption and secure servers. Your data and your clients' data are fully protected." },
];

const NAV = ["Features", "How It Works", "Testimonials", "Pricing"];
const hashOf = (item) => `#${item.toLowerCase().replace(/\s/g, "-")}`;

// ─── Features section (rail on desktop, grid on mobile) ──────
function Features() {
  const pinRef = useRef(null);
  const railRef = useRef(null);
  const { wide } = useMotion();

  useAnim(pinRef, ({ gsap }) => {
    gsap.from(".tilt-card", {
      y: 70, rotateX: -12, opacity: 0, duration: 0.4, stagger: 0.06, ease: "expo.out",
      scrollTrigger: { trigger: pinRef.current, start: "top 72%", once: true },
    });
    if (wide && railRef.current) {
      const rail = railRef.current;
      const dist = () => Math.max(0, rail.scrollWidth - window.innerWidth + 48);
      gsap.to(rail, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: pinRef.current, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true },
      });
    }
  }, [wide]);

  return (
    <div ref={pinRef} className="feat-pin">
      <div style={sectionStyle}>
        <Rv>
          <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 40px" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: colors.blue, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>No more chaos</p>
            <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 16 }}>
              Ditch the spreadsheets, texts, and paper calendars
            </h2>
            <p style={{ ...bodyStyle, fontSize: 17 }}>
              Everything you need to manage your cleaning business in one place — simple and powerful.
            </p>
          </div>
        </Rv>
      </div>
      <div style={{ padding: "0 24px" }}>
        <div ref={railRef} className={wide ? "feat-rail" : "feat-grid"}>
          {FEATURES.map((f, i) => <TiltCard key={i} {...f} />)}
        </div>
      </div>
    </div>
  );
}

// ─── Pricing card with one-time ring ─────────────────────────
function PricingCard({ plan }) {
  const ref = useRef(null);
  const [lit, setLit] = useState(false);
  const { fine, reduce } = useMotion();
  useAnim(ref, ({ ScrollTrigger }) => {
    if (!plan.popular) return;
    ScrollTrigger.create({ trigger: ref.current, start: "top 80%", once: true, onEnter: () => setLit(true) });
  });
  const onMove = (e) => {
    if (!fine || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    e.currentTarget.style.transform = `${plan.popular ? "translateY(-12px) " : ""}rotateY(${(x - 0.5) * 6}deg) rotateX(${(0.5 - y) * 6}deg)`;
  };
  const onLeave = (e) => { e.currentTarget.style.transform = plan.popular ? "translateY(-12px)" : ""; };

  return (
    <div ref={ref} className={`price-card price-ring${lit ? " lit" : ""}`} onMouseMove={onMove} onMouseLeave={onLeave} style={{
      background: colors.white, borderRadius: 20, padding: "36px 28px",
      boxShadow: plan.popular ? `0 20px 60px ${colors.blue}20` : "0 4px 20px rgba(11,29,53,0.06)",
      border: plan.popular ? `2px solid ${colors.blue}` : `1px solid ${colors.gray200}`,
      transform: plan.popular ? "translateY(-12px)" : "none",
    }}>
      {plan.popular && (
        <div style={{
          position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
          background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})`,
          color: colors.white, padding: "4px 16px", borderRadius: 100, fontSize: 12, fontWeight: 700, fontFamily: SANS,
        }}>Recommended</div>
      )}
      <h3 style={{ fontSize: 18, fontWeight: 700, color: plan.accent, fontFamily: SANS, marginBottom: 4 }}>{plan.name}</h3>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 40, fontWeight: 700, color: colors.navy, fontFamily: MONO, letterSpacing: "-0.02em" }}>
          <AnimatedCounter end={plan.price} prefix="$" duration={800} />
        </span>
        <span style={{ fontSize: 15, color: colors.gray400, fontFamily: MONO }}>{plan.period}</span>
      </div>
      <p style={{ fontSize: 14, color: colors.gray600, marginBottom: 24, fontFamily: SANS }}>{plan.desc}</p>
      {plan.features.map((f, j) => (
        <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <CheckCircle2 size={16} color={colors.green} />
          <span style={{ fontSize: 14, color: colors.gray800, fontFamily: SANS }}>{f}</span>
        </div>
      ))}
      <a href={plan.href} className="btn-sheen btn-lift" style={{
        display: "block", textAlign: "center", marginTop: 24,
        background: plan.popular ? `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})` : colors.gray50,
        color: plan.popular ? colors.white : colors.navy,
        padding: "14px 24px", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none",
        boxShadow: plan.popular ? `0 8px 24px ${colors.blue}30` : "none",
        border: plan.popular ? "none" : `1px solid ${colors.gray200}`, fontFamily: SANS,
      }}>{plan.cta}</a>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────
export default function XcleanersLanding() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const heroRef = useRef(null);
  const { scrollTo, reduce } = useMotion();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY && y > 320 && !mobileMenu);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  useAnim(heroRef, ({ gsap }) => {
    gsap.to(".hero-blob-a", { y: 60, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero-blob-b", { y: -60, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } });
    gsap.from(".hero-tag", { z: 400, opacity: 0, duration: 0.8, ease: "expo.out", delay: 0.7 });
  });

  const anchor = (e, hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    e.preventDefault();
    setMobileMenu(false);
    scrollTo(el);
    history.replaceState(null, "", hash);
  };

  const navLink = { fontSize: 14, fontWeight: 500, color: colors.gray600, textDecoration: "none", transition: "color 150ms cubic-bezier(0.4, 0, 0.2, 1)", fontFamily: SANS };

  return (
    <div style={{ fontFamily: SANS, background: colors.white, color: colors.gray800, overflowX: "hidden" }}>
      <ProgressBar />

      {/* ─── NAVBAR ──────────────────────────────────────── */}
      <nav className={`topbar${hidden ? " hide" : ""}`} style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled || mobileMenu ? "rgba(255,255,255,0.98)" : "transparent",
        backdropFilter: scrolled || mobileMenu ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${colors.gray100}` : "none",
        padding: scrolled ? "12px 0" : "20px 0",
      }}>
        <div style={{ ...sectionStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo(document.body); }} aria-label="Xcleaners home"><Logo height={56} /></a>

          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
            {NAV.map((item) => (
              <a key={item} href={hashOf(item)} onClick={(e) => anchor(e, hashOf(item))} style={navLink}>{item}</a>
            ))}
            <a href="https://app.xcleaners.app/login" className="btn-lift" style={{ fontSize: 14, fontWeight: 600, color: colors.navy, textDecoration: "none", fontFamily: SANS, border: `1px solid ${colors.gray200}`, borderRadius: 10, padding: "8px 18px" }}>Log In</a>
            <a href="https://app.xcleaners.app/register" className="btn-sheen btn-lift" style={{
              background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})`,
              color: colors.white, padding: "10px 24px", borderRadius: 12,
              fontSize: 14, fontWeight: 600, textDecoration: "none",
              boxShadow: `0 4px 16px ${colors.blue}40`, fontFamily: SANS,
            }}>
              Start Free Trial
            </a>
          </div>

          <button type="button" onClick={() => setMobileMenu(!mobileMenu)} className="mobile-menu-btn"
            aria-expanded={mobileMenu} aria-label={mobileMenu ? "Close menu" : "Open menu"}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, color: colors.navy, position: "relative", zIndex: 1001 }}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenu && (
          <div className="mobile-nav-menu">
            {NAV.map((item) => (
              <a key={item} href={hashOf(item)} onClick={(e) => anchor(e, hashOf(item))} style={{
                fontSize: 28, fontWeight: 700, color: colors.navy, textDecoration: "none", padding: "14px 0",
                borderBottom: `1px solid ${colors.gray100}`, fontFamily: SANS, letterSpacing: "-0.02em",
              }}>{item}</a>
            ))}
            <a href="https://app.xcleaners.app/login" onClick={() => setMobileMenu(false)} style={{ display: "block", textAlign: "center", marginTop: 24, color: colors.navy, padding: "14px 24px", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none", border: "1px solid " + colors.gray200, fontFamily: SANS }}>Log In</a>
            <a href="https://app.xcleaners.app/register" onClick={() => setMobileMenu(false)} style={{
              display: "block", textAlign: "center", marginTop: 16,
              background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})`,
              color: colors.white, padding: "14px 24px", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none", fontFamily: SANS,
            }}>
              Start Free Trial
            </a>
          </div>
        )}
      </nav>

      {/* ─── HERO ────────────────────────────────────────── */}
      <section ref={heroRef} id="top" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: `linear-gradient(165deg, ${colors.white} 0%, ${colors.bluePale} 50%, ${colors.greenPale} 100%)`,
        paddingTop: 80, position: "relative", overflow: "hidden",
      }}>
        <div className="hero-blob-a" style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${colors.blueLight}10 0%, transparent 70%)` }} />
        <div className="hero-blob-b" style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${colors.green}08 0%, transparent 70%)` }} />
        <div style={{ ...sectionStyle, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48, flexWrap: "wrap", position: "relative", width: "100%" }}>
          <div style={{ flex: "1 1 420px", maxWidth: 600, minWidth: 0 }}>
            <div className="hx hero-tag" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: colors.white, borderRadius: 100, padding: "6px 16px 6px 8px",
              boxShadow: "0 2px 12px rgba(11,29,53,0.08)", marginBottom: 28,
            }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: `linear-gradient(135deg, ${colors.green}, ${colors.greenLight})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={12} color={colors.white} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: colors.navy }}>
                Trusted by <span style={{ fontFamily: MONO, fontWeight: 600 }}>800+</span> cleaning businesses
              </span>
            </div>
            <img className="hx hx-1" src="/logo.png" alt="Xcleaners" width="283" height="100" style={{ height: 100, width: "auto", marginBottom: 28 }} />
            <h1 className="hx hx-2" style={{ ...headingStyle, fontSize: "clamp(36px, 5vw, 56px)", marginBottom: 24 }}>
              Run your cleaning business on
              <span style={{ background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}> autopilot</span>
            </h1>
            <p className="hx hx-3" style={{ ...bodyStyle, fontSize: 19, maxWidth: 500, marginBottom: 36 }}>
              Schedule, communicate, and collect payments automatically. Less time on your phone, more time growing your business.
            </p>
            <div className="hx hx-4" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
              <a href="#" className="btn-sheen btn-lift" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: colors.navy, color: colors.white, padding: "12px 24px", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
                <AppleIcon /> App Store
              </a>
              <a href="#" className="btn-sheen btn-lift" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: colors.navy, color: colors.white, padding: "12px 24px", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
                <PlayIcon /> Google Play
              </a>
            </div>
            <div className="hx hx-5" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {["14-day free trial", "No credit card", "Cancel anytime"].map((text, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={16} color={colors.green} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: colors.gray600 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "0 0 auto", padding: "40px 0" }}>
            <HeroRig sectionRef={heroRef} />
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ────────────────────────────── */}
      <section style={{ background: colors.white, borderBottom: `1px solid ${colors.gray100}`, padding: "48px 0" }}>
        <div style={sectionStyle}>
          <Rv>
            <div style={{ display: "flex", justifyContent: "center", gap: 60, flexWrap: "wrap", alignItems: "center" }}>
              {[{ value: 800, suffix: "+", label: "Active businesses" }].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <p style={{ ...headingStyle, fontSize: 44, margin: 0, fontFamily: MONO, letterSpacing: "-0.02em", background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p style={{ fontSize: 14, color: colors.gray400, margin: "4px 0 0" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </Rv>
        </div>
      </section>

      {/* ─── AI ASSISTANT ─────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: colors.white }}>
        <div style={{ ...sectionStyle, display: "flex", alignItems: "center", gap: 56, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 440px", minWidth: 0 }}>
            <Rv>
              <p style={{ fontSize: 13, fontWeight: 700, color: colors.blue, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Your AI assistant</p>
              <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 16 }}>
                Just tell it what to do
              </h2>
              <p style={{ ...bodyStyle, fontSize: 17, maxWidth: 520, marginBottom: 24 }}>
                Book, reschedule, or cancel a job by simply chatting — by text or in the app. Your
                assistant pulls up the right client and booking, shows you a summary, and only acts
                after you confirm. No forms, no digging through screens.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Understands plain requests like \"move the Johnson clean to Friday 2pm\"",
                  "Always shows a summary and waits for your confirmation before changing anything",
                  "Sends the client and your team the right notifications automatically",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckCircle2 size={18} color={colors.green} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 15, color: colors.gray800, fontFamily: SANS }}>{t}</span>
                  </div>
                ))}
              </div>
            </Rv>
          </div>
          <Rv delay={150} style={{ flex: "1 1 340px", maxWidth: 420, position: "relative" }}>
            <div aria-hidden="true" style={{ position: "absolute", inset: -40, borderRadius: "50%", background: `radial-gradient(circle, ${colors.blueLight}22 0%, transparent 65%)`, filter: "blur(10px)", pointerEvents: "none" }} />
            <AiChat />
          </Rv>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────── */}
      <section id="features" style={{ padding: "60px 0", background: colors.gray50, overflow: "hidden" }}>
        <Features />
      </section>

      {/* ─── A TYPICAL WEEK ───────────────────────────────── */}
      <section id="how-it-works" style={{ padding: "100px 0", background: colors.white }}>
        <div style={sectionStyle}>
          <Rv>
            <div style={{ textAlign: "left", maxWidth: 700, margin: "0 0 64px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: colors.green, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>See it in action</p>
              <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 16 }}>
                A typical week with Xcleaners
              </h2>
            </div>
          </Rv>
          <Stepper steps={WEEK} />
        </div>
      </section>

      {/* ─── WHY XCLEANERS ──────────────────────────────── */}
      <section style={{ padding: "100px 0", background: `linear-gradient(165deg, ${colors.navy} 0%, ${colors.navyLight} 100%)` }}>
        <div style={sectionStyle}>
          <Rv>
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: colors.blueLight, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Why Xcleaners</p>
              <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 42px)", color: colors.white, marginBottom: 16 }}>
                The stress-free way to run your cleaning business
              </h2>
              <p style={{ ...bodyStyle, fontSize: 17, color: colors.gray400 }}>
                Built by cleaning business owners, for cleaning business owners.
              </p>
            </div>
          </Rv>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {WHY.map((item, i) => (
              <Rv key={i} delay={i * 60} y={70} rotateX={-12}>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(255,255,255,0.08)", height: "100%" }}>
                  <item.icon size={24} color={colors.blueLight} style={{ marginBottom: 16 }} />
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: colors.white, marginBottom: 8, fontFamily: SANS }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: colors.gray400, lineHeight: 1.65, fontFamily: SANS, margin: 0 }}>{item.desc}</p>
                </div>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────── */}
      <section id="testimonials" style={{ padding: "100px 0", background: colors.gray50, overflow: "hidden" }}>
        <div style={sectionStyle}>
          <Rv>
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 48px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: colors.green, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Testimonials</p>
              <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 16 }}>
                Join <span style={{ fontFamily: MONO }}>800+</span> cleaning businesses
              </h2>
            </div>
          </Rv>
          <Coverflow items={TESTIMONIALS} />
        </div>
      </section>

      {/* ─── GET STARTED ─────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: colors.white }}>
        <div style={sectionStyle}>
          <Rv>
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: colors.blue, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Get started</p>
              <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 16 }}>
                Up and running in 3 simple steps
              </h2>
              <p style={{ ...bodyStyle, fontSize: 17 }}>
                No technical skills needed. No contracts. No hassle.
              </p>
            </div>
          </Rv>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
            <Rv delay={0} style={{ flex: "1 1 280px" }}><StepCard number="1" title="Download the app" desc="Available on the App Store and Google Play. Create your account in under 2 minutes." /></Rv>
            <Rv delay={150} style={{ flex: "1 1 280px" }}><StepCard number="2" title="Set up your business" desc="Import your clients and services. Our team helps you for free during this step." /></Rv>
            <Rv delay={300} style={{ flex: "1 1 280px" }}><StepCard number="3" title="Let Xcleaners do the work" desc="Scheduling, billing, and communications on autopilot. Focus on growing your business." /></Rv>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─────────────────────────────────────── */}
      <section id="pricing" style={{ padding: "100px 0", background: `linear-gradient(165deg, ${colors.bluePale} 0%, ${colors.greenPale} 100%)` }}>
        <div style={sectionStyle}>
          <Rv>
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
              <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 16 }}>
                Plans that fit your budget
              </h2>
              <p style={{ ...bodyStyle, fontSize: 17 }}>
                14-day free trial on Starter &amp; Pro — no credit card. Cancel anytime.
              </p>
            </div>
          </Rv>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 940, margin: "0 auto", perspective: 1200 }}>
            {PLANS.map((plan, i) => (
              <Rv key={i} delay={i * 100} style={{ position: "relative" }}>
                <PricingCard plan={plan} />
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: colors.white }}>
        <div style={{ ...sectionStyle, maxWidth: 760 }}>
          <Rv>
            <div style={{ textAlign: "left", marginBottom: 48 }}>
              <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 36px)" }}>
                Frequently asked questions
              </h2>
            </div>
          </Rv>
          <Rv delay={100}>
            <div>
              {FAQS.map((f, i) => <FAQItem key={i} {...f} />)}
            </div>
          </Rv>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────── */}
      <section id="download" style={{ padding: "100px 0", background: `linear-gradient(165deg, ${colors.navy} 0%, ${colors.navyLight} 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${colors.blue}15 0%, transparent 70%)` }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${colors.green}10 0%, transparent 70%)` }} />
        {!reduce && (
          <div className="float-phone" aria-hidden="true">
            <div className="float-in"><PhoneMockup screen="payment" /></div>
          </div>
        )}

        <div style={{ ...sectionStyle, textAlign: "center", position: "relative" }}>
          <Rv>
            <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 46px)", color: colors.white, marginBottom: 20, maxWidth: 700, margin: "0 auto 20px" }}>
              Your cleaning business deserves real technology
            </h2>
          </Rv>
          <Rv delay={100}>
            <p style={{ ...bodyStyle, fontSize: 18, color: colors.gray400, maxWidth: 520, margin: "0 auto 40px" }}>
              Join <span style={{ fontFamily: MONO, color: colors.white }}>800+</span> businesses already running on Xcleaners.
            </p>
          </Rv>
          <Rv delay={200}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
              <a href="#" className="btn-sheen btn-lift" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: colors.white, color: colors.navy, padding: "16px 36px", borderRadius: 14, fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", fontFamily: SANS }}>
                <AppleIcon /> Download for iOS
              </a>
              <a href="#" className="btn-sheen btn-lift" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: `linear-gradient(135deg, ${colors.green}, ${colors.greenLight})`, color: colors.white, padding: "16px 36px", borderRadius: 14, fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: `0 8px 32px ${colors.green}40`, fontFamily: SANS }}>
                <PlayIcon /> Download for Android
              </a>
            </div>
          </Rv>
          <Rv delay={300}>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
              {["14-day free trial", "No credit card", "Cancel anytime"].map((text, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={16} color={colors.greenLight} />
                  <span style={{ fontSize: 14, color: colors.gray400 }}>{text}</span>
                </div>
              ))}
            </div>
          </Rv>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────── */}
      <footer style={{ background: colors.navy, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "60px 0 32px" }}>
        <div style={sectionStyle}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ marginBottom: 16 }}>
                <img src="/logo.png" alt="Xcleaners" style={{ height: 48, width: "auto", filter: "brightness(0) invert(1)" }} />
              </div>
              <p style={{ fontSize: 14, color: colors.gray400, lineHeight: 1.65, maxWidth: 280, fontFamily: SANS }}>
                The most complete software for residential and commercial cleaning businesses.
              </p>
            </div>
            {[
              { h: "Product", links: ["Features", "Pricing", "Integrations", "Updates"] },
              { h: "Resources", links: ["Blog", "Guides", "Community", "Support"] },
              { h: "Company", links: ["About Us", "Careers", "Contact", "Privacy Policy"] },
            ].map((col) => (
              <div key={col.h}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: colors.gray400, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20, fontFamily: SANS }}>{col.h}</h4>
                {col.links.map((link) => (
                  <a key={link} href="#" style={{ display: "block", fontSize: 14, color: colors.gray400, textDecoration: "none", marginBottom: 12, fontFamily: SANS, transition: "color 150ms cubic-bezier(0.4, 0, 0.2, 1)" }}>{link}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontSize: 13, color: colors.gray400, margin: 0, fontFamily: SANS }}>
              © 2026 Xcleaners. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              {["Instagram", "Facebook", "YouTube", "LinkedIn"].map((social) => (
                <a key={social} href="#" style={{ fontSize: 13, color: colors.gray400, textDecoration: "none", fontFamily: SANS, transition: "color 150ms cubic-bezier(0.4, 0, 0.2, 1)" }}>{social}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <Dock />
    </div>
  );
}
