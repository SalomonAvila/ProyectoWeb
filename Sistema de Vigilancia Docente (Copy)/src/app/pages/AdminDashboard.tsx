import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getCurrentUser, mockShifts, mockZones, mockTeachers } from '../lib/mockData';
import { MapPin, Calendar, Settings, FileText, TrendingUp, Users, Shield, Activity } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { glass, glassHover, glassNav } from '../components/GlassEffects';

export function AdminDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleLogout = () => {
    navigate('/');
  };

  const todayShifts = mockShifts.filter(s => s.date === '2026-02-26');
  const activeZones = mockZones.filter(z => z.isActive);
  const teachers = mockTeachers.filter(t => t.isActive);
  const completedShifts = todayShifts.filter(s => s.status === 'completed');
  const complianceRate = todayShifts.length > 0 
    ? Math.round((completedShifts.length / todayShifts.length) * 100) 
    : 95;

  const stats = [
    { 
      id: 'zones',
      label: 'Zonas Activas', 
      value: activeZones.length,
      icon: MapPin,
      color: 'blue',
      details: activeZones.map(z => z.name)
    },
    { 
      id: 'teachers',
      label: 'Docentes', 
      value: teachers.length,
      icon: Users,
      color: 'purple',
      details: teachers.map(t => `${t.name} - ${t.department}`)
    },
    { 
      id: 'shifts',
      label: 'Turnos Hoy', 
      value: todayShifts.length,
      icon: Calendar,
      color: 'green',
      details: todayShifts.map(s => `${s.zoneName} - ${s.teacherName} (${s.startTime})`)
    },
    { 
      id: 'compliance',
      label: 'Cumplimiento', 
      value: `${complianceRate}%`,
      icon: TrendingUp,
      color: 'orange',
      details: [`${completedShifts.length} de ${todayShifts.length} turnos completados`]
    }
  ];

  const modules = [
    {
      icon: MapPin,
      title: 'Gestión de Zonas',
      description: 'Administrar áreas de vigilancia y códigos QR',
      color: 'blue',
      path: '/admin/zones',
      badge: `${activeZones.length} zonas`
    },
    {
      icon: Calendar,
      title: 'Gestión de Turnos',
      description: 'Asignar y programar turnos de vigilancia',
      color: 'purple',
      path: '/admin/shifts',
      badge: `${todayShifts.length} hoy`
    },
    {
      icon: Settings,
      title: 'Configuración',
      description: 'Reglas, parámetros y gamificación',
      color: 'green',
      path: '/admin/config',
      badge: 'Sistema'
    },
    {
      icon: FileText,
      title: 'Reportes y Auditoría',
      description: 'Historial, logs y exportación',
      color: 'orange',
      path: '/admin/reports',
      badge: 'Registros'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-100', statBg: 'bg-blue-50', icon: 'text-blue-600', hoverBg: 'hover:bg-blue-50' };
      case 'purple': return { bg: 'bg-purple-100', statBg: 'bg-purple-50', icon: 'text-purple-600', hoverBg: 'hover:bg-purple-50' };
      case 'green': return { bg: 'bg-green-100', statBg: 'bg-green-50', icon: 'text-green-600', hoverBg: 'hover:bg-green-50' };
      case 'orange': return { bg: 'bg-orange-100', statBg: 'bg-orange-50', icon: 'text-orange-600', hoverBg: 'hover:bg-orange-50' };
      default: return { bg: 'bg-gray-100', statBg: 'bg-gray-50', icon: 'text-gray-600', hoverBg: 'hover:bg-gray-50' };
    }
  };

  const selectedStatData = stats.find(s => s.id === selectedStat);

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className={`${glassNav} sticky top-0 z-10`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">{user.name}</h1>
              <p className="text-sm text-gray-500 mt-0.5">Panel de Administración</p>
            </div>
            <button 
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors self-start sm:self-auto"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-8 sm:space-y-16">
        {/* Stats */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
            Resumen del Sistema
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const colors = getColorClasses(stat.color);
              
              return (
                <button
                  key={stat.id}
                  onClick={() => setSelectedStat(stat.id)}
                  className={`${colors.statBg} ${colors.hoverBg} rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:scale-105 transition-all text-left`}
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-white/50 rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.icon}`} />
                    </div>
                  </div>
                  <div className={`text-3xl sm:text-4xl font-semibold ${colors.icon} mb-1 sm:mb-2`}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-700">{stat.label}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Modules */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
            Módulos de Administración
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;
              const colors = getColorClasses(module.color);
              
              return (
                <button
                  key={index}
                  onClick={() => navigate(module.path)}
                  className={`${glass} ${glassHover} rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 transition-all text-left group hover:-translate-y-1`}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className={`w-14 h-14 sm:w-20 sm:h-20 ${colors.bg} rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 sm:w-10 sm:h-10 ${colors.icon}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg sm:text-2xl font-semibold text-gray-900">{module.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${colors.bg} ${colors.icon} font-medium`}>
                          {module.badge}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600">{module.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* System Info */}
        <section>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 text-white shadow-xl shadow-blue-500/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                  Sistema de Vigilancia Docente
                </h3>
                <p className="text-sm sm:text-base text-blue-100">
                  Plataforma integral para gestión preventiva de espacios escolares
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
              {[
                { icon: MapPin, text: 'Zonas con códigos QR únicos' },
                { icon: Calendar, text: 'Asignación inteligente de turnos' },
                { icon: Activity, text: 'Monitoreo en tiempo real' },
                { icon: TrendingUp, text: 'Reportes' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl">
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-blue-50">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
            Actividad Reciente
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className={`${glass} rounded-2xl sm:rounded-3xl p-5 sm:p-6`}>
              <div className="text-sm text-gray-600 mb-1">Turnos Completados Hoy</div>
              <div className="text-2xl sm:text-3xl font-semibold text-gray-900">{completedShifts.length}</div>
            </div>
            <div className={`${glass} rounded-2xl sm:rounded-3xl p-5 sm:p-6`}>
              <div className="text-sm text-gray-600 mb-1">Zonas Cubiertas</div>
              <div className="text-2xl sm:text-3xl font-semibold text-gray-900">{activeZones.length}/{mockZones.length}</div>
            </div>
            <div className={`${glass} rounded-2xl sm:rounded-3xl p-5 sm:p-6`}>
              <div className="text-sm text-gray-600 mb-1">Docentes Activos</div>
              <div className="text-2xl sm:text-3xl font-semibold text-gray-900">{teachers.length}</div>
            </div>
          </div>
        </section>
      </div>

      {/* Stat Details Dialog */}
      <Dialog open={!!selectedStat} onOpenChange={() => setSelectedStat(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3">
              {selectedStatData && (
                <>
                  <div className={`w-12 h-12 ${getColorClasses(selectedStatData.color).bg} rounded-xl flex items-center justify-center`}>
                    <selectedStatData.icon className={`w-6 h-6 ${getColorClasses(selectedStatData.color).icon}`} />
                  </div>
                  {selectedStatData.label}
                </>
              )}
            </DialogTitle>
            <DialogDescription>Detalles y listado completo</DialogDescription>
          </DialogHeader>
          
          {selectedStatData && (
            <div className="space-y-4">
              {/* Main Value */}
              <div className={`${getColorClasses(selectedStatData.color).statBg} rounded-2xl p-6 text-center`}>
                <div className={`text-5xl font-bold ${getColorClasses(selectedStatData.color).icon} mb-2`}>
                  {selectedStatData.value}
                </div>
                <div className="text-sm text-gray-700">{selectedStatData.label}</div>
              </div>

              {/* Details List */}
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {selectedStatData.details.map((detail, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}