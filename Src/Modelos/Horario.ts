import { Docente } from "./Docente.js";

export class Horario{
    private id: number;
    private dia: string;
    private horaInicio: string;
    private horaFin: string;
    private aula: string;
    private docente: Docente;

    constructor(id: number, dia: string, horaInicio: string, horaFin: string, aula: string,docente: Docente){
        this.id = id;
        this.dia =dia;
        this.horaInicio = horaInicio;
        this.horaFin =horaFin;
        this.aula = aula;
        this.docente = docente;
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
}