import { Docente } from "./Docente.js";
import { Curso } from "./Curso.js"; 

export class Horario{
    private id: number;
    private dia: string;
    private horaInicio: number;
    private horaFin: number;
    private aula: string;
    private docente: Docente;
    private curso: Curso;

    constructor(id: number, dia: string, horaInicio: string, horaFin: string, aula: string,docente: Docente,curso: Curso){
        this.id = id;
        this.dia =dia;
        this.horaInicio = this.convertirHoraAMinutos(horaInicio);
        this.horaFin = this.convertirHoraAMinutos(horaFin);
        if(this.horaFin <= this.horaInicio){
            throw new Error("La hora de fin debe ser mayor que la hora de Inicio");
        }
        this.aula = aula;
        this.docente = docente;
        this.curso =curso;
    }

    private convertirHoraAMinutos(hora: string): number {
        const partes = hora.split(":");
        const h: number = Number(partes[0]);
        const m: number = Number(partes[1]);
        return h * 60 + m;
    }

    private convertirMinutosAHoras(minutos: number): string {
        const h = Math.floor(minutos / 60);
        const m = minutos % 60;

        let hora = "";
        let minuto = "";

        if(h < 10){
            hora = "0" + h;
        }
        else{
            hora = "" + h;
        }

        if(m < 10) {
            minuto = "0" + m;
        }
        else{
            minuto = "" + m;
        }

        return hora + ":" + minuto;
    }

    getResumen(): string{
        return "Dia: " + this.dia + "\n" + 
        "Inicio: " + this.convertirMinutosAHoras(this.horaInicio) + "\n" +
        "Fin: " + this.convertirMinutosAHoras(this.horaFin) + "\n" +
        "Aula: " + this.aula + "\n" +
        "Docente: " + this.docente.getResumen() + "\n";
    }

    getDia(): string {
        return this.dia;
    }

    getHoraInicio(): number {
        return this.horaInicio;
    }

    getHoraFin(): number {
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