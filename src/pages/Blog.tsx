import { ENTRADAS } from "../data/Blog";

function Blog() {
  return (
    <>
      <h1 className="h2 my-4">Blog</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {ENTRADAS.map((e) => (
          <div className="col" key={e.id}>
            <article className="card h-100">
              <div className="card-body">
                <h2 className="h5 card-title">{e.titulo}</h2>
                <p className="text-body-secondary small">{e.fecha}</p>
                <p className="card-text">{e.resumen}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
  );
}

export default Blog;
