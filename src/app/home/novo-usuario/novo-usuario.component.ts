import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HomeValidators } from '../home.validator';
import { HomeAsyncValidators } from '../home.validator-async.service';
import { NovoUsuario } from './novo-usuario';
import { NovoUsuarioService } from './novo-usuario.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css'],
})
export class NovoUsuarioComponent implements OnInit {
  novoUsuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private homeAsyncValidators: HomeAsyncValidators,
    private novoUsuarioService: NovoUsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        fullName: ['', [Validators.required, Validators.minLength(4)]],
        userName: [
          '',
          [HomeValidators.validarMinusculo],
          [this.homeAsyncValidators.usuarioJaExiste],
        ],
        password: ['', [Validators.required]],
      },
      {
        validators: [HomeValidators.validarUsuarioSenhaIguais],
      }
    );
  }

  cadastrar() {
    if (!this.novoUsuarioForm.valid) {
      this.novoUsuarioForm.markAllAsTouched();
      return;
    }

    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
    this.novoUsuarioService.cadastrar(novoUsuario).subscribe(
      () => {
        this.router.navigateByUrl('');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
