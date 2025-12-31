import { Request, Response } from "express";
import { TipoDisciplinaRepository } from "../repositories/TipoDisciplinaRepository";

export class TipoDisciplinaService {
  // Busca todos os alunos da tabela Aluno
  async allTipoDisciplina(req: Request, res: Response) {
    return res.status(200).json(await TipoDisciplinaRepository.find());
  }

  async createTipoDisciplina(req: Request, res: Response) {
    const { tx_descricao } = req.body;

    try {
      const newTipoDisciplina = TipoDisciplinaRepository.create({
        tx_descricao,
      });

      await TipoDisciplinaRepository.save(newTipoDisciplina);

      return res.status(201).json(newTipoDisciplina);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ message: "Erro ao criar tipo de disciplina!" });
    }
  }

  async updateTipoDisciplina(req: Request, res: Response) {
    const { id } = req.params;
    const { tx_descricao } = req.body;

    try {
      const tipoDisciplina = await TipoDisciplinaRepository.findOneBy({
        id_tipo_disciplina: Number(id),
      });

      if (!tipoDisciplina) {
        return res
          .status(404)
          .json({ message: "Tipo de disciplina não encontrado!" });
      }

      await TipoDisciplinaRepository.update(
        { id_tipo_disciplina: Number(id) },
        {
          tx_descricao,
        }
      );

      return res
        .status(200)
        .json({ message: "Tipo de disciplina atualizado com sucesso!" });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ message: "Erro ao atualizar tipo de disciplina!" });
    }
  }

  async deleteTipoDisciplina(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const tipoDisciplina = await TipoDisciplinaRepository.findOneBy({
        id_tipo_disciplina: Number(id),
      });

      if (!tipoDisciplina) {
        return res
          .status(404)
          .json({ message: "Tipo de disciplina não encontrado!" });
      }

      await TipoDisciplinaRepository.delete({ id_tipo_disciplina: Number(id) });

      return res
        .status(200)
        .json({ message: "Tipo de disciplina deletado com sucesso!" });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ message: "Erro ao deletar tipo de disciplina!" });
    }
  }
}
