import { Router } from "express";
import { TipoDisciplinaService } from "../services/TipoDisciplinaService";

const routesTipoDisciplina = Router();

// CRUD da tabela TipoDisciplina
routesTipoDisciplina.get("/", new TipoDisciplinaService().allTipoDisciplina);

routesTipoDisciplina.post("/", new TipoDisciplinaService().createTipoDisciplina);

routesTipoDisciplina.put("/:id", new TipoDisciplinaService().updateTipoDisciplina);

routesTipoDisciplina.delete("/:id", new TipoDisciplinaService().deleteTipoDisciplina);

export default routesTipoDisciplina;