import { Docente } from "../../Dominio/Modelos/Docente";
import { RepositorioDocentes } from "../../Infraestructura/Repositorios/RepositorioDocentes";

export class ServicioDocentes {

    constructor(private repositorio: RepositorioDocentes) {}

    agregarDocente(docente: Docente) {
        this.repositorio.agregar(docente);
    }

    getDocentes(): Docente[] {
        return this.repositorio.obtenerTodos();
    }
}