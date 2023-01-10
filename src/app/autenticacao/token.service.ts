import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  retornarToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  salvarToken(token: string) {
    return localStorage.setItem(KEY, token);
  }

  removerToken() {
    return localStorage.removeItem(KEY);
  }

  checarToken() {
    return !!this.retornarToken();
  }
}
