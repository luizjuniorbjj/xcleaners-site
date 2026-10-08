import {
  Calendar, Users, Smartphone, BarChart3, Bell, ChevronRight, CheckCircle2,
  MessageSquare, MapPin, Star, CreditCard, Sparkles,
} from "lucide-react";
import { colors, MONO, SANS } from "../tokens";

// Every string on these screens already exists on the landing page
// (hero mockup, "A typical week" steps, AI assistant section). No new claims.
const APPOINTMENTS = [
  { time: "08:00", client: "Sarah Johnson", type: "Deep Clean", status: colors.green },
  { time: "10:30", client: "Mike Davis", type: "Express Clean", status: colors.blue },
  { time: "14:00", client: "Emily Clark", type: "Move-out Clean", status: colors.greenLight },
];

const p = (extra) => ({ margin: 0, fontFamily: SANS, ...extra });

function Row({ apt, trailing }) {
  return (
    <div style={{
      margin: "0 16px 8px", padding: "12px 14px", background: colors.white,
      borderRadius: 14, display: "flex", alignItems: "center", gap: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      borderLeft: `3px solid ${apt.status}`,
    }}>
      <p style={p({ fontSize: 11, fontWeight: 700, color: colors.blue })}>{apt.time}</p>
      <div style={{ flex: 1 }}>
        <p style={p({ fontSize: 13, fontWeight: 600, color: colors.navy })}>{apt.client}</p>
        <p style={p({ fontSize: 11, color: colors.gray400 })}>{apt.type}</p>
      </div>
      {trailing || <ChevronRight size={14} color={colors.gray400} />}
    </div>
  );
}

function Header({ eyebrow, title, icon: Icon = Bell }) {
  return (
    <div style={{ padding: "8px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <p style={p({ fontSize: 12, color: colors.gray400 })}>{eyebrow}</p>
        <p style={p({ fontSize: 17, fontWeight: 700, color: colors.navy })}>{title}</p>
      </div>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: `linear-gradient(135deg, ${colors.green}, ${colors.greenLight})`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={16} color={colors.white} />
      </div>
    </div>
  );
}

function Stats() {
  return (
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
          <p style={p({ fontSize: 16, fontWeight: 800, color: s.color, fontFamily: MONO })}>{s.value}</p>
          <p style={p({ fontSize: 10, color: colors.gray400 })}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function Bubble({ mine, children }) {
  return (
    <div style={{
      margin: "0 16px 8px",
      alignSelf: mine ? "flex-end" : "flex-start",
      maxWidth: "82%",
      background: mine ? `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})` : colors.white,
      color: mine ? colors.white : colors.gray800,
      padding: "10px 12px", borderRadius: mine ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
      fontSize: 12, lineHeight: 1.45, fontFamily: SANS,
      boxShadow: "0 2px 8px rgba(11,29,53,0.04)",
    }}>{children}</div>
  );
}

const SCREENS = {
  schedule: () => (
    <>
      <Header eyebrow="Good morning" title="My Schedule" />
      <Stats />
      {APPOINTMENTS.map((apt, i) => <Row key={i} apt={apt} />)}
    </>
  ),
  requests: () => (
    <>
      <Header eyebrow="Monday, 7 AM" title="Quote requests" icon={Sparkles} />
      <div style={{ margin: "0 16px 12px", display: "inline-flex", alignItems: "center", gap: 8, background: colors.bluePale, borderRadius: 100, padding: "6px 12px" }}>
        <span style={{ fontFamily: MONO, fontWeight: 600, fontSize: 13, color: colors.blue }}>12</span>
        <span style={p({ fontSize: 12, color: colors.navy, fontWeight: 600 })}>new quote requests</span>
      </div>
      {APPOINTMENTS.map((apt, i) => (
        <Row key={i} apt={{ ...apt, time: "New" }} trailing={<Sparkles size={14} color={colors.blue} />} />
      ))}
    </>
  ),
  calendar: () => (
    <>
      <Header eyebrow="Monday, 8 AM" title="Visual scheduling" icon={Calendar} />
      <Stats />
      {APPOINTMENTS.map((apt, i) => <Row key={i} apt={apt} trailing={<MapPin size={14} color={colors.gray400} />} />)}
    </>
  ),
  confirmations: () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header eyebrow="Tuesday" title="Automation" icon={MessageSquare} />
      <Bubble>Confirmed: <strong>Deep Clean</strong> for Sarah Johnson, <span style={{ fontFamily: MONO }}>tomorrow 10:00</span>.</Bubble>
      <Bubble mine>Thanks! See you then.</Bubble>
      <Bubble>Confirmed: <strong>Express Clean</strong> for Mike Davis, <span style={{ fontFamily: MONO }}>10:30</span>.</Bubble>
      <div style={{ margin: "4px 16px 0", display: "flex", alignItems: "center", gap: 6 }}>
        <CheckCircle2 size={14} color={colors.green} />
        <span style={p({ fontSize: 11, color: colors.gray600 })}>SMS and email sent automatically</span>
      </div>
    </div>
  ),
  team: () => (
    <>
      <Header eyebrow="Day of service" title="Team app" icon={Smartphone} />
      <Row apt={APPOINTMENTS[0]} trailing={<MapPin size={14} color={colors.blue} />} />
      {["Address", "Checklist", "Client notes", "Optimized route"].map((t, i) => (
        <div key={i} style={{ margin: "0 16px 8px", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: colors.white, borderRadius: 12 }}>
          <CheckCircle2 size={16} color={colors.green} />
          <span style={p({ fontSize: 13, color: colors.navy, fontWeight: 600 })}>{t}</span>
        </div>
      ))}
    </>
  ),
  payment: () => (
    <>
      <Header eyebrow="After the job" title="Auto-billing" icon={CreditCard} />
      <div style={{ margin: "0 16px 8px", padding: "14px", background: colors.white, borderRadius: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
        <p style={p({ fontSize: 11, color: colors.gray400 })}>Invoice · Deep Clean</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={p({ fontSize: 13, fontWeight: 600, color: colors.navy })}>Sarah Johnson</p>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: colors.green, fontWeight: 700, fontSize: 12, fontFamily: SANS }}>
            <CheckCircle2 size={14} /> Paid
          </span>
        </div>
      </div>
      <div style={{ margin: "0 16px 8px", padding: "14px", background: colors.white, borderRadius: 14, display: "flex", gap: 4 }}>
        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />)}
        <span style={p({ fontSize: 11, color: colors.gray400, marginLeft: 6 })}>Review received</span>
      </div>
      <Stats />
    </>
  ),
};

export default function PhoneMockup({ screen = "schedule", className = "", style }) {
  const Screen = SCREENS[screen] || SCREENS.schedule;
  return (
    <div className={className} style={{
      width: 280, height: 560, borderRadius: 40,
      background: colors.navy,
      padding: 12,
      boxShadow: "0 40px 80px rgba(11,29,53,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset",
      position: "relative",
      overflow: "hidden",
      ...style,
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
          <span style={{ fontSize: 13, fontWeight: 700, color: colors.navy, fontFamily: MONO }}>9:41</span>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ width: 16, height: 10, borderRadius: 3, background: colors.navy }} />
            <div style={{ width: 20, height: 10, borderRadius: 3, background: colors.green }} />
          </div>
        </div>
        <div key={screen} className="screen" style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
          <Screen />
        </div>
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

// Small satellite cards for the hero rig — content lifted from the mockup.
export function PlateNextJob() {
  const apt = APPOINTMENTS[1];
  return (
    <div style={{ width: 220, background: colors.white, borderRadius: 16, padding: "12px 14px", boxShadow: "0 24px 48px rgba(11,29,53,0.18)", border: `1px solid ${colors.gray100}` }}>
      <p style={p({ fontSize: 11, color: colors.gray400, marginBottom: 6 })}>Next job</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: MONO, fontWeight: 600, fontSize: 12, color: colors.blue }}>{apt.time}</span>
        <div>
          <p style={p({ fontSize: 13, fontWeight: 600, color: colors.navy })}>{apt.client}</p>
          <p style={p({ fontSize: 11, color: colors.gray400 })}>{apt.type}</p>
        </div>
      </div>
    </div>
  );
}

export function PlatePaid() {
  return (
    <div style={{ width: 200, background: colors.white, borderRadius: 16, padding: "12px 14px", boxShadow: "0 24px 48px rgba(11,29,53,0.18)", border: `1px solid ${colors.gray100}`, display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: colors.greenPale, display: "grid", placeItems: "center" }}>
        <CheckCircle2 size={16} color={colors.green} />
      </div>
      <div>
        <p style={p({ fontSize: 13, fontWeight: 600, color: colors.navy })}>Paid</p>
        <p style={p({ fontSize: 11, color: colors.gray400 })}>Deep Clean · Sarah Johnson</p>
      </div>
    </div>
  );
}
