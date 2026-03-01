import { IReportable } from "../../Dominio/Interfaces/IReportable";

export class ServicioReportes {

    static imprimirReportes(obj: IReportable): void {
        console.log(obj.getResumen());
    }

    static imprimirListaReportes(lista: IReportable[]): void {
        for(const item of lista) {
            console.log(item.getResumen());
        }
    }
}