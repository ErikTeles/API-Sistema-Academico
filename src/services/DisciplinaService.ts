import { Request, Response } from "express";
import { DisciplinaRepository } from "../repositories/DisciplinaRepository";

export class DisciplinaService {
  // Busca todos os alunos da tabela Aluno
  async allDisciplinas(req: Request, res: Response) {
    return res.status(200).json(await DisciplinaRepository.find());
  }

  async createDisciplina(req: Request, res: Response) {
    const {
      id_curso,
      id_tipo_disciplina,
      tx_sigla,
      tx_descricao,
      in_periodo,
      in_carga_horaria,
    } = req.body;

    try {
      const newDisciplina = DisciplinaRepository.create({
        id_curso,
        id_tipo_disciplina,
        tx_sigla,
        tx_descricao,
        in_periodo,
        in_carga_horaria,
      });

      await DisciplinaRepository.save(newDisciplina);

      return res.status(201).json(newDisciplina);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao criar disciplina!" });
    }
  }

  async updateDisciplina(req: Request, res: Response) {
    const { id_disciplina } = req.params;
    const {
      id_curso,
      id_tipo_disciplina,
      tx_sigla,
      tx_descricao,
      in_periodo,
      in_carga_horaria,
    } = req.body;

    try {
      const disciplina = await DisciplinaRepository.findOneBy({
        id_disciplina: Number(id_disciplina),
      });

      if (!disciplina) {
        return res.status(404).json({ message: "Disciplina não encontrada!" });
      }

      await DisciplinaRepository.update(
        { id_disciplina: Number(id_disciplina) },
        {
          id_curso,
          id_tipo_disciplina,
          tx_sigla,
          tx_descricao,
          in_periodo,
          in_carga_horaria,
        }
      );

      return res.status(200).json({
        message: "Disciplina atualizada com sucesso!",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao atualizar disciplina!" });
    }
  }

  async deleteDisciplina(req: Request, res: Response) {
    const { id_disciplina } = req.params;

    try {
      const disciplina = await DisciplinaRepository.findOneBy({
        id_disciplina: Number(id_disciplina),
      });

      if (!disciplina) {
        return res.status(404).json({ message: "Disciplina não encontrada!" });
      }

      await DisciplinaRepository.delete({
        id_disciplina: Number(id_disciplina),
      });

      return res.status(200).json({
        message: "Disciplina deletada com sucesso!",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao deletar disciplina!" });
    }
  }
}
