import Topo from "@/components/Topo";
import UsuarioInstrutor from "@/components/components/UsuarioIntrustor"; // Ajuste o caminho conforme a localização real

export default function UsuarioInstrutorPage() {
  return (
    <main>
      <Topo />
      <div className="mt-5">
        <h1 className="text-center text-2xl font-bold mb-4">Painel do Instrutor</h1>
        <UsuarioInstrutor />
      </div>
    </main>
  );
}