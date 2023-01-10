import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import jwt_decode from 'jwt-decode';
import { TokenService } from '../token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  /* Um Subject é um observable de "duas vias", ou seja,
  com ele pode-se tanto recuperar informações (como pode
  ser feito ao fazer uma request a uma API em que se retorna
  a informação, da API, no observable) como também pode-se
  enviar informações, um Subject também pode se comunicar
  com vários (multicast) Observers (ouvintes do método), 
  ao contrário do Observable normal que sõ devolve resultado 
  para um ouvinte   (unicast). Fazendo uma analogia, 
  é algo semelhante ao EventEmitter (usado na diretiva Output) 
  no que diz respeito a comunicação com componente pai, de forma 
  análoga,  o Subject envia a informação (para quem está ouvindo) 
  ao manter registro de múltiplos "ouvintes". 
  E o BehaviorSubject mais especificamente, envia a última 
  informação nele contida, isto é, é um Subject que guarda estado.
  */
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) {
    if (this.tokenService.checarToken()) {
      this.decodificarTokenJWT();
    }
  }

  //jwt-token - lib para manter tokens
  private decodificarTokenJWT() {
    const token = this.tokenService.retornarToken();
    const usuario = jwt_decode(token) as Usuario;
    /* método next do Subject (método que o Observable não tem)
    envia para todos os listerners/observers o parâmetro.
    No caso, é enviado o usuário decodificado do token jwt.
    O next é um método de um Subject normal. O que o 
    BehaviorSubject tem de diferente é que, se algum novo listener
    se inscrever para escutar este subject, ele vai receber o
    usuario também (mesmo não executando o método decodificarTokenJWT
    responsável por resgatar o usuário de dentro do token),
    pois, o BehaviorSubject manteve o estado anterior.
    */
    this.usuarioSubject.next(usuario);
  }

  /* não se deseja devolver o subject para quem se inscrever
  como listener/observer, já que isso daria o poder de outro ponto
  do código manipular o subject (por exemplo, fazer um next em algum 
  outro valor). Sendo assim, devolve-se um observable, usando o método
  do subject chamado asObservable, com o valor buscado (no caso, o usuário)
  */
  retornarUsuario() {
    return this.usuarioSubject.asObservable();
  }

  salvarTokenAndEmit(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarTokenJWT();
  }

  /* No logout, além de apagar o token do localStorage do navegador,
  faz-se a propagação, para todos os listeners, de que não existe mais
  usuário logado, para isso o subject faz um next (emite) um objeto vazio
  no lugar que seria do usuário.
  */
  sair() {
    this.tokenService.removerToken();
    this.usuarioSubject.next({});
  }

  verificarLogado() {
    return this.tokenService.checarToken();
  }
}
