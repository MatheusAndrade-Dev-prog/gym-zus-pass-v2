import Topo from '@/components/Topo';
import Aluno from '@/components/Aluno';

export default function CadastroAlunoPage() {
  return (
    <main>
      <Topo />
      <div className="mt-5">
        <h1 className="text-center text-2xl font-bold mb-4">Cadastro de Aluno</h1>
        <Aluno />
      </div>
    </main>
  );
}
