import { Docente } from "../../Dominio/Modelos/Docente";
import * as fs from "fs";

export class RepositorioDocentes {
    private archivo = "docentes.json";
    private docentes: Docente[] = [];

    constructor() {
        this.cargar();
    }

    private cargar() {
        if (fs.existsSync(this.archivo)) {
            const data = JSON.parse(fs.readFileSync(this.archivo, "utf-8"));
            this.docentes = data;
        }
    }

    private guardar() {
        fs.writeFileSync(this.archivo, JSON.stringify(this.docentes, null, 2));
    }

    agregar(docente: Docente) {
        this.docentes.push(docente);
        this.guardar();
    }

    obtenerTodos(): Docente[] {
        return this.docentes;
    }
}