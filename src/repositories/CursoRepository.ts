import { AppDataSource } from "../data-source";
import { Curso } from "../models/Curso";

export const CursoRepository = AppDataSource.getRepository(Curso);