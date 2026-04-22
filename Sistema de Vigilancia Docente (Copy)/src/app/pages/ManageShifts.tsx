import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Trash2, Upload, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { glass, glassHover, glassNav } from '../components/GlassEffects';
import { mockShifts, mockTeachers, mockZones, type Shift } from '../lib/mockData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function ManageShifts() {
  const navigate = useNavigate();
  const [shifts, setShifts] = useState<Shift[]>(mockShifts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    teacherId: '',
    zoneId: '',
    date: '2026-02-26',
    startTime: '',
    endTime: ''
  });

  const handleAdd = () => {
    if (!formData.teacherId || !formData.zoneId || !formData.startTime || !formData.endTime) {
      toast.error('Completa todos los campos');
      return;
    }

    const teacher = mockTeachers.find(t => t.id === formData.teacherId);
    const zone = mockZones.find(z => z.id === formData.zoneId);

    if (!teacher || !zone) return;

    const newShift: Shift = {
      id: `s${shifts.length + 1}`,
      teacherId: teacher.id,
      teacherName: teacher.name,
      zoneId: zone.id,
      zoneName: zone.name,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      status: 'pending'
    };

    setShifts([...shifts, newShift]);
    setIsAddDialogOpen(false);
    setFormData({
      teacherId: '',
      zoneId: '',
      date: '2026-02-26',
      startTime: '',
      endTime: ''
    });
    toast.success('Turno asignado exitosamente');
  };

  const handleDelete = (shiftId: string) => {
    setShifts(shifts.filter(s => s.id !== shiftId));
    toast.success('Turno eliminado');
  };

  const handleBulkUpload = () => {
    toast.success('Carga masiva iniciada');
  };

  const todayShifts = shifts.filter(s => s.date === '2026-02-26');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return { bg: 'bg-gray-100', text: 'text-gray-700' };
      case 'active': return { bg: 'bg-green-100', text: 'text-green-700' };
      case 'missed': return { bg: 'bg-red-100', text: 'text-red-700' };
      case 'pending': return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700' };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'active': return 'Activo';
      case 'missed': return 'Sin cubrir';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className={`${glassNav} sticky top-0 z-10`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <button 
                onClick={() => navigate('/admin')}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${glass} ${glassHover} flex-shrink-0`}
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">Gestión de Turnos</h1>
                <p className="text-xs sm:text-sm text-gray-500">Asignar y programar turnos</p>
              </div>
            </div>
            
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={() => navigate('/admin/shifts/calendar')}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-purple-100 hover:bg-purple-200 text-purple-900 font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <CalendarIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Vista Calendario</span>
              </button>
              
              <button 
                onClick={handleBulkUpload}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Importar</span>
              </button>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <button className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Turno</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl border-0 max-w-lg">
                  <DialogHeader className="space-y-3">
                    <DialogTitle className="text-2xl font-semibold">Asignar Turno</DialogTitle>
                    <DialogDescription className="text-base text-gray-600">
                      Asigna un docente a una zona
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-5 pt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Docente</label>
                      <Select value={formData.teacherId} onValueChange={(value) => setFormData({...formData, teacherId: value})}>
                        <SelectTrigger className="w-full h-12 bg-gray-50 border-0 rounded-xl">
                          <SelectValue placeholder="Seleccionar docente" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-0 shadow-xl">
                          {mockTeachers.map(teacher => (
                            <SelectItem key={teacher.id} value={teacher.id}>
                              {teacher.name} - {teacher.department}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Zona</label>
                      <Select value={formData.zoneId} onValueChange={(value) => setFormData({...formData, zoneId: value})}>
                        <SelectTrigger className="w-full h-12 bg-gray-50 border-0 rounded-xl">
                          <SelectValue placeholder="Seleccionar zona" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-0 shadow-xl">
                          {mockZones.map(zone => (
                            <SelectItem key={zone.id} value={zone.id}>
                              {zone.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hora Inicio</label>
                        <input
                          type="time"
                          value={formData.startTime}
                          onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hora Fin</label>
                        <input
                          type="time"
                          value={formData.endTime}
                          onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={handleAdd}
                      className="w-full py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all"
                    >
                      Asignar Turno
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-6 sm:space-y-8">
        {/* Stats */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'Total Hoy', value: todayShifts.length },
              { label: 'Cubiertos', value: todayShifts.filter(s => s.status === 'completed' || s.status === 'active').length, color: 'text-green-600' },
              { label: 'Pendientes', value: todayShifts.filter(s => s.status === 'pending').length, color: 'text-yellow-600' },
              { label: 'Sin Cubrir', value: todayShifts.filter(s => s.status === 'missed').length, color: 'text-red-600' }
            ].map((stat, i) => (
              <div key={i} className={`${glass} rounded-2xl sm:rounded-3xl p-4 sm:p-6`}>
                <div className={`text-3xl sm:text-4xl font-semibold mb-1 sm:mb-2 ${stat.color || 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Shifts List */}
        <section className="space-y-3">
          {todayShifts.map((shift) => {
            const statusColors = getStatusColor(shift.status);
            return (
              <div 
                key={shift.id}
                className={`${glass} ${glassHover} rounded-xl sm:rounded-2xl p-4 sm:px-6 sm:py-5 group border border-gray-100`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 flex-1 min-w-0">
                    <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl ${statusColors.bg} self-start`}>
                      <span className={`text-xs sm:text-sm font-medium ${statusColors.text}`}>
                        {getStatusText(shift.status)}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base truncate">{shift.zoneName}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{shift.teacherName}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{shift.startTime} - {shift.endTime}</span>
                    </div>
                    
                    {shift.checkInTime && (
                      <div className="text-xs sm:text-sm text-gray-600">
                        Check-in: {shift.checkInTime}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => {
                      if (confirm(`¿Eliminar el turno de ${shift.teacherName}?`)) {
                        handleDelete(shift.id);
                      }
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors sm:opacity-0 sm:group-hover:opacity-100 self-end sm:self-auto"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}