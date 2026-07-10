import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function GigCard({ gig }) {

    const navigate = useNavigate();

    const precioMinimo =
        gig.paquetes?.length > 0
            ? Math.min(...gig.paquetes.map(paquete => paquete.precio))
            : 0;

    const puntuacion = gig.puntuacionPromedio ?? 0;

    const cantidadOpiniones = gig.cantidadOpiniones ?? 0;

    return (

        <article
            className="gig-card"
            onClick={() => navigate(`/gigs/${gig.id}`)}
        >

            <div className="gig-banner">

                <span className="gig-category">

                    {gig.categoria?.nombre}

                </span>

            </div>

            <div className="gig-body">

                <h3>

                    {gig.nombre}

                </h3>

                <p className="gig-seller">

                    {gig.vendedor?.nombre} {gig.vendedor?.apellido}

                </p>

                <div className="gig-rating">

                    <Star
                        size={16}
                        fill="currentColor"
                    />

                    {cantidadOpiniones > 0 ? (
                            <span>
                                {puntuacion.toFixed(1)} ({cantidadOpiniones})
                            </span>
                        ) : (
                            <span>Sin calificaciones</span>)
                    }
                </div>

                <div className="gig-footer">

                    <div>

                        <small>

                            Desde

                        </small>

                        <strong>

                            ${precioMinimo.toLocaleString("es-AR")}

                        </strong>

                    </div>

                    <ArrowRight size={20} />

                </div>

            </div>

        </article>

    );

}

export default GigCard;