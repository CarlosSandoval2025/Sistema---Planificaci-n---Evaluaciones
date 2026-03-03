import { Curso } from "../../Dominio/Modelos/Curso";
import { RepositorioCursos } from "../../Infraestructura/Repositorios/RepositorioCursos";

export class ServicioCursos {

    constructor(private repositorio: RepositorioCursos) {}

    agregarCurso(curso: Curso) {
        this.repositorio.agregar(curso);
    }

    getCursos(): Curso[] {
        return this.repositorio.obtenerTodos();
    }
}