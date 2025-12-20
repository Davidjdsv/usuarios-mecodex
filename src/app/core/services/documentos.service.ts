import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DocumentosInterface } from '../../models/documentos-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  documentos = signal<DocumentosInterface[]>([])

  private http = inject(HttpClient);


  /**
  * Obtiene la lista de documentos
  * @returns Observable<DocumentosInterface[]>
  */
  getDocuments() :Observable<DocumentosInterface[]>{
    return this.http.get<DocumentosInterface[]>(environment.api_documentos)
  }
}
