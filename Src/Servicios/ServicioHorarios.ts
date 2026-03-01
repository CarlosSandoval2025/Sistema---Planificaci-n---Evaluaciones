import { Horario } from "../Modelos/Horario";

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

        if (this.verificarConflictoCurso(horario)) {
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
            
            const inicio1 = h.getHoraInicio();
            const fin1 = h.getHoraFin();
            const inicio2 = nuevo.getHoraInicio();
            const fin2 = nuevo. getHoraFin();

            const hayCruce = inicio1 < fin2 && fin1 > inicio2;

            if(mismoDia && mismaAula && hayCruce) {
                return true;
            }
        }
        return false;
    }
    
    private verificarConflictoDocente(nuevo: Horario): boolean {
        for (const h of this.horarios) {

            const mismoDia = h.getDia() === nuevo.getDia();
            const mismoDocente = h.getDocente().getDni() === nuevo.getDocente().getDni();
            
            const inicio1 = h.getHoraInicio();
            const fin1 = h.getHoraFin();
            const inicio2 = nuevo.getHoraInicio();
            const fin2 = nuevo. getHoraFin();

            const hayCruce = inicio1 < fin2 && fin1 > inicio2;

            if (mismoDia && mismoDocente && hayCruce) {
                return true;
            }
        }

        return false;
    }

    private verificarConflictoCurso(nuevo: Horario): boolean {

        for (const h of this.horarios) {

            const mismoDia = h.getDia() === nuevo.getDia();
            const mismoCurso = h.getCurso().getId() === nuevo.getCurso().getId();
             
            const inicio1 = h.getHoraInicio();
            const fin1 = h.getHoraFin();
            const inicio2 = nuevo.getHoraInicio();
            const fin2 = nuevo. getHoraFin();

            const hayCruce = inicio1 < fin2 && fin1 > inicio2;

            if (mismoDia && mismoCurso && hayCruce) {
                console.log("Conflicto detectado: el curso ya tiene clase en ese horario.");
                return true;
            }
        }

        return false;
    }
}
