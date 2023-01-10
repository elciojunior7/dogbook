import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Comentarios } from './comentarios';
import { ComentariosService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  comentarios$!: Observable<Comentarios>;
  comentarioForm!: FormGroup;
  @Input() id!: number;

  constructor(
    private comentarioService: ComentariosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.comentarios$ = this.comentarioService.buscarComentario(this.id);
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.maxLength],
    });
  }

  gravar(): void {
    const textoComentario = this.comentarioForm.get('comentario')?.value ?? '';
    this.comentarios$ = this.comentarioService
      .incluirComentarios(this.id, textoComentario)
      .pipe(
        switchMap(() => this.comentarioService.buscarComentario(this.id)),
        tap(() => {
          this.comentarioForm.reset();
          alert('Comentário salvo com sucesso');
        })
      );
  }
}
