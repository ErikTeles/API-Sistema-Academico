import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Instituicao } from "./Instituicao";
import { TipoCurso } from "./TipoCurso";
import { Disciplina } from "./Disciplina";

@Entity("curso")
export class Curso {
  @PrimaryGeneratedColumn()
  id_curso: number;

  @Column({ type: "varchar", length: 150, nullable: false, unique: true })
  tx_descricao: string;

  @ManyToOne(() => Instituicao, (instituicao) => instituicao.cursos, {
    nullable: false,
  })
  @JoinColumn({
    name: "id_instituicao",
    foreignKeyConstraintName: "fk_instituicao_to_curso",
  })
  id_instituicao: Instituicao;

  @ManyToOne(() => TipoCurso, (tipoCurso) => tipoCurso.cursos, {
    nullable: false,
  })
  @JoinColumn({
    name: "id_tipo_curso",
    foreignKeyConstraintName: "fk_tipo_curso_to_curso",
  })
  id_tipo_curso: TipoCurso;

  @OneToMany(() => Disciplina, (disciplina) => disciplina.id_curso)
  disciplinas: Disciplina[];
}
