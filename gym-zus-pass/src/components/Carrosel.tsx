import { Trainer } from '@/components/index';

interface CarroselProps {
  trainers: Trainer[];
}

// Agrupa os instrutores em arrays de 3 para cada slide
const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunkedArr: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

export default function Carrosel({ trainers }: CarroselProps) {
  const trainerChunks = chunkArray(trainers, 3);
  const carouselId = "personalTrainerCarousel";

  return (
    <div id={carouselId} className="carousel slide" data-bs-ride="carousel" data-bs-wrap="true">
      <div className="carousel-indicators">
        {trainerChunks.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {trainerChunks.map((chunk, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <div className="row justify-content-center g-4">
              {chunk.map((trainer) => (
                <div key={trainer.id} className="col-md-4">
                  <div className="card h-100 text-center">
                    <img
                      src={trainer.imagemUrl}
                      className="rounded-circle mx-auto mt-3"
                      alt={`Foto de ${trainer.nome}`}
                      style={{
                        width: '150px',
                        height: '150px',
                        objectFit: 'cover',
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{trainer.nome}</h5>
                      <p className="card-text">{trainer.localizacao}</p>
                      <a href="#" className="btn btn-warning mt-auto">
                        Mais informações
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Próximo</span>
      </button>
    </div>
  );
}