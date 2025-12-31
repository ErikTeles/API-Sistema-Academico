import { Request, Response } from "express";
import { ProfessorRepository } from "../repositories/ProfessorRepository";

export class ProfessorService {
  // Busca todos os professores da tabela Professor
  async allProfessores(req: Request, res: Response) {
    return res.status(200).json(await ProfessorRepository.find());
  }

  async createProfessor(req: Request, res: Response) {
    const {
      id_titulo,
      tx_nome,
      tx_sexo,
      tx_estado_civil,
      dt_nascimento,
      tx_telefone,
    } = req.body;

    try {
      const newProfessor = ProfessorRepository.create({
        id_titulo,
        tx_nome,
        tx_sexo,
        tx_estado_civil,
        dt_nascimento,
        tx_telefone,
      });

      await ProfessorRepository.save(newProfessor);

      return res.status(201).json(newProfessor);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao criar professor!" });
    }
  }

  async updateProfessor(req: Request, res: Response) {
    const { id } = req.params;
    const {
      id_titulo,
      tx_nome,
      tx_sexo,
      tx_estado_civil,
      dt_nascimento,
      tx_telefone,
    } = req.body;

    try {
      const professor = await ProfessorRepository.findOneBy({
        id_professor: Number(id),
      });

      if (!professor) {
        return res.status(404).json({ message: "Professor não encontrado!" });
      }

      await ProfessorRepository.update(
        { id_professor: Number(id) },
        {
          id_titulo,
          tx_nome,
          tx_sexo,
          tx_estado_civil,
          dt_nascimento,
          tx_telefone,
        }
      );

      return res
        .status(200)
        .json({ message: "Professor atualizado com sucesso!" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao atualizar professor!" });
    }
  }

  async deleteProfessor(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const professor = await ProfessorRepository.findOneBy({
        id_professor: Number(id),
      });

      if (!professor) {
        return res.status(404).json({ message: "Professor não encontrado!" });
      }

      await ProfessorRepository.delete({ id_professor: Number(id) });

      return res
        .status(200)
        .json({ message: "Professor deletado com sucesso!" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao deletar professor!" });
    }
  }

  async vincularDisciplina(req: Request, res: Response) {
    const { id } = req.params;
    const { id_disciplina } = req.body;

    try {
      const professor = await ProfessorRepository.findOne({
        where: { id_professor: Number(id) },
        relations: ["disciplinas"],
      });

      if (!professor) {
        return res.status(404).json({ message: "Professor não encontrado!" });
      }

      professor.disciplinas.push({
        id_disciplina: Number(id_disciplina),
      } as any);

      await ProfessorRepository.save(professor);

      return res
        .status(200)
        .json({ message: "Disciplina vinculada com sucesso!" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao vincular disciplina!" });
    }
  }

  async listarDisciplinas(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const professor = await ProfessorRepository.findOne({
        where: { id_professor: Number(id) },
        relations: ["disciplinas"],
      });

      if (!professor) {
        return res.status(404).json({ message: "Professor não encontrado!" });
      }

      return res.status(200).json(professor.disciplinas);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao listar disciplinas!" });
    }
  }

  async desvincularDisciplina(req: Request, res: Response) {
    const { id } = req.params;
    const { id_disciplina } = req.body;

    try {
      const professor = await ProfessorRepository.findOne({
        where: { id_professor: Number(id) },
        relations: ["disciplinas"],
      });

      if (!professor) {
        return res.status(404).json({ message: "Professor não encontrado!" });
      }

      professor.disciplinas = professor.disciplinas.filter(
        (disciplina) => disciplina.id_disciplina !== Number(id_disciplina)
      );

      await ProfessorRepository.save(professor);

      return res
        .status(200)
        .json({ message: "Disciplina desvinculada com sucesso!" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Erro ao desvincular disciplina!" });
    }
  }
}
