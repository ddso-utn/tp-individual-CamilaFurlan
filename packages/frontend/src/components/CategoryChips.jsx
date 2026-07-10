function CategoryChips({
    categorias,
    categoriaSeleccionada,
    onSeleccionar
}) {

    return (

        <section className="category-chips">

            <button
                className={
                    categoriaSeleccionada === ""
                        ? "chip active"
                        : "chip"
                }
                onClick={() => onSeleccionar("")}
            >
                Todos
            </button>

            {
                categorias.map(categoria => (

                    <button
                        key={categoria.id}
                        className={
                            categoria.id === categoriaSeleccionada
                                ? "chip active"
                                : "chip"
                        }
                        onClick={() => onSeleccionar(categoria.id)}
                    >
                        {categoria.nombre}
                    </button>

                ))
            }

        </section>

    );

}

export default CategoryChips;