import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { getCurrentUser, mockZones } from '../lib/mockData';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { glass, glassHover, glassNav, glassInput } from '../components/GlassEffects';

export function ReportIncident() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  const [formData, setFormData] = useState({
    zoneId: '',
    type: '',
    severity: '',
    description: '',
    studentName: '',
    studentGrade: '',
    notifications: [] as string[]
  });

  useEffect(() => {
    if (!user || user.role !== 'teacher') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'teacher') {
    return null;
  }

  const incidentTypes = [
    { value: 'physical', label: 'Seguridad Física', desc: 'Caída, golpe, accidente' },
    { value: 'coexistence', label: 'Convivencia', desc: 'Pelea, agresión, conflicto' },
    { value: 'space', label: 'Uso del Espacio', desc: 'Mal uso de mobiliario' },
    { value: 'social', label: 'Observación Social', desc: 'Aislamiento, conducta' }
  ];

  const severityLevels = [
    { value: 'S1', label: 'Leve', desc: 'Situación menor' },
    { value: 'S2', label: 'Seguimiento', desc: 'Requiere atención' },
    { value: 'S3', label: 'Urgente', desc: 'Atención inmediata' }
  ];

  const notificationOptions = [
    { value: 'enfermeria', label: 'Enfermería' },
    { value: 'aseo', label: 'Aseo' },
    { value: 'psicologia', label: 'Psicología' },
    { value: 'vida-comunitaria', label: 'Vida Comunitaria' }
  ];

  const toggleNotification = (value: string) => {
    setFormData(prev => ({
      ...prev,
      notifications: prev.notifications.includes(value)
        ? prev.notifications.filter(n => n !== value)
        : [...prev.notifications, value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.zoneId || !formData.type || !formData.severity || !formData.description) {
      toast.error('Completa los campos requeridos');
      return;
    }

    // Mapeo de notificaciones a correos
    const emailMap: Record<string, string> = {
      'enfermeria': 'enfermeria@colegio.edu',
      'aseo': 'aseo@colegio.edu',
      'psicologia': 'psicologia@colegio.edu',
      'vida-comunitaria': 'vidacomunitaria@colegio.edu'
    };

    // Mostrar correos notificados si hay seleccionados
    if (formData.notifications.length > 0) {
      const emails = formData.notifications.map(n => emailMap[n]).join(', ');
      toast.success(`Correos notificados: ${emails}`, { duration: 3000 });
      
      // Después mostrar el mensaje de incidente registrado
      setTimeout(() => {
        toast.success('Incidente registrado exitosamente');
      }, 500);
    } else {
      toast.success('Incidente registrado exitosamente');
    }
    
    // Navegar de vuelta al dashboard
    setTimeout(() => {
      navigate('/teacher');
    }, formData.notifications.length > 0 ? 2000 : 1500);
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className={`${glassNav} sticky top-0 z-10`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center gap-3 sm:gap-4">
          <button 
            onClick={() => navigate('/teacher')}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${glass} ${glassHover} flex-shrink-0`}
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Registrar Incidente</h1>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-14">
          {/* Step 1: Basic Info */}
          <section>
            <h2 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
              1. Ubicación y Tipo
            </h2>
            
            <div className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 px-1">Zona</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mockZones.map(zone => (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setFormData({...formData, zoneId: zone.id})}
                      className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all ${
                        formData.zoneId === zone.id
                          ? 'border-blue-400 bg-blue-50/60 backdrop-blur-sm'
                          : `${glass} ${glassHover}`
                      }`}
                    >
                      <div className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{zone.name}</div>
                      <div className="text-xs text-gray-600">{zone.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 px-1">Tipo de Incidente</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {incidentTypes.map(type => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({...formData, type: type.value})}
                      className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all ${
                        formData.type === type.value
                          ? 'border-blue-400 bg-blue-50/60 backdrop-blur-sm'
                          : `${glass} ${glassHover}`
                      }`}
                    >
                      <div className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{type.label}</div>
                      <div className="text-xs text-gray-600">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Step 2: Severity */}
          <section>
            <h2 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
              2. Nivel de Severidad
            </h2>
            
            <div className="space-y-3">
              {severityLevels.map(level => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setFormData({...formData, severity: level.value})}
                  className={`w-full p-5 sm:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all ${
                    formData.severity === level.value
                      ? level.value === 'S3' ? 'border-red-400 bg-red-50/60 backdrop-blur-sm' :
                        level.value === 'S2' ? 'border-orange-400 bg-orange-50/60 backdrop-blur-sm' :
                        'border-yellow-400 bg-yellow-50/60 backdrop-blur-sm'
                      : `${glass} ${glassHover}`
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{level.value} - {level.label}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{level.desc}</div>
                    </div>
                    {formData.severity === level.value && (
                      <CheckCircle className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${
                        level.value === 'S3' ? 'text-red-500' :
                        level.value === 'S2' ? 'text-orange-500' :
                        'text-yellow-500'
                      }`} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Step 3: Description */}
          <section>
            <h2 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6 px-1">
              3. Descripción
            </h2>
            
            <div className="space-y-5 sm:space-y-6">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-3 px-1">
                  ¿Qué sucedió?
                </label>
                <textarea
                  id="description"
                  placeholder="Describe brevemente la situación..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={5}
                  className={`w-full px-4 sm:px-5 py-3 sm:py-4 ${glassInput} rounded-xl sm:rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition-all`}
                />
              </div>

              {formData.type === 'social' && (
                <>
                  <div>
                    <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-3 px-1">
                      Nombre del Estudiante (Opcional)
                    </label>
                    <input
                      id="studentName"
                      placeholder="Nombre completo"
                      value={formData.studentName}
                      onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                      className={`w-full px-4 sm:px-5 py-3 sm:py-4 ${glassInput} rounded-xl sm:rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all`}
                    />
                  </div>

                  <div>
                    <label htmlFor="studentGrade" className="block text-sm font-medium text-gray-700 mb-3 px-1">
                      Curso (Opcional)
                    </label>
                    <input
                      id="studentGrade"
                      placeholder="ej. 5B"
                      value={formData.studentGrade}
                      onChange={(e) => setFormData({...formData, studentGrade: e.target.value})}
                      className={`w-full px-4 sm:px-5 py-3 sm:py-4 ${glassInput} rounded-xl sm:rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all`}
                    />
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Step 4: Notifications */}
          <section>
            <h2 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
              Enviar notificación a
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 px-1">
              Selecciona los departamentos que deben ser notificados
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {notificationOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleNotification(option.value)}
                  className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all ${
                    formData.notifications.includes(option.value)
                      ? 'border-blue-400 bg-blue-50/60 backdrop-blur-sm'
                      : `${glass} ${glassHover}`
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">{option.label}</div>
                    {formData.notifications.includes(option.value) && (
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-blue-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Alert for S3 - only show if NOT urgent */}
          {formData.severity !== 'S3' && formData.severity && (
            <div className={`p-5 sm:p-6 ${glass} rounded-xl sm:rounded-2xl border border-gray-200/60`}>
              <div className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">ℹ️ Antes de registrar el incidente</div>
              <div className="text-xs sm:text-sm text-gray-600">
                Asegúrate de haber descrito la situación con el mayor detalle posible para facilitar el seguimiento.
              </div>
            </div>
          )}

          {/* Alert for S3 urgency */}
          {formData.severity === 'S3' && (
            <div className={`p-5 sm:p-6 bg-red-50/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-red-200/60`}>
              <div className="font-semibold text-red-900 mb-2 text-sm sm:text-base">⚠️ Atención Inmediata Requerida</div>
              <div className="text-xs sm:text-sm text-red-700">
                Este reporte será enviado inmediatamente al coordinador y personal de emergencias.
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
            <button 
              type="button"
              onClick={() => navigate('/teacher')}
              className={`w-full sm:flex-1 py-3.5 sm:py-4 ${glass} ${glassHover} text-gray-900 font-medium rounded-xl sm:rounded-2xl order-2 sm:order-1`}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="w-full sm:flex-1 py-3.5 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-medium rounded-xl sm:rounded-2xl transition-all shadow-lg shadow-blue-500/25 order-1 sm:order-2"
            >
              Registrar Incidente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}