import { motion } from 'motion/react';

/* ───── Bubble component ───── */
interface BubbleProps {
  size: number;
  x: string;
  y: string;
  color: string;
  delay?: number;
  duration?: number;
  blur?: string;
}

function Bubble({ size, x, y, color, delay = 0, duration = 20, blur = 'blur-2xl' }: BubbleProps) {
  return (
    <motion.div
      className={`absolute rounded-full ${blur} pointer-events-none`}
      style={{ width: size, height: size, left: x, top: y, background: color }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 15, -10, 20, 0],
        scale: [1, 1.08, 0.95, 1.05, 1],
      }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ───── Floating Bubbles layer (fixed, behind everything) ───── */
export function BubbleBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large ambient blobs */}
      <Bubble size={600} x="-10%" y="-15%" color="rgba(59,130,246,0.06)" delay={0} duration={25} blur="blur-3xl" />
      <Bubble size={500} x="65%" y="10%" color="rgba(168,85,247,0.05)" delay={3} duration={28} blur="blur-3xl" />
      <Bubble size={450} x="20%" y="55%" color="rgba(34,197,94,0.04)" delay={5} duration={22} blur="blur-3xl" />
      <Bubble size={400} x="75%" y="60%" color="rgba(249,115,22,0.04)" delay={8} duration={30} blur="blur-3xl" />
      <Bubble size={350} x="-5%" y="80%" color="rgba(236,72,153,0.04)" delay={2} duration={26} blur="blur-3xl" />

      {/* Medium decorative bubbles */}
      <Bubble size={120} x="10%" y="20%" color="rgba(59,130,246,0.08)" delay={1} duration={16} blur="blur-xl" />
      <Bubble size={90} x="80%" y="30%" color="rgba(168,85,247,0.08)" delay={4} duration={18} blur="blur-xl" />
      <Bubble size={100} x="50%" y="70%" color="rgba(34,197,94,0.07)" delay={6} duration={14} blur="blur-xl" />
      <Bubble size={80} x="30%" y="85%" color="rgba(249,115,22,0.07)" delay={3} duration={20} blur="blur-xl" />
      <Bubble size={110} x="85%" y="75%" color="rgba(59,130,246,0.06)" delay={7} duration={17} blur="blur-xl" />

      {/* Small crisp bubbles */}
      <Bubble size={40} x="15%" y="35%" color="rgba(59,130,246,0.12)" delay={2} duration={12} blur="blur-lg" />
      <Bubble size={30} x="70%" y="15%" color="rgba(168,85,247,0.12)" delay={5} duration={10} blur="blur-lg" />
      <Bubble size={35} x="45%" y="50%" color="rgba(34,197,94,0.10)" delay={0} duration={11} blur="blur-lg" />
      <Bubble size={25} x="90%" y="45%" color="rgba(249,115,22,0.10)" delay={4} duration={13} blur="blur-lg" />
      <Bubble size={28} x="5%" y="60%" color="rgba(236,72,153,0.10)" delay={6} duration={9} blur="blur-lg" />
      <Bubble size={20} x="55%" y="25%" color="rgba(59,130,246,0.15)" delay={1} duration={8} blur="blur-md" />
      <Bubble size={18} x="35%" y="10%" color="rgba(168,85,247,0.14)" delay={3} duration={9} blur="blur-md" />
      <Bubble size={22} x="60%" y="90%" color="rgba(34,197,94,0.12)" delay={7} duration={10} blur="blur-md" />
    </div>
  );
}

/* ───── Reusable CSS class strings ───── */
export const glass = 'bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/[0.03]';
export const glassSubtle = 'bg-white/30 backdrop-blur-lg border border-white/50 shadow-md shadow-black/[0.02]';
export const glassCard = 'bg-white/50 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/[0.04]';
export const glassHover = 'hover:bg-white/60 hover:shadow-xl hover:shadow-black/[0.06] hover:border-white/80 transition-all duration-300';
export const glassNav = 'bg-white/50 backdrop-blur-2xl border-b border-white/40';
export const glassInput = 'bg-white/50 backdrop-blur-sm border border-white/60 focus:bg-white/70 focus:border-blue-300 transition-all';
export const glassSection = 'bg-white/20 backdrop-blur-sm rounded-3xl border border-white/30';

/* ───── Page wrapper with bubbles + gradient bg ───── */
export function GlassPage({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 relative ${className}`}>
      <BubbleBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
