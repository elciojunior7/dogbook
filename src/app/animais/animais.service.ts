import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { TokenService } from '../autenticacao/token.service';
import { Animais, Animal } from './animal';
import { environment } from 'src/environments/environment';
import { catchError, mapTo } from 'rxjs/operators';

const API = environment.apiURL;
const SEM_ALTERACAO = '304';

@Injectable({
  providedIn: 'root',
})
export class AnimaisService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  listarPorUsuario(username: string): Observable<Animais> {
    return this.http.get<Animais>(`${API}/${username}/photos`);
  }

  buscarPorId(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${API}/photos/${id}`);
  }

  remover(id: number): Observable<Animal> {
    return this.http.delete<Animal>(`${API}/photos/${id}`);
  }

  curtir(id: number): Observable<boolean> {
    return this.http
      .post(`${API}/photos/${id}/like`, {}, { observe: 'response' })
      .pipe(
        mapTo(true),
        catchError((erro) => {
          return erro.status === SEM_ALTERACAO ? of(false) : throwError(erro);
        })
      );
  }

  upload(
    descricao: string,
    permiteComentario: boolean,
    arquivo: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComments', permiteComentario ? 'true' : 'false');
    formData.append('imageFile', arquivo);

    return this.http.post(`${API}/photos/upload`, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }
}
