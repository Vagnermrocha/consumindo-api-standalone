import { Component } from '@angular/core';
import { MusicService } from './services/music.service';
import { Music } from './models/music.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tutoriais';

  musicas$ = new Observable<Music[]>();
  private nextId = 1; // Inicializa o próximo ID

  // form
  id = '';
  musica = '';
  autor = '';

  constructor(private musicService: MusicService) {
    this.obterMusicasCadastradas();
  }

  obterMusicasCadastradas() {
    this.musicas$ = this.musicService.obterMusicas();
    this.musicas$.subscribe(musicas => {
      if (musicas.length > 0) {
        this.nextId = Math.max(...musicas.map(m => Number(m.id))) + 1;
      }
    });
  }

  buttonClick() {
    if (!this.musica || !this.autor) return;

    if (this.id) {
      this.atualizar();
    } else {
      this.cadastrarMusica();
    }
  }

  cadastrarMusica() {
    const newId = String(this.nextId++);
    this.musicService.cadastrarMusica({ id: newId, author: this.autor, text: this.musica })
      .subscribe(_ => {
        this.obterMusicasCadastradas();
        this.limparInputs();
      });
  }

  atualizar() {
    this.musicService.editarMusica({
      id: String(this.id), author: this.autor, text: this.musica
    }).subscribe(_ => {
      this.obterMusicasCadastradas();
      this.limparInputs();
    });
  }

  preencherCampos(musica: Music) {
    this.id = musica.id!.toString();
    this.musica = musica.text;
    this.autor = musica.author;
  }

  remover(id: string) {
    this.musicService.remover(Number(id))  // Converte o id para número
      .subscribe(_ => this.obterMusicasCadastradas());
  }

  limparInputs() {
    this.id = '';
    this.musica = '';
    this.autor = '';
  }
}
