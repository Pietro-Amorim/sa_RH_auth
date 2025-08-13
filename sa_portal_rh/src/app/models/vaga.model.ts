//arquivo responsável pela modelagem de dados para vagas
export class Vaga {
  constructor(
    public id: number,
    public nome: string,
    public foto: string,
    public descricao: string,
    public salario: number
  ) {}


  // Métodos de conversão de objetos
  public toMap(): { [key: string]: any } {
    return {
      id: this.id,
      nome: this.nome,
      foto: this.foto,
      descricao: this.descricao,
      salario: this.salario
    };
  }

  public static fromMap(map: any): Vaga {
    return new Vaga(
      map.id,
      map.nome,
      map.foto,
      map.descricao,
      map.salario
    );
  }
}