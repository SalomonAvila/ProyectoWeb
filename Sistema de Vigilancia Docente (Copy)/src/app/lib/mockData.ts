// Mock data and utilities for the surveillance system

export interface Zone {
  id: string;
  name: string;
  description: string;
  checkpoints: string[];
  qrCode: string;
  isActive: boolean;
  capacity: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  department: string;
  isActive: boolean;
}

export interface Shift {
  id: string;
  teacherId: string;
  teacherName: string;
  zoneId: string;
  zoneName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'active' | 'completed' | 'missed';
  checkInTime?: string;
  checkOutTime?: string;
  patrolCount?: number;
  cleanlinessRating?: number;
}

export interface Incident {
  id: string;
  shiftId: string;
  teacherId: string;
  teacherName: string;
  zoneId: string;
  zoneName: string;
  type: 'physical' | 'coexistence' | 'space' | 'social';
  severity: 'S1' | 'S2' | 'S3';
  description: string;
  timestamp: string;
  studentName?: string;
  studentGrade?: string;
  resolved?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'coordinator' | 'admin';
}

export interface SystemConfig {
  shiftDuration: number; // minutes
  minPatrols: number;
  notificationMinutes: number;
  autoReassignMinutes: number;
  gamificationEnabled: boolean;
  pointsPerShift: number;
  pointsPerPatrol: number;
  pointsPerReport: number;
}

// Mock system config
export const defaultConfig: SystemConfig = {
  shiftDuration: 30,
  minPatrols: 2,
  notificationMinutes: 15,
  autoReassignMinutes: 10,
  gamificationEnabled: true,
  pointsPerShift: 100,
  pointsPerPatrol: 25,
  pointsPerReport: 50,
};

// Mock zones
export const mockZones: Zone[] = [
  {
    id: 'z1',
    name: 'Patio Principal',
    description: 'Área central de recreo',
    checkpoints: ['Punto A - Entrada', 'Punto B - Centro', 'Punto C - Salida'],
    qrCode: 'QR_PATIO_PRINCIPAL',
    isActive: true,
    capacity: 120,
    riskLevel: 'high'
  },
  {
    id: 'z2',
    name: 'Cancha Deportiva',
    description: 'Zona de deportes',
    checkpoints: ['Punto A - Arco Norte', 'Punto B - Centro', 'Punto C - Arco Sur'],
    qrCode: 'QR_CANCHA_DEPORTIVA',
    isActive: true,
    capacity: 80,
    riskLevel: 'medium'
  },
  {
    id: 'z3',
    name: 'Cafetería',
    description: 'Área de comedor',
    checkpoints: ['Punto A - Entrada', 'Punto B - Mesas', 'Punto C - Salida'],
    qrCode: 'QR_CAFETERIA',
    isActive: true,
    capacity: 100,
    riskLevel: 'medium'
  },
  {
    id: 'z4',
    name: 'Jardín',
    description: 'Zona verde',
    checkpoints: ['Punto A - Bancas', 'Punto B - Árboles'],
    qrCode: 'QR_JARDIN',
    isActive: true,
    capacity: 40,
    riskLevel: 'low'
  },
  {
    id: 'z5',
    name: 'Pasillo Primaria',
    description: 'Corredor edificio A',
    checkpoints: ['Punto A - Inicio', 'Punto B - Centro', 'Punto C - Final'],
    qrCode: 'QR_PASILLO_PRIMARIA',
    isActive: true,
    capacity: 50,
    riskLevel: 'low'
  }
];

// Mock teachers
export const mockTeachers: Teacher[] = [
  { id: 't1', name: 'María González', email: 'maria.gonzalez@colegio.edu', department: 'Matemáticas', isActive: true },
  { id: 't2', name: 'Juan Pérez', email: 'juan.perez@colegio.edu', department: 'Español', isActive: true },
  { id: 't3', name: 'Ana Martínez', email: 'ana.martinez@colegio.edu', department: 'Ciencias', isActive: true },
  { id: 't4', name: 'Carlos López', email: 'carlos.lopez@colegio.edu', department: 'Educación Física', isActive: true },
  { id: 't5', name: 'Laura Rodríguez', email: 'laura.rodriguez@colegio.edu', department: 'Inglés', isActive: true },
  { id: 't6', name: 'Pedro Sánchez', email: 'pedro.sanchez@colegio.edu', department: 'Historia', isActive: true },
  { id: 't7', name: 'Sofía Ramírez', email: 'sofia.ramirez@colegio.edu', department: 'Arte', isActive: true },
  { id: 't8', name: 'Diego Torres', email: 'diego.torres@colegio.edu', department: 'Música', isActive: true }
];

// Mock shifts for today
export const mockShifts: Shift[] = [
  {
    id: 's1',
    teacherId: 't1',
    teacherName: 'María González',
    zoneId: 'z1',
    zoneName: 'Patio Principal',
    date: '2026-02-26',
    startTime: '10:00',
    endTime: '10:30',
    status: 'completed',
    checkInTime: '10:00',
    checkOutTime: '10:30',
    patrolCount: 3,
    cleanlinessRating: 2
  },
  {
    id: 's2',
    teacherId: 't2',
    teacherName: 'Juan Pérez',
    zoneId: 'z2',
    zoneName: 'Cancha Deportiva',
    date: '2026-02-26',
    startTime: '10:00',
    endTime: '10:30',
    status: 'completed',
    checkInTime: '10:02',
    checkOutTime: '10:30',
    patrolCount: 2,
    cleanlinessRating: 1
  },
  {
    id: 's3',
    teacherId: 't3',
    teacherName: 'Ana Martínez',
    zoneId: 'z3',
    zoneName: 'Cafetería',
    date: '2026-02-26',
    startTime: '12:00',
    endTime: '12:45',
    status: 'active',
    checkInTime: '12:00',
    patrolCount: 1
  },
  {
    id: 's4',
    teacherId: 't4',
    teacherName: 'Carlos López',
    zoneId: 'z1',
    zoneName: 'Patio Principal',
    date: '2026-02-26',
    startTime: '12:00',
    endTime: '12:45',
    status: 'active',
    checkInTime: '11:59',
    patrolCount: 2
  },
  {
    id: 's5',
    teacherId: 't5',
    teacherName: 'Laura Rodríguez',
    zoneId: 'z4',
    zoneName: 'Jardín',
    date: '2026-02-26',
    startTime: '12:00',
    endTime: '12:45',
    status: 'missed',
  },
  {
    id: 's6',
    teacherId: 't6',
    teacherName: 'Pedro Sánchez',
    zoneId: 'z2',
    zoneName: 'Cancha Deportiva',
    date: '2026-02-26',
    startTime: '15:00',
    endTime: '15:30',
    status: 'pending',
  },
  {
    id: 's7',
    teacherId: 't7',
    teacherName: 'Sofía Ramírez',
    zoneId: 'z5',
    zoneName: 'Pasillo Primaria',
    date: '2026-02-26',
    startTime: '15:00',
    endTime: '15:30',
    status: 'pending',
  },
  // Additional shifts for teacher t1 (María González)
  {
    id: 's8',
    teacherId: 't1',
    teacherName: 'María González',
    zoneId: 'z3',
    zoneName: 'Cafetería',
    date: '2026-02-26',
    startTime: '12:00',
    endTime: '12:45',
    status: 'completed',
    checkInTime: '12:00',
    checkOutTime: '12:45',
    patrolCount: 4,
    cleanlinessRating: 2
  },
  {
    id: 's9',
    teacherId: 't1',
    teacherName: 'María González',
    zoneId: 'z2',
    zoneName: 'Cancha Deportiva',
    date: '2026-02-26',
    startTime: '14:00',
    endTime: '14:30',
    status: 'pending',
  },
  {
    id: 's10',
    teacherId: 't1',
    teacherName: 'María González',
    zoneId: 'z4',
    zoneName: 'Jardín',
    date: '2026-02-26',
    startTime: '15:00',
    endTime: '15:30',
    status: 'pending',
  },
  {
    id: 's11',
    teacherId: 't1',
    teacherName: 'María González',
    zoneId: 'z5',
    zoneName: 'Pasillo Primaria',
    date: '2026-02-25',
    startTime: '10:00',
    endTime: '10:30',
    status: 'completed',
    checkInTime: '10:00',
    checkOutTime: '10:30',
    patrolCount: 2,
    cleanlinessRating: 1
  },
  {
    id: 's12',
    teacherId: 't1',
    teacherName: 'María González',
    zoneId: 'z1',
    zoneName: 'Patio Principal',
    date: '2026-02-25',
    startTime: '12:00',
    endTime: '12:45',
    status: 'completed',
    checkInTime: '11:59',
    checkOutTime: '12:45',
    patrolCount: 5,
    cleanlinessRating: 2
  },
  {
    id: 's13',
    teacherId: 't1',
    teacherName: 'María González',
    zoneId: 'z2',
    zoneName: 'Cancha Deportiva',
    date: '2026-02-24',
    startTime: '10:00',
    endTime: '10:30',
    status: 'completed',
    checkInTime: '10:01',
    checkOutTime: '10:30',
    patrolCount: 3,
    cleanlinessRating: 1
  },
  {
    id: 's14',
    teacherId: 't1',
    teacherName: 'María González',
    zoneId: 'z3',
    zoneName: 'Cafetería',
    date: '2026-02-24',
    startTime: '12:00',
    endTime: '12:45',
    status: 'completed',
    checkInTime: '12:00',
    checkOutTime: '12:45',
    patrolCount: 4,
    cleanlinessRating: 2
  },
  {
    id: 's15',
    teacherId: 't1',
    teacherName: 'María González',
    zoneId: 'z4',
    zoneName: 'Jardín',
    date: '2026-02-23',
    startTime: '10:00',
    endTime: '10:30',
    status: 'completed',
    checkInTime: '10:00',
    checkOutTime: '10:30',
    patrolCount: 2,
    cleanlinessRating: 1
  },
  {
    id: 's16',
    teacherId: 't1',
    teacherName: 'María González',
    zoneId: 'z1',
    zoneName: 'Patio Principal',
    date: '2026-02-23',
    startTime: '14:00',
    endTime: '14:30',
    status: 'completed',
    checkInTime: '14:00',
    checkOutTime: '14:30',
    patrolCount: 3,
    cleanlinessRating: 2
  },
];

// Mock incidents
export const mockIncidents: Incident[] = [
  {
    id: 'i1',
    shiftId: 's1',
    teacherId: 't1',
    teacherName: 'María González',
    zoneId: 'z1',
    zoneName: 'Patio Principal',
    type: 'physical',
    severity: 'S1',
    description: 'Estudiante tropezó al correr',
    timestamp: '2026-02-26T10:15:00',
    resolved: true
  },
  {
    id: 'i2',
    shiftId: 's1',
    teacherId: 't1',
    teacherName: 'María González',
    zoneId: 'z1',
    zoneName: 'Patio Principal',
    type: 'coexistence',
    severity: 'S2',
    description: 'Discusión verbal entre estudiantes',
    timestamp: '2026-02-26T10:20:00',
    resolved: true
  },
  {
    id: 'i3',
    shiftId: 's2',
    teacherId: 't2',
    teacherName: 'Juan Pérez',
    zoneId: 'z2',
    zoneName: 'Cancha Deportiva',
    type: 'physical',
    severity: 'S2',
    description: 'Golpe con balón, requiere revisión',
    timestamp: '2026-02-26T10:12:00',
    resolved: false
  },
  {
    id: 'i4',
    shiftId: 's3',
    teacherId: 't3',
    teacherName: 'Ana Martínez',
    zoneId: 'z3',
    zoneName: 'Cafetería',
    type: 'space',
    severity: 'S1',
    description: 'Mal uso de silla, balanceándose',
    timestamp: '2026-02-26T12:10:00',
    resolved: false
  },
  {
    id: 'i5',
    shiftId: 's4',
    teacherId: 't4',
    teacherName: 'Carlos López',
    zoneId: 'z1',
    zoneName: 'Patio Principal',
    type: 'social',
    severity: 'S2',
    description: 'Estudiante aislado',
    timestamp: '2026-02-26T12:15:00',
    studentName: 'Pedro Ramírez',
    studentGrade: '5B',
    resolved: false
  }
];

// Mock current user
export let currentUser: User | null = null;

export function setCurrentUser(user: User | null) {
  currentUser = user;
}

export function getCurrentUser(): User | null {
  return currentUser;
}

// Helper functions
export function getZoneById(zoneId: string): Zone | undefined {
  return mockZones.find(z => z.id === zoneId);
}

export function getTeacherById(teacherId: string): Teacher | undefined {
  return mockTeachers.find(t => t.id === teacherId);
}

export function getShiftById(shiftId: string): Shift | undefined {
  return mockShifts.find(s => s.id === shiftId);
}

export function getShiftsByTeacher(teacherId: string): Shift[] {
  return mockShifts.filter(s => s.teacherId === teacherId);
}

export function getIncidentsByZone(zoneId: string): Incident[] {
  return mockIncidents.filter(i => i.zoneId === zoneId);
}

export function getIncidentsByType(type: string): Incident[] {
  return mockIncidents.filter(i => i.type === type);
}

// Calculate heat map data
export function calculateHeatMapData() {
  const totalIncidents = mockIncidents.length;
  const zoneIncidents = mockZones.map(zone => {
    const incidents = getIncidentsByZone(zone.id);
    return {
      zone: zone.name,
      count: incidents.length,
      percentage: totalIncidents > 0 ? ((incidents.length / totalIncidents) * 100).toFixed(1) : '0.0'
    };
  });
  
  return zoneIncidents.sort((a, b) => b.count - a.count);
}

// Get available teachers for replacement
export function getAvailableTeachers(excludeTeacherId: string, timeSlot: string): Teacher[] {
  // Filter teachers who don't have a shift at the same time
  const busyTeacherIds = mockShifts
    .filter(s => s.startTime === timeSlot && s.teacherId !== excludeTeacherId)
    .map(s => s.teacherId);
  
  return mockTeachers.filter(t => t.id !== excludeTeacherId && !busyTeacherIds.includes(t.id));
}

export function formatTime(time: string): string {
  return time;
}

export function formatDateTime(datetime: string): string {
  const date = new Date(datetime);
  return date.toLocaleString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit',
    day: '2-digit',
    month: 'short'
  });
}

// Gamification leaderboard data
export interface LeaderboardEntry {
  teacherId: string;
  teacherName: string;
  department: string;
  points: number;
  shiftsCompleted: number;
  punctualityRate: number;
  patrolsTotal: number;
  incidentsReported: number;
  badges: string[];
}

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    teacherId: 't1',
    teacherName: 'María González',
    department: 'Matemáticas',
    points: 850,
    shiftsCompleted: 24,
    punctualityRate: 100,
    patrolsTotal: 72,
    incidentsReported: 12,
    badges: ['Puntualidad Perfecta', 'Vigilante Estrella', '100 Recorridos', 'Primer Reporte', 'Semana Perfecta', 'Mentor', 'Líder']
  },
  {
    teacherId: 't4',
    teacherName: 'Carlos López',
    department: 'Educación Física',
    points: 780,
    shiftsCompleted: 22,
    punctualityRate: 95,
    patrolsTotal: 66,
    incidentsReported: 8,
    badges: ['Vigilante Estrella', 'Primer Reporte', 'Semana Perfecta', 'Mentor', 'Deportista']
  },
  {
    teacherId: 't3',
    teacherName: 'Ana Martínez',
    department: 'Ciencias',
    points: 720,
    shiftsCompleted: 20,
    punctualityRate: 92,
    patrolsTotal: 58,
    incidentsReported: 10,
    badges: ['Primer Reporte', 'Semana Perfecta', 'Observador Atento', 'Investigador']
  },
  {
    teacherId: 't2',
    teacherName: 'Juan Pérez',
    department: 'Español',
    points: 650,
    shiftsCompleted: 18,
    punctualityRate: 88,
    patrolsTotal: 50,
    incidentsReported: 6,
    badges: ['Primer Reporte', 'Comunicador', 'Mediador']
  },
  {
    teacherId: 't6',
    teacherName: 'Pedro Sánchez',
    department: 'Historia',
    points: 580,
    shiftsCompleted: 16,
    punctualityRate: 90,
    patrolsTotal: 45,
    incidentsReported: 4,
    badges: ['Primer Reporte', 'Historiador', 'Vigilante']
  },
  {
    teacherId: 't7',
    teacherName: 'Sofía Ramírez',
    department: 'Arte',
    points: 520,
    shiftsCompleted: 15,
    punctualityRate: 87,
    patrolsTotal: 40,
    incidentsReported: 5,
    badges: ['Primer Reporte', 'Artista', 'Creativo']
  },
  {
    teacherId: 't5',
    teacherName: 'Laura Rodríguez',
    department: 'Inglés',
    points: 450,
    shiftsCompleted: 14,
    punctualityRate: 82,
    patrolsTotal: 35,
    incidentsReported: 3,
    badges: ['Primer Reporte', 'Global']
  },
  {
    teacherId: 't8',
    teacherName: 'Diego Torres',
    department: 'Música',
    points: 400,
    shiftsCompleted: 12,
    punctualityRate: 85,
    patrolsTotal: 30,
    incidentsReported: 2,
    badges: ['Primer Reporte', 'Melodía']
  }
];

// Audit log
export interface AuditLog {
  id: string;
  action: string;
  user: string;
  role: string;
  timestamp: string;
  details: string;
}

export const mockAuditLogs: AuditLog[] = [
  { id: 'a1', action: 'Turno completado', user: 'María González', role: 'Docente', timestamp: '2026-02-26T10:30:00', details: 'Patio Principal - 3 recorridos' },
  { id: 'a2', action: 'Incidente reportado', user: 'María González', role: 'Docente', timestamp: '2026-02-26T10:20:00', details: 'S2 - Convivencia en Patio Principal' },
  { id: 'a3', action: 'Check-in realizado', user: 'Ana Martínez', role: 'Docente', timestamp: '2026-02-26T12:00:00', details: 'Cafetería - QR verificado' },
  { id: 'a4', action: 'Turno reasignado', user: 'Coordinador', role: 'Coordinador', timestamp: '2026-02-26T12:05:00', details: 'Jardín - Laura Rodríguez → Pedro Sánchez' },
  { id: 'a5', action: 'Zona creada', user: 'Administrador', role: 'Admin', timestamp: '2026-02-25T09:00:00', details: 'Biblioteca - Capacidad 30' },
  { id: 'a6', action: 'Turno programado', user: 'Administrador', role: 'Admin', timestamp: '2026-02-25T08:30:00', details: '7 turnos para 26/02/2026' },
  { id: 'a7', action: 'Configuración actualizada', user: 'Administrador', role: 'Admin', timestamp: '2026-02-24T14:00:00', details: 'Notificación anticipada: 15 min' },
  { id: 'a8', action: 'Incidente resuelto', user: 'Coordinador', role: 'Coordinador', timestamp: '2026-02-26T10:25:00', details: 'S1 - Patio Principal' },
];