import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculosService } from 'src/app/services/curriculos.service';

@Component({
  selector: 'app-painel-Curriculos',
  templateUrl: './painel-Curriculos.component.html',
  styleUrls: ['./painel-curriculos.component.scss']
})
export class PainelCurriculosComponent implements OnInit {

  // Propriedade para armazenar o currículo atual (em edição ou cadastro)
  public curriculo: Curriculo = new Curriculo(0, "", 0, "", "", "");
  
  // Propriedade para armazenar a lista de currículos
  public curriculos: Curriculo[] = [];

  // Injeção de dependência do serviço CurriculosService para interagir com a API
  constructor(private _curriculosService: CurriculosService) {}

  // Método do ciclo de vida do Angular, executado ao inicializar o componente
  ngOnInit(): void {
    // Chama o método listarCurriculos ao carregar o componente
    this.listarCurriculos();
  }

  // Método para listar todos os currículos
  listarCurriculos(): void {
    // Faz uma requisição ao serviço para obter todos os currículos
    this._curriculosService.getCurriculos().subscribe(
      (e: any[]) => {
        // Mapeia a resposta para objetos Curriculo usando o método fromMap
        this.curriculos = e.map((curriculo: any) => Curriculo.fromMap(curriculo));
      },
      (error: any) => {
        // Em caso de erro, exibe uma mensagem no console
        console.error("Erro ao Listar Curriculos: ", error);
      }
    );
  }

  // Método para listar um currículo específico (por ID) para edição
  listarCurriculoPorId(curriculo: Curriculo): void {
    // Define o currículo para ser editado
    this.curriculo = curriculo;
  }

  // Método para cadastrar um novo currículo
  cadastrarCurriculo(): void {
    // Chama o serviço para enviar o currículo ao backend (API)
    this._curriculosService.postCurriculo(this.curriculo).subscribe(
      () => {
        // Após o cadastro, reseta o formulário (currículo) e atualiza a lista
        this.curriculo = new Curriculo(0, "", 0, "", "", "");
        this.listarCurriculos();
      },
      (error: any) => {
        // Exibe erro em caso de falha no cadastro
        console.error("Erro ao Cadastrar Curriculo: ", error);
      }
    );
  }

  // Método para atualizar um currículo existente
  atualizarCurriculo(id: any): void {
    // Chama o serviço para atualizar o currículo
    this._curriculosService.putCurriculo(id, this.curriculo).subscribe(
      () => {
        // Após a atualização, reseta o formulário e atualiza a lista
        this.curriculo = new Curriculo(0, "", 0, "", "", "");
        this.listarCurriculos();
      },
      (error) => {
        // Exibe erro em caso de falha na atualização
        console.error('Erro ao Atualizar Curriculo: ', error);
      }
    );
  }

  // Método para excluir um currículo
  excluirCurriculo(id: any): void {
    // Chama o serviço para excluir o currículo com o ID fornecido
    this._curriculosService.deleteCurriculo(id).subscribe(
      () => {
        // Após a exclusão, reseta o formulário e atualiza a lista
        this.curriculo = new Curriculo(0, "", 0, "", "", "");
        this.listarCurriculos();
      },
      (error) => {
        // Exibe erro em caso de falha na exclusão
        console.error('Erro ao Deletar Curriculo: ', error);
      }
    );
  }
}
