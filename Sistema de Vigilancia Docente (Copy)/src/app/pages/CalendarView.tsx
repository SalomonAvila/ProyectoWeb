import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import { glass, glassHover, glassNav } from '../components/GlassEffects';
import { mockShifts, mockZones, type Shift } from '../lib/mockData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';

export function CalendarView() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 26)); // February 26, 2026
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getShiftsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockShifts.filter(s => s.date === dateStr);
  };

  const handleDayClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDay(date);
  };

  const selectedDayShifts = selectedDay ? getShiftsForDay(selectedDay.getDate()) : [];

  const isToday = (day: number) => {
    const today = new Date(2026, 1, 26); // February 26, 2026
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'missed': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className={`${glassNav} sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <button 
                onClick={() => navigate('/admin/shifts')}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${glass} ${glassHover} flex-shrink-0`}
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">Calendario de Turnos</h1>
                <p className="text-xs sm:text-sm text-gray-500">Vista mensual</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-6">
        {/* Calendar Navigation */}
        <div className={`${glass} rounded-2xl sm:rounded-3xl p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goToPreviousMonth}
              className={`w-10 h-10 flex items-center justify-center rounded-xl ${glass} ${glassHover}`}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={goToNextMonth}
              className={`w-10 h-10 flex items-center justify-center rounded-xl ${glass} ${glassHover}`}
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Calendar days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const shifts = getShiftsForDay(day);
              const today = isToday(day);

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square rounded-xl sm:rounded-2xl p-1 sm:p-2 transition-all relative ${
                    today 
                      ? 'bg-blue-100 border-2 border-blue-400' 
                      : shifts.length > 0 
                        ? `${glass} ${glassHover}` 
                        : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`text-sm sm:text-base font-medium mb-1 ${
                    today ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {day}
                  </div>
                  
                  {shifts.length > 0 && (
                    <div className="space-y-0.5">
                      {shifts.slice(0, 3).map(shift => (
                        <div
                          key={shift.id}
                          className={`h-1 rounded-full ${getStatusColor(shift.status)}`}
                          title={`${shift.zoneName} - ${shift.teacherName}`}
                        />
                      ))}
                      {shifts.length > 3 && (
                        <div className="text-[10px] text-gray-500 text-center">
                          +{shifts.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className={`${glass} rounded-2xl p-4 sm:p-6`}>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Leyenda</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { status: 'pending', label: 'Pendiente', color: 'bg-yellow-500' },
              { status: 'active', label: 'Activo', color: 'bg-blue-500' },
              { status: 'completed', label: 'Completado', color: 'bg-green-500' },
              { status: 'missed', label: 'Sin cubrir', color: 'bg-red-500' }
            ].map(item => (
              <div key={item.status} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${item.color}`} />
                <span className="text-xs sm:text-sm text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {mockZones.map(zone => {
            const zoneShifts = mockShifts.filter(s => 
              s.zoneId === zone.id && 
              s.date.startsWith(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`)
            );
            return (
              <div key={zone.id} className={`${glass} rounded-2xl p-4 sm:p-5`}>
                <div className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">
                  {zoneShifts.length}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{zone.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Day Details Dialog */}
      <Dialog open={selectedDay !== null} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Turnos del {selectedDay?.getDate()} de {selectedDay && monthNames[selectedDay.getMonth()]}
            </DialogTitle>
            <DialogDescription>
              {selectedDayShifts.length} turno(s) programado(s)
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 pt-4 max-h-96 overflow-y-auto">
            {selectedDayShifts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No hay turnos programados para este día
              </div>
            ) : (
              selectedDayShifts.map(shift => (
                <div key={shift.id} className={`${glass} rounded-2xl p-4`}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="font-semibold text-gray-900">{shift.zoneName}</h4>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      shift.status === 'completed' ? 'bg-green-100 text-green-700' :
                      shift.status === 'active' ? 'bg-blue-100 text-blue-700' :
                      shift.status === 'missed' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {shift.status === 'completed' ? 'Completado' :
                       shift.status === 'active' ? 'Activo' :
                       shift.status === 'missed' ? 'Sin cubrir' : 'Pendiente'}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 flex-shrink-0" />
                      <span>{shift.teacherName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{shift.startTime} - {shift.endTime}</span>
                    </div>
                    {shift.checkInTime && (
                      <div className="text-xs text-green-600">
                        Check-in: {shift.checkInTime}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
