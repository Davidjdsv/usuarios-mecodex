import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

// importando cada interface de metricas
import {
  metricasGenerales,
  metricasPlanes,
  metricasPaises,
  metricasEvolucion,
} from 'src/app/models/metricas';

@Injectable({
  providedIn: 'root',
})
export class MetricasService {
  private metricas = signal(environment.api_metricas);

  constructor(private http: HttpClient) {}

  // * Métricas generales
  getMetricasGenerales(): Observable<metricasGenerales> {
    const url = new URL(this.metricas());
    url.searchParams.append('tipo', 'general');
    return this.http.get<metricasGenerales>(url.toString()).pipe(
      map(res => {
        return res.data.map(item => ({
          total_clientes: item.total_clientes,
          total_cuentas: item.total_cuentas
        }))
      })
    )
  }

  // * Métricas planes
  getMetricasPlanes(): Observable<metricasPlanes> {
    const url = new URL(this.metricas());
    url.searchParams.append('tipo', 'planes');
    return this.http.get<metricasPlanes>(url.toString());
  }

  // * Métricas países
  getMetricasPaises(): Observable<metricasPaises> {
    const url = new URL(this.metricas());
    url.searchParams.append('tipo', 'paises');
    return this.http.get<metricasPaises>(url.toString());
  }

  // * Métricas evolución
  getMetricasEvolucion(): Observable<metricasEvolucion> {
    const url = new URL(this.metricas());
    url.searchParams.append('tipo', 'evolucion');
    return this.http.get<metricasEvolucion>(url.toString());
  }
}
