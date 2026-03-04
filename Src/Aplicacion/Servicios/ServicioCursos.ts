import { Curso } from "../../Dominio/Modelos/Curso";
import { RepositorioCursos } from "../../Infraestructura/Repositorios/RepositorioCursos";

export class ServicioCursos {

    constructor(private repositorio: RepositorioCursos) {}

    agregarCurso(curso: Curso) {

        const docente = curso.getDocente();

        if (
            docente.getEspecialidad().toLowerCase().trim() !== 
            curso.getNombre().toLowerCase().trim()
        ) {
            throw new Error("El docente no tiene la especialidad para este curso.");
        }

        this.repositorio.agregar(curso);
    }

    getCursos(): Curso[] {
        return this.repositorio.obtenerTodos();
    }
}