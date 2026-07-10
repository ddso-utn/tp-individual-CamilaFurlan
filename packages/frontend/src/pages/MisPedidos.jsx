import { useEffect, useState } from "react";

import Header from "../components/Header";
import PedidoCard from "../components/PedidoCard";
import Chat from "../components/Chat";

import { api } from "../services/api";

function MisPedidos() {

    const usuarioId = localStorage.getItem("usuarioId");

    const [pedidos, setPedidos] = useState([]);

    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

    useEffect(() => {

        cargarPedidos();

    }, []);

    async function cargarPedidos() {

        try {

            const data = await api.getPedidosCliente(usuarioId);

            setPedidos(data);

        } catch (error) {

            console.error(error);

        }

    }

    async function cancelarPedido(pedido) {

        try {

            await api.cancelarPedido(

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
    async function calificar(pedido) {

        const puntaje = Number(
            prompt("Puntaje (1 a 5)")

        );
        const comentario = prompt("Comentario");
        if (!puntaje || !comentario) {
            return;

        }

        try {

            await api.calificarPedido(
                pedido.id,
                {
                    usuarioId,
                    detalle: comentario,
                    puntuacion: puntaje
                }
            );

            cargarPedidos();

        } catch (error) {

            alert(error.message);

        }

    }

    return (

        <>

            <Header

                titulo="Mis Pedidos"

                subtitulo="Seguí el estado de tus contrataciones."

            />

            {

                pedidos.length === 0 && (

                    <div className="empty-state">

                        Todavía no realizaste ningún pedido.

                    </div>

                )

            }

            {

                pedidos.map(pedido => (

                    <PedidoCard

                        key={pedido.id}

                        pedido={pedido}

                        tipo="cliente"

                        onAbrirChat={setPedidoSeleccionado}

                    >

                        {

                            pedido.estado === "PENDIENTE" && (

                                <button

                                    className="text-button danger"

                                    onClick={() =>

                                        cancelarPedido(pedido)

                                    }

                                >

                                    Cancelar

                                </button>

                            )

                        }

                        {

                            pedido.estado === "ENTREGADO"

                            &&

                            !pedido.estaCalificado

                            && (

                                <button

                                    className="text-button"

                                    onClick={() =>

                                        calificar(pedido)

                                    }

                                >

                                    Calificar

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

                                mensajes={

                                    pedidoSeleccionado.mensajes

                                }

                                onEnviar={

                                    enviarMensaje

                                }

                            />

                        </div>

                    </div>

                )

            }

        </>

    );

}

export default MisPedidos;