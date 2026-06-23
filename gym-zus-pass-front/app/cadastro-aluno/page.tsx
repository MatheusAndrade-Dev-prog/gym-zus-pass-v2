import Topo from '@/components/Topo';
import CadastroAluno from '@/components/CadastroAluno';
import Rodape from '@/components/Rodape';

export default function CadastroAlunoPage() {
  return (
    <main>
      <Topo />
      <div className="mt-5 ">
        <h1 className="text-center text-2xl font-bold mb-4 text-white">Cadastro de Aluno</h1>
        <CadastroAluno />
         <Rodape />
      </div>
    </main>
  );
}
