import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Curso } from "./Curso";
import { TipoDisciplina } from "./TipoDisciplina";
import { Cursa } from "./Cursa";
import { Professor } from "./Professor";

@Entity("disciplina")
@Check("chk_in_periodo", "in_periodo >= 1")
@Check("chk_in_carga_horaria", "in_carga_horaria >= 40")
export class Disciplina {
  @PrimaryGeneratedColumn()
  id_disciplina: number;

  @Column({ type: "varchar", length: 10, nullable: false, unique: true })
  tx_sigla: string;

  @Column({ type: "varchar", length: 150, nullable: false, unique: true })
  tx_descricao: string;

  @Column({ type: "integer", nullable: false })
  in_periodo: number;

  @Column({ type: "integer", nullable: false })
  in_carga_horaria: number;

  @Column({ type: "integer" })
  id_curso: number;

  @ManyToOne(() => Curso, (curso) => curso.disciplinas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn({
    name: "id_curso",
    foreignKeyConstraintName: "fk_curso_to_disciplina",
  })
  curso: Curso;

  @Column({ type: "integer", nullable: false })
  id_tipo_disciplina: number;

  @ManyToOne(
    () => TipoDisciplina,
    (tipoDisciplina) => tipoDisciplina.disciplinas,
    { nullable: false }
  )
  @JoinColumn({
    name: "id_tipo_disciplina",
    foreignKeyConstraintName: "fk_tipo_disciplina_to_disciplina",
  })
  tipo_disciplina: TipoDisciplina;

  @OneToMany(() => Cursa, (cursa) => cursa.id_disciplina)
  cursas: Cursa[];

  @ManyToMany(() => Professor, (professor) => professor.disciplinas, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  professores: Professor[];
}
