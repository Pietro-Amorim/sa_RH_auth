import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const user = this.authService.getUsuarioLogado();

    if (!user) {
      // Não está logado → redireciona para login
      return this.router.parseUrl('/login');
    }

    if (user.tipo === 'admin') {
      // É admin → acesso liberado
      return true;
    }

    // Logado mas não é admin → redireciona para página de não autorizado
    return this.router.parseUrl('/nao-autorizado');
  }
}
