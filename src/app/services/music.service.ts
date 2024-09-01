import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Music } from '../models/music.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private apiUrl = 'http://localhost:3000/musics';

  constructor(private http: HttpClient) {}

  obterMusicas(): Observable<Music[]> {
    return this.http.get<Music[]>(this.apiUrl);
  }

  cadastrarMusica(musica: Music): Observable<Music> {
    // Convertendo o ID para string
    musica.id = String(musica.id);
    return this.http.post<Music>(this.apiUrl, musica);
  }

  editarMusica(musica: Music): Observable<Music> {
    // Convertendo o ID para string
    musica.id = String(musica.id);
    return this.http.put<Music>(`${this.apiUrl}/${musica.id}`, musica);
  }

  remover(id: number): Observable<void> {
    // Convertendo o ID para string
    return this.http.delete<void>(`${this.apiUrl}/${String(id)}`);
  }
}
