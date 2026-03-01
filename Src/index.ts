import { ServicioHorarios } from "./Servicios/ServicioHorarios";
import { ServicioEvaluaciones } from "./Servicios/ServicioEvaluaciones";
import { Menu } from "./Utilidades/Menu";

const servicioHorarios = new ServicioHorarios();
const servicioEvaluaciones = new ServicioEvaluaciones

const menu = new Menu(servicioHorarios, servicioEvaluaciones);
menu.iniciar();