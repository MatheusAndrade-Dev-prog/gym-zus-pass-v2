import Topo from "@/components/Topo";
import UsuarioInstrutor from "@/components/UsuarioIntrustor";

export default function UsuarioInstrutorPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <Topo />
      <div className="mt-5">
        <h1 className="text-center text-2xl font-bold mb-4">Painel do Instrutor</h1>
        <UsuarioInstrutor id={params.id} />
      </div>
    </main>
  );
}