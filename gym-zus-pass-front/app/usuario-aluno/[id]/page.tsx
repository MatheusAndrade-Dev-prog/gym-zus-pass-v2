
import Topo from "@/components/Topo";
import UsuarioAluno from "@/components/UsuarioAluno";

export default async function UsuarioAlunoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main>
      <Topo />
      <div className="mt-5">
        <h1 className="text-center text-2xl font-bold mb-4">Perfil do Aluno</h1>
        <UsuarioAluno id={id} />
      </div>
    </main>
  );
}