import { Router } from "express";
import { CursaService } from "../services/CursaService";

const routesCursa = Router();

// CRUD da tabela Cursa
routesCursa.get("/", new CursaService().allCursas);

routesCursa.post("/", new CursaService().createCursa);

routesCursa.put("/:id_aluno/:id_disciplina", new CursaService().updateCursa);

routesCursa.delete("/:id_aluno/:id_disciplina", new CursaService().deleteCursa);

export default routesCursa;
