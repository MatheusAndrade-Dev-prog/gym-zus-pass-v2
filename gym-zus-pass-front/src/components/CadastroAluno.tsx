"use client";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CadastroAluno() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  
  // Campos de Endereço
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState(""); // ✅ Adicionado estado para a UF (Ex: SP, RJ)
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ FUNÇÃO MÁGICA: Busca o CEP automaticamente
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove tudo que não for número (ex: traços)
    const cepDigitado = e.target.value.replace(/\D/g, "");
    setCep(cepDigitado);

    // Quando o CEP tiver exatamente 8 dígitos, faz a busca na API ViaCEP
    if (cepDigitado.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`);
        const data = await response.json();

        // Se a API retornar erro (CEP inexistente)
        if (data.erro) {
          alert("CEP não encontrado!");
          return;
        }

        // ✅ Preenche os campos automaticamente com os dados da API
        setEndereco(data.logradouro || "");
        setBairro(data.bairro || "");
        setCidade(data.localidade || "");
        setEstado(data.uf || "");

        // Pula o cursor automaticamente para o campo "Número"
        document.getElementById("campo-numero")?.focus();

      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        alert("Erro na busca do CEP. Verifique sua conexão.");
      }
    }
  };

  // ✅ Recebe o evento do form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "cadastroAluno"), {
        nome_completo: nomeCompleto,
        email: email,
        senha: senha,
        dataDeNascimento: dataNascimento
          ? Timestamp.fromDate(new Date(dataNascimento))
          : null,
        cep: cep,
        endereço: endereco,
        numero: String(numero),
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado, // ✅ Salvando o estado (UF) no banco de dados
      });

      alert("Aluno cadastrado com sucesso!");

      // Limpa os campos após salvar
      setNomeCompleto(""); setEmail(""); setSenha(""); setDataNascimento("");
      setCep(""); setEndereco(""); setNumero(""); setComplemento("");
      setBairro(""); setCidade(""); setEstado("");

      router.push(`/usuario-aluno/${docRef.id}`);

    } catch (error) {
      console.error("Erro ao integrar com o Firestore:", error);
      alert("Houve um erro na integração com o banco de dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 p-4 min-h-screen items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Cadastro de Aluno</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            <div className="md:col-span-12">
              <label className="block text-gray-700 font-medium mb-1">Nome Completo</label>
              <input
                type="text"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu nome completo"
                required
              />
            </div>

            <div className="md:col-span-6">
              <label className="block text-gray-700 font-medium mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@exemplo.com"
                required
              />
            </div>

            <div className="md:col-span-6">
              <label className="block text-gray-700 font-medium mb-1">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Crie uma senha"
                required
              />
            </div>

            <div className="md:col-span-4">
              <label className="block text-gray-700 font-medium mb-1">Data de Nascimento</label>
              <input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* ✅ CAMPO DE CEP (Ativa a API ViaCEP) */}
            <div className="md:col-span-4">
              <label className="block text-gray-700 font-medium mb-1 text-blue-600">CEP</label>
              <input
                type="text"
                maxLength={9}
                value={cep}
                onChange={handleCepChange} // ✅ Chama a função mágica a cada número digitado
                className="w-full border-2 border-blue-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Apenas números"
                required
              />
            </div>

            <div className="md:col-span-4">
              <label className="block text-gray-700 font-medium mb-1">Endereço (Rua/Av)</label>
              <input
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Rua..."
                required
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-gray-700 font-medium mb-1">Número</label>
              <input
                id="campo-numero" // ✅ ID usado para focar aqui automaticamente
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nº"
                required
              />
            </div>

            <div className="md:col-span-9">
              <label className="block text-gray-700 font-medium mb-1">
                Complemento <span className="text-gray-400 text-sm">(Opcional)</span>
              </label>
              <input
                type="text"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Apartamento, bloco, fundos..."
              />
            </div>

            <div className="md:col-span-5">
              <label className="block text-gray-700 font-medium mb-1">Bairro</label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                required
              />
            </div>

            <div className="md:col-span-5">
              <label className="block text-gray-700 font-medium mb-1">Cidade</label>
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                required
              />
            </div>

            {/* ✅ CAMPO ESTADO (UF) */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">UF</label>
              <input
                type="text"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="SP, RJ..."
                required
              />
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors shadow-lg disabled:opacity-50"
          >
            {loading ? "Salvando no banco..." : "Finalizar Cadastro"}
          </button>
        </form>
      </div>
    </div>
  );
}