// arquivo responsável pela modelagem de dados para Curriculos


export class Curriculo {

    // atributos
    constructor(
        public id: number,
        public nome: string,
        public idade: number,
        public telefone: string, // Tipo STRING - Correto para telefone
        public email: string,    // Tipo STRING - Correto para email
        public descricao: string,
    ) {}

    
    // métodos de conversão de objetos

    public toMap(): { [key: string]: any } {
        return {
            id: this.id,
            nome: this.nome,
            idade: this.idade,
            telefone: this.telefone,
            email: this.email,
            descricao: this.descricao
        };
    }

static fromMap(map: any): Curriculo {
    return new Curriculo(
        Number(map.id),
        map.nome,
        Number(map.idade), // <-- converte para número
        map.telefone ? String(map.telefone) : '',
        map.email ? String(map.email) : '',
        map.descricao
    );
}
}