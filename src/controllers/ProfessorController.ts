import { Router } from "express";
import { ProfessorService } from "../services/ProfessorService";

const routesProfessor = Router();

// CRUD da tabela Professor
routesProfessor.get("/", new ProfessorService().allProfessores);

routesProfessor.get(
  "/disciplinas/:id",
  new ProfessorService().listarDisciplinas
);

routesProfessor.post("/", new ProfessorService().createProfessor);

routesProfessor.post(
  "/vincular-disciplina/:id",
  new ProfessorService().vincularDisciplina
);

routesProfessor.post(
  "/desvincular-disciplina/:id",
  new ProfessorService().desvincularDisciplina
);

routesProfessor.put("/:id", new ProfessorService().updateProfessor);

routesProfessor.delete("/:id", new ProfessorService().deleteProfessor);

export default routesProfessor;
