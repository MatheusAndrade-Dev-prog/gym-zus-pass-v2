"use client";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export default function CadastroInstrutor() {
    const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [cref, setCref] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepDigitado = e.target.value.replace(/\D/g, "");
    setCep(cepDigitado);
    if (cepDigitado.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`);
        const data = await response.json();
        if (data.erro) { alert("CEP não encontrado!"); return; }
        setEndereco(data.logradouro || "");
        setBairro(data.bairro || "");
        setCidade(data.localidade || "");
        setEstado(data.uf || "");
        document.getElementById("campo-numero")?.focus();
      } catch (error) {
        alert("Erro na busca do CEP. Verifique sua conexão.");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const auth = getAuth();
      // 1. Cria a conta no Firebase Auth (A senha fica segura aqui, não no banco)
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = userCredential.user.uid;

      // 2. Salva os dados no Firestore usando o UID como ID do documento
      await setDoc(doc(db, "cadastroInstrutor", uid), {
        nome_completo: nomeCompleto,
        email,
        dataDeNascimento: dataNascimento ? Timestamp.fromDate(new Date(dataNascimento)) : null,
        cpf: cpf.replace(/\D/g, ""),
        cref,
        cep,
        endereço: endereco,
        numero: String(numero),
        complemento,
        bairro,
        cidade,
        estado,
        descricao,
        // Repare que o campo 'senha' foi removido daqui!
      });

      alert("Instrutor cadastrado com sucesso!");
      setNomeCompleto(""); setEmail(""); setSenha(""); setDataNascimento("");
      setCpf(""); setCref(""); setCep(""); setEndereco(""); setNumero("");
      setComplemento(""); setBairro(""); setCidade(""); setEstado(""); setDescricao("");
      
      router.push(`/usuario-instrutor/${uid}`);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Este e-mail já está cadastrado.");
      } else {
        alert("Erro ao realizar cadastro: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Tokens de estilo reutilizáveis ────────────────────────────────
  const inputBase =
    "w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all placeholder-white/25 focus:ring-1 focus:ring-[#ff6b00]";
  const inputNormal  = `${inputBase} bg-white/[0.06] border border-white/10`;
  const inputAuto    = `${inputBase} bg-white/[0.03] border border-white/[0.07] text-white/55`;
  const labelBase    = "block text-[11px] font-semibold text-white/45 uppercase tracking-widest mb-1.5";
  const sectionTitle = "text-[11px] font-semibold tracking-widest uppercase mb-4";
  const divider      = "h-px my-6 bg-white/[0.07]";

  return (
    <div
      className="flex items-start justify-center min-h-screen p-6"
      style={{ background: "linear-gradient(180deg, #0f2042 0%, #0f172a 40%, #090d16 100%)" }}
    >
      <div
        className="w-full lg:w-4/5 max-w-[900px] mx-auto rounded-2xl p-8 md:p-10"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* ── Cabeçalho ── */}
        <div
          className="flex items-center gap-4 mb-8 pb-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base tracking-widest shrink-0"
            style={{ background: "#ff6b00", boxShadow: "0 0 0 3px rgba(255,107,0,0.18)" }}
          >
            GZ
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-0.5">Cadastro de Instrutor</h2>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Preencha os dados para criar seu perfil profissional
            </p>
          </div>
          {/* Badge de profissional */}
          <div
            className="ml-auto text-[11px] font-semibold px-3 py-1.5 rounded-lg tracking-wide whitespace-nowrap"
            style={{
              background: "rgba(0,200,83,0.10)",
              border: "1px solid rgba(0,200,83,0.30)",
              color: "#00c853",
            }}
          >
            ✓ Profissional
          </div>
        </div>

        <form className="space-y-0" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* ── Seção: Dados Pessoais ── */}
            <div className="md:col-span-12">
              <p className={sectionTitle} style={{ color: "#ff6b00" }}>Dados pessoais</p>
            </div>

            <div className="md:col-span-12">
              <label className={labelBase}>Nome Completo</label>
              <input type="text" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)}
                className={inputNormal} placeholder="Digite seu nome completo" required />
            </div>

            <div className="md:col-span-6">
              <label className={labelBase}>E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className={inputNormal} placeholder="email@exemplo.com" required />
            </div>

            <div className="md:col-span-6">
              <label className={labelBase}>Senha</label>
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}
                className={inputNormal} placeholder="Crie uma senha" required />
            </div>

            <div className="md:col-span-4">
              <label className={labelBase}>Data de Nascimento</label>
              <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}
                className={inputNormal} style={{ colorScheme: "dark" }} required />
            </div>

            <div className="md:col-span-4">
              <label className={labelBase}>CPF</label>
              <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)}
                className={inputNormal} placeholder="000.000.000-00" required />
            </div>

            {/* CREF — destaque verde (credencial profissional) */}
            <div className="md:col-span-4">
              <label
                className="block text-[11px] font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: "#00c853" }}
              >
                Numeração do CREF
              </label>
              <input
                type="text" value={cref} onChange={(e) => setCref(e.target.value)}
                className={`${inputBase} focus:ring-[#00c853]`}
                style={{ background: "rgba(0,200,83,0.06)", border: "1px solid rgba(0,200,83,0.35)" }}
                placeholder="012345-G/SP" required
              />
            </div>

            {/* ── Separador Endereço ── */}
            <div className="md:col-span-12">
              <div className={divider} />
              <p className={sectionTitle} style={{ color: "#ff6b00" }}>Endereço</p>
            </div>

            {/* CEP — destaque laranja (aciona ViaCEP) */}
            <div className="md:col-span-4">
              <label
                className="block text-[11px] font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: "#ff6b00" }}
              >
                CEP
              </label>
              <input
                type="text" maxLength={9} value={cep} onChange={handleCepChange}
                className={`${inputBase} focus:ring-[#ff6b00]`}
                style={{ background: "rgba(255,107,0,0.07)", border: "1px solid rgba(255,107,0,0.45)" }}
                placeholder="Apenas números" required
              />
            </div>

            <div className="md:col-span-5">
              <label className={labelBase}>Endereço (Rua/Av)</label>
              <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)}
                className={inputAuto} placeholder="Preenchido automaticamente" required />
            </div>

            <div className="md:col-span-3">
              <label className={labelBase}>Número</label>
              <input id="campo-numero" type="text" value={numero} onChange={(e) => setNumero(e.target.value)}
                className={inputNormal} placeholder="Nº" required />
            </div>

            <div className="md:col-span-12">
              <label className={labelBase}>
                Complemento{" "}
                <span className="text-white/25 normal-case font-normal tracking-normal">(Opcional)</span>
              </label>
              <input type="text" value={complemento} onChange={(e) => setComplemento(e.target.value)}
                className={inputNormal} placeholder="Apartamento, bloco, fundos..." />
            </div>

            <div className="md:col-span-5">
              <label className={labelBase}>Bairro</label>
              <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)}
                className={inputAuto} required />
            </div>

            <div className="md:col-span-5">
              <label className={labelBase}>Cidade</label>
              <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)}
                className={inputAuto} required />
            </div>

            <div className="md:col-span-2">
              <label className={labelBase}>UF</label>
              <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)}
                className={inputAuto} placeholder="SP" required />
            </div>

            {/* ── Separador Descrição ── */}
            <div className="md:col-span-12">
              <div className={divider} />
              <p className={sectionTitle} style={{ color: "#ff6b00" }}>Sobre você</p>
            </div>

            <div className="md:col-span-12">
              <label className={labelBase}>Descrição</label>
              <textarea
                value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={4}
                className={`${inputNormal} resize-y`}
                placeholder="Descreva suas experiências, especialidades e um pouco sobre você..."
              />
            </div>

          </div>

          <div className={divider} />

          <button
            type="submit" disabled={loading}
            className="w-full text-white font-bold py-3.5 rounded-xl transition-all active:scale-95 disabled:opacity-40"
            style={{ background: loading ? "#cc5500" : "#ff6b00" }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#e55e00"; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#ff6b00"; }}
          >
            {loading ? "Cadastrando..." : "Finalizar Cadastro"}
          </button>
        </form>
      </div>
    </div>
  );
}