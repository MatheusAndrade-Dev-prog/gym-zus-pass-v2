from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    email = Column(String, unique=True, index=True)
    tipo = Column(String)  # 'aluno' ou 'instrutor'
    ativo = Column(Boolean, default=True)
    plano = Column(String, nullable=True) # Ex: 'Premium'
    
    treinos = relationship("Treino", back_populates="aluno")

class Treino(Base):
    __tablename__ = "treinos"
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String)
    ultima_vez = Column(Integer) # Dias atrás
    aluno_id = Column(Integer, ForeignKey("usuarios.id"))
    
    aluno = relationship("Usuario", back_populates="treinos")