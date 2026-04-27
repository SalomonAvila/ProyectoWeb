import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, PLATFORM_ID, ViewChild, inject } from '@angular/core';

type ZonaVigilancia = {
  nombre: string;
  intensidad: number; // 1-10
  puntos: [number, number][];
};

@Component({
  selector: 'app-heatmap',
  standalone: true,
  template: `
    <section class="space-y-4">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="px-1 text-sm font-semibold uppercase tracking-wider text-slate-500">Mapa de calor</h2>
          <p class="px-1 text-sm text-slate-600">Zonas de vigilancia con indicadores de intensidad (1-10).</p>
        </div>

        <div class="flex items-center gap-2 px-1 text-[11px] font-medium text-slate-500">
          <span class="rounded-full border border-green-300 bg-green-100 px-3 py-1 text-green-800">Low (1-3)</span>
          <span class="rounded-full border border-yellow-400 bg-yellow-100 px-3 py-1 text-yellow-800">Medium (4-7)</span>
          <span class="rounded-full border border-red-400 bg-red-100 px-3 py-1 text-red-800">High (8-9)</span>
          <span class="rounded-full border border-red-900 bg-red-900 px-2 py-1 text-white">Extreme (10)</span>
        </div>
      </div>

      <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm" style="position: relative; z-index: 0;">
        <div class="h-128 w-full" style="position: relative; z-index: 0;">
          <div #mapContainer class="h-full w-full" style="position: relative; z-index: auto;"></div>
        </div>
      </div>
    </section>
  `,
  host: {
    class: 'block w-full',
    style: 'position: relative; z-index: 0;',
  },
})
export class HeatmapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') private readonly mapContainer?: ElementRef<HTMLDivElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly center: [number, number] = [4.7330, -74.0415];
  private readonly initialZoom = 19;

  // Múltiples zonas de vigilancia con nombre e intensidad (1-10)
  private readonly zonasPolygon: ZonaVigilancia[] = [
    {
      nombre: 'Parque Bachillerato Izquierdo',
      intensidad: 4,
      puntos: [
        [4.733541, -74.042525], // Superior izquierda
        [4.733514, -74.042429], // Superior derecha
        [4.732600, -74.042587], // Inferior derecha
        [4.732592, -74.042740], // Inferior izquierda
      ],
    },
    {
      nombre: 'Parque Bachillerato central',
      intensidad: 5,
      puntos: [
        [4.733333, -74.041898], // Superior izquierda
        [4.733305, -74.041814], // Superior derecha
        [4.733081, -74.041651], // Inferior derecha
        [4.732696, -74.041736], // Inferior izquierda
        [4.732633, -74.041821], 
        [4.732811, -74.041944],
      ],
    },
    {
      nombre: 'Parque preescolar',
      intensidad: 4,
      puntos: [
        [4.733081, -74.041329], // Superior izquierda
        [4.732997, -74.040983], // Superior derecha
        [4.732449, -74.041150], // Inferior derecha
        [4.732536, -74.041600],
        [4.733050, -74.041491],
        [4.733026, -74.041338],
      ],
    },
    {
      nombre: 'Coliseo',
      intensidad: 10,
      puntos: [
        [4.733415, -74.041596], // Superior izquierda
        [4.733355, -74.041279], // Superior derecha
        [4.733028, -74.041366], // Inferior derecha
        [4.733090, -74.041666],
      ],
    },
    {
      nombre: 'Cancha baloncesto',
      intensidad: 8,
      puntos: [
        [4.733388, -74.041263], // Superior izquierda
        [4.733347, -74.041086], // Superior derecha
        [4.733048, -74.041147], // Inferior derecha
        [4.733090, -74.041331],
      ],
    },
    {
      nombre: 'Cafeteria Bachillerato',
      intensidad: 1,
      puntos: [
        [4.733230, -74.042374], // Superior izquierda
        [4.733167, -74.042031], // Superior derecha
        [4.733050, -74.042053], // Inferior derecha
        [4.733120, -74.042394],
      ],
    },
    {
      nombre: 'Cafeteria Preescolar',
      intensidad: 1,
      puntos: [
        [4.732798, -74.041685], // Superior izquierda
        [4.732778, -74.041604], // Superior derecha
        [4.732574, -74.041633], // Inferior derecha
        [4.732578, -74.041712],
      ],
    },
  ];

  private map: import('leaflet').Map | null = null;
  private polygons: any[] = [];

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.mapContainer) {
      return;
    }

    const leaflet = await import('leaflet');

    this.map = leaflet.map(this.mapContainer.nativeElement, {
      center: this.center,
      zoom: this.initialZoom,
      minZoom: this.initialZoom,
      zoomControl: true,
      preferCanvas: true,
    });

    // Esri World Imagery - Vista satelital muy detallada
    leaflet.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 20,
        minZoom: 1,
      }
    ).addTo(this.map!);

    // Crear polígonos de zonas de vigilancia
    this.zonasPolygon.forEach((zona) => {
      const color = this.getColorForIntensidad(zona.intensidad);
      console.log(`Zona: ${zona.nombre}, Intensidad: ${zona.intensidad}, Color: ${color}`);
      
      const polygon = leaflet.polygon(zona.puntos, {
        color: color,
        weight: 2,
        opacity: 0.9,
        fillColor: color,
        fillOpacity: 0.7,
      }).addTo(this.map!);

      // Popup con información de la zona
      polygon.bindPopup(`
        <div class="text-sm font-medium">
          <p class="font-bold text-base">${zona.nombre}</p>
          <p class="text-xs text-gray-600 mt-1">Intensidad: <span class="font-semibold">${zona.intensidad}/10</span></p>
          <p class="text-xs text-gray-600">Puntos: ${zona.puntos.length}</p>
        </div>
      `);

      this.polygons.push(polygon);
    });

    console.log(`${this.polygons.length} zona(s) de vigilancia cargada(s) correctamente`);
  }

  ngOnDestroy(): void {
    if (this.map) {
      // Limpiar todos los polígonos
      this.polygons.forEach(polygon => polygon.remove());
      this.polygons = [];
      
      this.map.remove();
      this.map = null;
    }
  }

  public addZonePolygon(zona: ZonaVigilancia): void {
    if (this.map) {
      const leaflet = (window as any).L;
      const color = this.getColorForIntensidad(zona.intensidad);
      
      const polygon = leaflet.polygon(zona.puntos, {
        color: color,
        weight: 2,
        opacity: 0.9,
        fillColor: color,
        fillOpacity: 0.4,
      }).addTo(this.map);

      polygon.bindPopup(`
        <div class="text-sm font-medium">
          <p class="font-bold text-base">${zona.nombre}</p>
          <p class="text-xs text-gray-600 mt-1">Intensidad: <span class="font-semibold">${zona.intensidad}/10</span></p>
          <p class="text-xs text-gray-600">Puntos: ${zona.puntos.length}</p>
        </div>
      `);

      this.polygons.push(polygon);
    }
  }

  public updateAllZonePolygons(newZones: ZonaVigilancia[]): void {
    // Limpiar polígonos anteriores
    this.polygons.forEach(polygon => polygon.remove());
    this.polygons = [];

    if (this.map) {
      const leaflet = (window as any).L;
      newZones.forEach((zona) => {
        const color = this.getColorForIntensidad(zona.intensidad);
        
        const polygon = leaflet.polygon(zona.puntos, {
          color: color,
          weight: 2,
          opacity: 0.1,
          fillColor: color,
          fillOpacity: 0.1,
        }).addTo(this.map!);

        polygon.bindPopup(`
          <div class="text-sm font-medium">
            <p class="font-bold text-base">${zona.nombre}</p>
            <p class="text-xs text-gray-600 mt-1">Intensidad: <span class="font-semibold">${zona.intensidad}/10</span></p>
            <p class="text-xs text-gray-600">Puntos: ${zona.puntos.length}</p>
          </div>
        `);

        this.polygons.push(polygon);
      });
    }
  }

  private getColorForIntensidad(intensidad: number): string {
    // Escala de riesgo: 1-3 VERDE (Low), 4-7 NARANJA (Medium), 8-9 ROJO (High), 10 ROJO OSCURO (Extreme)
    if (intensidad <= 3) {
      // Verde: Low (1-3)
      const ratio = intensidad / 3;
      return this.interpolateColor('#22c55e', '#16a34a', ratio);
    } else if (intensidad <= 7) {
      // Naranja: Medium (4-7)
      const ratio = (intensidad - 3) / 4;
      return this.interpolateColor('#fbbf24', '#d97706', ratio);
    } else if (intensidad <= 9) {
      // Rojo: High (8-9)
      const ratio = (intensidad - 7) / 2;
      return this.interpolateColor('#f87171', '#dc2626', ratio);
    } else {
      // Rojo muy oscuro: Extreme (10)
      return '#7f1d1d';
    }
  }

  private interpolateColor(color1: string, color2: string, ratio: number): string {
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);

    const r1 = (c1 >> 16) & 255;
    const g1 = (c1 >> 8) & 255;
    const b1 = c1 & 255;

    const r2 = (c2 >> 16) & 255;
    const g2 = (c2 >> 8) & 255;
    const b2 = c2 & 255;

    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);

    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }
}