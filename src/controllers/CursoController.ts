import { Router } from "express";
import { CursoService } from "../services/CursoService";

const routesCurso = Router();

// CRUD da tabela Curso
routesCurso.get("/", new CursoService().allCursos);

routesCurso.post("/", new CursoService().createCurso);

routesCurso.put("/:id_curso", new CursoService().updateCurso);

routesCurso.delete("/:id_curso", new CursoService().deleteCurso);

export default routesCurso;