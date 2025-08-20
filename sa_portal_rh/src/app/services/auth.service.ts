import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarios = [
    {
      email: 'admin@email.com',
      senha: 'admin123',
      tipo: 'admin',
      nome: 'Admin',
    },
    {
      email: 'cliente@email.com',
      senha: 'cliente123',
      tipo: 'cliente',
      nome: 'Cliente',
    },
  ];

  private usuarioLogado: any = null;

  login(email: string, senha: string): Observable<any> {
    const usuario = this.usuarios.find(
      (u) => u.email === email && u.senha === senha
    );
    if (usuario) {
      this.usuarioLogado = usuario;
      return of(usuario);
    } else {
      return throwError(() => new Error('Credenciais inválidas'));
    }
  }

  getUsuarioLogado(): any {
    return this.usuarioLogado;
  }

  logout(): void {
    this.usuarioLogado = null;
  }
}
