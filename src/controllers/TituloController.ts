import { Router } from "express";
import { TituloService } from "../services/TituloService";

const routesTitulo = Router();

// CRUD da tabela Titulo
routesTitulo.get("/", new TituloService().allTitulos);

routesTitulo.post("/", new TituloService().createTitulo);

routesTitulo.put("/:id", new TituloService().updateTitulo);

routesTitulo.delete("/:id", new TituloService().deleteTitulo);

export default routesTitulo;