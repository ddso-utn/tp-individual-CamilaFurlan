import { useState } from "react";
import Button from "./Button";

function Chat({
    mensajes,
    usuarioId,
    onEnviar
}) {

    const [texto, setTexto] = useState("");

    function enviar() {

        if (!texto.trim()) {
            return;
        }

        onEnviar(texto);

        setTexto("");

    }

    return (

        <div className="chat-container">

            <div className="chat-messages">

                {

                    mensajes.length === 0 && (

                        <div className="chat-empty">

                            Todavía no hay mensajes.

                        </div>

                    )

                }

                {
                    mensajes.map(mensaje => (

                        <div
                            key={mensaje.id}
                            className={
                                mensaje.autor.id === usuarioId
                                    ? "chat-bubble own"
                                    : "chat-bubble"
                            }
                        >

                            <span className="chat-author">

                                {mensaje.autor.nombre} {mensaje.autor.apellido}

                            </span>

                            <p>

                                {mensaje.mensaje}

                            </p>

                            <small>

                                {
                                    new Date(mensaje.fecha)
                                        .toLocaleString("es-AR")
                                }

                            </small>

                        </div>

                    ))
                }

            </div>

            <div className="chat-input">

                <input
                    type="text"
                    placeholder="Escribí un mensaje..."
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />

                <Button
                    fullWidth={false}
                    onClick={enviar}
                >
                    Enviar
                </Button>

            </div>

        </div>

    );

}

export default Chat;