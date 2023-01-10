import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs/operators';
import { HomeValidators } from './home.validator';
import { NovoUsuarioService } from './novo-usuario/novo-usuario.service';

@Injectable({
  providedIn: 'root',
})
export class HomeAsyncValidators {
  constructor(private novoUsuarioService: NovoUsuarioService) {}

  usuarioJaExiste = (control: AbstractControl) => {
    return control.valueChanges.pipe(
      switchMap((username: string) =>
        this.novoUsuarioService.verificarUsuarioExistente(username)
      ),
      map((isUsuarioExiste: boolean) =>
        HomeValidators.validarUsuarioJaExiste(isUsuarioExiste)
      ),
      first()
    );
  };
}
