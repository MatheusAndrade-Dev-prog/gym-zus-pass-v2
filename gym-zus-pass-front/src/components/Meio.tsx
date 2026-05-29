export default function Meio() {
  return (
    <section className="relative w-full pt-24 pb-32 overflow-hidden bg-hero">
    <div className="h-full flex flex-col items-left  meio">
      <div className="relative w-full h-screen bg-gray-950 flex items-center">
      
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      {/* texto esquerda */}
      <div className="relative z-10 flex-1 pl-16">
        <h1 className="font-display text-red-700  text-6xl sm:text-7xl lg:text-8xl leading-[0.9] uppercase">
        Transforme e evolua seu corpo com o GymZus Pass, uma plataforma inovadora de aulas particulares!
      </h1>
        <p className="text-gray-400 mt-4">Intermediação precisa entre aluno e professor</p>
      </div>

      {/* imagem direita */}
      <div className="relative z-10 flex-1 flex justify-end pr-16">
        <img
          src="./src/image/hero-athlete.jpg"
          alt="descrição"
          className="w-80 h-80 object-cover rounded-xl"
        />
      </div>

    </div>
       <div className="relative max-w-7x mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 
        rounded-full border border-border bg-card/50 text-xs font-medium text-muted-foreground">
      
      <div className="h-12 flex items-center pesquisa-meio">
        <form className="max-w-lg mx-8 flex flex-row items-center gap-2" role="search">
          <input type="search" className="form-control form-control-dark text-bg-Light bg-white rounded-lg" placeholder="Search..." aria-label="Search"/>
          <button className="" type="submit">Search</button>
        </form>
        </div>
        </div>
      </div>
      </div>
    </div>
    </section>
  );
}

/**/