CREATE TABLE aluno (
  id_aluno      INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tx_nome       VARCHAR(100) NOT NULL,
  tx_sexo       CHAR(1)      NOT NULL,
  dt_nascimento DATE         NOT NULL
);

CREATE TABLE instituicao (
  id_instituicao INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tx_sigla       VARCHAR(15)  NOT NULL UNIQUE,
  tx_descricao   VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE tipo_curso(
  id_tipo_curso INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tx_descricao  VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE tipo_disciplina (
  id_tipo_disciplina INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tx_descricao       VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE titulo (
  id_titulo    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tx_descricao VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE curso (
  id_curso       INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_instituicao INTEGER      NOT NULL,
  id_tipo_curso  INTEGER      NOT NULL,
  tx_descricao   VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE disciplina (
  id_disciplina      INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_curso           INTEGER,
  id_tipo_disciplina INTEGER      NOT NULL,
  tx_sigla           VARCHAR(10)  NOT NULL UNIQUE,
  tx_descricao       VARCHAR(150) NOT NULL UNIQUE,
  in_periodo         INTEGER      NOT NULL,
  in_carga_horaria   INTEGER      NOT NULL
);

CREATE TABLE cursa (
  id_aluno      INTEGER      NOT NULL,
  id_disciplina INTEGER      NOT NULL,
  in_ano        INTEGER      NOT NULL,
  in_semestre   INTEGER      NOT NULL,
  in_faltas     INTEGER      NOT NULL DEFAULT 0,
  nm_nota1      NUMERIC(4,2),
  nm_nota2      NUMERIC(4,2),
  nm_nota3      NUMERIC(4,2),
  bl_aprovado   BOOLEAN      NOT NULL DEFAULT false,
  PRIMARY KEY (id_aluno, id_disciplina, in_ano, in_semestre)
);

CREATE TABLE professor (
  id_professor    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_titulo       INTEGER     NOT NULL,
  tx_nome         VARCHAR(50) NOT NULL,
  tx_sexo         CHAR(1)     NOT NULL DEFAULT 'm',
  tx_estado_civil CHAR(1)     NOT NULL DEFAULT 's',
  dt_nascimento   DATE        NOT NULL,
  tx_telefone     VARCHAR(13) NOT NULL
);

CREATE TABLE leciona (
  id_professor  INTEGER NOT NULL,
  id_disciplina INTEGER NOT NULL,
  PRIMARY KEY (id_professor, id_disciplina)
);

ALTER TABLE curso
  ADD CONSTRAINT FK_instituicao_TO_curso
    FOREIGN KEY (id_instituicao)
    REFERENCES instituicao (id_instituicao);

ALTER TABLE curso
  ADD CONSTRAINT FK_tipo_curso_TO_curso
    FOREIGN KEY (id_tipo_curso)
    REFERENCES tipo_curso (id_tipo_curso);

ALTER TABLE professor
  ADD CONSTRAINT FK_titulo_TO_professor
    FOREIGN KEY (id_titulo)
    REFERENCES titulo (id_titulo);

ALTER TABLE disciplina
  ADD CONSTRAINT FK_tipo_disciplina_TO_disciplina
    FOREIGN KEY (id_tipo_disciplina)
    REFERENCES tipo_disciplina (id_tipo_disciplina);

ALTER TABLE leciona
  ADD CONSTRAINT FK_professor_TO_leciona
    FOREIGN KEY (id_professor)
    REFERENCES professor (id_professor);

ALTER TABLE leciona
  ADD CONSTRAINT FK_disciplina_TO_leciona
    FOREIGN KEY (id_disciplina)
    REFERENCES disciplina (id_disciplina);

ALTER TABLE cursa
  ADD CONSTRAINT FK_disciplina_TO_cursa
    FOREIGN KEY (id_disciplina)
    REFERENCES disciplina (id_disciplina);

ALTER TABLE cursa
  ADD CONSTRAINT FK_aluno_TO_cursa
    FOREIGN KEY (id_aluno)
    REFERENCES aluno (id_aluno);

ALTER TABLE disciplina
  ADD CONSTRAINT FK_curso_TO_disciplina
    FOREIGN KEY (id_curso)
    REFERENCES curso (id_curso);

ALTER TABLE disciplina
  ADD CONSTRAINT chk_in_periodo
    CHECK (in_periodo >= 1);

ALTER TABLE disciplina
  ADD CONSTRAINT chk_in_carga_horaria
    CHECK (in_carga_horaria >= 40);

ALTER TABLE professor
  ADD CONSTRAINT chk_tx_sexo
    CHECK (tx_sexo IN ('m', 'f'));

ALTER TABLE professor
  ADD CONSTRAINT chk_tx_estado_civil
    CHECK (tx_estado_civil IN ('s', 'c', 'd'));

ALTER TABLE aluno
  ADD CONSTRAINT chk_tx_sexo
    CHECK (tx_sexo IN ('m', 'f'));

ALTER TABLE cursa
  ADD CONSTRAINT chk_in_faltas
    CHECK (in_faltas >= 0);

ALTER TABLE cursa
  ADD CONSTRAINT chk_nm_nota1
    CHECK (nm_nota1 >= 0);

ALTER TABLE cursa
  ADD CONSTRAINT chk_nm_nota2
    CHECK (nm_nota2 >= 0);

ALTER TABLE cursa
  ADD CONSTRAINT chk_nm_nota3 
    CHECK (nm_nota3 >= 0);