import { Horario } from "../Modelos/Horario.js";

export class ServicioHorarios {

    private horarios: Horario[] = [];

    agregarHorario(horario: Horario): void {
        this.horarios.push(horario);
        console.log("Horario Registrado correctamente.");
    }

    listarHorarios(): void {
        if(this.horarios.length === 0) {
            console.log("No hay horarios registrados.");
            return;
        }

        this.horarios.forEach((h, index) => {
            console.log("\nHorario #" + (index + 1));
            console.log(h.getResumen());
        });
    }
}