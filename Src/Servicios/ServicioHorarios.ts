import { Horario } from "../Modelos/Horario.js";

export class ServicioHorarios {

    private horarios: Horario[] = [];

    agregarHorario(horario: Horario): void {

        if (this.verificarConflictoAula(horario)) {
            console.log("Conflicto detectado en aula.");
            return;
        }

        if (this.verificarConflictoDocente(horario)) {
            console.log("Conflicto detectado: el docente ya tiene clase en ese horario.");
            return;
        }

        this.horarios.push(horario);
        console.log("Horario registrado correctamente.");
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

    private verificarConflictoAula(nuevo: Horario): boolean {
        for(const h of this.horarios) {
            const mismoDia = h.getDia() === nuevo.getDia();
            const mismaAula = h.getAula() === nuevo.getAula();
            const mismaHoraInicio = h.getHoraInicio() === nuevo.getHoraInicio();
            const mismaHoraFin = h.getHoraFin() === nuevo.getHoraFin();

            if(mismoDia && mismaAula && mismaHoraInicio && mismaHoraFin) {
            return true;
            }
        }
        return false;
    }
    
    private verificarConflictoDocente(nuevo: Horario): boolean {
        for (const h of this.horarios) {

            const mismoDia = h.getDia() === nuevo.getDia();
            const mismaHoraInicio = h.getHoraInicio() === nuevo.getHoraInicio();
            const mismaHoraFin = h.getHoraFin() === nuevo.getHoraFin();
            const mismoDocente =
                h.getDocente().getResumen() === nuevo.getDocente().getResumen();

            if (mismoDia && mismaHoraInicio && mismaHoraFin && mismoDocente) {
                return true;
            }
        }

        return false;
    }
}
