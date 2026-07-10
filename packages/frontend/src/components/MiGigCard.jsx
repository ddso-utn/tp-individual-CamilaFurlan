import { Pencil, Trash2 } from "lucide-react";

import Button from "./Button";

function MiGigCard({
    gig,
    onEditar,
    onEliminar
}) {

    const precioMinimo =
        gig.paquetes.length > 0
            ? Math.min(
                ...gig.paquetes.map(
                    paquete => paquete.precio
                )
            )
            : 0;

    return (

        <article className="gig-card">

            <div className="gig-banner">

                <span className="gig-category">

                    {gig.categoria.nombre}

                </span>

            </div>

            <div className="gig-body">

                <h3>

                    {gig.nombre}

                </h3>

                <p className="gig-seller">

                    {gig.descripcion}

                </p>

                <div className="gig-footer">

                    <div>

                        <small>

                            Desde

                        </small>

                        <strong>

                            ${precioMinimo.toLocaleString("es-AR")}

                        </strong>

                    </div>

                </div>

                <div className="my-gig-actions">

                    <Button

                        variant="secondary"

                        fullWidth={false}

                        onClick={() => onEditar(gig)}

                    >

                        <Pencil size={18} />

                        Editar

                    </Button>

                    <Button

                        variant="danger"

                        fullWidth={false}

                        onClick={() => onEliminar(gig)}

                    >

                        <Trash2 size={18} />

                        Eliminar

                    </Button>

                </div>

            </div>

        </article>

    );

}

export default MiGigCard;