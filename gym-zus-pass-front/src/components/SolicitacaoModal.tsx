"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function SolicitacaoModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: () => void }) {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [valor, setValor] = useState("");
  const [local, setLocal] = useState("");
  const [academia, setAcademia] = useState("");
  const [tipoAula, setTipoAula] = useState("");
  const [descricao, setDescricao] = useState("");
  const [especialidades, setEspecialidades] = useState<string[]>([]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      const snap = await getDocs(collection(db, "especialidades"));
      let arr: string[] = [];
      snap.forEach((d) => arr = [...arr, ...Object.keys(d.data())]);
      setEspecialidades(Array.from(new Set(arr)));
    };
    fetchEspecialidades();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Solicitações"), {
        seu_nome: nome,
        contato,
        valorPorHora: valor,
        localizacao: local,
        academiaFrequente: academia,
        tipoAula,
        descrição: descricao,
        status: "Aguardando resposta do professor",
        dataCriacao: new Date()
      });
      onAdd();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  if (!isOpen) return null;

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: "10px",
    padding: "9px 12px 9px 36px",
    color: "#fff",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    fontFamily: "inherit",
  };

  const labelBase: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontWeight: 500,
    color: "rgba(255,255,255,0.45)",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  };

  const iconBase: React.CSSProperties = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "rgba(255,255,255,0.25)",
    fontSize: "15px",
    pointerEvents: "none",
  };

  const handleFocusOrange = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(255,107,0,0.55)";
    e.target.style.background = "rgba(255,107,0,0.05)";
  };

  const handleFocusGreen = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(0,200,83,0.45)";
    e.target.style.background = "rgba(0,200,83,0.04)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(255,255,255,0.10)";
    e.target.style.background = "rgba(255,255,255,0.04)";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div style={{
        width: "100%",
        maxWidth: "460px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "20px",
        padding: "32px",
        position: "relative",
        backdropFilter: "blur(16px)",
      }}>

        {/* Botão fechar */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.5)",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseOver={e => {
            const btn = e.currentTarget;
            btn.style.background = "rgba(173,27,42,0.25)";
            btn.style.color = "#ff5c6a";
            btn.style.borderColor = "rgba(173,27,42,0.4)";
          }}
          onMouseOut={e => {
            const btn = e.currentTarget;
            btn.style.background = "rgba(255,255,255,0.06)";
            btn.style.color = "rgba(255,255,255,0.5)";
            btn.style.borderColor = "rgba(255,255,255,0.10)";
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <div style={{ width: "4px", height: "24px", background: "#ff6b00", borderRadius: "2px" }} />
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 500, color: "#fff", letterSpacing: "-0.3px" }}>
              Nova Solicitação
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.38)", paddingLeft: "14px" }}>
            Preencha os dados para encontrar seu personal
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

          {/* Nome */}
          <div>
            <label style={labelBase}>Seu Nome</label>
            <div style={{ position: "relative" }}>
              <span style={{ ...iconBase, fontSize: "15px" }}>👤</span>
              <input
                required
                type="text"
                placeholder="João Silva"
                style={inputBase}
                onFocus={handleFocusOrange}
                onBlur={handleBlur}
                onChange={e => setNome(e.target.value)}
              />
            </div>
          </div>

          {/* Contato + Valor */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={labelBase}>WhatsApp</label>
              <div style={{ position: "relative" }}>
                <span style={{ ...iconBase, color: "rgba(0,200,83,0.5)" }}>💬</span>
                <input
                  required
                  type="text"
                  placeholder="(11) 99999-9999"
                  style={{ ...inputBase, fontSize: "13px" }}
                  onFocus={handleFocusGreen}
                  onBlur={handleBlur}
                  onChange={e => setContato(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label style={labelBase}>Valor h/aula</label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255,107,0,0.6)",
                  fontSize: "12px",
                  fontWeight: 500,
                  pointerEvents: "none",
                }}>R$</span>
                <input
                  required
                  type="number"
                  placeholder="80"
                  style={{ ...inputBase, fontSize: "13px", paddingLeft: "30px" }}
                  onFocus={handleFocusOrange}
                  onBlur={handleBlur}
                  onChange={e => setValor(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div>
            <label style={labelBase}>Endereço</label>
            <div style={{ position: "relative" }}>
              <span style={iconBase}>📍</span>
              <input
                required
                type="text"
                placeholder="Rua, número — bairro"
                style={inputBase}
                onFocus={handleFocusOrange}
                onBlur={handleBlur}
                onChange={e => setLocal(e.target.value)}
              />
            </div>
          </div>

          {/* Academia */}
          <div>
            <label style={labelBase}>Academia que frequenta</label>
            <div style={{ position: "relative" }}>
              <span style={iconBase}>🏢</span>
              <input
                required
                type="text"
                placeholder="Smart Fit, Bodytech…"
                style={inputBase}
                onFocus={handleFocusOrange}
                onBlur={handleBlur}
                onChange={e => setAcademia(e.target.value)}
              />
            </div>
          </div>

          {/* Tipo de Aula */}
          <div>
            <label style={labelBase}>Tipo de Aula</label>
            <div style={{ position: "relative" }}>
              <select
                required
                style={{
                  ...inputBase,
                  paddingLeft: "12px",
                  paddingRight: "32px",
                  color: "rgba(255,255,255,0.55)",
                  appearance: "none",
                  cursor: "pointer",
                }}
                onFocus={handleFocusOrange}
                onBlur={handleBlur}
                onChange={e => setTipoAula(e.target.value)}
              >
                <option value="" style={{ background: "#0f172a" }}>Selecione uma especialidade…</option>
                {especialidades.map(e => (
                  <option key={e} value={e} style={{ background: "#0f172a" }}>{e}</option>
                ))}
              </select>
              <span style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.25)",
                fontSize: "12px",
                pointerEvents: "none",
              }}>▼</span>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label style={labelBase}>Objetivo / Descrição</label>
            <textarea
              required
              rows={3}
              placeholder="Descreva seu objetivo, disponibilidade e qualquer detalhe que ajude o personal…"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "10px",
                padding: "9px 12px",
                color: "#fff",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
                resize: "none",
                fontFamily: "inherit",
                lineHeight: 1.5,
                transition: "border-color 0.2s, background 0.2s",
              }}
              onFocus={handleFocusOrange}
              onBlur={handleBlur}
              onChange={e => setDescricao(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#ff6b00",
              border: "none",
              borderRadius: "10px",
              padding: "12px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.3px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s",
              marginTop: "2px",
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "#e66000";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "#ff6b00";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            ✉ Enviar Solicitação
          </button>

        </form>
      </div>
    </div>
  );
}