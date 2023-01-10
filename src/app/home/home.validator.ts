import { AbstractControl, FormGroup } from '@angular/forms';

export class HomeValidators {
  static validarMinusculo(control: AbstractControl) {
    const valor = control.value as string;
    if (valor !== valor.toLowerCase()) return { minusculo: true };
    else return null;
  }

  static validarUsuarioJaExiste(isUsuarioExiste: boolean) {
    return isUsuarioExiste ? { usuarioExistente: true } : null;
  }

  static validarUsuarioSenhaIguais(control: AbstractControl) {
    const formGroup: FormGroup = control as FormGroup;
    const username = formGroup.get('userName')?.value ?? '';
    const password = formGroup.get('password')?.value ?? '';

    if (username.trim() + password.trim() && username === password)
      return { senhaUsuariosIguais: true };
    else return null;
  }
}
