import Topo from "@/components/Topo";
import UsuarioAluno from "@/components/UsuarioAluno";

export default function UsuarioAlunoPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <Topo />
      <div className="mt-5">
        <h1 className="text-center text-2xl font-bold mb-4">Perfil do Aluno</h1>
        <UsuarioAluno id={params.id} />
      </div>
    </main>
  );
}