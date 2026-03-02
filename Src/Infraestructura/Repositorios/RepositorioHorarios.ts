import { RepositorioGenerico } from "./RepositorioGenerico";
import { Horario } from "../../Dominio/Modelos/Horario";
import { Docente } from "../../Dominio/Modelos/Docente";
import { Curso } from "../../Dominio/Modelos/Curso";
import * as fs from "fs";

export class RepositorioHorarios extends RepositorioGenerico<Horario> {

    private archivo =  "horario.json";

    constructor() {
        super();
        this.cargarDesdeArchivo();
    }

    agregar(item: Horario): void {
       super.agregar(item);
       this.guardarEnArchivo();
    }

    eliminar(id: number): void {
        super.eliminar(id);
        this.guardarEnArchivo();
    }

    public guardarCambios(): void {
        this.guardarEnArchivo();
    }

    private guardarEnArchivo(): void {
        const datos = JSON.stringify(this.lista, null, 2);
        fs.writeFileSync(this.archivo, datos);
    }

    private cargarDesdeArchivo(): void {
        
        if(!fs.existsSync(this.archivo)) return;

        const datos = fs.readFileSync(this.archivo, "utf-8");
        const listaParseada = JSON.parse(datos);

        this.lista = listaParseada.map((obj: any) =>
            Horario.desdeJSON(obj)
        );
    }
}