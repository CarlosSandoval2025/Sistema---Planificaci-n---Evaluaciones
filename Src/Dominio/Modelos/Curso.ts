import { time } from "node:console";
import { IReportable } from "../Interfaces/IReportable";
import { Docente } from "./Docente";
import { EvaluacionAcademica } from "./EvaluacionAcademica";


export class Curso implements IReportable {
    private id: number;
    private nombre: string;
    private docente: Docente;
    private creditos: number;
    private evaluaciones: EvaluacionAcademica [];

    constructor(id: number, nombre: string, docente: Docente, creditos: number){
        this.id = id;
        this.nombre = nombre;
        this.docente = docente;
        this.creditos = creditos;
        this.evaluaciones = [];
    }



    getResumen(): string{
        return this.nombre + " - Docente: " + this.docente.getResumen() + " - Creditos: " + this.creditos;
    }

    getId(): number {
        return this.id;
    }

    getDocente(): Docente {
        return this.docente;
    }

    actualizarNombre(nuevoNombre: string): void {
        this.nombre = nuevoNombre;
    }

    actualizarCreditos(nuevosCreditos: number): void {
        this.creditos = nuevosCreditos;
    }
}
