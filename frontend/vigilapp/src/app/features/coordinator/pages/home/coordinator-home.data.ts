import {
  CoordinatorIncident,
  CoordinatorShift,
  CoordinatorTeacher,
  CoordinatorUser,
  CoordinatorZone,
} from './coordinator-home.models';
import { COORDINATOR_ZONE_CATALOG } from './coordinator-zone-catalog';

export const COORDINATOR_DAY = '2026-02-26';

export const COORDINATOR_USER: CoordinatorUser = {
  name: 'Coordinador Operativo',
  role: 'coordinator'
};

export const MOCK_TEACHERS: CoordinatorTeacher[] = [
  { id: 't1', name: 'Laura Peña', department: 'Ciencias Sociales', isActive: true },
  { id: 't2', name: 'Andrés Mora', department: 'Matemáticas', isActive: true },
  { id: 't3', name: 'Sofía Rojas', department: 'Lengua', isActive: true },
  { id: 't4', name: 'Miguel Torres', department: 'Tecnología', isActive: true },
  { id: 't5', name: 'Paula García', department: 'Orientación', isActive: false }
];

export const MOCK_ZONES: CoordinatorZone[] = [
  ...COORDINATOR_ZONE_CATALOG.map(zone => ({
    id: zone.id,
    name: zone.name,
    description: zone.description,
    capacity: zone.capacity,
    checkpoints: [...zone.checkpoints],
    intensidad: zone.accidentCount,
  }))
];

export const MOCK_SHIFTS: CoordinatorShift[] = [
  {
    id: 's1',
    zoneId: 'z1',
    zoneName: 'Parque Bachillerato Izquierdo',
    teacherId: 't1',
    teacherName: 'Laura Peña',
    startTime: '07:00',
    endTime: '09:00',
    status: 'active',
    patrolCount: 4,
    date: COORDINATOR_DAY
  },
  {
    id: 's2',
    zoneId: 'z2',
    zoneName: 'Parque Bachillerato central',
    teacherId: 't2',
    teacherName: 'Andrés Mora',
    startTime: '08:00',
    endTime: '10:00',
    status: 'active',
    patrolCount: 3,
    date: COORDINATOR_DAY
  },
  {
    id: 's3',
    zoneId: 'z3',
    zoneName: 'Parque preescolar',
    teacherId: 't3',
    teacherName: 'Sofía Rojas',
    startTime: '09:00',
    endTime: '11:00',
    status: 'missed',
    date: COORDINATOR_DAY
  },
  {
    id: 's4',
    zoneId: 'z4',
    zoneName: 'Coliseo',
    teacherId: 't4',
    teacherName: 'Miguel Torres',
    startTime: '10:00',
    endTime: '12:00',
    status: 'completed',
    patrolCount: 5,
    date: COORDINATOR_DAY
  },
  {
    id: 's5',
    zoneId: 'z5',
    zoneName: 'Cancha baloncesto',
    teacherId: 't1',
    teacherName: 'Laura Peña',
    startTime: '11:00',
    endTime: '13:00',
    status: 'pending',
    date: COORDINATOR_DAY
  },
  {
    id: 's6',
    zoneId: 'z6',
    zoneName: 'Cafeteria Bachillerato',
    teacherId: 't2',
    teacherName: 'Andrés Mora',
    startTime: '12:00',
    endTime: '14:00',
    status: 'active',
    patrolCount: 2,
    date: COORDINATOR_DAY
  },
  {
    id: 's7',
    zoneId: 'z7',
    zoneName: 'Cafeteria Preescolar',
    teacherId: 't3',
    teacherName: 'Sofía Rojas',
    startTime: '12:30',
    endTime: '14:30',
    status: 'completed',
    patrolCount: 1,
    date: COORDINATOR_DAY
  }
];

export const MOCK_INCIDENTS: CoordinatorIncident[] = [
  {
    id: 'i0',
    zoneId: 'z1',
    zoneName: 'Parque Bachillerato Izquierdo',
    teacherName: 'Laura Peña',
    timestamp: '2026-01-22T08:25:00',
    severity: 'S1',
    description: 'Revisión preventiva en acceso principal.'
  },
  {
    id: 'i1',
    zoneId: 'z2',
    zoneName: 'Parque Bachillerato central',
    teacherName: 'Andrés Mora',
    timestamp: '2026-02-26T08:15:00',
    severity: 'S2',
    description: 'Estudiantes reunidos fuera del laboratorio.'
  },
  {
    id: 'i1b',
    zoneId: 'z2',
    zoneName: 'Parque Bachillerato central',
    teacherName: 'Andrés Mora',
    timestamp: '2026-02-21T11:10:00',
    severity: 'S1',
    description: 'Circulación controlada en pasillo de laboratorios.'
  },
  {
    id: 'i2',
    zoneId: 'z3',
    zoneName: 'Parque preescolar',
    teacherName: 'Sofía Rojas',
    timestamp: '2026-02-26T09:40:00',
    severity: 'S3',
    description: 'No se registró check-in dentro del tiempo esperado.'
  },
  {
    id: 'i2b',
    zoneId: 'z3',
    zoneName: 'Parque preescolar',
    teacherName: 'Sofía Rojas',
    timestamp: '2026-02-24T12:05:00',
    severity: 'S2',
    description: 'Aglomeración temporal en la salida oeste.'
  },
  {
    id: 'i3',
    zoneId: 'z1',
    zoneName: 'Parque Bachillerato Izquierdo',
    teacherName: 'Laura Peña',
    timestamp: '2026-02-26T10:05:00',
    severity: 'S1',
    description: 'Acceso controlado sin novedades.'
  },
  {
    id: 'i3b',
    zoneId: 'z1',
    zoneName: 'Parque Bachillerato Izquierdo',
    teacherName: 'Laura Peña',
    timestamp: '2026-02-25T13:35:00',
    severity: 'S2',
    description: 'Verificación de flujo en recepción.'
  },
  {
    id: 'i4',
    zoneId: 'z4',
    zoneName: 'Coliseo',
    teacherName: 'Miguel Torres',
    timestamp: '2026-01-30T16:45:00',
    severity: 'S1',
    description: 'Cierre ordenado de biblioteca.'
  },
  {
    id: 'i4b',
    zoneId: 'z4',
    zoneName: 'Coliseo',
    teacherName: 'Miguel Torres',
    timestamp: '2026-02-18T09:15:00',
    severity: 'S2',
    description: 'Apoyo académico con supervisión reforzada.'
  },
  {
    id: 'i5',
    zoneId: 'z5',
    zoneName: 'Cancha baloncesto',
    teacherName: 'Laura Peña',
    timestamp: '2026-02-26T11:20:00',
    severity: 'S1',
    description: 'Supervisión deportiva sin novedades.'
  },
  {
    id: 'i6',
    zoneId: 'z6',
    zoneName: 'Cafeteria Bachillerato',
    teacherName: 'Andrés Mora',
    timestamp: '2026-02-26T12:10:00',
    severity: 'S2',
    description: 'Flujo alto en hora de almuerzo.'
  },
  {
    id: 'i7',
    zoneId: 'z7',
    zoneName: 'Cafeteria Preescolar',
    teacherName: 'Sofía Rojas',
    timestamp: '2026-02-26T12:35:00',
    severity: 'S1',
    description: 'Ingreso acompañado y ordenado.'
  }
];

export function getCurrentUser(): CoordinatorUser | null {
  if (typeof localStorage === 'undefined') {
    return COORDINATOR_USER;
  }

  const rawUser = localStorage.getItem('auth_user');
  if (!rawUser) {
    return COORDINATOR_USER;
  }

  try {
    const parsed = JSON.parse(rawUser) as Partial<CoordinatorUser> & { role?: string };
    if (parsed.role === 'coordinator') {
      return {
        name: parsed.name || COORDINATOR_USER.name,
        role: 'coordinator'
      };
    }
  } catch {
    return COORDINATOR_USER;
  }

  return COORDINATOR_USER;
}