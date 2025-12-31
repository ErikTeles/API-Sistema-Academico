import { Router } from "express";
import { DisciplinaService } from "../services/DisciplinaService";

const routesDisciplina = Router();

// CRUD da tabela Disciplina
routesDisciplina.get("/", new DisciplinaService().allDisciplinas);

routesDisciplina.post("/", new DisciplinaService().createDisciplina);

routesDisciplina.put("/:id_disciplina", new DisciplinaService().updateDisciplina);

routesDisciplina.delete("/:id_disciplina", new DisciplinaService().deleteDisciplina);

export default routesDisciplina;