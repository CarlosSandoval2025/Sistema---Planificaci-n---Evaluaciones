import { Curso } from "../../Dominio/Modelos/Curso";
import * as fs from "fs";

export class RepositorioCursos {

    private archivo = "cursos.json";
    private cursos: Curso[] = [];

    constructor() {
        this.cargar();
    }

    private cargar() {
        if (fs.existsSync(this.archivo)) {
            const data = JSON.parse(fs.readFileSync(this.archivo, "utf-8"));

            this.cursos = data.map((obj: any) =>
                Curso.desdeJSON(obj)
            );
        }
    }

    private guardar() {
        fs.writeFileSync(this.archivo, JSON.stringify(this.cursos, null, 2));
    }

    agregar(curso: Curso) {
        this.cursos.push(curso);
        this.guardar();
    }

    obtenerTodos(): Curso[] {
        return this.cursos;
    }
}