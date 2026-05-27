"use client";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

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
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "cadastroInstrutor"), {
        nome_completo: nomeCompleto,
        email: email,
        senha: senha,
        dataDeNascimento: dataNascimento
          ? Timestamp.fromDate(new Date(dataNascimento))
          : null,
        cpf: cpf.replace(/\D/g, ""),
        cref: cref,
        cep: cep.replace(/\D/g, ""),
        endereço: endereco,
        numero: String(numero),
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        descricao: descricao,
      });

      alert("Instrutor cadastrado com sucesso!");

      setNomeCompleto(""); setEmail(""); setSenha(""); setDataNascimento("");
      setCpf(""); setCref(""); setCep(""); setEndereco(""); setNumero("");
      setComplemento(""); setBairro(""); setCidade(""); setDescricao("");

      // ✅ Redireciona para o perfil do instrutor
      router.push(`/usuario-instrutor/${docRef.id}`);

    } catch (error) {
      console.error("Erro ao integrar com o Firestore:", error);
      alert("Houve um erro na integração com o banco de dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-1">
      <div className="bg-white p-8 rounded-lg shadow-md w-full lg:w-4/5 max-w-[1500px] mx-auto">

        {/* ✅ onSubmit no form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            <div className="md:col-span-12">
              <label className="block text-gray-700 font-medium mb-1">Nome Completo</label>
              <input type="text" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu nome completo" required />
            </div>

            <div className="md:col-span-6">
              <label className="block text-gray-700 font-medium mb-1">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@exemplo.com" required />
            </div>

            <div className="md:col-span-6">
              <label className="block text-gray-700 font-medium mb-1">Senha</label>
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Crie uma senha" required />
            </div>

            <div className="md:col-span-4">
              <label className="block text-gray-700 font-medium mb-1">Data de Nascimento</label>
              <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            </div>

            <div className="md:col-span-4">
              <label className="block text-gray-700 font-medium mb-1">CPF</label>
              <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="000.000.000-00" required />
            </div>

            <div className="md:col-span-4">
              <label className="block text-gray-700 font-medium mb-1">Numeração do CREF</label>
              <input type="text" value={cref} onChange={(e) => setCref(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="012345-G/SP" required />
            </div>

            <div className="md:col-span-4">
              <label className="block text-gray-700 font-medium mb-1">CEP</label>
              <input type="text" value={cep} onChange={(e) => setCep(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="00000-000" required />
            </div>

            <div className="md:col-span-5">
              <label className="block text-gray-700 font-medium mb-1">Endereço (Rua/Av)</label>
              <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Rua..." required />
            </div>

            <div className="md:col-span-3">
              <label className="block text-gray-700 font-medium mb-1">Número</label>
              <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nº" required />
            </div>

            <div className="md:col-span-12">
              <label className="block text-gray-700 font-medium mb-1">
                Complemento <span className="text-gray-400 text-sm">(Opcional)</span>
              </label>
              <input type="text" value={complemento} onChange={(e) => setComplemento(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Apartamento, bloco, fundos..." />
            </div>

            <div className="md:col-span-6">
              <label className="block text-gray-700 font-medium mb-1">Bairro</label>
              <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            </div>

            <div className="md:col-span-6">
              <label className="block text-gray-700 font-medium mb-1">Cidade</label>
              <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            </div>

            <div className="md:col-span-12 text-center">
              <label className="block text-gray-700 font-medium mb-1">Sobre mim</label>
              <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descreva suas experiências, especialidades e um pouco sobre você..." />
            </div>

          </div>

          <hr className="my-6 border-gray-200" />

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors shadow-lg disabled:opacity-50">
            {loading ? "Cadastrando..." : "Finalizar Cadastro"}
          </button>
        </form>
      </div>
    </div>
  );
}