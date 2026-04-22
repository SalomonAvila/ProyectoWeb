import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Eye, MapPin, Clock, AlertTriangle, TrendingUp, Users, CheckCircle, User } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'sonner';
import { glass, glassHover, glassNav } from '../components/GlassEffects';
import { getCurrentUser, mockShifts, mockIncidents, mockTeachers, mockZones } from '../lib/mockData';

export function CoordinatorLive() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [selectedShift, setSelectedShift] = useState<any>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [reassignShift, setReassignShift] = useState<any>(null);

  useEffect(() => {
    if (!user || user.role !== 'coordinator') {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simula actualización en tiempo real
        console.log('Actualizando datos...');
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  if (!user || user.role !== 'coordinator') {
    return null;
  }

  const todayShifts = mockShifts.filter(s => s.date === '2026-02-26');
  const activeShifts = todayShifts.filter(s => s.status === 'active');
  const missedShifts = todayShifts.filter(s => s.status === 'missed');
  const todayIncidents = mockIncidents.filter(i => i.timestamp.startsWith('2026-02-26'));

  const handleReassign = (shift: any) => {
    setReassignShift(shift);
  };

  const handleConfirmReassign = (shift: any, teacherId: string) => {
    const teacher = mockTeachers.find(t => t.id === teacherId);
    toast.success(`Turno de ${shift.zoneName} reasignado a ${teacher?.name}`);
    setReassignShift(null);
  };

  const handleViewShiftDetails = (shift: any) => {
    setSelectedShift(shift);
  };

  const handleViewZoneDetails = (zoneId: string) => {
    setSelectedZone(zoneId);
  };

  const getZoneStatus = (zoneName: string) => {
    const hasActiveShift = activeShifts.some(s => s.zoneName === zoneName);
    const hasMissedShift = missedShifts.some(s => s.zoneName === zoneName);
    
    if (hasMissedShift) return { status: 'sin-cobertura', label: 'Sin Cobertura' };
    if (hasActiveShift) return { status: 'activo', label: 'Activo' };
    return { status: 'inactivo', label: 'Inactivo' };
  };

  const getZoneStatusClasses = (status: string) => {
    switch (status) {
      case 'sin-cobertura': return { icon: 'bg-red-100', iconText: 'text-red-600', badge: 'bg-red-100 text-red-700' };
      case 'activo': return { icon: 'bg-green-100', iconText: 'text-green-600', badge: 'bg-green-100 text-green-700' };
      default: return { icon: 'bg-gray-100', iconText: 'text-gray-600', badge: 'bg-gray-100 text-gray-700' };
    }
  };

  const selectedZoneData = selectedZone ? mockZones.find(z => z.id === selectedZone) : null;
  const selectedZoneShifts = selectedZone ? todayShifts.filter(s => s.zoneId === selectedZone) : [];
  const selectedZoneIncidents = selectedZone ? todayIncidents.filter(i => i.zoneId === selectedZone) : [];

  const availableTeachers = mockTeachers.filter(t => t.isActive);

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
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">Monitoreo en Vivo</h1>
                <p className="text-xs sm:text-sm text-gray-500">Vigilancia en tiempo real</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  autoRefresh 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {autoRefresh ? '● Auto-actualizar' : '○ Manual'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-6 sm:space-y-8">
        {/* Real-time Stats */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-green-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <div className="text-2xl sm:text-3xl font-semibold text-green-600">{activeShifts.length}</div>
              </div>
              <div className="text-xs sm:text-sm text-gray-700">Activos</div>
            </div>
            <div className="bg-red-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                <div className="text-2xl sm:text-3xl font-semibold text-red-600">{missedShifts.length}</div>
              </div>
              <div className="text-xs sm:text-sm text-gray-700">Sin Cobertura</div>
            </div>
            <div className="bg-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <div className="text-2xl sm:text-3xl font-semibold text-blue-600">{activeShifts.reduce((acc, s) => acc + (s.patrolCount || 0), 0)}</div>
              </div>
              <div className="text-xs sm:text-sm text-gray-700">Recorridos</div>
            </div>
            <div className="bg-orange-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                <div className="text-2xl sm:text-3xl font-semibold text-orange-600">{todayIncidents.length}</div>
              </div>
              <div className="text-xs sm:text-sm text-gray-700">Incidentes</div>
            </div>
          </div>
        </section>

        {/* Alerts */}
        {missedShifts.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
              Zonas Sin Cobertura
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {missedShifts.map(shift => (
                <div key={shift.id} className={`${glass} rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-red-200/60`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{shift.zoneName}</h3>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Docente: {shift.teacherName}</p>
                        <p>Horario: {shift.startTime} - {shift.endTime}</p>
                        <p className="text-red-600 font-medium">Sin check-in desde hace 10 minutos</p>
                      </div>
                    </div>
                    <div className="flex gap-2 self-start sm:self-auto">
                      <button 
                        onClick={() => handleViewShiftDetails(shift)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl transition-all text-sm"
                      >
                        Ver detalles
                      </button>
                      <button 
                        onClick={() => handleReassign(shift)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all text-sm"
                      >
                        Reasignar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Zone Map */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
            Mapa de Zonas
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {mockZones.map(zone => {
              const status = getZoneStatus(zone.name);
              const classes = getZoneStatusClasses(status.status);
              const zoneShift = activeShifts.find(s => s.zoneName === zone.name);
              
              return (
                <button
                  key={zone.id}
                  onClick={() => handleViewZoneDetails(zone.id)}
                  className={`${glass} ${glassHover} rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all text-left group`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className={`w-12 h-12 ${classes.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <MapPin className={`w-6 h-6 ${classes.iconText}`} />
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${classes.badge}`}>
                      {status.label}
                    </span>
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{zone.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">{zone.description}</p>
                  
                  {zoneShift && (
                    <div className="pt-3 border-t border-gray-100 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Users className="w-3 h-3" />
                        <span className="truncate">{zoneShift.teacherName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <TrendingUp className="w-3 h-3" />
                        <span>{zoneShift.patrolCount || 0} recorridos</span>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Active Shifts Timeline */}
        {activeShifts.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
              Turnos Activos
            </h2>
            <div className="space-y-3">
              {activeShifts.map(shift => (
                <button
                  key={shift.id}
                  onClick={() => handleViewShiftDetails(shift)}
                  className={`w-full ${glass} ${glassHover} rounded-xl sm:rounded-2xl p-4 sm:p-5 text-left`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-900 mb-0.5 text-sm sm:text-base truncate">{shift.zoneName}</div>
                        <div className="text-xs sm:text-sm text-gray-600 truncate">{shift.teacherName}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 flex-shrink-0" />
                          <span>{shift.startTime} - {shift.endTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 self-start sm:self-auto">
                      {shift.patrolCount !== undefined && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-600">{shift.patrolCount}</span>
                        </div>
                      )}
                      <span className="text-xs text-gray-400">{'>'}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Recent Activity */}
        {todayIncidents.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
              Actividad Reciente
            </h2>
            <div className={`${glass} rounded-2xl sm:rounded-3xl divide-y divide-white/30 overflow-hidden`}>
              {todayIncidents.slice(0, 8).map(incident => (
                <div key={incident.id} className="p-4 sm:p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          incident.severity === 'S3' ? 'bg-red-100 text-red-700' :
                          incident.severity === 'S2' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {incident.severity}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(incident.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 mb-1">{incident.description}</p>
                      <p className="text-xs text-gray-600">{incident.zoneName} - {incident.teacherName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Shift Details Dialog */}
      <Dialog open={selectedShift !== null} onOpenChange={() => setSelectedShift(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">Detalles del Turno</DialogTitle>
            <DialogDescription>Información completa de la vigilancia</DialogDescription>
          </DialogHeader>
          {selectedShift && (
            <div className="space-y-4 pt-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Zona</div>
                <div className="text-lg font-semibold text-gray-900">{selectedShift.zoneName}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Docente</div>
                  <div className="font-semibold text-gray-900">{selectedShift.teacherName}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Estado</div>
                  <div className={`font-semibold ${
                    selectedShift.status === 'active' ? 'text-green-600' :
                    selectedShift.status === 'missed' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {selectedShift.status === 'active' ? 'Activo' :
                     selectedShift.status === 'missed' ? 'Sin cobertura' : 'Completado'}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Horario</div>
                <div className="font-semibold text-gray-900">{selectedShift.startTime} - {selectedShift.endTime}</div>
              </div>

              {selectedShift.patrolCount !== undefined && (
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="text-sm text-blue-600 mb-1">Recorridos realizados</div>
                  <div className="text-2xl font-semibold text-blue-600">{selectedShift.patrolCount}</div>
                </div>
              )}

              {selectedShift.status === 'missed' && (
                <button
                  onClick={() => {
                    setSelectedShift(null);
                    handleReassign(selectedShift);
                  }}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all"
                >
                  Reasignar Turno
                </button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Zone Details Dialog */}
      <Dialog open={selectedZone !== null} onOpenChange={() => setSelectedZone(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">Detalles de Zona</DialogTitle>
            <DialogDescription>{selectedZoneData?.description || ''}</DialogDescription>
          </DialogHeader>
          {selectedZoneData && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">{selectedZoneData.name}</div>
                  <div className="text-sm text-gray-600">Capacidad: {selectedZoneData.capacity} estudiantes</div>
                </div>
              </div>

              {/* Zone shifts today */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Turnos de Hoy</h4>
                {selectedZoneShifts.length > 0 ? (
                  <div className="space-y-2">
                    {selectedZoneShifts.map(shift => (
                      <div key={shift.id} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{shift.teacherName}</div>
                          <div className="text-xs text-gray-600">{shift.startTime} - {shift.endTime}</div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          shift.status === 'active' ? 'bg-green-100 text-green-700' :
                          shift.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                          shift.status === 'missed' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {shift.status === 'active' ? 'Activo' :
                           shift.status === 'completed' ? 'Completado' :
                           shift.status === 'missed' ? 'Sin cubrir' : 'Pendiente'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Sin turnos hoy</p>
                )}
              </div>

              {/* Zone incidents */}
              {selectedZoneIncidents.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Incidentes Hoy</h4>
                  <div className="space-y-2">
                    {selectedZoneIncidents.map(incident => (
                      <div key={incident.id} className="p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            incident.severity === 'S3' ? 'bg-red-100 text-red-700' :
                            incident.severity === 'S2' ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {incident.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900">{incident.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Checkpoints */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Puntos de Control</h4>
                <div className="space-y-2">
                  {selectedZoneData.checkpoints.map((cp, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-700">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium text-blue-600">
                        {i + 1}
                      </div>
                      {cp}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reassign Dialog */}
      <Dialog open={reassignShift !== null} onOpenChange={() => setReassignShift(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">Reasignar Turno</DialogTitle>
            <DialogDescription>Selecciona un docente disponible para cubrir el turno</DialogDescription>
          </DialogHeader>
          {reassignShift && (
            <div className="space-y-6 pt-4">
              <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2">{reassignShift.zoneName}</h4>
                <p className="text-sm text-red-700">
                  {reassignShift.startTime} - {reassignShift.endTime} · Docente original: {reassignShift.teacherName}
                </p>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto">
                <label className="text-sm font-medium text-gray-700 block mb-3">Docentes Disponibles</label>
                {availableTeachers
                  .filter(t => t.id !== reassignShift.teacherId)
                  .map(teacher => (
                  <button
                    key={teacher.id}
                    onClick={() => handleConfirmReassign(reassignShift, teacher.id)}
                    className={`w-full flex items-center gap-4 p-4 ${glass} ${glassHover} rounded-xl text-left`}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{teacher.name}</p>
                      <p className="text-sm text-gray-600">{teacher.department}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}