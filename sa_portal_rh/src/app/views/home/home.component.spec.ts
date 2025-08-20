import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  email = '';
  senha = '';
  erro = '';

  nome = '';
  emailCadastro = '';
  senhaCadastro = '';
  tipo = 'cliente';
  cadastroErro = '';
  cadastroSucesso = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.get<any[]>('http://localhost:3000/usuarios').subscribe(
      (usuarios) => {
        const usuario = usuarios.find(
          (u) => u.email === this.email && u.senha === this.senha
        );
        if (usuario) {
          localStorage.setItem('usuario', JSON.stringify(usuario));
          if (usuario.tipo === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/cliente']);
          }
        } else {
          this.erro = 'Email ou senha inválidos!';
        }
      },
      () => {
        this.erro = 'Erro ao conectar ao servidor!';
      }
    );
  }

  onCadastrar() {
    this.cadastroErro = '';
    this.cadastroSucesso = '';
    if (!this.nome || !this.emailCadastro || !this.senhaCadastro || !this.tipo) {
      this.cadastroErro = 'Preencha todos os campos!';
      return;
    }
    this.http.get<any[]>('http://localhost:3000/usuarios').subscribe(usuarios => {
      const existe = usuarios.some(u => u.email === this.emailCadastro);
      if (existe) {
        this.cadastroErro = 'Email já cadastrado!';
        return;
      }
      const novoUsuario = {
        nome: this.nome,
        email: this.emailCadastro,
        senha: this.senhaCadastro,
        tipo: this.tipo
      };
      this.http.post('http://localhost:3000/usuarios', novoUsuario).subscribe(() => {
        this.cadastroSucesso = 'Usuário cadastrado com sucesso!';
        this.nome = '';
        this.emailCadastro = '';
        this.senhaCadastro = '';
        this.tipo = 'cliente';
      }, () => {
        this.cadastroErro = 'Erro ao cadastrar usuário!';
      });
    }, () => {
      this.cadastroErro = 'Erro ao conectar ao servidor!';
    });
  }
}
