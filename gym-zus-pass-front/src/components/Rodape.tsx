export default function Rodape() {
  return (
       <footer className="border-t border-border/50 mt-24">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8  text-white">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
             
            </div>
            <span className="font-display text-xl font-bold">GymZus <span className="text-primary">Pass</span></span>
          </div>
          <p className="text-muted-foreground text-sm max-w-md">
            Conectando você ao personal trainer ideal para começar sua jornada fitness com confiança e energia.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Plataforma</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Home</li><li>Explorar</li><li>Solicitação</li>
          </ul>
        </div>
        
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © 2026 GymZus Pass.. Todos os direitos reservados.
      </div>
    </footer>
  
    
  );
}
{/* <span className="font-display text-xl tracking-wider">©GymZus Pass.
      </div>
      <p className="text-sm text-muted-foreground max-w-xs"> Todos os direitos reservados.</p>
      </div>*/}

