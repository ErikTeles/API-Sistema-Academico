import { AppDataSource } from "../data-source";
import { Professor } from "../models/Professor";

export const ProfessorRepository = AppDataSource.getRepository(Professor);
