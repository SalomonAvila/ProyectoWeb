import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, PLATFORM_ID, ViewChild, inject } from '@angular/core';

import { HEATMAP_POLYGONS } from '../../coordinator-zone-catalog';
import { HeatmapColorLegend } from './heatmap-color-legend/heatmap-color-legend';

type ZoneMapMode = 'satellite' | 'simple';

type HeatmapZone = {
  nombre: string;
  accidentCount: number;
  puntos: [number, number][];
};

@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports: [CommonModule, HeatmapColorLegend],
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.css',
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

  protected mapMode: ZoneMapMode = 'satellite';

  private readonly zonasPolygon: HeatmapZone[] = HEATMAP_POLYGONS.map(zone => ({
    nombre: zone.nombre,
    accidentCount: zone.accidentCount,
    puntos: zone.points,
  }));

  private map: import('leaflet').Map | null = null;
  private polygons: any[] = [];
  private activeBaseLayer: any | null = null;

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.mapContainer) {
      return;
    }

    const leafletModule = await import('leaflet');
    const L = leafletModule.default;

    this.map = L.map(this.mapContainer.nativeElement, {
      center: this.center,
      zoom: this.initialZoom,
      minZoom: 17,
      maxZoom: 19,
      zoomControl: true,
      preferCanvas: true,
    });

    this.setBaseLayer(L, this.mapMode);

    this.zonasPolygon.forEach((zona) => {
      const color = this.getColorForAccidents(zona.accidentCount);

      const polygon = L.polygon(zona.puntos, {
        color,
        weight: 2,
        opacity: 0.85,
        fillColor: color,
        fillOpacity: 0.45,
      }).addTo(this.map!);

      polygon.bindPopup(`
        <div class="text-sm font-medium">
          <p class="font-bold text-base">${zona.nombre}</p>
          <p class="text-xs text-gray-600 mt-1">Número de accidentes: <span class="font-semibold">${zona.accidentCount}</span></p>
        </div>
      `);

      this.polygons.push(polygon);
    });
  }

  toggleBaseLayer(): void {
    this.mapMode = this.mapMode === 'satellite' ? 'simple' : 'satellite';

    if (!this.map) {
      return;
    }

    import('leaflet').then(module => {
      this.setBaseLayer(module.default, this.mapMode);
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.polygons.forEach(polygon => polygon.remove());
      this.polygons = [];

      this.map.remove();
      this.map = null;
      this.activeBaseLayer = null;
    }
  }

  public addZonePolygon(zona: HeatmapZone): void {
    if (this.map) {
      const leaflet = (window as any).L;
      const color = this.getColorForAccidents(zona.accidentCount);

      const polygon = leaflet.polygon(zona.puntos, {
        color,
        weight: 2,
        opacity: 0.85,
        fillColor: color,
        fillOpacity: 0.45,
      }).addTo(this.map);

      polygon.bindPopup(`
        <div class="text-sm font-medium">
          <p class="font-bold text-base">${zona.nombre}</p>
          <p class="text-xs text-gray-600 mt-1">Número de accidentes: <span class="font-semibold">${zona.accidentCount}</span></p>
        </div>
      `);

      this.polygons.push(polygon);
    }
  }

  public updateAllZonePolygons(newZones: HeatmapZone[]): void {
    this.polygons.forEach(polygon => polygon.remove());
    this.polygons = [];

    if (this.map) {
      const leaflet = (window as any).L;
      newZones.forEach((zona) => {
        const color = this.getColorForAccidents(zona.accidentCount);

        const polygon = leaflet.polygon(zona.puntos, {
          color,
          weight: 2,
          opacity: 0.85,
          fillColor: color,
          fillOpacity: 0.35,
        }).addTo(this.map!);

        polygon.bindPopup(`
          <div class="text-sm font-medium">
            <p class="font-bold text-base">${zona.nombre}</p>
            <p class="text-xs text-gray-600 mt-1">Número de accidentes: <span class="font-semibold">${zona.accidentCount}</span></p>
          </div>
        `);

        this.polygons.push(polygon);
      });
    }
  }

  private setBaseLayer(L: any, mode: ZoneMapMode): void {
    if (!this.map) {
      return;
    }

    if (this.activeBaseLayer) {
      this.map.removeLayer(this.activeBaseLayer);
      this.activeBaseLayer = null;
    }

    this.activeBaseLayer = mode === 'satellite'
      ? L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri',
          maxZoom: 20,
          minZoom: 1,
        })
      : L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          maxZoom: 20,
          minZoom: 1,
        });

    this.activeBaseLayer.addTo(this.map);
  }

  private getColorForAccidents(accidentCount: number): string {
    if (accidentCount <= 1) {
      return '#16a34a';
    }

    if (accidentCount <= 2) {
      return '#d97706';
    }

    if (accidentCount <= 3) {
      return '#ea580c';
    }

    if (accidentCount <= 5) {
      return '#dc2626';
    }

    return '#7f1d1d';
  }
}