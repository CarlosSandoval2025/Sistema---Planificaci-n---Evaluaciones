import { ServicioHorarios } from "./Aplicación/Servicios.ts/ServicioHorarios";
import { ServicioEvaluaciones } from "./Aplicación/Servicios.ts/ServicioEvaluaciones";
import { RepositorioHorarios } from "./Infraestructura/Repositorios/RepositorioHorarios";
import { RepositorioEvaluaciones } from "./Infraestructura/Repositorios/RepositorioEvaluaciones";
import { Menu } from "./Interfaces/Menu";

const repoHorarios = new RepositorioHorarios();
const repositorioEvaluaciones = new RepositorioEvaluaciones();
const servicioHorarios = new ServicioHorarios(repoHorarios);
const servicioEvaluaciones = new ServicioEvaluaciones(repositorioEvaluaciones);

const menu = new Menu(servicioHorarios, servicioEvaluaciones);
menu.iniciar();