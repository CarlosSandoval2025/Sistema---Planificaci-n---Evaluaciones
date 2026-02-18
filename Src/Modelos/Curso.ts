class Curso{
    private id: number;
    private nombre: string;
    private docente: string;
    private creditos: number;

    constructor(id: number, nombre: string, docente: string, creditos: number){
        this.id = id;
        this.nombre = nombre;
        this.docente = docente;
        this.creditos = creditos;
    }

    getResumen(): string{
        return this.nombre + " - Docente: " + this.docente + " - Creditos: " + this.creditos;
    }
}
