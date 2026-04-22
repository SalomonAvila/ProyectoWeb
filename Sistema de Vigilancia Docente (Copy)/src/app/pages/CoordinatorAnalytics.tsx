import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getCurrentUser, mockZones, mockIncidents, calculateHeatMapData } from '../lib/mockData';
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, Calendar, Download, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { glass, glassHover, glassNav } from '../components/GlassEffects';

export function CoordinatorAnalytics() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedZone, setSelectedZone] = useState('all');

  useEffect(() => {
    if (!user || user.role !== 'coordinator') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'coordinator') {
    return null;
  }

  // Mock analytics data
  const incidentsByZone = mockZones.map((zone, idx) => ({
    zone: zone.name,
    count: mockIncidents.filter(i => i.zoneName === zone.name).length,
    trend: idx % 2 === 0 ? 'up' as const : 'down' as const,
    percentage: [25, 15, 10, 8, 5][idx] || 5
  }));

  const incidentsByType = [
    { type: 'Seguridad Física', count: 8, colorDot: 'bg-red-500', colorBg: 'bg-red-50', colorText: 'text-red-600' },
    { type: 'Convivencia', count: 5, colorDot: 'bg-orange-500', colorBg: 'bg-orange-50', colorText: 'text-orange-600' },
    { type: 'Uso del Espacio', count: 3, colorDot: 'bg-blue-500', colorBg: 'bg-blue-50', colorText: 'text-blue-600' },
    { type: 'Observación Social', count: 2, colorDot: 'bg-purple-500', colorBg: 'bg-purple-50', colorText: 'text-purple-600' }
  ];

  const incidentsBySeverity = [
    { severity: 'S1 - Bajo', count: 10, percentage: 55, barColor: 'bg-yellow-500' },
    { severity: 'S2 - Medio', count: 6, percentage: 33, barColor: 'bg-orange-500' },
    { severity: 'S3 - Alto', count: 2, percentage: 12, barColor: 'bg-red-500' }
  ];

  const teacherPerformance = [
    { name: 'María González', shifts: 12, punctuality: 100, patrols: 48, incidents: 5 },
    { name: 'Carlos López', shifts: 10, punctuality: 95, patrols: 38, incidents: 3 },
    { name: 'Ana Martínez', shifts: 11, punctuality: 90, patrols: 42, incidents: 4 },
    { name: 'Juan Pérez', shifts: 9, punctuality: 88, patrols: 35, incidents: 6 }
  ];

  const peakHours = [
    { hour: '10:00 AM', incidents: 5, level: 'high' },
    { hour: '12:00 PM', incidents: 8, level: 'critical' },
    { hour: '1:00 PM', incidents: 4, level: 'medium' },
    { hour: '3:00 PM', incidents: 3, level: 'low' }
  ];

  const handleExport = () => {
    toast.success('Reporte exportado exitosamente');
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className={`${glassNav} sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <button 
                onClick={() => navigate('/coordinator')}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${glass} ${glassHover} flex-shrink-0`}
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">Reportes</h1>
                <p className="text-xs sm:text-sm text-gray-500">Reportes y tendencias</p>
              </div>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all text-sm flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-6 sm:space-y-8">
        {/* Filters */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Últimas 24 horas</SelectItem>
                  <SelectItem value="7d">Últimos 7 días</SelectItem>
                  <SelectItem value="30d">Últimos 30 días</SelectItem>
                  <SelectItem value="90d">Últimos 90 días</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Zona</label>
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las zonas</SelectItem>
                  {mockZones.map(zone => (
                    <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
            Métricas Clave
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'Total Incidentes', value: mockIncidents.length, change: '+12%', trend: 'up' as const, bg: 'bg-blue-50', color: 'text-blue-600', changeColor: 'text-gray-600' },
              { label: 'Cumplimiento', value: '95%', change: '+3%', trend: 'up' as const, bg: 'bg-green-50', color: 'text-green-600', changeColor: 'text-green-600' },
              { label: 'Respuesta Promedio', value: '2.5 min', change: '-15%', trend: 'down' as const, bg: 'bg-purple-50', color: 'text-purple-600', changeColor: 'text-green-600' },
              { label: 'Zonas de Riesgo', value: 2, change: '-1', trend: 'down' as const, bg: 'bg-orange-50', color: 'text-orange-600', changeColor: 'text-green-600' }
            ].map((metric, i) => {
              const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
              return (
                <div key={i} className={`${metric.bg} rounded-2xl sm:rounded-3xl p-4 sm:p-6`}>
                  <div className={`text-3xl sm:text-4xl font-semibold ${metric.color} mb-2`}>{metric.value}</div>
                  <div className="text-xs sm:text-sm text-gray-700 mb-2">{metric.label}</div>
                  <div className={`flex items-center gap-1 text-xs ${metric.changeColor}`}>
                    <TrendIcon className="w-3 h-3" />
                    <span>{metric.change}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Heat Map - Incidents by Zone */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
            Mapa de Calor - Incidentes por Zona
          </h2>
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm">
            <div className="space-y-3 sm:space-y-4">
              {incidentsByZone.sort((a, b) => b.count - a.count).map((item, i) => {
                const maxCount = Math.max(...incidentsByZone.map(z => z.count));
                const percentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                const TrendIcon = item.trend === 'up' ? TrendingUp : TrendingDown;
                
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900">{item.zone}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">{item.count} incidentes</span>
                        <div className={`flex items-center gap-1 ${
                          item.trend === 'up' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          <TrendIcon className="w-3 h-3" />
                          <span className="text-xs">{item.percentage}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          percentage > 75 ? 'bg-red-500' :
                          percentage > 50 ? 'bg-orange-500' :
                          percentage > 25 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Incident Distribution */}
        <section className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* By Type */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
              Por Tipo
            </h2>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm space-y-4">
              {incidentsByType.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-3 h-3 rounded-full ${item.colorDot} flex-shrink-0`} />
                    <span className="text-sm text-gray-900 truncate">{item.type}</span>
                  </div>
                  <div className={`text-lg font-semibold ${item.colorText} flex-shrink-0`}>{item.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* By Severity */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
              Por Severidad
            </h2>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm space-y-4">
              {incidentsBySeverity.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{item.severity}</span>
                    <span className="text-sm text-gray-600">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.barColor} transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Peak Hours */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
            Horarios Pico
          </h2>
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {peakHours.map((hour, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-xl border-2 ${
                    hour.level === 'critical' ? 'bg-red-50 border-red-200' :
                    hour.level === 'high' ? 'bg-orange-50 border-orange-200' :
                    hour.level === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-green-50 border-green-200'
                  }`}
                >
                  <div className="text-sm text-gray-600 mb-1">{hour.hour}</div>
                  <div className={`text-2xl font-semibold ${
                    hour.level === 'critical' ? 'text-red-600' :
                    hour.level === 'high' ? 'text-orange-600' :
                    hour.level === 'medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {hour.incidents}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">incidentes</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Teacher Performance */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
            Desempeño Docente
          </h2>
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Docente
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Turnos
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Puntualidad
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Recorridos
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Reportes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {teacherPerformance.map((teacher, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {teacher.name}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-600 text-center">
                        {teacher.shifts}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          teacher.punctuality === 100 ? 'bg-green-100 text-green-800' :
                          teacher.punctuality >= 95 ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {teacher.punctuality}%
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-600 text-center">
                        {teacher.patrols}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-600 text-center">
                        {teacher.incidents}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
            Recomendaciones Preventivas
          </h2>
          <div className="space-y-3">
            {[
              {
                icon: AlertTriangle,
                title: 'Reforzar vigilancia en Patio Principal',
                description: 'Mayor concentración de incidentes durante el almuerzo (12:00-1:00 PM)',
                priority: 'high',
                iconBg: 'bg-red-100',
                iconColor: 'text-red-600',
                borderColor: 'border-red-200'
              },
              {
                icon: Calendar,
                title: 'Optimizar rotación de turnos',
                description: 'Asignar más docentes en horarios pico identificados',
                priority: 'medium',
                iconBg: 'bg-orange-100',
                iconColor: 'text-orange-600',
                borderColor: 'border-orange-200'
              },
              {
                icon: TrendingUp,
                title: 'Tendencia positiva en Cancha Deportiva',
                description: 'Reducción del 30% en incidentes - mantener estrategia actual',
                priority: 'low',
                iconBg: 'bg-green-100',
                iconColor: 'text-green-600',
                borderColor: 'border-green-200'
              }
            ].map((rec, i) => {
              const Icon = rec.icon;
              return (
                <div 
                  key={i} 
                  className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 ${rec.borderColor} shadow-sm`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${rec.iconBg}`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${rec.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{rec.title}</h3>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}