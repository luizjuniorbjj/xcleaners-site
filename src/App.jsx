import { useState, useEffect, useRef } from "react";
import {
  Calendar, Clock, Users, MessageSquare, CreditCard, BarChart3,
  Shield, Smartphone, Star, ChevronDown, ChevronRight, ArrowRight,
  CheckCircle2, Sparkles, Zap, Bell, MapPin, FileText,
  TrendingUp, Heart, Play, Menu, X
} from "lucide-react";

// ─── Design Tokens ───────────────────────────────────────────
const colors = {
  navy: "#0B1D35",
  navyLight: "#132D4F",
  blue: "#2B8FD4",
  blueLight: "#4FC3F7",
  bluePale: "#E8F4FD",
  green: "#5DB348",
  greenLight: "#7CB342",
  greenPale: "#EDF7E8",
  white: "#FFFFFF",
  gray50: "#F8FAFB",
  gray100: "#F0F3F5",
  gray200: "#D8DFE5",
  gray400: "#94A3B8",
  gray600: "#5A6A7A",
  gray800: "#2D3A48",
};

// ─── Animated Counter ─────────────────────────────────────────
function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── Scroll Reveal ────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Logo Component ───────────────────────────────────────────
function Logo({ height = 56 }) {
  return (
    <img
      src="/logo.png"
      alt="Xcleaners"
      style={{ height, width: "auto", display: "block" }}
    />
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        borderBottom: `1px solid ${colors.gray200}`,
        padding: "20px 0",
        cursor: "pointer",
      }}
    >
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{
          fontSize: 17, fontWeight: 600, color: colors.navy,
          fontFamily: "'Inter', system-ui, sans-serif",
        }}>{question}</span>
        <ChevronDown
          size={20}
          color={colors.blue}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s ease",
            flexShrink: 0,
          }}
        />
      </div>
      <div style={{
        maxHeight: open ? 500 : 0,
        overflow: "hidden",
        transition: "max-height 0.4s ease",
      }}>
        <p style={{
          fontSize: 15, color: colors.gray600, lineHeight: 1.7,
          marginTop: 12, fontFamily: "'Inter', system-ui, sans-serif",
        }}>{answer}</p>
      </div>
    </div>
  );
}

// ─── Feature Card ─────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, desc, accent = colors.blue }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.white,
        borderRadius: 16,
        padding: "32px 28px",
        boxShadow: hovered
          ? "0 20px 60px rgba(11,29,53,0.12)"
          : "0 4px 20px rgba(11,29,53,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.35s ease",
        cursor: "default",
        border: `1px solid ${hovered ? accent + "30" : colors.gray100}`,
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: accent + "12",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20,
      }}>
        <Icon size={24} color={accent} strokeWidth={2} />
      </div>
      <h3 style={{
        fontSize: 18, fontWeight: 700, color: colors.navy, marginBottom: 10,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}>{title}</h3>
      <p style={{
        fontSize: 15, color: colors.gray600, lineHeight: 1.65,
        fontFamily: "'Inter', system-ui, sans-serif", margin: 0,
      }}>{desc}</p>
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────
function TestimonialCard({ name, company, location, quote, metric }) {
  return (
    <div style={{
      background: colors.white,
      borderRadius: 20,
      padding: "36px 32px",
      boxShadow: "0 4px 24px rgba(11,29,53,0.06)",
      border: `1px solid ${colors.gray100}`,
      display: "flex",
      flexDirection: "column",
      gap: 20,
      minWidth: 300,
      flex: "1 1 300px",
    }}>
      <div style={{ display: "flex", gap: 4 }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
        ))}
      </div>
      <p style={{
        fontSize: 16, color: colors.gray800, lineHeight: 1.7, flex: 1,
        fontFamily: "'Inter', system-ui, sans-serif", margin: 0,
        fontStyle: "italic",
      }}>"{quote}"</p>
      {metric && (
        <div style={{
          background: colors.greenPale, borderRadius: 10, padding: "10px 16px",
          display: "inline-flex", alignItems: "center", gap: 8, alignSelf: "flex-start",
        }}>
          <TrendingUp size={16} color={colors.green} />
          <span style={{
            fontSize: 14, fontWeight: 700, color: colors.green,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}>{metric}</span>
        </div>
      )}
      <div>
        <p style={{
          fontSize: 15, fontWeight: 700, color: colors.navy, margin: 0,
          fontFamily: "'Inter', system-ui, sans-serif",
        }}>{name}</p>
        <p style={{
          fontSize: 13, color: colors.gray400, margin: "2px 0 0",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}>{company} · {location}</p>
      </div>
    </div>
  );
}

// ─── Step Card ────────────────────────────────────────────────
function StepCard({ number, title, desc }) {
  return (
    <div style={{
      display: "flex", gap: 20, alignItems: "flex-start",
      flex: "1 1 280px", minWidth: 260,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, fontWeight: 800, color: colors.white,
        fontFamily: "'Inter', system-ui, sans-serif",
        flexShrink: 0,
        boxShadow: `0 8px 24px ${colors.blue}40`,
      }}>{number}</div>
      <div>
        <h3 style={{
          fontSize: 18, fontWeight: 700, color: colors.navy, marginBottom: 6,
          fontFamily: "'Inter', system-ui, sans-serif",
        }}>{title}</h3>
        <p style={{
          fontSize: 15, color: colors.gray600, lineHeight: 1.65, margin: 0,
          fontFamily: "'Inter', system-ui, sans-serif",
        }}>{desc}</p>
      </div>
    </div>
  );
}

// ─── Phone Mockup ─────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div style={{
      width: 280, height: 560, borderRadius: 40,
      background: colors.navy,
      padding: 12,
      boxShadow: "0 40px 80px rgba(11,29,53,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
        width: 100, height: 28, borderRadius: 20, background: colors.navy, zIndex: 10,
      }} />
      <div style={{
        width: "100%", height: "100%", borderRadius: 28,
        background: `linear-gradient(180deg, ${colors.bluePale} 0%, ${colors.white} 40%)`,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "38px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: colors.navy, fontFamily: "'Inter', system-ui, sans-serif" }}>9:41</span>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ width: 16, height: 10, borderRadius: 3, background: colors.navy }} />
            <div style={{ width: 20, height: 10, borderRadius: 3, background: colors.green }} />
          </div>
        </div>

        <div style={{ padding: "8px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 12, color: colors.gray400, margin: 0, fontFamily: "'Inter', system-ui, sans-serif" }}>Good morning</p>
            <p style={{ fontSize: 17, fontWeight: 700, color: colors.navy, margin: 0, fontFamily: "'Inter', system-ui, sans-serif" }}>My Schedule</p>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.green}, ${colors.greenLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Bell size={16} color={colors.white} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, padding: "0 16px", marginBottom: 12 }}>
          {[
            { label: "Today", value: "8", color: colors.blue },
            { label: "Week", value: "32", color: colors.green },
            { label: "Revenue", value: "$4.2k", color: colors.navy },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, background: colors.white, borderRadius: 12, padding: "10px 8px",
              textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}>
              <p style={{ fontSize: 16, fontWeight: 800, color: s.color, margin: 0, fontFamily: "'Inter', system-ui, sans-serif" }}>{s.value}</p>
              <p style={{ fontSize: 10, color: colors.gray400, margin: 0, fontFamily: "'Inter', system-ui, sans-serif" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {[
          { time: "08:00", client: "Sarah Johnson", type: "Deep Clean", status: colors.green },
          { time: "10:30", client: "Mike Davis", type: "Express Clean", status: colors.blue },
          { time: "14:00", client: "Emily Clark", type: "Move-out Clean", status: colors.greenLight },
        ].map((apt, i) => (
          <div key={i} style={{
            margin: "0 16px 8px", padding: "12px 14px", background: colors.white,
            borderRadius: 14, display: "flex", alignItems: "center", gap: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            borderLeft: `3px solid ${apt.status}`,
          }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: colors.blue, margin: 0, fontFamily: "'Inter', system-ui, sans-serif" }}>{apt.time}</p>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: colors.navy, margin: 0, fontFamily: "'Inter', system-ui, sans-serif" }}>{apt.client}</p>
              <p style={{ fontSize: 11, color: colors.gray400, margin: 0, fontFamily: "'Inter', system-ui, sans-serif" }}>{apt.type}</p>
            </div>
            <ChevronRight size={14} color={colors.gray400} />
          </div>
        ))}

        <div style={{
          marginTop: "auto", padding: "12px 24px 16px",
          display: "flex", justifyContent: "space-around", alignItems: "center",
          borderTop: `1px solid ${colors.gray100}`,
        }}>
          {[Calendar, Users, Smartphone, BarChart3].map((Icon, i) => (
            <Icon key={i} size={20} color={i === 0 ? colors.blue : colors.gray400} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────
export default function XcleanersLanding() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sectionStyle = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
  };

  const headingStyle = {
    fontFamily: "'Inter', system-ui, sans-serif",
    fontWeight: 800,
    color: colors.navy,
    letterSpacing: "-0.03em",
    lineHeight: 1.15,
  };

  const bodyStyle = {
    fontFamily: "'Inter', system-ui, sans-serif",
    color: colors.gray600,
    lineHeight: 1.7,
  };

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      background: colors.white,
      color: colors.gray800,
      overflowX: "hidden",
    }}>

      {/* ─── NAVBAR ──────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled || mobileMenu ? "rgba(255,255,255,0.98)" : "transparent",
        backdropFilter: scrolled || mobileMenu ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${colors.gray100}` : "none",
        transition: "all 0.3s ease",
        padding: scrolled ? "12px 0" : "20px 0",
      }}>
        <div style={{
          ...sectionStyle,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <Logo height={48} />

          {/* Desktop nav */}
          <div style={{
            display: "flex", gap: 36, alignItems: "center",
          }} className="desktop-nav">
            {["Features", "How It Works", "Testimonials", "Pricing"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s/g, "-")}`} style={{
                fontSize: 14, fontWeight: 500, color: colors.gray600,
                textDecoration: "none", transition: "color 0.2s",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}>{item}</a>
            ))}
            <a href="https://app.xcleaners.app/login" style={{ fontSize: 14, fontWeight: 600, color: colors.navy, textDecoration: "none", fontFamily: "'Inter', system-ui, sans-serif", }}>Log In</a>
            <a href="https://app.xcleaners.app/register" style={{
              background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})`,
              color: colors.white, padding: "10px 24px", borderRadius: 12,
              fontSize: 14, fontWeight: 600, textDecoration: "none",
              boxShadow: `0 4px 16px ${colors.blue}40`,
              transition: "all 0.3s ease",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              Download Free
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="mobile-menu-btn"
            style={{
              display: "none", background: "none", border: "none",
              cursor: "pointer", padding: 8, color: colors.navy,
            }}
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenu && (
          <div style={{
            padding: "16px 24px 24px",
            background: "rgba(255,255,255,0.98)",
            borderTop: `1px solid ${colors.gray100}`,
            display: "flex", flexDirection: "column", gap: 0,
          }} className="mobile-nav-menu">
            {["Features", "How It Works", "Testimonials", "Pricing"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setMobileMenu(false)}
                style={{
                  fontSize: 16, fontWeight: 500, color: colors.navy,
                  textDecoration: "none", padding: "14px 0",
                  borderBottom: `1px solid ${colors.gray100}`,
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}>{item}</a>
            ))}
            <a href="https://app.xcleaners.app/login" onClick={() => setMobileMenu(false)} style={{ display: "block", textAlign: "center", marginTop: 12, color: colors.navy, padding: "14px 24px", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none", border: "1px solid " + colors.gray200, fontFamily: "'Inter', system-ui, sans-serif", }}>Log In</a>
            <a href="https://app.xcleaners.app/register" onClick={() => setMobileMenu(false)} style={{
              display: "block", textAlign: "center", marginTop: 16,
              background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})`,
              color: colors.white, padding: "14px 24px", borderRadius: 12,
              fontSize: 15, fontWeight: 600, textDecoration: "none",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              Download Free
            </a>
          </div>
        )}
      </nav>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav-menu { display: none !important; }
        }
      `}</style>

      {/* ─── HERO ────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        background: `linear-gradient(165deg, ${colors.white} 0%, ${colors.bluePale} 50%, ${colors.greenPale} 100%)`,
        paddingTop: 80,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -200, right: -200,
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.blueLight}10 0%, transparent 70%)`,
        }} />
        <div style={{
          position: "absolute", bottom: -100, left: -100,
          width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.green}08 0%, transparent 70%)`,
        }} />

        <div style={{
          ...sectionStyle,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 48, flexWrap: "wrap", position: "relative",
        }}>
          <div style={{ flex: "1 1 420px", maxWidth: 600, minWidth: 0 }}>
            <Reveal>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: colors.white, borderRadius: 100, padding: "6px 16px 6px 8px",
                boxShadow: "0 2px 12px rgba(11,29,53,0.08)",
                marginBottom: 28,
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${colors.green}, ${colors.greenLight})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Sparkles size={12} color={colors.white} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: colors.navy }}>
                  Trusted by 5,000+ cleaning businesses
                </span>
              </div>
            </Reveal>

            <Reveal delay={50}>
              <img src="/logo.png" alt="Xcleaners" style={{ height: 80, width: "auto", marginBottom: 28 }} />
            </Reveal>

            <Reveal delay={150}>
              <h1 style={{ ...headingStyle, fontSize: "clamp(36px, 5vw, 56px)", marginBottom: 24 }}>
                Run your cleaning business on
                <span style={{
                  background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}> autopilot</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p style={{ ...bodyStyle, fontSize: 19, maxWidth: 500, marginBottom: 36 }}>
                Schedule, communicate, and collect payments automatically. Less time on your phone, more time growing your business.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
                <a href="#" style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: colors.navy,
                  color: colors.white, padding: "12px 24px", borderRadius: 12,
                  fontSize: 15, fontWeight: 600, textDecoration: "none",
                  transition: "all 0.3s ease",
                }}>
                  <svg width="20" height="24" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  App Store
                </a>
                <a href="#" style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: colors.navy,
                  color: colors.white, padding: "12px 24px", borderRadius: 12,
                  fontSize: 15, fontWeight: 600, textDecoration: "none",
                  transition: "all 0.3s ease",
                }}>
                  <svg width="20" height="22" viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                  Google Play
                </a>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[
                  { icon: CheckCircle2, text: "Free for 14 days" },
                  { icon: CheckCircle2, text: "No credit card required" },
                  { icon: CheckCircle2, text: "Set up in 5 minutes" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <item.icon size={16} color={colors.green} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: colors.gray600 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={300} className="">
            <div style={{ flex: "0 0 auto" }}>
              <PhoneMockup />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ────────────────────────────── */}
      <section style={{
        background: colors.white,
        borderBottom: `1px solid ${colors.gray100}`,
        padding: "48px 0",
      }}>
        <div style={sectionStyle}>
          <Reveal>
            <div style={{
              display: "flex", justifyContent: "center", gap: 60,
              flexWrap: "wrap", alignItems: "center",
            }}>
              {[
                { value: 5000, suffix: "+", label: "Active businesses" },
                { value: 2, prefix: "", suffix: "M+", label: "Bookings per month" },
                { value: 98, suffix: "%", label: "Satisfaction rate" },
                { value: 20, suffix: "h", label: "Saved per week" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <p style={{
                    ...headingStyle, fontSize: 36, margin: 0,
                    background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                    <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p style={{ fontSize: 14, color: colors.gray400, margin: "4px 0 0" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────── */}
      <section id="features" style={{ padding: "100px 0", background: colors.gray50 }}>
        <div style={sectionStyle}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
              <p style={{
                fontSize: 13, fontWeight: 700, color: colors.blue,
                textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12,
              }}>No more chaos</p>
              <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 16 }}>
                Ditch the spreadsheets, texts, and paper calendars
              </h2>
              <p style={{ ...bodyStyle, fontSize: 17 }}>
                Everything you need to manage your cleaning business in one place — simple and powerful.
              </p>
            </div>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}>
            {[
              {
                icon: Calendar,
                title: "Smart Scheduling",
                desc: "Drag and drop to organize your team. View by day, week, month, or map.",
                accent: colors.blue,
              },
              {
                icon: MessageSquare,
                title: "Automated Communication",
                desc: "Confirmations, reminders, and notifications via SMS and email — sent automatically.",
                accent: colors.green,
              },
              {
                icon: CreditCard,
                title: "Billing & Payments",
                desc: "Invoice automatically and get paid by card, ACH, or digital wallet right through the app.",
                accent: colors.blue,
              },
              {
                icon: Users,
                title: "Team Management",
                desc: "Your cleaners get all job details on their phone. No calls, no confusion.",
                accent: colors.green,
              },
              {
                icon: MapPin,
                title: "Optimized Routes",
                desc: "Organize jobs by location to save your team time and gas money.",
                accent: colors.blue,
              },
              {
                icon: BarChart3,
                title: "Real-Time Reports",
                desc: "Revenue, team performance, and client retention rates at your fingertips.",
                accent: colors.green,
              },
            ].map((feature, i) => (
              <Reveal key={i} delay={i * 80}>
                <FeatureCard {...feature} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STORYTELLING SECTION ─────────────────────────── */}
      <section id="how-it-works" style={{ padding: "100px 0", background: colors.white }}>
        <div style={sectionStyle}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
              <p style={{
                fontSize: 13, fontWeight: 700, color: colors.green,
                textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12,
              }}>See it in action</p>
              <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 16 }}>
                A typical week with Xcleaners
              </h2>
            </div>
          </Reveal>

          {[
            {
              time: "Monday, 7 AM",
              title: "You open the app and see 12 new quote requests",
              desc: "While you were sleeping, your online booking form captured new clients automatically. Never miss a lead again.",
              tag: "Smart booking form",
              icon: Sparkles,
              color: colors.blue,
            },
            {
              time: "Monday, 8 AM",
              title: "Schedule organized with one tap",
              desc: "Drag and drop bookings onto the calendar. Xcleaners groups jobs by geographic proximity, saving gas money.",
              tag: "Visual scheduling",
              icon: Calendar,
              color: colors.green,
            },
            {
              time: "Tuesday",
              title: "Confirmations sent automatically",
              desc: "Every client gets an SMS and email confirming the date, time, and service details. Zero manual work from you.",
              tag: "Automation",
              icon: MessageSquare,
              color: colors.blue,
            },
            {
              time: "Day of service",
              title: "Your team gets everything on their phone",
              desc: "Address, checklist, client notes, and optimized route. Your cleaners know exactly what to do.",
              tag: "Team app",
              icon: Smartphone,
              color: colors.green,
            },
            {
              time: "After the job",
              title: "Payment and review — automatic",
              desc: "The client gets invoiced, pays through the app, and leaves a review. You get a notification with the day's financial summary.",
              tag: "Auto-billing",
              icon: CreditCard,
              color: colors.blue,
            },
          ].map((step, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{
                display: "flex", gap: 32, marginBottom: 48, alignItems: "flex-start",
                flexWrap: "wrap",
              }}>
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: 8, flex: "0 0 auto",
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: step.color + "12",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <step.icon size={22} color={step.color} />
                  </div>
                  {i < 4 && (
                    <div style={{
                      width: 2, height: 40, background: colors.gray200,
                    }} />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 280 }}>
                  <span style={{
                    fontSize: 12, fontWeight: 600, color: step.color,
                    textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>{step.time}</span>
                  <h3 style={{
                    ...headingStyle, fontSize: 22, margin: "8px 0 10px",
                  }}>{step.title}</h3>
                  <p style={{ ...bodyStyle, fontSize: 16, margin: 0, maxWidth: 520 }}>{step.desc}</p>
                  <span style={{
                    display: "inline-block", marginTop: 12,
                    fontSize: 12, fontWeight: 600, color: step.color,
                    background: step.color + "10", padding: "4px 12px",
                    borderRadius: 100,
                  }}>{step.tag}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── WHY XCLEANERS ──────────────────────────────── */}
      <section style={{
        padding: "100px 0",
        background: `linear-gradient(165deg, ${colors.navy} 0%, ${colors.navyLight} 100%)`,
      }}>
        <div style={sectionStyle}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
              <p style={{
                fontSize: 13, fontWeight: 700, color: colors.blueLight,
                textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12,
              }}>Why Xcleaners</p>
              <h2 style={{
                ...headingStyle, fontSize: "clamp(28px, 4vw, 42px)",
                color: colors.white, marginBottom: 16,
              }}>
                The stress-free way to run your cleaning business
              </h2>
              <p style={{ ...bodyStyle, fontSize: 17, color: colors.gray400 }}>
                Built by cleaning business owners, for cleaning business owners.
              </p>
            </div>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}>
            {[
              {
                icon: Heart,
                title: "Built for cleaning",
                desc: "Not a generic tool. Every feature is designed for the reality of the cleaning industry.",
              },
              {
                icon: Zap,
                title: "Automation that works",
                desc: "Save 20+ hours per week with automated communications, billing, and reports.",
              },
              {
                icon: Shield,
                title: "Human support",
                desc: "Support from real people who understand your business. No bots, no waiting, no frustration.",
              },
              {
                icon: TrendingUp,
                title: "Proven results",
                desc: "Our clients grow an average of 35% in their first year using Xcleaners.",
              },
              {
                icon: Smartphone,
                title: "An app your team loves",
                desc: "Clean and intuitive interface. Your cleaners learn it in minutes, not hours.",
              },
              {
                icon: FileText,
                title: "Monthly updates",
                desc: "New features every month based on real feedback from our customers.",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 16,
                  padding: "28px 24px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.3s ease",
                }}>
                  <item.icon size={24} color={colors.blueLight} style={{ marginBottom: 16 }} />
                  <h3 style={{
                    fontSize: 17, fontWeight: 700, color: colors.white,
                    marginBottom: 8, fontFamily: "'Inter', system-ui, sans-serif",
                  }}>{item.title}</h3>
                  <p style={{
                    fontSize: 14, color: colors.gray400, lineHeight: 1.65,
                    fontFamily: "'Inter', system-ui, sans-serif", margin: 0,
                  }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────── */}
      <section id="testimonials" style={{ padding: "100px 0", background: colors.gray50 }}>
        <div style={sectionStyle}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
              <p style={{
                fontSize: 13, fontWeight: 700, color: colors.green,
                textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12,
              }}>Testimonials</p>
              <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 16 }}>
                Over 5,000 businesses trust Xcleaners
              </h2>
            </div>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}>
            <Reveal delay={0}>
              <TestimonialCard
                name="Jennifer Martinez"
                company="Sparkle Pro Cleaning"
                location="Austin, TX"
                quote="Before Xcleaners I spent 4 hours a day texting clients to organize my schedule. Now it takes 15 minutes. My revenue tripled in 8 months."
                metric="+200% revenue in 8 months"
              />
            </Reveal>
            <Reveal delay={100}>
              <TestimonialCard
                name="David Thompson"
                company="Elite Clean Services"
                location="Denver, CO"
                quote="Automated reminders eliminated 90% of our no-shows. My team of 15 runs like clockwork now."
                metric="90% fewer cancellations"
              />
            </Reveal>
            <Reveal delay={200}>
              <TestimonialCard
                name="Patricia Williams"
                company="Fresh Start Maids"
                location="Atlanta, GA"
                quote="I started solo and in one year built a team of 8. Xcleaners gave me the confidence to grow without losing quality."
                metric="From 1 to 8 employees in 1 year"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── GET STARTED ─────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: colors.white }}>
        <div style={sectionStyle}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
              <p style={{
                fontSize: 13, fontWeight: 700, color: colors.blue,
                textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12,
              }}>Get started</p>
              <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 16 }}>
                Up and running in 3 simple steps
              </h2>
              <p style={{ ...bodyStyle, fontSize: 17 }}>
                No technical skills needed. No contracts. No hassle.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
            <Reveal delay={0}><StepCard number="1" title="Download the app" desc="Available free on the App Store and Google Play. Create your account in under 2 minutes." /></Reveal>
            <Reveal delay={150}><StepCard number="2" title="Set up your business" desc="Import your clients and services. Our team helps you for free during this step." /></Reveal>
            <Reveal delay={300}><StepCard number="3" title="Let Xcleaners do the work" desc="Scheduling, billing, and communications on autopilot. Focus on growing your business." /></Reveal>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─────────────────────────────────────── */}
      <section id="pricing" style={{
        padding: "100px 0",
        background: `linear-gradient(165deg, ${colors.bluePale} 0%, ${colors.greenPale} 100%)`,
      }}>
        <div style={sectionStyle}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
              <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 16 }}>
                Plans that fit your budget
              </h2>
              <p style={{ ...bodyStyle, fontSize: 17 }}>
                Start free. No credit card. No surprises.
              </p>
            </div>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24, maxWidth: 940, margin: "0 auto",
          }}>
            {[
              {
                name: "Starter",
                price: "Free",
                period: "forever",
                desc: "Perfect for getting started",
                features: ["Up to 30 bookings/month", "1 team member", "Visual calendar", "Email notifications", "Email support"],
                cta: "Start Free",
                accent: colors.gray600,
                bg: colors.white,
              },
              {
                name: "Professional",
                price: "$49",
                period: "/month",
                desc: "For growing businesses",
                features: ["Unlimited bookings", "Up to 10 team members", "Automated SMS + Email", "Auto-billing", "Advanced reports", "Priority support"],
                cta: "Try Free for 14 Days",
                accent: colors.blue,
                bg: colors.white,
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$99",
                period: "/month",
                desc: "For large-scale operations",
                features: ["Everything in Professional", "Unlimited team members", "API integrations", "Dedicated account manager", "Custom reports", "VIP onboarding"],
                cta: "Talk to Sales",
                accent: colors.green,
                bg: colors.white,
              },
            ].map((plan, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{
                  background: plan.bg,
                  borderRadius: 20,
                  padding: "36px 28px",
                  boxShadow: plan.popular
                    ? `0 20px 60px ${colors.blue}20`
                    : "0 4px 20px rgba(11,29,53,0.06)",
                  border: plan.popular
                    ? `2px solid ${colors.blue}`
                    : `1px solid ${colors.gray200}`,
                  position: "relative",
                  transform: "none",
                }}>
                  {plan.popular && (
                    <div style={{
                      position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                      background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})`,
                      color: colors.white, padding: "4px 16px", borderRadius: 100,
                      fontSize: 12, fontWeight: 700,
                    }}>Most Popular</div>
                  )}
                  <h3 style={{
                    fontSize: 18, fontWeight: 700, color: plan.accent,
                    fontFamily: "'Inter', system-ui, sans-serif", marginBottom: 4,
                  }}>{plan.name}</h3>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{
                      fontSize: 40, fontWeight: 800, color: colors.navy,
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}>{plan.price}</span>
                    <span style={{ fontSize: 15, color: colors.gray400 }}>{plan.period}</span>
                  </div>
                  <p style={{
                    fontSize: 14, color: colors.gray600, marginBottom: 24,
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}>{plan.desc}</p>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{
                      display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
                    }}>
                      <CheckCircle2 size={16} color={colors.green} />
                      <span style={{
                        fontSize: 14, color: colors.gray800,
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}>{f}</span>
                    </div>
                  ))}
                  <a href="https://app.xcleaners.app/login" style={{ fontSize: 14, fontWeight: 600, color: colors.navy, textDecoration: "none", fontFamily: "'Inter', system-ui, sans-serif", }}>Log In</a>
            <a href="https://app.xcleaners.app/register" style={{
                    display: "block", textAlign: "center", marginTop: 24,
                    background: plan.popular
                      ? `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})`
                      : colors.gray50,
                    color: plan.popular ? colors.white : colors.navy,
                    padding: "14px 24px", borderRadius: 12,
                    fontSize: 15, fontWeight: 600, textDecoration: "none",
                    boxShadow: plan.popular ? `0 8px 24px ${colors.blue}30` : "none",
                    border: plan.popular ? "none" : `1px solid ${colors.gray200}`,
                    fontFamily: "'Inter', system-ui, sans-serif",
                    transition: "all 0.3s ease",
                  }}>{plan.cta}</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: colors.white }}>
        <div style={{ ...sectionStyle, maxWidth: 720 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ ...headingStyle, fontSize: "clamp(28px, 4vw, 36px)" }}>
                Frequently asked questions
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <FAQItem
                question="Is the trial really free?"
                answer="Yes! You get 14 full days with access to every feature, no credit card required. No catches."
              />
              <FAQItem
                question="Do I need any technical skills?"
                answer="Not at all. If you can use your phone, you can use Xcleaners. Plus our team sets everything up with you for free."
              />
              <FAQItem
                question="Can I cancel anytime?"
                answer="Yes. No contracts, no penalties, no red tape. Month to month, total freedom."
              />
              <FAQItem
                question="How do I import my existing clients?"
                answer="Send us your client list by spreadsheet, photo of your notebook, or any format. Our team imports everything for you at no extra cost."
              />
              <FAQItem
                question="Does Xcleaners work for small businesses?"
                answer="Absolutely! We have a free-forever plan that's perfect for getting started. You grow, Xcleaners grows with you."
              />
              <FAQItem
                question="Is my data secure?"
                answer="We use bank-level encryption and secure servers. Your data and your clients' data are fully protected."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────── */}
      <section id="download" style={{
        padding: "100px 0",
        background: `linear-gradient(165deg, ${colors.navy} 0%, ${colors.navyLight} 100%)`,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -100, right: -100,
          width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.blue}15 0%, transparent 70%)`,
        }} />
        <div style={{
          position: "absolute", bottom: -100, left: -100,
          width: 300, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.green}10 0%, transparent 70%)`,
        }} />

        <div style={{ ...sectionStyle, textAlign: "center", position: "relative" }}>
          <Reveal>
            <h2 style={{
              ...headingStyle, fontSize: "clamp(28px, 4vw, 46px)",
              color: colors.white, marginBottom: 20, maxWidth: 700, margin: "0 auto 20px",
            }}>
              Your cleaning business deserves real technology
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{
              ...bodyStyle, fontSize: 18, color: colors.gray400,
              maxWidth: 520, margin: "0 auto 40px",
            }}>
              Join 5,000+ businesses that already transformed their operations with Xcleaners.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div style={{
              display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
              marginBottom: 32,
            }}>
              <a href="#" style={{
                display: "inline-flex", alignItems: "center", gap: 12,
                background: colors.white, color: colors.navy,
                padding: "16px 36px", borderRadius: 14,
                fontSize: 16, fontWeight: 700, textDecoration: "none",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}>
                <svg width="20" height="24" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                Download for iOS
              </a>
              <a href="#" style={{
                display: "inline-flex", alignItems: "center", gap: 12,
                background: `linear-gradient(135deg, ${colors.green}, ${colors.greenLight})`,
                color: colors.white,
                padding: "16px 36px", borderRadius: 14,
                fontSize: 16, fontWeight: 700, textDecoration: "none",
                boxShadow: `0 8px 32px ${colors.green}40`,
                transition: "all 0.3s ease",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}>
                <svg width="20" height="22" viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                Download for Android
              </a>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div style={{
              display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap",
            }}>
              {[
                "14-day free trial",
                "No credit card needed",
                "Cancel anytime",
              ].map((text, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={16} color={colors.greenLight} />
                  <span style={{ fontSize: 14, color: colors.gray400 }}>{text}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────── */}
      <footer style={{
        background: colors.navy,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "60px 0 32px",
      }}>
        <div style={sectionStyle}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40, marginBottom: 48,
          }}>
            <div>
              <div style={{ marginBottom: 16 }}>
                <img src="/logo.png" alt="Xcleaners" style={{ height: 44, width: "auto", filter: "brightness(0) invert(1)" }} />
              </div>
              <p style={{
                fontSize: 14, color: colors.gray400, lineHeight: 1.65, maxWidth: 280,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}>
                The most complete software for residential and commercial cleaning businesses.
              </p>
            </div>

            <div>
              <h4 style={{
                fontSize: 13, fontWeight: 700, color: colors.gray400,
                textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: 20, fontFamily: "'Inter', system-ui, sans-serif",
              }}>Product</h4>
              {["Features", "Pricing", "Integrations", "Updates"].map((link) => (
                <a key={link} href="#" style={{
                  display: "block", fontSize: 14, color: colors.gray400,
                  textDecoration: "none", marginBottom: 12,
                  fontFamily: "'Inter', system-ui, sans-serif",
                  transition: "color 0.2s",
                }}>{link}</a>
              ))}
            </div>

            <div>
              <h4 style={{
                fontSize: 13, fontWeight: 700, color: colors.gray400,
                textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: 20, fontFamily: "'Inter', system-ui, sans-serif",
              }}>Resources</h4>
              {["Blog", "Guides", "Community", "Support"].map((link) => (
                <a key={link} href="#" style={{
                  display: "block", fontSize: 14, color: colors.gray400,
                  textDecoration: "none", marginBottom: 12,
                  fontFamily: "'Inter', system-ui, sans-serif",
                  transition: "color 0.2s",
                }}>{link}</a>
              ))}
            </div>

            <div>
              <h4 style={{
                fontSize: 13, fontWeight: 700, color: colors.gray400,
                textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: 20, fontFamily: "'Inter', system-ui, sans-serif",
              }}>Company</h4>
              {["About Us", "Careers", "Contact", "Privacy Policy"].map((link) => (
                <a key={link} href="#" style={{
                  display: "block", fontSize: 14, color: colors.gray400,
                  textDecoration: "none", marginBottom: 12,
                  fontFamily: "'Inter', system-ui, sans-serif",
                  transition: "color 0.2s",
                }}>{link}</a>
              ))}
            </div>
          </div>

          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 16,
          }}>
            <p style={{
              fontSize: 13, color: colors.gray400, margin: 0,
              fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              © 2026 Xcleaners. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              {["Instagram", "Facebook", "YouTube", "LinkedIn"].map((social) => (
                <a key={social} href="#" style={{
                  fontSize: 13, color: colors.gray400, textDecoration: "none",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  transition: "color 0.2s",
                }}>{social}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
