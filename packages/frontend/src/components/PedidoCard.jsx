import { useNavigate } from "react-router-dom";

import Button from "./Button";
import StatusBadge from "./StatusBadge";

function PedidoCard({
    pedido,
    tipo,
    onAbrirChat,
    children
}) {

    const navigate = useNavigate();

    const nombrePersona =
        tipo === "cliente"
            ? `${pedido.gig.vendedor.nombre} ${pedido.gig.vendedor.apellido}`
            : `${pedido.cliente.nombre} ${pedido.cliente.apellido}`;

    return (

        <article className="pedido-card">

            <div className="pedido-card-header">
                <div>
                    <h3>
                        {pedido.gig.nombre}
                    </h3>
                    <p>
                        {nombrePersona}
                    </p>
                </div>

                <StatusBadge
                    estado={pedido.estado}
                />
            </div>

            <div className="pedido-card-body">
                <div className="pedido-info">
                    <span>
                        Paquete
                    </span>
                    <strong>
                        {pedido.paquete.nombre}
                    </strong>
                </div>

                <div className="pedido-info">
                    <span>
                        Precio
                    </span>
                    <strong>
                        ${pedido.total.toLocaleString("es-AR")}
                    </strong>
                </div>
                <div className="pedido-info">
                    <span>
                        Entrega
                    </span>
                    <strong>
                        {pedido.paquete.diasEntrega} días
                    </strong>
                </div>
            </div>

            <div className="pedido-card-actions">
                <Button
                    variant="secondary"
                    fullWidth={false}
                    onClick={() => navigate(`/gigs/${pedido.gig.id}`)}
                >
                    Ver Gig
                </Button>

                <Button
                    fullWidth={false}
                    onClick={() => onAbrirChat(pedido)}
                >
                    Chat
                </Button>

                {
                children && (
                    <div className="pedido-extra-actions">
                        {children}
                    </div>
                    )
                }
            </div>
        </article>

    );

}

export default PedidoCard;