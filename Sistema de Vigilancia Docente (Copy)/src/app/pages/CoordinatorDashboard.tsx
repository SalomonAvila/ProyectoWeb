import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getCurrentUser, mockShifts, mockIncidents, mockTeachers, type Shift, type Incident } from '../lib/mockData';
import { Eye, BarChart3, AlertCircle, User, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { glass, glassHover, glassNav } from '../components/GlassEffects';

export function CoordinatorDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showReassignDialog, setShowReassignDialog] = useState(false);
  const [reassignShift, setReassignShift] = useState<Shift | null>(null);
  const [availableShift] = useState({
    id: "available-1",
    zoneName: "Cafetería",
    date: "2026-02-26",
    startTime: "11:00",
    endTime: "11:30",
    canceledBy: "Prof. María González"
  });
  const [showAvailableShift, setShowAvailableShift] = useState(true);
  const [showAssignDialog, setShowAssignDialog] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'coordinator') navigate('/login');
  }, [user, navigate]);

  if (!user || user.role !== 'coordinator') return null;

  const todayShifts = mockShifts.filter(s => s.date === '2026-02-26');
  const activeShifts = todayShifts.filter(s => s.status === 'active');
  const missedShifts = todayShifts.filter(s => s.status === 'missed');
  const completedShifts = todayShifts.filter(s => s.status === 'completed');
  const todayIncidents = mockIncidents.filter(i => i.timestamp.startsWith('2026-02-26'));
  const unresolvedIncidents = todayIncidents.filter(i => !i.resolved);
  const availableTeachers = mockTeachers.filter(t => t.isActive);
  const rate = todayShifts.length > 0 ? Math.round(((completedShifts.length + activeShifts.length) / todayShifts.length) * 100) : 100;

  return (
    <div className="min-h-screen relative">
      <header className={glassNav + ' sticky top-0 z-10'}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">Panel de Coordinacion</p>
          </div>
          <button onClick={() => navigate('/')} className="text-sm text-gray-600 hover:text-gray-900">Cerrar Sesión</button>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-8 sm:space-y-12">
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-1">Acciones</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <button onClick={() => navigate('/coordinator/live')} className={glass + ' ' + glassHover + ' rounded-2xl p-6 sm:p-8 text-left group'}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Eye className="w-7 h-7 text-green-600" /></div>
                <div><h3 className="text-lg font-semibold text-gray-900">Monitoreo en Vivo</h3></div>
              </div>
            </button>
            <button onClick={() => navigate('/coordinator/analytics')} className={glass + ' ' + glassHover + ' rounded-2xl p-6 sm:p-8 text-left group'}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><BarChart3 className="w-7 h-7 text-blue-600" /></div>
                <div><h3 className="text-lg font-semibold text-gray-900">Reportes</h3></div>
              </div>
            </button>
          </div>
        </section>
        {showAvailableShift && (
          <section>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-1">Turno Disponible</h2>
            <div className={glass + ' rounded-2xl p-6 sm:p-8 border-2 border-blue-300/50'}>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {availableShift.canceledBy} canceló un turno
                    </h3>
                    <p className="text-sm text-gray-600">
                      Requiere asignación urgente
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 sm:p-5 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-1">
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
                onClick={() => setShowAssignDialog(true)}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/25"
              >
                Asignar turno a profesor
              </button>
            </div>
          </section>
        )}
        {missedShifts.length > 0 && (<section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-1">Alertas</h2>
          <div className="space-y-3">{missedShifts.map(shift => (
            <div key={shift.id} className={glass + ' rounded-xl px-4 sm:px-6 py-4 border-l-4 border-l-red-500'}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
                  <div className="min-w-0"><div className="font-semibold text-gray-900 text-sm truncate">{shift.zoneName}</div><div className="text-xs text-gray-600">{shift.teacherName} {shift.startTime}-{shift.endTime}</div></div>
                </div>
                <button onClick={() => { setReassignShift(shift); setShowReassignDialog(true); }} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl text-sm">Reasignar</button>
              </div>
            </div>))}</div></section>)}
        {unresolvedIncidents.length > 0 && (<section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-1">Incidentes Pendientes</h2>
          <div className="space-y-3">{unresolvedIncidents.map(inc => (
            <button key={inc.id} onClick={() => setSelectedIncident(inc)} className={'w-full ' + glass + ' ' + glassHover + ' rounded-xl px-4 py-4 text-left'}>
              <div className="flex items-start gap-3">
                <div className={'w-10 h-10 rounded-full flex items-center justify-center ' + (inc.severity === 'S3' ? 'bg-red-100' : inc.severity === 'S2' ? 'bg-orange-100' : 'bg-yellow-100')}>
                  <AlertCircle className={'w-5 h-5 ' + (inc.severity === 'S3' ? 'text-red-600' : inc.severity === 'S2' ? 'text-orange-600' : 'text-yellow-600')} /></div>
                <div className="flex-1 min-w-0"><p className="text-sm text-gray-900">{inc.description}</p><p className="text-xs text-gray-500 mt-1">{inc.zoneName} - {inc.teacherName}</p></div>
              </div>
            </button>))}</div></section>)}
        {activeShifts.length > 0 && (<section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-1">Turnos Activos</h2>
          <div className="space-y-3">{activeShifts.map(shift => (
            <div key={shift.id} className={glass + ' rounded-xl px-4 sm:px-6 py-3 flex items-center justify-between'}>
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" /></div>
                <div className="min-w-0"><div className="font-medium text-gray-900 text-sm truncate">{shift.zoneName}</div><div className="text-xs text-gray-500">{shift.teacherName} {shift.startTime}-{shift.endTime}</div></div>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-600 font-medium"><TrendingUp className="w-3.5 h-3.5" />{shift.patrolCount || 0}</div>
            </div>))}</div></section>)}
      </div>
      <Dialog open={selectedIncident !== null} onOpenChange={() => setSelectedIncident(null)}>
        <DialogContent className="rounded-3xl border-0 max-w-md backdrop-blur-xl bg-white/90">
          <DialogHeader><DialogTitle>Detalle del Incidente</DialogTitle><DialogDescription>Informacion completa</DialogDescription></DialogHeader>
          {selectedIncident && (<div className="space-y-4 pt-2">
            <div className={glass + ' rounded-xl p-4'}><p className="text-sm text-gray-900">{selectedIncident.description}</p><p className="text-xs text-gray-500 mt-1">{selectedIncident.zoneName} - {selectedIncident.teacherName}</p></div>
            <button onClick={() => { toast.success('Incidente resuelto'); setSelectedIncident(null); }} className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl">Marcar como Resuelto</button>
          </div>)}</DialogContent></Dialog>
      <Dialog open={showReassignDialog} onOpenChange={setShowReassignDialog}>
        <DialogContent className="rounded-3xl border-0 max-w-lg backdrop-blur-xl bg-white/90">
          <DialogHeader><DialogTitle>Reasignar Turno</DialogTitle><DialogDescription>Selecciona un docente</DialogDescription></DialogHeader>
          {reassignShift && (<div className="space-y-4 pt-2">
            <div className="bg-red-50/70 rounded-xl p-4 border border-red-200/60"><div className="font-semibold text-red-900 text-sm">{reassignShift.zoneName}</div><div className="text-xs text-red-700">{reassignShift.startTime}-{reassignShift.endTime}</div></div>
            <div className="space-y-2 max-h-64 overflow-y-auto">{availableTeachers.filter(t => t.id !== reassignShift.teacherId).map(teacher => (
              <button key={teacher.id} onClick={() => { toast.success('Reasignado a ' + teacher.name); setShowReassignDialog(false); setReassignShift(null); }} className={'w-full flex items-center gap-4 p-4 ' + glass + ' ' + glassHover + ' rounded-xl text-left'}>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-blue-600" /></div>
                <div><p className="font-medium text-gray-900 text-sm">{teacher.name}</p><p className="text-xs text-gray-600">{teacher.department}</p></div>
              </button>))}</div>
          </div>)}</DialogContent></Dialog>
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="rounded-3xl border-0 max-w-lg backdrop-blur-xl bg-white/90">
          <DialogHeader>
            <DialogTitle>Asignar Turno a Profesor</DialogTitle>
            <DialogDescription>Selecciona un docente para el turno disponible</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-200/60">
              <div className="font-semibold text-blue-900 text-sm">{availableShift.zoneName}</div>
              <div className="text-xs text-blue-700">{availableShift.startTime} - {availableShift.endTime}</div>
              <div className="text-xs text-blue-600 mt-1">Cancelado por: {availableShift.canceledBy}</div>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {availableTeachers.map(teacher => {
                // Calcular compatibilidad (simulada)
                const compatibility = Math.floor(Math.random() * 30) + 70; // 70-100%
                return (
                  <button 
                    key={teacher.id} 
                    onClick={() => { 
                      toast.success('Turno asignado a ' + teacher.name); 
                      setShowAssignDialog(false); 
                      setShowAvailableShift(false);
                    }} 
                    className={'w-full flex items-center justify-between gap-4 p-4 ' + glass + ' ' + glassHover + ' rounded-xl text-left'}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm">{teacher.name}</p>
                        <p className="text-xs text-gray-600">{teacher.department}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`text-xs font-semibold ${compatibility >= 85 ? 'text-green-600' : compatibility >= 75 ? 'text-blue-600' : 'text-orange-600'}`}>
                        {compatibility}% match
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}