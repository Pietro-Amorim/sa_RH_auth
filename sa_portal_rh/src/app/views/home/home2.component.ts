import { Component } from '@angular/core';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home.component.scss'],
})
export class Home2Component {
  usuario = {
    nome: 'Admin',
    tipo: 'admin',
  };

  constructor() {}

  ngOnInit(): void {
    // Aqui você pode carregar dados específicos para o admin
  }
}
