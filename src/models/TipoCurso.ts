import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./Curso";

@Entity("tipo_curso")
export class TipoCurso {
  @PrimaryGeneratedColumn()
  id_tipo_curso: number;

  @Column({ type: "varchar", length: 150, nullable: false, unique: true })
  tx_descricao: string;

  @OneToMany(() => Curso, (curso) => curso.id_tipo_curso)
  cursos: Curso[];
}
