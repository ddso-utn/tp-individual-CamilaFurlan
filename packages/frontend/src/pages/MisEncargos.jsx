import { useEffect, useState } from "react";

import Header from "../components/Header";
import PedidoCard from "../components/PedidoCard";
import Chat from "../components/Chat";

import { api } from "../services/api";

function MisEncargos() {

    const usuarioId = localStorage.getItem("usuarioId");

    const [pedidos, setPedidos] = useState([]);

    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

    useEffect(() => {

        cargarPedidos();

    }, []);

    async function cargarPedidos() {

        try {

            const data = await api.getPedidosVendedor(usuarioId);

            setPedidos(data);

        } catch (error) {

            console.error(error);

        }

    }
    async function cancelarPedido(pedido){

        try{

            await api.cancelarPedido(
                pedido.id,
                usuarioId
            );

            cargarPedidos();

        }catch(error){

            alert(error.message);

        }

    }

    async function confirmarPedido(pedido) {

        try {
            await api.confirmarPedido(
                pedido.id,
                usuarioId
            );
            cargarPedidos();
        } catch (error) {
            alert(error.message);
        }

    }

    async function pasarRevision(pedido) {

        try {
            await api.pasarRevision(
                pedido.id,
                usuarioId
            );
            cargarPedidos();
        } catch (error) {
            alert(error.message);

        }

    }

    async function entregarPedido(pedido) {

        try {
            await api.entregarPedido(
                pedido.id,
                usuarioId
            );
            cargarPedidos();
        } catch (error) {
            alert(error.message);

        }

    }

    async function enviarMensaje(texto) {

        try {
            const pedidoActualizado = await api.enviarMensaje(
                pedidoSeleccionado.id,
                {
                    usuarioId,
                    mensaje: texto
                }
            );

            setPedidos(pedidos =>
                pedidos.map(p =>
                    p.id === pedidoActualizado.id
                        ? pedidoActualizado
                        : p
                )
            );

            setPedidoSeleccionado(pedidoActualizado);

        } catch (error) {

            alert(error.message);

        }

    }

    return (

        <>

            <Header
                titulo="Mis Encargos"
                subtitulo="Administrá los trabajos de tus clientes."
            />

            {
                pedidos.length === 0 && (
                    <div className="empty-state">
                        No tenés encargos activos.
                    </div>

                )

            }

            {

                pedidos.map(pedido => (

                    <PedidoCard
                        key={pedido.id}
                        pedido={pedido}
                        tipo="vendedor"
                        onAbrirChat={setPedidoSeleccionado}
                    >

                        {
                            pedido.estado === "PENDIENTE" && (
                                <>
                                    <button
                                        className="text-button"
                                        onClick={() => confirmarPedido(pedido)}
                                    >
                                        Confirmar pedido
                                    </button>

                                    <button
                                        className="text-button danger"
                                        onClick={() => cancelarPedido(pedido)}
                                    >
                                        Rechazar pedido
                                    </button>
                                </>
                            )
                        }

                        {
                            pedido.estado === "CONFIRMADO" && (
                                <button
                                    className="text-button"
                                    onClick={() => pasarRevision(pedido)}
                                >
                                    Marcar en revisión
                                </button>
                            )
                        }

                        {
                            pedido.estado === "EN_REVISION" && (
                                <button
                                    className="text-button"
                                    onClick={() => entregarPedido(pedido)}
                                >
                                    Marcar como entregado
                                </button>
                            )
                        }
                    </PedidoCard>
                ))
            }
            {
                pedidoSeleccionado && (
                    <div className="modal-backdrop">
                        <div className="chat-modal">
                            <div className="modal-header">
                                <h2>
                                    Chat
                                </h2>

                                <button
                                    onClick={() =>
                                        setPedidoSeleccionado(null)
                                    }
                                >
                                    ✕
                                </button>

                            </div>

                            <Chat
                                usuarioId={usuarioId}
                                mensajes={pedidoSeleccionado.mensajes}
                                onEnviar={enviarMensaje}
                            />

                        </div>

                    </div>

                )

            }

        </>

    );

}

export default MisEncargos;