import { AppDataSource } from "../data-source";
import { TipoDisciplina } from "../models/TipoDisciplina";

export const TipoDisciplinaRepository = AppDataSource.getRepository(TipoDisciplina);