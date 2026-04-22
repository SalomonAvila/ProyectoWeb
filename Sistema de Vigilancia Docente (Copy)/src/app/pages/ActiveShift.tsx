import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { getShiftById } from '../lib/mockData';
import { ArrowLeft, QrCode, Navigation, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { glass, glassHover, glassNav } from '../components/GlassEffects';

export function ActiveShift() {
  const navigate = useNavigate();
  const { shiftId } = useParams();
  const shift = getShiftById(shiftId || '');
  
  const [checkedIn, setCheckedIn] = useState(shift?.checkInTime !== undefined);
  const [patrolCount, setPatrolCount] = useState(shift?.patrolCount || 0);
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [showPatrolDialog, setShowPatrolDialog] = useState(false);
  const [showCleanlinessDialog, setShowCleanlinessDialog] = useState(false);

  if (!shift) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className={`text-center ${glass} rounded-3xl p-10`}>
          <p className="text-gray-600 mb-6">Turno no encontrado</p>
          <button 
            onClick={() => navigate('/teacher')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/25"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleCheckIn = () => {
    setCheckedIn(true);
    toast.success('Check-in realizado exitosamente');
  };

  const handlePatrol = () => {
    setPatrolCount(prev => prev + 1);
    setShowPatrolDialog(false);
    toast.success(`Recorrido #${patrolCount + 1} registrado`);
  };

  const handleCleanlinessSubmit = (rating: number) => {
    setShowCleanlinessDialog(false);
    toast.success(`Calificación de limpieza: ${rating}/5 registrada`);
  };

  const handleReportIncident = () => {
    navigate('/teacher/report');
  };

  const handleFinishShift = () => {
    toast.success('Turno finalizado exitosamente');
    navigate('/teacher');
  };

  const checkpoints = ['Punto A - Entrada', 'Punto B - Centro', 'Punto C - Salida'];

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className={`${glassNav} sticky top-0 z-10`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/teacher')}
              className={`w-10 h-10 flex items-center justify-center rounded-xl ${glass} ${glassHover}`}
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900 tracking-tight">{shift.zoneName}</h1>
              <p className="text-sm text-gray-500">{shift.startTime} - {shift.endTime}</p>
            </div>
            {checkedIn && (
              <span className={`px-3 py-1 ${glass} text-green-700 text-xs font-medium rounded-full flex items-center gap-1.5`}>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Activo
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        {/* Check-in Section */}
        {!checkedIn ? (
          <div className={`${glass} rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden`}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Confirma tu presencia</h2>
              <p className="text-sm text-gray-500 mb-6">Escanea el QR de la zona o usa el PIN</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowQrScanner(true)}
                  className="flex-1 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  Escanear QR
                </button>
                <button
                  onClick={handleCheckIn}
                  className={`flex-1 py-3.5 ${glass} ${glassHover} rounded-xl font-medium text-gray-700`}
                >
                  Usar PIN
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Status Card */}
            <div className={`${glass} rounded-3xl p-5 sm:p-6 relative overflow-hidden`}>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-400/0" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Recorridos completados</div>
                  <div className="text-3xl font-semibold text-gray-900">{patrolCount}</div>
                </div>
                <div className="w-12 h-12 bg-green-500/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/40">
                  <Navigation className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            {/* Checkpoints */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Checkpoints</h3>
              <div className="space-y-2">
                {checkpoints.map((cp, i) => (
                  <div key={i} className={`${glass} ${glassHover} rounded-xl px-4 py-3 flex items-center gap-3`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      i < patrolCount ? 'bg-green-500/10 text-green-600' : 'bg-gray-100/60 text-gray-400'
                    }`}>
                      {i < patrolCount ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs font-medium">{i + 1}</span>}
                    </div>
                    <span className={`text-sm ${i < patrolCount ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{cp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setShowPatrolDialog(true)}
                className={`${glass} ${glassHover} rounded-2xl p-5 text-left group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-blue-500/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 border border-white/40">
                    <Navigation className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="font-medium text-gray-900 text-sm">Registrar Recorrido</div>
                  <div className="text-xs text-gray-500 mt-0.5">Marca un nuevo checkpoint</div>
                </div>
              </button>
              <button
                onClick={handleReportIncident}
                className={`${glass} ${glassHover} rounded-2xl p-5 text-left group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-red-500/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 border border-white/40">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="font-medium text-gray-900 text-sm">Reportar Incidente</div>
                  <div className="text-xs text-gray-500 mt-0.5">Registra un evento relevante</div>
                </div>
              </button>
            </div>

            {/* Finish Shift */}
            <button
              onClick={handleFinishShift}
              className="w-full py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-medium rounded-2xl hover:from-gray-800 hover:to-gray-600 transition-all shadow-xl shadow-gray-900/15"
            >
              Finalizar Turno
            </button>
          </>
        )}
      </div>

      {/* QR Scanner Dialog */}
      <Dialog open={showQrScanner} onOpenChange={setShowQrScanner}>
        <DialogContent className="rounded-3xl border-0 max-w-sm backdrop-blur-xl bg-white/90">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-semibold">Escanear QR</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Apunta la cámara al código QR de la zona
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className={`${glass} rounded-2xl aspect-square flex items-center justify-center`}>
              <div className="text-center">
                <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Cámara simulada</p>
              </div>
            </div>
            <button
              onClick={() => { setShowQrScanner(false); handleCheckIn(); }}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/25"
            >
              Simular Escaneo Exitoso
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Patrol Dialog */}
      <Dialog open={showPatrolDialog} onOpenChange={setShowPatrolDialog}>
        <DialogContent className="rounded-3xl border-0 max-w-sm backdrop-blur-xl bg-white/90">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-semibold">Registrar Recorrido</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Confirma que has completado un recorrido por la zona
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className={`${glass} rounded-2xl p-4`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Recorrido #{patrolCount + 1}</div>
                  <div className="text-xs text-gray-500">{shift.zoneName}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPatrolDialog(false)}
                className={`flex-1 py-3 ${glass} ${glassHover} rounded-xl font-medium text-gray-700`}
              >
                Cancelar
              </button>
              <button
                onClick={handlePatrol}
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/25"
              >
                Confirmar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cleanliness Dialog */}
      <Dialog open={showCleanlinessDialog} onOpenChange={setShowCleanlinessDialog}>
        <DialogContent className="rounded-3xl border-0 max-w-sm backdrop-blur-xl bg-white/90">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-semibold">Calificar Limpieza</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Evalúa el estado de limpieza de la zona
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => handleCleanlinessSubmit(n)}
                  className={`w-12 h-12 ${glass} ${glassHover} rounded-xl flex items-center justify-center text-lg font-medium text-gray-700`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
