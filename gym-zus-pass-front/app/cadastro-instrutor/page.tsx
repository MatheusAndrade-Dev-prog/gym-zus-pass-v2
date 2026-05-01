import Topo from '@/components/Topo';
import Instrutor from '@/components/Instrutor';

export default function CadastroInstrutorPage() {
  return (
    <main>
      <Topo />
      <div className="mt-5">
        <h1 className="text-center text-2xl font-bold mb-4">Cadastro de Professor</h1>
        <Instrutor />
      </div>
    </main>
  );
}
