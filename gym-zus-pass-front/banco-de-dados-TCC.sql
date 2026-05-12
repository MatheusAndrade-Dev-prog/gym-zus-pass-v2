CREATE DATABASE sistema_contratacao1;
USE sistema_contratacao1;

-- =========================
-- TABELA: cadastro_aluno
-- =========================
CREATE TABLE cadastro_aluno (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(50) NOT NULL,
    data_de_nascimento DATE,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    
    cep CHAR(9) NOT NULL,
    endereco VARCHAR(150),
    numero SMALLINT,
    bairro VARCHAR(50),
    complemento VARCHAR(60),
    cidade VARCHAR(70)
);

INSERT INTO cadastro_aluno 
(nome, email, senha, data_de_nascimento,cpf, cep, endereco, numero, bairro, complemento, cidade)
VALUES
('João Silva', 'joao.silva@gmail.com', '123456', '2000-05-10', '168.995.350-09','01001-000', 'Rua das Flores', '123', 'Centro', 'Apto 12', 'São Paulo'),
('Maria Oliveira', 'maria.oliveira@gmail.com', 'abcdef', '1998-11-22', '453.178.287-91','20040-002', 'Av. Atlântica', '456', 'Copacabana', 'Casa', 'Rio de Janeiro'),
('Carlos Souza', 'carlos.souza@gmail.com', 'senha123', '2002-03-15', '295.379.148-06','30130-010', 'Rua Afonso Pena', '789', 'Centro', 'Bloco B', 'Belo Horizonte'),
('Ana Costa', 'ana.costa@gmail.com', 'qwerty', '1999-07-30', '746.824.890-70','40020-000', 'Ladeira da Barra', '321', 'Barra', 'Apto 45', 'Salvador');

SELECT * FROM cadastro_aluno;

-- =========================
-- TABELA: cadastro_profissional
-- =========================
CREATE TABLE cadastro_profissional (
    id_profissional INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(50) NOT NULL,
    data_de_nascimento DATE,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    sobre_mim TEXT,
    especialidade VARCHAR(100),

    cep CHAR(9) NOT NULL,
    endereco VARCHAR(150),
    numero SMALLINT,
    bairro VARCHAR(50),
    complemento VARCHAR(60),
    cidade VARCHAR(70)
    
);

INSERT INTO cadastro_profissional 
(nome, email, senha, data_de_nascimento, cpf, sobre_mim, cep, endereco, numero, bairro, complemento, cidade, linkedin, instagram, facebook)
VALUES
('Lucas Pereira', 'lucas.pereira@gmail.com', '123456', '1990-08-15', '123.456.789-00',
'Professor de matemática com experiência em ensino médio e vestibulares.',
'01001-000', 'Rua das Palmeiras', 120, 'Centro', 'Apto 10', 'São Paulo',
'linkedin.com/in/lucaspereira', '@lucasprof', 'facebook.com/lucasprof'),
('Fernanda Alves', 'fernanda.alves@gmail.com', 'abcdef', '1985-04-22', '987.654.321-00',
'Professora de inglês com certificação internacional.',
'20040-002', 'Av. Brasil', 450, 'Copacabana', 'Casa', 'Rio de Janeiro',
'linkedin.com/in/fernandaalves', '@fernandaenglish', 'facebook.com/fernandaenglish'),
('Ricardo Gomes', 'ricardo.gomes@gmail.com', 'senha123', '1992-12-05', '456.789.123-00',
'Especialista em programação e desenvolvimento web.',
'30130-010', 'Rua da Bahia', 300, 'Centro', 'Sala 5', 'Belo Horizonte',
'linkedin.com/in/ricardogomes', '@devricardo', 'facebook.com/devricardo'),
('Juliana Costa', 'juliana.costa@gmail.com', 'qwerty', '1995-06-18', '321.654.987-00',
'Professora de biologia focada em ENEM e vestibulares.',
'40020-000', 'Av. Oceânica', 210, 'Barra', 'Apto 22', 'Salvador',
'linkedin.com/in/julianacosta', '@biojuliana', 'facebook.com/biojuliana');

SELECT * FROM cadastro_profissional;

-- =========================
-- TABELA: solicitacao_de_professor
-- =========================
CREATE TABLE solicitacao_de_professor (
    id_solicitacao INT AUTO_INCREMENT PRIMARY KEY,
    
    fk_cadastro_aluno INT,
    fk_cadastro_profissional INT,

    FOREIGN KEY (fk_cadastro_aluno) REFERENCES cadastro_aluno(id_aluno),
    FOREIGN KEY (fk_cadastro_profissional) REFERENCES cadastro_profissional(id_profissional)
);

SELECT * FROM solicitacao_de_professor;


UPDATE cadastro_aluno
SET data_de_nascimento = '2001-09-20',
    numero = 200
WHERE id_aluno = 2;
SELECT * FROM cadastro_aluno;

UPDATE cadastro_profissional
SET instagram = '@ricardoDev',
    facebook = 'facebook.com/ricardoDev'
WHERE id_profissional = 3;
SELECT * FROM cadastro_profissional;

UPDATE cadastro_profissional
SET cpf = '111.222.333-44',
    sobre_mim = 'Professor atualizado com foco em ensino online.'
WHERE id_profissional = 1;
SELECT * FROM cadastro_profissional;


DELETE FROM cadastro_aluno
WHERE cidade = 'Salvador';
SELECT * FROM cadastro_aluno
WHERE cidade = 'Salvador';

DELETE FROM cadastro_profissional
WHERE cidade = 'São Paulo';
SELECT * FROM cadastro_profissional
WHERE cidade = 'São Paulo';

