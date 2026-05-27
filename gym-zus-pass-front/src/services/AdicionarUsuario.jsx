import { useState } from "react";
import { db } from "./firebase"; // Certifique-se de que o caminho está correto para o seu arquivo de configuração
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router"; // Importar useRouter

export function cadastroAluno() {
  // 1. Criando um estado para cada campo da sua imagem
  const router = useRouter(); // Inicializar o useRouter
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [complemento, setComplemento] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [numero, setNumero] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      // 2. Enviando os campos integrados exatamente como estão no seu banco
      await addDoc(collection(db, "usuarios"), {
        bairro: bairro,
        cep: Number(cep), // Converte para número antes de salvar
        cidade: cidade,
        complemento: complemento,
        // Converte a string de data do input HTML para o formato Timestamp do Firebase
        dataDeNascimento: dataNascimento ? Timestamp.fromDate(new Date(dataNascimento)) : null,
        email: email,
        endereço: endereco, // Note que na sua imagem está escrito com 'ç' (endereço)
        nome_completo: nomeCompleto, // Na imagem está com underline
        numero: Number(numero), // Converte para número antes de salvar
        senha: senha
      });

      alert("Usuário cadastrado com sucesso!");
      
      // Limpa o formulário após o sucesso
      limparCampos();

      // Redireciona para a página de login
      router.push("/login");

    } catch (error) {
      console.error("Erro ao salvar no Firestore: ", error);
      alert("Erro ao cadastrar usuário.");
    }
  };

  const limparCampos = () => {
    setBairro(""); setCep(""); setCidade(""); setComplemento("");
    setDataNascimento(""); setEmail(""); setEndereco(""); setNomeCompleto("");
    setNumero(""); setSenha("");
  };

  return (
    <form onSubmit={handleCadastro} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", padding: "20px" }}>
      <h3>Formulário de Cadastro</h3>
      
      <input type="text" placeholder="Nome Completo" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} />
      <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
      
      <label>Data de Nascimento:</label>
      <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
      
      <input type="text" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
      <input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
      <input type="number" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} />
      <input type="text" placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
      <input type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
      <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />

      <button type="submit" style={{ padding: "10px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
        Cadastrar
      </button>
    </form>
  );
}