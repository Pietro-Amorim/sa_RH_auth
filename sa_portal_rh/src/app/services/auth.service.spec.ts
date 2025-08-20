import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUsuarioLogado']);
    routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('deve permitir acesso se o usuário estiver logado', () => {
    authServiceSpy.getUsuarioLogado.and.returnValue({ nome: 'Usuário' });

    const result = guard.canActivate();

    expect(authServiceSpy.getUsuarioLogado).toHaveBeenCalled();
    expect(result).toBeTrue();
  });

  it('deve redirecionar para /login se o usuário não estiver logado', () => {
    authServiceSpy.getUsuarioLogado.and.returnValue(null);
    const fakeUrlTree = {} as UrlTree;
    routerSpy.parseUrl.and.returnValue(fakeUrlTree);

    const result = guard.canActivate();

    expect(authServiceSpy.getUsuarioLogado).toHaveBeenCalled();
    expect(routerSpy.parseUrl).toHaveBeenCalledWith('/login');
    expect(result).toBe(fakeUrlTree);
  });
});
