import { IReportable } from "../Interfaces/IReportable";
import { Docente } from "./Docente";
import { EvaluacionAcademica } from "./EvaluacionAcademica";

export class Curso implements IReportable {
    private id: number;
    private nombre: string;
    private docente: Docente;
    private creditos: number;
    private evaluaciones: EvaluacionAcademica[];

    constructor(id: number, nombre: string, docente: Docente, creditos: number) {
        this.id = id;
        this.nombre = nombre;
        this.docente = docente;
        this.creditos = creditos;
        this.evaluaciones = [];
    }

    static desdeJSON(obj: any): Curso {
        const docente = Docente.desdeJSON(obj.docente);

        return new Curso(
            obj.id,
            obj.nombre,
            docente,
            obj.creditos
        );
    }

    getResumen(): string {
        return this.nombre + 
               " - Docente: " + this.docente.getResumen() + 
               " - Creditos: " + this.creditos;
    }

    // ===== GETTERS NECESARIOS =====

    getId(): number {
        return this.id;
    }

    getNombre(): string {
        return this.nombre;
    }

    getCreditos(): number {
        return this.creditos;
    }

    getDocente(): Docente {
        return this.docente;
    }

    // ===== SETTERS =====

    actualizarNombre(nuevoNombre: string): void {
        this.nombre = nuevoNombre;
    }

    actualizarCreditos(nuevosCreditos: number): void {
        this.creditos = nuevosCreditos;
    }
}