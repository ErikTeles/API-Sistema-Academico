import { Request, Response } from "express";
import { AlunoRepository } from "../repositories/AlunoRepository";

export class AlunoService {
  // Busca todos os alunos da tabela Aluno
  async allAlunos(req: Request, res: Response) {
    return res.status(200).json(await AlunoRepository.find());
  }

  async createAluno(req: Request, res: Response) {
    const { tx_nome, tx_sexo, dt_nascimento } = req.body;

    try {
      const newAluno = AlunoRepository.create({
        tx_nome,
        tx_sexo,
        dt_nascimento,
      });

      await AlunoRepository.save(newAluno);

      return res.status(201).json(newAluno);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao criar aluno!" });
    }
  }

  async updateAluno(req: Request, res: Response) {
    const { id } = req.params;
    const { tx_nome, tx_sexo, dt_nascimento } = req.body;

    try {
      const aluno = await AlunoRepository.findOneBy({
        id_aluno: Number(id),
      });

      if (!aluno) {
        return res.status(404).json({ message: "Aluno não encontrado!" });
      }

      await AlunoRepository.update(
        { id_aluno: Number(id) },
        {
          tx_nome,
          tx_sexo,
          dt_nascimento,
        }
      );

      return res.status(200).json({ message: "Aluno atualizado com sucesso!" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao atualizar aluno!" });
    }
  }

  async deleteAluno(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const aluno = await AlunoRepository.findOneBy({
        id_aluno: Number(id),
      });

      if (!aluno) {
        return res.status(404).json({ message: "Aluno não encontrado!" });
      }

      await AlunoRepository.delete({ id_aluno: Number(id) });

      return res.status(200).json({ message: "Aluno deletado com sucesso!" });
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({ message: "Erro ao deletar aluno!" });
    }
  }
}
