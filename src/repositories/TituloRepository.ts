import { AppDataSource } from "../data-source";
import { Titulo } from "../models/Tituto";

export const TituloRepository = AppDataSource.getRepository(Titulo);
