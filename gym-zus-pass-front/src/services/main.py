from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import models, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Configuração de CORS para permitir que o Front-end acesse a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response (optional but good practice)
class TreinoBase(BaseModel):
    titulo: str
    aluno_id: int

@app.get("/alunos/{user_id}")
def read_aluno(user_id: int, db: Session = Depends(database.get_db)):
    aluno = db.query(models.Usuario).filter(models.Usuario.id == user_id, models.Usuario.tipo == "aluno").first()
    if not aluno:
        raise HTTPException(status_code=404, detail="Aluno não encontrado")
    
    treinos = db.query(models.Treino).filter(models.Treino.aluno_id == user_id).all()

    # Adicionando dados mockados para frequência semanal
    # Em um cenário real, isso viria do banco de dados ou de alguma lógica de negócio
    frequencia_semanal_mock = "4/5"
    
    return {
        "id": aluno.id,
        "nome": aluno.nome,
        "email": aluno.email,
        "plano": aluno.plano,
        "ativo": aluno.ativo,
        "treinos": [{"id": t.id, "titulo": t.titulo, "ultima_vez": t.ultima_vez} for t in treinos],
        "frequencia_semanal": frequencia_semanal_mock,
    }

@app.get("/instrutores/{instrutor_id}")
def read_instrutor(instrutor_id: int, db: Session = Depends(database.get_db)):
    instrutor = db.query(models.Usuario).filter(models.Usuario.id == instrutor_id, models.Usuario.tipo == "instrutor").first()
    if not instrutor:
        raise HTTPException(status_code=404, detail="Instrutor não encontrado")

    # Dados mockados para demonstração.
    # Em um cenário real, você faria consultas ao banco de dados para obter:
    # - Contagem de alunos associados ao instrutor
    # - Aulas agendadas para o dia atual
    # - Feedbacks recebidos
    # - Solicitações pendentes

    mock_especialidade = "Personal Trainer • Especialista em Musculação e Crossfit"
    mock_avaliacao_media = 4.9
    mock_cref = "123456-G/SP"
    mock_alunos_count = 24
    mock_aulas_hoje_count = 6
    mock_solicitacoes_pendentes = 3
    mock_agenda_hoje = [
        {"id": 1, "horario": "08:00", "aluno_nome": "Maria Silva", "status": "Agendada"},
        {"id": 2, "horario": "10:30", "aluno_nome": "Pedro Costa", "status": "Agendada"},
        {"id": 3, "horario": "14:00", "aluno_nome": "Ana Souza", "status": "Agendada"},
    ]
    mock_feedbacks_recentes = [
        {"id": 1, "aluno_nome": "Aluno 1", "avaliacao": 5, "comentario": "Ótima aula, foco total hoje!"},
        {"id": 2, "aluno_nome": "Aluno 2", "avaliacao": 4, "comentario": "Sempre motivador!"},
        {"id": 3, "aluno_nome": "Aluno 3", "avaliacao": 5, "comentario": "Treino intenso e eficaz."},
    ]

    return {
        "id": instrutor.id,
        "nome": instrutor.nome,
        "email": instrutor.email,
        "especialidade": mock_especialidade,
        "avaliacao_media": mock_avaliacao_media,
        "cref": mock_cref,
        "alunos_count": mock_alunos_count,
        "aulas_hoje_count": mock_aulas_hoje_count,
        "solicitacoes_pendentes": mock_solicitacoes_pendentes,
        "agenda_hoje": mock_agenda_hoje,
        "feedbacks_recentes": mock_feedbacks_recentes,
    }

# Exemplo de POST para criar treino (mantido)
@app.post("/treinos/", response_model=TreinoBase)
def create_treino(treino: TreinoBase, db: Session = Depends(database.get_db)):
    db_treino = models.Treino(titulo=treino.titulo, aluno_id=treino.aluno_id, ultima_vez=0)
    db.add(db_treino)
    db.commit()
    db.refresh(db_treino)
    return db_treino