import { toast } from 'sonner';
import { glass, glassHover, glassNav } from '../components/GlassEffects';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getCurrentUser, mockAuditLogs, mockIncidents, mockShifts, mockLeaderboard, type AuditLog } from '../lib/mockData';
import { ArrowLeft, Download, FileText, Clock, Filter, Search, ChevronDown, Users, AlertTriangle, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';

export function AdminReports() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState<'audit' | 'incidents' | 'performance'>('audit');
  const [filterRole, setFilterRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportDialog, setShowExportDialog] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const filteredLogs = mockAuditLogs.filter(log => {
    if (filterRole !== 'all' && log.role.toLowerCase() !== filterRole) return false;
    if (searchQuery && !log.action.toLowerCase().includes(searchQuery.toLowerCase()) 
        && !log.details.toLowerCase().includes(searchQuery.toLowerCase())
        && !log.user.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleExport = (format: string) => {
    toast.success(`Reporte exportado en formato ${format.toUpperCase()}`);
    setShowExportDialog(false);
  };

  const getActionIcon = (action: string) => {
    if (action.includes('Turno')) return Calendar;
    if (action.includes('Incidente')) return AlertTriangle;
    if (action.includes('Zona') || action.includes('Configuración')) return FileText;
    return Clock;
  };

  const getActionColor = (action: string) => {
    if (action.includes('completado') || action.includes('resuelto')) return 'text-green-600 bg-green-100';
    if (action.includes('reportado') || action.includes('Sin cobertura')) return 'text-orange-600 bg-orange-100';
    if (action.includes('reasignado')) return 'text-blue-600 bg-blue-100';
    return 'text-gray-600 bg-gray-100';
  };

  // Stats
  const totalShifts = mockShifts.length;
  const completedShifts = mockShifts.filter(s => s.status === 'completed').length;
  const totalIncidents = mockIncidents.length;
  const resolvedIncidents = mockIncidents.filter(i => i.resolved).length;

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className={`${glassNav} sticky top-0 z-10`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <button 
                onClick={() => navigate('/admin')}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${glass} ${glassHover} flex-shrink-0`}
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">Reportes y Auditoría</h1>
                <p className="text-xs sm:text-sm text-gray-500">Historial completo del sistema</p>
              </div>
            </div>
            <button
              onClick={() => setShowExportDialog(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all text-sm flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-6 sm:space-y-8">
        {/* Summary Cards */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-semibold text-blue-600 mb-2">{totalShifts}</div>
              <div className="text-xs sm:text-sm text-gray-700">Turnos Totales</div>
              <div className="text-xs text-blue-600 mt-1">{completedShifts} completados</div>
            </div>
            <div className="bg-orange-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-semibold text-orange-600 mb-2">{totalIncidents}</div>
              <div className="text-xs sm:text-sm text-gray-700">Incidentes</div>
              <div className="text-xs text-orange-600 mt-1">{resolvedIncidents} resueltos</div>
            </div>
            <div className="bg-green-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-semibold text-green-600 mb-2">{mockAuditLogs.length}</div>
              <div className="text-xs sm:text-sm text-gray-700">Eventos Registrados</div>
              <div className="text-xs text-green-600 mt-1">Últimos 7 días</div>
            </div>
            <div className="bg-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-semibold text-purple-600 mb-2">{mockLeaderboard.length}</div>
              <div className="text-xs sm:text-sm text-gray-700">Docentes Activos</div>
              <div className="text-xs text-purple-600 mt-1">Con datos de rendimiento</div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'audit' as const, label: 'Log de Auditoría', icon: FileText },
              { id: 'incidents' as const, label: 'Incidentes', icon: AlertTriangle },
              { id: 'performance' as const, label: 'Rendimiento', icon: Users }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Audit Log Tab */}
        {activeTab === 'audit' && (
          <section className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar en logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full sm:w-48 h-12 bg-white border-gray-200 rounded-xl">
                  <SelectValue placeholder="Filtrar por rol" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl">
                  <SelectItem value="all">Todos los roles</SelectItem>
                  <SelectItem value="docente">Docente</SelectItem>
                  <SelectItem value="coordinador">Coordinador</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Log List */}
            <div className={`${glass} rounded-2xl sm:rounded-3xl divide-y divide-white/30 overflow-hidden`}>
              {filteredLogs.map(log => {
                const Icon = getActionIcon(log.action);
                const colorClass = getActionColor(log.action);
                return (
                  <div key={log.id} className="p-4 sm:p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-1">
                          <h3 className="font-medium text-gray-900 text-sm">{log.action}</h3>
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            {new Date(log.timestamp).toLocaleString('es-ES', {
                              day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{log.details}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{log.role}</span>
                          <span className="text-xs text-gray-500">{log.user}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredLogs.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <FileText className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                  <p>No se encontraron registros</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Incidents Tab */}
        {activeTab === 'incidents' && (
          <section className="space-y-4">
            <div className={`${glass} rounded-2xl sm:rounded-3xl divide-y divide-white/30 overflow-hidden`}>
              {mockIncidents.map(incident => (
                <div key={incident.id} className="p-4 sm:p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        incident.severity === 'S3' ? 'bg-red-100 text-red-700' :
                        incident.severity === 'S2' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {incident.severity}
                      </span>
                      <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">
                        {incident.type === 'physical' ? 'Seguridad Física' :
                         incident.type === 'coexistence' ? 'Convivencia' :
                         incident.type === 'space' ? 'Uso del Espacio' : 'Social'}
                      </span>
                      {incident.resolved && (
                        <span className="text-xs text-green-700 px-2 py-0.5 bg-green-100 rounded-full">Resuelto</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {new Date(incident.timestamp).toLocaleString('es-ES', {
                        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 mb-2">{incident.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span>{incident.zoneName}</span>
                    <span>Reportó: {incident.teacherName}</span>
                    {incident.studentName && <span>Estudiante: {incident.studentName} ({incident.studentGrade})</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <section className="space-y-4">
            <div className={`${glass} rounded-2xl sm:rounded-3xl overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Docente</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Puntos</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Turnos</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Puntualidad</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Recorridos</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Reportes</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Insignias</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockLeaderboard.map((entry, index) => (
                      <tr key={entry.teacherId} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs ${
                            index === 0 ? 'bg-yellow-400 text-yellow-900' :
                            index === 1 ? 'bg-gray-300 text-gray-700' :
                            index === 2 ? 'bg-orange-300 text-orange-900' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="text-sm font-medium text-gray-900 whitespace-nowrap">{entry.teacherName}</div>
                          <div className="text-xs text-gray-500">{entry.department}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-center text-sm font-semibold text-purple-600">{entry.points}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-600 text-center">{entry.shiftsCompleted}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            entry.punctualityRate >= 95 ? 'bg-green-100 text-green-800' :
                            entry.punctualityRate >= 85 ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {entry.punctualityRate}%
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-600 text-center">{entry.patrolsTotal}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-600 text-center">{entry.incidentsReported}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-600 text-center">{entry.badges.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Exportar Reporte</DialogTitle>
            <DialogDescription>Selecciona el formato de exportación</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            {[
              { format: 'pdf', label: 'PDF', desc: 'Reporte con formato profesional', icon: '📄' },
              { format: 'csv', label: 'CSV', desc: 'Datos tabulados para Excel', icon: '📊' },
              { format: 'json', label: 'JSON', desc: 'Datos estructurados para integración', icon: '🔗' }
            ].map(option => (
              <button
                key={option.format}
                onClick={() => handleExport(option.format)}
                className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-blue-50 rounded-2xl transition-all text-left border border-gray-200 hover:border-blue-300"
              >
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}