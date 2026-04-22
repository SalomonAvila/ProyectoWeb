import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  getCurrentUser,
  mockShifts,
  mockLeaderboard,
  mockIncidents,
  type Shift,
} from "../lib/mockData";
import {
  MapPin,
  Clock,
  LogOut,
  Award,
  TrendingUp,
  Bell,
  Trophy,
  Star,
  X,
  CheckCircle,
  Target,
  Route,
  FileText,
  Medal,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Minus,
  AlertTriangle,
  ShieldCheck,
  Users,
  Zap,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  GlassPage,
  glass,
  glassCard,
  glassHover,
  glassNav,
} from "../components/GlassEffects";

export function TeacherDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [shifts] = useState<Shift[]>(
    mockShifts.filter((s) => s.teacherId === "t1"),
  );
  const [showNotifications, setShowNotifications] =
    useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [activeStatDetail, setActiveStatDetail] = useState<
    "punctuality" | "patrols" | "reports" | "ranking" | null
  >(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reminder",
      message: "Turno en Patio Principal inicia en 15 minutos",
      time: "8:45 AM",
      read: false,
      zone: "Patio Principal",
      startTime: "9:00 AM",
      shiftId: "s1",
      actionable: true,
    },
    {
      id: 2,
      type: "achievement",
      message:
        "¡Has alcanzado 100% de puntualidad esta semana!",
      time: "8:00 AM",
      read: false,
      actionable: false,
    },
    {
      id: 3,
      type: "reminder",
      message:
        "Recuerda completar tu recorrido de las 10:30 AM",
      time: "7:30 AM",
      read: true,
      actionable: false,
    },
  ]);

  const [availableShift] = useState({
    id: "available-1",
    zoneName: "Cafetería",
    date: "2026-02-26",
    startTime: "11:00",
    endTime: "11:30",
    canceledBy: "Prof. María González"
  });

  const [showAvailableShift, setShowAvailableShift] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "teacher") {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user || user.role !== "teacher") {
    return null;
  }

  const handleLogout = () => {
    navigate("/");
  };

  const handleOpenShift = (shiftId: string) => {
    navigate(`/teacher/shift/${shiftId}`);
  };

  const handleCantMakeIt = (shift: Shift) => {
    toast.success(
      "Solicitud de reemplazo enviada al coordinador",
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true })),
    );
    toast.success(
      "Todas las notificaciones marcadas como leídas",
    );
  };

  const handleDismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleTakeShift = () => {
    toast.success("Turno asignado exitosamente");
    setShowAvailableShift(false);
  };

  const unreadCount = notifications.filter(
    (n) => !n.read,
  ).length;

  const todayShifts = shifts.filter(
    (s) => s.date === "2026-02-26",
  );
  const activeShift = todayShifts.find(
    (s) => s.status === "active",
  );
  const upcomingShifts = todayShifts.filter(
    (s) => s.status === "pending",
  );
  const completedShifts = todayShifts.filter(
    (s) => s.status === "completed",
  );

  // All completed shifts for history
  const allCompletedShifts = shifts.filter(
    (s) => s.status === "completed",
  );

  const myLeaderboard = mockLeaderboard.find(
    (l) => l.teacherId === "t1",
  );
  const stats = {
    punctualityScore: myLeaderboard?.punctualityRate || 95,
    patrolsThisWeek: myLeaderboard?.patrolsTotal || 24,
    incidentsReported: myLeaderboard?.incidentsReported || 12,
    rank:
      mockLeaderboard.findIndex((l) => l.teacherId === "t1") +
      1,
    points: myLeaderboard?.points || 850,
    badges: myLeaderboard?.badges || [],
  };

  const punctualityDetail = {
    weeklyRate: [
      {
        day: "Lun",
        onTime: true,
        checkIn: "10:00",
        expected: "10:00",
      },
      {
        day: "Mar",
        onTime: true,
        checkIn: "11:58",
        expected: "12:00",
      },
      {
        day: "Mié",
        onTime: true,
        checkIn: "10:00",
        expected: "10:00",
      },
      {
        day: "Jue",
        onTime: false,
        checkIn: "10:04",
        expected: "10:00",
      },
      {
        day: "Vie",
        onTime: true,
        checkIn: "12:00",
        expected: "12:00",
      },
    ],
    monthlyRate: 96,
    streak: 8,
    totalOnTime: 23,
    totalShifts: 24,
    avgArrivalDiff: -1.2,
  };

  const patrolsDetail = {
    byZone: [
      { zone: "Patio Principal", count: 22, required: 20 },
      { zone: "Cancha Deportiva", count: 18, required: 16 },
      { zone: "Cafetería", count: 16, required: 14 },
      { zone: "Jardín", count: 10, required: 10 },
      { zone: "Pasillo Primaria", count: 6, required: 6 },
    ],
    weeklyTrend: [
      { week: "Sem 1", count: 16 },
      { week: "Sem 2", count: 18 },
      { week: "Sem 3", count: 20 },
      { week: "Sem 4", count: 18 },
    ],
    avgPerShift: 3.0,
    totalThisMonth: 72,
    completionRate: 100,
  };

  const reportsDetail = {
    byType: [
      {
        type: "Físico",
        count: 4,
        icon: "🩹",
        color: "bg-red-100 text-red-700",
      },
      {
        type: "Convivencia",
        count: 3,
        icon: "🤝",
        color: "bg-yellow-100 text-yellow-700",
      },
      {
        type: "Espacio",
        count: 3,
        icon: "🏫",
        color: "bg-blue-100 text-blue-700",
      },
      {
        type: "Social",
        count: 2,
        icon: "👥",
        color: "bg-purple-100 text-purple-700",
      },
    ],
    bySeverity: [
      {
        level: "S1 - Leve",
        count: 5,
        color: "bg-green-100 text-green-700",
      },
      {
        level: "S2 - Moderado",
        count: 5,
        color: "bg-yellow-100 text-yellow-700",
      },
      {
        level: "S3 - Grave",
        count: 2,
        color: "bg-red-100 text-red-700",
      },
    ],
    resolvedRate: 83,
    recentReports: [
      {
        date: "26 Feb",
        zone: "Patio Principal",
        type: "Convivencia",
        severity: "S2",
        description: "Discusión verbal entre estudiantes",
        resolved: true,
      },
      {
        date: "26 Feb",
        zone: "Patio Principal",
        type: "Físico",
        severity: "S1",
        description: "Estudiante tropezó al correr",
        resolved: true,
      },
      {
        date: "25 Feb",
        zone: "Cafetería",
        type: "Espacio",
        severity: "S1",
        description: "Silla rota en mesa 4",
        resolved: true,
      },
      {
        date: "24 Feb",
        zone: "Jardín",
        type: "Social",
        severity: "S2",
        description: "Estudiante aislado repetidamente",
        resolved: false,
      },
      {
        date: "23 Feb",
        zone: "Cancha Deportiva",
        type: "Físico",
        severity: "S2",
        description: "Golpe accidental durante juego",
        resolved: true,
      },
    ],
    avgPerWeek: 3,
  };

  const myRank =
    mockLeaderboard.findIndex((l) => l.teacherId === "t1") + 1;
  const rankingDetail = {
    currentRank: myRank,
    totalParticipants: mockLeaderboard.length,
    previousRank: 2,
    pointsBreakdown: [
      {
        source: "Turnos completados",
        points: 24 * 100,
        detail: "24 × 100 pts",
      },
      {
        source: "Recorridos",
        points: 72 * 25,
        detail: "72 × 25 pts",
      },
      {
        source: "Reportes",
        points: 12 * 50,
        detail: "12 × 50 pts",
      },
      {
        source: "Bonos puntualidad",
        points: 250,
        detail: "5 semanas perfectas",
      },
    ],
    nearbyRanking: mockLeaderboard
      .slice(0, 5)
      .map((entry, idx) => ({
        rank: idx + 1,
        name: entry.teacherName,
        points: entry.points,
        department: entry.department,
        isMe: entry.teacherId === "t1",
      })),
    badgesEarned: myLeaderboard?.badges || [],
    nextBadge: {
      name: "Centurión",
      requirement: "Completar 100 turnos",
      progress: 24,
      target: 100,
    },
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`${glassNav} sticky top-0 z-20`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-row justify-between items-center gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-xl font-semibold text-gray-900 tracking-tight truncate">
                {user.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                Portal Docente
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={() => setShowNotifications(true)}
                className={`relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl ${glass} ${glassHover}`}
              >
                <Bell className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-gray-700" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors px-2 sm:px-3 py-2 whitespace-nowrap"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-8 sm:space-y-12">
        {/* Quick Report Button */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.button
            onClick={() => navigate("/teacher/report")}
            className="w-full bg-gradient-to-r from-red-300 to-rose-300 hover:from-red-400 hover:to-rose-400 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 text-white shadow-xl shadow-red-300/30 hover:shadow-2xl hover:shadow-red-400/40 transition-all relative overflow-hidden group"
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute top-4 right-16 w-16 h-16 bg-white/5 rounded-full blur-xl" />
            <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/25 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-semibold">
                  Reportar
                </div>
                <div className="text-sm sm:text-base text-red-50 opacity-90">
                  Registra un incidente de manera inmediata
                </div>
              </div>
            </div>
          </motion.button>
        </motion.section>

        {/* Available Shift - Canceled by another teacher */}
        {showAvailableShift && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <motion.div 
              className={`${glass} rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 relative overflow-hidden border-2 border-blue-300/50`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Turno Disponible
                      </h3>
                      <p className="text-sm text-gray-600">
                        {availableShift.canceledBy} canceló este turno
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                        {availableShift.zoneName}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {availableShift.startTime} - {availableShift.endTime}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleTakeShift}
                  className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-medium rounded-xl sm:rounded-2xl transition-all shadow-lg shadow-blue-500/25"
                >
                  Tomar Turno
                </button>
              </div>
            </motion.div>
          </motion.section>
        )}

        {/* Upcoming Shifts */}
        {upcomingShifts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className={`${glass} rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 relative overflow-hidden`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
                  Próximos Turnos
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {upcomingShifts.map((shift, idx) => (
                    <motion.div
                      key={shift.id}
                      className="bg-white/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 group transition-all hover:bg-white/60"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                            {shift.zoneName}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 flex-shrink-0" />
                              {shift.startTime} - {shift.endTime}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleCantMakeIt(shift)}
                          className={`px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-700 rounded-xl transition-all self-start sm:self-auto ${glass} ${glassHover}`}
                        >
                          No puedo asistir
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.section>
        )}

        {/* Completed Shifts */}
        {completedShifts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div 
              className={`${glass} rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 relative overflow-hidden`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Completados Hoy
                  </h2>
                  <button
                    onClick={() => setShowHistory(true)}
                    className={`px-4 py-2 text-sm font-medium text-gray-700 rounded-xl transition-all ${glassHover} bg-white/40 hover:bg-white/60`}
                  >
                    Historial
                  </button>
                </div>
                <div className="space-y-3">
                  {completedShifts.map((shift, idx) => (
                    <motion.div
                      key={shift.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="bg-white/40 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between transition-colors cursor-pointer hover:bg-white/60"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100/80 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 text-sm sm:text-base truncate">
                            {shift.zoneName}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            {shift.startTime} - {shift.endTime} ·{" "}
                            {shift.patrolCount || 0} recorridos
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-green-600 font-medium flex-shrink-0">
                        Completado
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.section>
        )}

        {/* Gamification Banner */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            onClick={() => setShowLeaderboard(true)}
            className="w-full text-left bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 text-white shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/30 transition-all relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-white/[0.06]" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute top-4 right-20 w-20 h-20 bg-white/5 rounded-full blur-xl" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
                  <Trophy className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-semibold mb-1">
                    {stats.points} pts
                  </div>
                  <div className="text-purple-100 text-sm">
                    Ranking #{stats.rank} del mes · Toca para
                    ver ranking
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.1, type: "spring", stiffness: 200 }}
                    >
                      <Star
                        className="w-6 h-6 text-yellow-300"
                        fill="currentColor"
                      />
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8, type: "spring", stiffness: 200 }}
                  >
                    <Star
                      className="w-6 h-6 text-white/30"
                      fill="none"
                      stroke="currentColor"
                    />
                  </motion.div>
                </div>
                <motion.div 
                  className="text-lg font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                >
                  4/5
                </motion.div>
              </div>
            </div>
          </motion.button>
        </motion.section>

        {/* Stats */}

        {/* Active Shift */}
        {activeShift && (
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 text-white shadow-2xl shadow-blue-500/25 relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -6, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-white/[0.06]" />
              <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-white/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs sm:text-sm mb-3 sm:mb-4 border border-white/20">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Turno Activo
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-2">
                      {activeShift.zoneName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-blue-100">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {activeShift.startTime} -{" "}
                        {activeShift.endTime}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4" />
                        {activeShift.patrolCount || 0}{" "}
                        recorridos
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleOpenShift(activeShift.id)
                  }
                  className="w-full py-3.5 sm:py-4 bg-white/90 backdrop-blur-sm text-blue-600 font-medium rounded-xl sm:rounded-2xl hover:bg-white transition-all"
                >
                  Abrir Turno
                </button>
              </div>
            </motion.div>
          </motion.section>
        )}
      </div>

      {/* Notifications Dialog */}
      <Dialog
        open={showNotifications}
        onOpenChange={setShowNotifications}
      >
        <DialogContent className="rounded-3xl border-0 max-w-md backdrop-blur-xl bg-white/90">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-semibold">
              Notificaciones
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              {unreadCount > 0
                ? `${unreadCount} sin leer`
                : "Todo al día"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Marcar todas como leídas
              </button>
            )}
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                <p>No hay notificaciones</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Reminders Category */}
                {notifications.filter(n => n.type === "reminder").length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
                      Recordatorios
                    </h3>
                    <div className="space-y-3">
                      {notifications.filter(n => n.type === "reminder").map((notif) => (
                        <div
                          key={notif.id}
                          className={`rounded-2xl p-4 border relative backdrop-blur-sm ${
                            notif.read
                              ? "bg-white/50 border-gray-200/60"
                              : "bg-blue-50/70 border-blue-200/60"
                          }`}
                        >
                          <button
                            onClick={() =>
                              handleDismissNotification(notif.id)
                            }
                            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
                          >
                            <X className="w-3.5 h-3.5 text-gray-500" />
                          </button>
                          <div className="pr-6">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-100/80">
                                <Clock className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 mb-1">
                                  {notif.message}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {notif.time}
                                </p>
                                {(notif as any).zone && (
                                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-700">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3 flex-shrink-0" />
                                      {(notif as any).zone}
                                    </span>
                                    {(notif as any).startTime && (
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 flex-shrink-0" />
                                        {(notif as any).startTime}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            {notif.actionable && (notif as any).shiftId && (
                              <button
                                onClick={() =>
                                  handleOpenShift((notif as any).shiftId)
                                }
                                className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-lg text-sm hover:from-blue-600 hover:to-cyan-500 transition-all"
                              >
                                Ver Turno
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Achievements Category */}
                {notifications.filter(n => n.type === "achievement").length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
                      Logros
                    </h3>
                    <div className="space-y-3">
                      {notifications.filter(n => n.type === "achievement").map((notif) => (
                        <div
                          key={notif.id}
                          className="rounded-2xl p-4 border relative backdrop-blur-sm bg-green-50/70 border-green-200/60"
                        >
                          <button
                            onClick={() =>
                              handleDismissNotification(notif.id)
                            }
                            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
                          >
                            <X className="w-3.5 h-3.5 text-gray-500" />
                          </button>
                          <div className="pr-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-green-100/80">
                                <Award className="w-4 h-4 text-green-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 mb-1">
                                  {notif.message}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {notif.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Leaderboard Dialog */}
      <Dialog
        open={showLeaderboard}
        onOpenChange={setShowLeaderboard}
      >
        <DialogContent className="rounded-3xl border-0 max-w-lg backdrop-blur-xl bg-white/90">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-semibold flex items-center gap-3">
              <Trophy className="w-7 h-7 text-purple-600" />
              Ranking Institucional
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Clasificación por puntos acumulados este mes
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-2 max-h-96 overflow-y-auto">
            {mockLeaderboard.map((entry, index) => {
              const isMe = entry.teacherId === "t1";
              return (
                <div
                  key={entry.teacherId}
                  className={`rounded-2xl p-4 flex items-center gap-4 backdrop-blur-sm ${
                    isMe
                      ? "bg-purple-50/70 border-2 border-purple-300/60"
                      : "bg-white/40 border border-white/50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${
                      index === 0
                        ? "bg-yellow-400 text-yellow-900"
                        : index === 1
                          ? "bg-gray-300 text-gray-700"
                          : index === 2
                            ? "bg-orange-300 text-orange-900"
                            : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">
                      {entry.teacherName} {isMe && "(Tú)"}
                    </div>
                    <div className="text-xs text-gray-600">
                      {entry.department} · {entry.badges.length}{" "}
                      insignias
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-semibold text-purple-600">
                      {entry.points}
                    </div>
                    <div className="text-xs text-gray-500">
                      pts
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Punctuality Detail Dialog */}
      <Dialog
        open={activeStatDetail === "punctuality"}
        onOpenChange={(open) =>
          !open && setActiveStatDetail(null)
        }
      >
        <DialogContent className="rounded-3xl border-0 max-w-md backdrop-blur-xl bg-white/90">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-semibold flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100/80 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              Puntualidad
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Detalle de llegadas a tus turnos asignados
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 pt-2">
            <div className="grid grid-cols-3 gap-3">
              <div
                className={`${glass} rounded-xl p-3 text-center`}
              >
                <div className="text-xl font-semibold text-green-700">
                  {stats.punctualityScore}%
                </div>
                <div className="text-[11px] text-gray-600 mt-0.5">
                  Tasa actual
                </div>
              </div>
              <div
                className={`${glass} rounded-xl p-3 text-center`}
              >
                <div className="text-xl font-semibold text-green-700">
                  {punctualityDetail.streak}
                </div>
                <div className="text-[11px] text-gray-600 mt-0.5">
                  Racha actual
                </div>
              </div>
              <div
                className={`${glass} rounded-xl p-3 text-center`}
              >
                <div className="text-xl font-semibold text-green-700">
                  {punctualityDetail.avgArrivalDiff > 0
                    ? "+"
                    : ""}
                  {punctualityDetail.avgArrivalDiff}m
                </div>
                <div className="text-[11px] text-gray-600 mt-0.5">
                  Prom. llegada
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Esta semana
              </h4>
              <div className="space-y-2">
                {punctualityDetail.weeklyRate.map((day, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 ${glass} rounded-xl px-4 py-2.5`}
                  >
                    <span className="text-sm font-medium text-gray-700 w-8">
                      {day.day}
                    </span>
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        Esperado: {day.expected}
                      </span>
                      <span className="text-xs text-gray-400">
                        →
                      </span>
                      <span className="text-xs font-medium text-gray-700">
                        Llegada: {day.checkIn}
                      </span>
                    </div>
                    {day.onTime ? (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={`${glass} rounded-xl p-4`}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Puntualidad mensual
                </span>
                <span className="text-sm font-semibold text-green-600">
                  {punctualityDetail.totalOnTime}/
                  {punctualityDetail.totalShifts}
                </span>
              </div>
              <div className="mt-2 h-2 bg-gray-200/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{
                    width: `${(punctualityDetail.totalOnTime / punctualityDetail.totalShifts) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Patrols Detail Dialog */}
      <Dialog
        open={activeStatDetail === "patrols"}
        onOpenChange={(open) =>
          !open && setActiveStatDetail(null)
        }
      >
        <DialogContent className="rounded-3xl border-0 max-w-md backdrop-blur-xl bg-white/90">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-semibold flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100/80 rounded-xl flex items-center justify-center">
                <Route className="w-5 h-5 text-blue-600" />
              </div>
              Recorridos
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Recorridos de vigilancia realizados este mes
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 pt-2">
            <div className="grid grid-cols-3 gap-3">
              <div
                className={`${glass} rounded-xl p-3 text-center`}
              >
                <div className="text-xl font-semibold text-blue-700">
                  {patrolsDetail.totalThisMonth}
                </div>
                <div className="text-[11px] text-gray-600 mt-0.5">
                  Total mes
                </div>
              </div>
              <div
                className={`${glass} rounded-xl p-3 text-center`}
              >
                <div className="text-xl font-semibold text-blue-700">
                  {patrolsDetail.avgPerShift}
                </div>
                <div className="text-[11px] text-gray-600 mt-0.5">
                  Prom/turno
                </div>
              </div>
              <div
                className={`${glass} rounded-xl p-3 text-center`}
              >
                <div className="text-xl font-semibold text-blue-700">
                  {patrolsDetail.completionRate}%
                </div>
                <div className="text-[11px] text-gray-600 mt-0.5">
                  Cumplimiento
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Por zona
              </h4>
              <div className="space-y-2">
                {patrolsDetail.byZone.map((zone, i) => (
                  <div
                    key={i}
                    className={`${glass} rounded-xl px-4 py-3`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-800">
                        {zone.zone}
                      </span>
                      <span className="text-xs text-gray-500">
                        {zone.count}/{zone.required} requeridos
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${zone.count >= zone.required ? "bg-blue-500" : "bg-amber-400"}`}
                        style={{
                          width: `${Math.min((zone.count / zone.required) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Tendencia semanal
              </h4>
              <div className="flex items-end gap-2 h-20">
                {patrolsDetail.weeklyTrend.map((week, i) => {
                  const maxCount = Math.max(
                    ...patrolsDetail.weeklyTrend.map(
                      (w) => w.count,
                    ),
                  );
                  const heightPercent =
                    (week.count / maxCount) * 100;
                  return (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <span className="text-[10px] font-medium text-blue-600">
                        {week.count}
                      </span>
                      <div
                        className="w-full bg-gray-100/60 rounded-lg overflow-hidden"
                        style={{ height: "48px" }}
                      >
                        <div
                          className="w-full bg-blue-400 rounded-lg mt-auto"
                          style={{
                            height: `${heightPercent}%`,
                            marginTop: `${100 - heightPercent}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-500">
                        {week.week}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reports Detail Dialog */}
      <Dialog
        open={activeStatDetail === "reports"}
        onOpenChange={(open) =>
          !open && setActiveStatDetail(null)
        }
      >
        <DialogContent className="rounded-3xl border-0 max-w-md backdrop-blur-xl bg-white/90">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-semibold flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100/80 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              Reportes
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Incidentes reportados y su resolución
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 pt-2 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-3 gap-3">
              <div
                className={`${glass} rounded-xl p-3 text-center`}
              >
                <div className="text-xl font-semibold text-purple-700">
                  {stats.incidentsReported}
                </div>
                <div className="text-[11px] text-gray-600 mt-0.5">
                  Total
                </div>
              </div>
              <div
                className={`${glass} rounded-xl p-3 text-center`}
              >
                <div className="text-xl font-semibold text-purple-700">
                  {reportsDetail.resolvedRate}%
                </div>
                <div className="text-[11px] text-gray-600 mt-0.5">
                  Resueltos
                </div>
              </div>
              <div
                className={`${glass} rounded-xl p-3 text-center`}
              >
                <div className="text-xl font-semibold text-purple-700">
                  {reportsDetail.avgPerWeek}
                </div>
                <div className="text-[11px] text-gray-600 mt-0.5">
                  Prom/semana
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Por tipo
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {reportsDetail.byType.map((item, i) => (
                  <div
                    key={i}
                    className={`rounded-xl px-4 py-3 flex items-center gap-3 ${item.color} bg-opacity-70 backdrop-blur-sm`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className="text-lg font-semibold">
                        {item.count}
                      </div>
                      <div className="text-[11px] opacity-80">
                        {item.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Por severidad
              </h4>
              <div className="space-y-2">
                {reportsDetail.bySeverity.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 ${glass} rounded-xl px-4 py-2.5`}
                  >
                    <span
                      className={`px-2 py-0.5 rounded-lg text-xs font-medium ${item.color}`}
                    >
                      {item.level}
                    </span>
                    <div className="flex-1 h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${i === 0 ? "bg-green-400" : i === 1 ? "bg-yellow-400" : "bg-red-400"}`}
                        style={{
                          width: `${(item.count / stats.incidentsReported) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Reportes recientes
              </h4>
              <div className="space-y-2">
                {reportsDetail.recentReports.map(
                  (report, i) => (
                    <div
                      key={i}
                      className={`${glass} rounded-xl p-3`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {report.date}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                              report.severity === "S1"
                                ? "bg-green-100 text-green-700"
                                : report.severity === "S2"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {report.severity}
                          </span>
                        </div>
                        {report.resolved ? (
                          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-800">
                        {report.description}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {report.zone} · {report.type}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ranking Detail Dialog */}
      <Dialog
        open={activeStatDetail === "ranking"}
        onOpenChange={(open) =>
          !open && setActiveStatDetail(null)
        }
      >
        <DialogContent className="rounded-3xl border-0 max-w-md backdrop-blur-xl bg-white/90">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-semibold flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100/80 rounded-xl flex items-center justify-center">
                <Medal className="w-5 h-5 text-orange-600" />
              </div>
              Tu Ranking
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Posición #{rankingDetail.currentRank} de{" "}
              {rankingDetail.totalParticipants} docentes
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 pt-2 max-h-[70vh] overflow-y-auto">
            <div
              className={`${glass} rounded-xl p-4 flex items-center justify-between`}
            >
              <div>
                <div className="text-3xl font-semibold text-orange-700">
                  #{rankingDetail.currentRank}
                </div>
                <div className="text-sm text-gray-600">
                  Posición actual
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  {rankingDetail.currentRank <
                  rankingDetail.previousRank ? (
                    <>
                      <ArrowUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        Subiste{" "}
                        {rankingDetail.previousRank -
                          rankingDetail.currentRank}{" "}
                        posición
                      </span>
                    </>
                  ) : rankingDetail.currentRank >
                    rankingDetail.previousRank ? (
                    <>
                      <ArrowDown className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-600">
                        Bajaste{" "}
                        {rankingDetail.currentRank -
                          rankingDetail.previousRank}{" "}
                        posición
                      </span>
                    </>
                  ) : (
                    <>
                      <Minus className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-500">
                        Sin cambios
                      </span>
                    </>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  vs. mes anterior
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Desglose de puntos
              </h4>
              <div className="space-y-2">
                {rankingDetail.pointsBreakdown.map(
                  (item, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between ${glass} rounded-xl px-4 py-2.5`}
                    >
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {item.source}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {item.detail}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-orange-600">
                        +{item.points}
                      </div>
                    </div>
                  ),
                )}
                <div
                  className={`flex items-center justify-between ${glass} rounded-xl px-4 py-3`}
                >
                  <span className="text-sm font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-lg font-semibold text-orange-700">
                    {stats.points} pts
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Top 5
              </h4>
              <div className="space-y-2">
                {rankingDetail.nearbyRanking.map((entry, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 backdrop-blur-sm ${
                      entry.isMe
                        ? "bg-orange-50/70 border-2 border-orange-300/60"
                        : `${glass}`
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                        i === 0
                          ? "bg-yellow-400 text-yellow-900"
                          : i === 1
                            ? "bg-gray-300 text-gray-700"
                            : i === 2
                              ? "bg-orange-300 text-orange-900"
                              : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {entry.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {entry.name}{" "}
                        {entry.isMe && (
                          <span className="text-orange-600">
                            (Tú)
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {entry.department}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {entry.points} pts
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Insignias ganadas (
                {rankingDetail.badgesEarned.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {rankingDetail.badgesEarned.map((badge, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${glass} text-orange-700 rounded-full text-xs font-medium`}
                  >
                    <Star
                      className="w-3 h-3"
                      fill="currentColor"
                    />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className={`${glass} rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    Próxima: {rankingDetail.nextBadge.name}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {rankingDetail.nextBadge.requirement}
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {rankingDetail.nextBadge.progress}/
                  {rankingDetail.nextBadge.target}
                </span>
              </div>
              <div className="h-2 bg-gray-200/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-400 rounded-full transition-all"
                  style={{
                    width: `${(rankingDetail.nextBadge.progress / rankingDetail.nextBadge.target) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog
        open={showHistory}
        onOpenChange={setShowHistory}
      >
        <DialogContent className="rounded-3xl border-0 max-w-md backdrop-blur-xl bg-white/90">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-semibold flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100/80 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              Historial de Turnos
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Turnos completados ({allCompletedShifts.length} total)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-2 max-h-[70vh] overflow-y-auto">
            {allCompletedShifts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Award className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                <p>No hay turnos completados</p>
              </div>
            ) : (
              <div className="space-y-2">
                {allCompletedShifts.map((shift) => (
                  <div
                    key={shift.id}
                    className={`${glass} rounded-xl p-4`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-green-100/80 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                          <Award className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {shift.zoneName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {shift.date}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-green-600">
                        ✓ Completado
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-200/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {shift.startTime} - {shift.endTime}
                      </span>
                      <span>
                        {shift.patrolCount || 0} recorridos
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}