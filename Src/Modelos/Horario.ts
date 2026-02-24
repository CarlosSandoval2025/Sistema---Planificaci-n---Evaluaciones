import { Docente } from "./Docente.js";
import { Curso } from "./Curso.js"; 

export class Horario{
    private id: number;
    private dia: string;
    private horaInicio: string;
    private horaFin: string;
    private aula: string;
    private docente: Docente;
    private curso: Curso;

    constructor(id: number, dia: string, horaInicio: string, horaFin: string, aula: string,docente: Docente,curso: Curso){
        this.id = id;
        this.dia =dia;
        this.horaInicio = horaInicio;
        this.horaFin =horaFin;
        this.aula = aula;
        this.docente = docente;
        this.curso =curso;
    }

    getResumen(): string{
        return "Dia: " + this.dia + "\n" + 
        "Inicio: " + this.horaInicio + "\n" +
        "Fin: " + this.horaFin + "\n" +
        "Aula: " + this.aula + "\n" +
        "Docente: " + this.docente.getResumen() + "\n";
    }

    getDia(): string {
        return this.dia;
    }

    getHoraInicio(): string {
        return this.horaInicio;
    }

    getHoraFin(): string {
        return this.horaFin;
    }

    getAula(): string {
        return this.aula;
    }

    getDocente(): Docente {
        return this.docente;
    }

    getCurso(): Curso{
        return this.curso;
    }
}