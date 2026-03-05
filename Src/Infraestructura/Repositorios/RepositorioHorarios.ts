import { RepositorioGenerico } from "./RepositorioGenerico";
import { Horario } from "../../Dominio/Modelos/Horario";
import * as fs from "fs";
import * as path from "path";

export class RepositorioHorarios extends RepositorioGenerico<Horario> {

    private archivo: string;

    constructor() {
        super();
        this.archivo = path.join(process.cwd(), "horario.json");
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
        fs.writeFileSync(this.archivo, datos, "utf-8");
        console.log("📁 horario.json guardado correctamente en:", this.archivo);
    }

    private cargarDesdeArchivo(): void {
        if (!fs.existsSync(this.archivo)) {
            console.log("📁 horario.json no existe aún");
            return;
        }

        const datos = fs.readFileSync(this.archivo, "utf-8");
        const listaParseada = JSON.parse(datos);

        this.lista = listaParseada.map((obj: any) =>
            Horario.desdeJSON(obj)
        );

        console.log("📂 Horarios cargados desde archivo:", this.lista.length);
    }
}