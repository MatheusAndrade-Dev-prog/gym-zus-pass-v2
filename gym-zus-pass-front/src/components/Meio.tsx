export default function Meio() {
  return (
    <div className="h-50 flex flex-col items-left  meio">
      <h1 className="text-5xl text-left font-bold conteudo-meio">Transforme e evolua seu corpo com o GymZus Pass, uma
         plataforma inovadora de aulas particulares!</h1>
         <div className = "flex flex-col items-left conteudo-meio">
          <p className="text-left conteudo-meio">Intermediação precisa entre aluno e professor</p>
          </div>
      <div className="h-12 flex items-center pesquisa-meio">
        <form className="max-w-lg mx-8 flex flex-row items-center gap-2" role="search">
          <input type="search" className="form-control form-control-dark text-bg-Light bg-white rounded-lg" placeholder="Search..." aria-label="Search"/>
          <button className="" type="submit">Search</button>
        </form>

      </div>
    </div>
  );
}

/**/