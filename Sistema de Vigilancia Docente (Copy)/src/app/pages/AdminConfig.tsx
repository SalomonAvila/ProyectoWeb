import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Settings, Clock, Bell, Trophy, Shield, Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { glass, glassHover, glassNav } from '../components/GlassEffects';
import { getCurrentUser, defaultConfig, type SystemConfig } from '../lib/mockData';

export function AdminConfig() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [config, setConfig] = useState<SystemConfig>({ ...defaultConfig });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleChange = (key: keyof SystemConfig, value: number | boolean) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setHasChanges(false);
    toast.success('Configuración guardada exitosamente');
  };

  const handleReset = () => {
    setConfig({ ...defaultConfig });
    setHasChanges(false);
    toast.success('Configuración restablecida a valores predeterminados');
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className={`${glassNav} sticky top-0 z-10`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <button 
                onClick={() => navigate('/admin')}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${glass} ${glassHover} flex-shrink-0`}
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">Configuración</h1>
                <p className="text-xs sm:text-sm text-gray-500">Parámetros del sistema</p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {hasChanges && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden sm:inline">Restablecer</span>
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={!hasChanges}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                  hasChanges 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>Guardar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-8 sm:space-y-10">
        {/* Shift Settings */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Turnos</h2>
              <p className="text-sm text-gray-500">Parámetros de los turnos de vigilancia</p>
            </div>
          </div>
          <div className={`${glass} rounded-2xl sm:rounded-3xl divide-y divide-white/30`}>
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium text-gray-900">Duración del turno</h3>
                  <p className="text-sm text-gray-500">Tiempo estándar por turno</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="15"
                    max="60"
                    step="5"
                    value={config.shiftDuration}
                    onChange={(e) => handleChange('shiftDuration', parseInt(e.target.value))}
                    className="w-32 sm:w-40 accent-blue-500"
                  />
                  <span className="text-sm font-semibold text-gray-900 w-16 text-right">{config.shiftDuration} min</span>
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium text-gray-900">Recorridos mínimos</h3>
                  <p className="text-sm text-gray-500">Mínimo de recorridos por turno</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleChange('minPatrols', Math.max(1, config.minPatrols - 1))}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-medium transition-colors"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-gray-900 w-8 text-center">{config.minPatrols}</span>
                  <button
                    onClick={() => handleChange('minPatrols', Math.min(10, config.minPatrols + 1))}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-medium transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Notificaciones</h2>
              <p className="text-sm text-gray-500">Alertas y avisos automáticos</p>
            </div>
          </div>
          <div className={`${glass} rounded-2xl sm:rounded-3xl divide-y divide-white/30`}>
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium text-gray-900">Aviso anticipado</h3>
                  <p className="text-sm text-gray-500">Minutos antes del turno para notificar</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="5"
                    value={config.notificationMinutes}
                    onChange={(e) => handleChange('notificationMinutes', parseInt(e.target.value))}
                    className="w-32 sm:w-40 accent-orange-500"
                  />
                  <span className="text-sm font-semibold text-gray-900 w-16 text-right">{config.notificationMinutes} min</span>
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium text-gray-900">Auto-reasignación</h3>
                  <p className="text-sm text-gray-500">Minutos sin check-in para alertar reasignación</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="1"
                    value={config.autoReassignMinutes}
                    onChange={(e) => handleChange('autoReassignMinutes', parseInt(e.target.value))}
                    className="w-32 sm:w-40 accent-orange-500"
                  />
                  <span className="text-sm font-semibold text-gray-900 w-16 text-right">{config.autoReassignMinutes} min</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gamification Settings */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Gamificación</h2>
              <p className="text-sm text-gray-500">Sistema de puntos e incentivos</p>
            </div>
          </div>
          <div className={`${glass} rounded-2xl sm:rounded-3xl divide-y divide-white/30`}>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium text-gray-900">Habilitar gamificación</h3>
                  <p className="text-sm text-gray-500">Puntos, rankings e insignias</p>
                </div>
                <button
                  onClick={() => handleChange('gamificationEnabled', !config.gamificationEnabled)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    config.gamificationEnabled ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                    config.gamificationEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
            {config.gamificationEnabled && (
              <>
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-gray-900">Puntos por turno completado</h3>
                      <p className="text-sm text-gray-500">Base de puntos al finalizar un turno</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleChange('pointsPerShift', Math.max(10, config.pointsPerShift - 10))}
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-medium transition-colors"
                      >
                        −
                      </button>
                      <span className="text-lg font-semibold text-purple-600 w-12 text-center">{config.pointsPerShift}</span>
                      <button
                        onClick={() => handleChange('pointsPerShift', Math.min(500, config.pointsPerShift + 10))}
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-medium transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-gray-900">Puntos por recorrido</h3>
                      <p className="text-sm text-gray-500">Puntos por cada ronda de vigilancia</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleChange('pointsPerPatrol', Math.max(5, config.pointsPerPatrol - 5))}
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-medium transition-colors"
                      >
                        −
                      </button>
                      <span className="text-lg font-semibold text-purple-600 w-12 text-center">{config.pointsPerPatrol}</span>
                      <button
                        onClick={() => handleChange('pointsPerPatrol', Math.min(200, config.pointsPerPatrol + 5))}
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-medium transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-gray-900">Puntos por reporte</h3>
                      <p className="text-sm text-gray-500">Puntos por incidente reportado</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleChange('pointsPerReport', Math.max(10, config.pointsPerReport - 10))}
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-medium transition-colors"
                      >
                        −
                      </button>
                      <span className="text-lg font-semibold text-purple-600 w-12 text-center">{config.pointsPerReport}</span>
                      <button
                        onClick={() => handleChange('pointsPerReport', Math.min(200, config.pointsPerReport + 10))}
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-medium transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Security */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Seguridad</h2>
              <p className="text-sm text-gray-500">Verificación y control de acceso</p>
            </div>
          </div>
          <div className={`${glass} rounded-2xl sm:rounded-3xl divide-y divide-white/30`}>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium text-gray-900">Verificación QR obligatoria</h3>
                  <p className="text-sm text-gray-500">Requiere escaneo QR para check-in</p>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  Activo
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium text-gray-900">PIN alternativo</h3>
                  <p className="text-sm text-gray-500">Permitir check-in con código PIN</p>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  Activo
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium text-gray-900">Geolocalización</h3>
                  <p className="text-sm text-gray-500">Verificar ubicación del docente</p>
                </div>
                <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                  Desactivado
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}