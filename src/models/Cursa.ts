import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Aluno } from "./Aluno";
import { Disciplina } from "./Disciplina";

@Entity("cursa")
@Check("chk_in_faltas", "'in_faltas' >= 0")
@Check("chk_nm_nota1", "'nm_nota1' >= 0")
@Check("chk_nm_nota2", "'nm_nota2' >= 0")
@Check("chk_nm_nota3", "'nm_nota3' >= 0")
export class Cursa {
  @PrimaryColumn({ type: "integer" })
  @ManyToOne(() => Aluno, (aluno) => aluno.cursas, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "id_aluno",
    foreignKeyConstraintName: "cursa_id_aluno_fkey",
  })
  id_aluno: number;

  @PrimaryColumn({ type: "integer" })
  @ManyToOne(() => Disciplina, (disciplina) => disciplina.cursas, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "id_disciplina",
    foreignKeyConstraintName: "cursa_id_disciplina_fkey",
  })
  id_disciplina: number;

  @PrimaryColumn({ type: "integer" })
  in_ano: number;

  @PrimaryColumn({ type: "integer" })
  in_semestre: number;

  @Column({ type: "integer", nullable: false, default: 0 })
  in_faltas: number;

  @Column({ type: "numeric", precision: 4, scale: 2, nullable: true })
  nm_nota1: number;

  @Column({ type: "numeric", precision: 4, scale: 2, nullable: true })
  nm_nota2: number;

  @Column({ type: "numeric", precision: 4, scale: 2, nullable: true })
  nm_nota3: number;

  @Column({ type: "boolean", nullable: false, default: false })
  bl_aprovado: boolean;
}
