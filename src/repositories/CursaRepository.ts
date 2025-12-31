import { AppDataSource } from "../data-source";
import { Cursa } from "../models/Cursa";

export const CursaRepository = AppDataSource.getRepository(Cursa);
