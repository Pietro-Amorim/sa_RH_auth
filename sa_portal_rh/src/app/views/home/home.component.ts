import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // Login
  email = '';
  senha = '';
  erro = '';

  // Cadastro
  nome = '';
  emailCadastro = '';
  senhaCadastro = '';
  tipo = 'cliente';
  cadastroErro = '';
  cadastroSucesso = '';

  private readonly apiUrl = 'http://localhost:3005/usuarios';

  constructor(private http: HttpClient, private router: Router) {}

  // 🔐 Login
  onLogin(): void {
    this.erro = '';

    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (usuarios) => {
        const usuario = usuarios.find(
          (u) => u.email.trim() === this.email.trim() && u.senha === this.senha
        );

        if (usuario) {
          localStorage.setItem('usuario', JSON.stringify(usuario));
          const destino = usuario.tipo === 'admin' ? '/admin' : '/cliente';
          this.router.navigate([destino]);
        } else {
          this.erro = 'Email ou senha inválidos!';
        }
      },
      error: () => {
        this.erro = 'Erro ao conectar ao servidor!';
      },
    });
  }

  // 📝 Cadastro
  onCadastrar(): void {
    this.cadastroErro = '';
    this.cadastroSucesso = '';

    if (
      !this.nome.trim() ||
      !this.emailCadastro.trim() ||
      !this.senhaCadastro ||
      !this.tipo
    ) {
      this.cadastroErro = 'Preencha todos os campos!';
      return;
    }

    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (usuarios) => {
        const emailExiste = usuarios.some(
          (u) =>
            u.email.trim().toLowerCase() ===
            this.emailCadastro.trim().toLowerCase()
        );

        if (emailExiste) {
          this.cadastroErro = 'Email já cadastrado!';
          return;
        }

        const novoUsuario = {
          nome: this.nome.trim(),
          email: this.emailCadastro.trim(),
          senha: this.senhaCadastro,
          tipo: this.tipo,
        };

        this.http.post(this.apiUrl, novoUsuario).subscribe({
          next: () => {
            this.cadastroSucesso = 'Usuário cadastrado com sucesso!';
            this.resetCadastroForm();
          },
          error: () => {
            this.cadastroErro = 'Erro ao cadastrar usuário!';
          },
        });
      },
      error: () => {
        this.cadastroErro = 'Erro ao conectar ao servidor!';
      },
    });
  }

  // 🔄 Limpa os campos de cadastro após sucesso
  private resetCadastroForm(): void {
    this.nome = '';
    this.emailCadastro = '';
    this.senhaCadastro = '';
    this.tipo = 'cliente';
  }
}
