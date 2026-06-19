import Topo from '@/components/Topo';
import CadastroInstrutor from '@/components/CadastroInstrutor';
import Rodape from '@/components/Rodape';

export default function CadastroInstrutorPage() {
  return (
    <main>
      <Topo />
      <div className="mt-5">
        <h1 className="text-center text-2xl font-bold mb-4 text-white">Cadastro do Profissional</h1>

        <CadastroInstrutor/>

       <Rodape/>
      </div>
    </main>
  );
}
