import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";

import { api } from "../services/api";

function SeleccionUsuario() {

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([]);

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    useEffect(() => {

        cargarUsuarios();

    }, []);

    async function cargarUsuarios() {

        try {

            const data = await api.getUsuarios();

            setUsuarios(data);

        } catch (error) {

            console.error(error);

        }

    }

    function ingresar() {

        if (!usuarioSeleccionado) {

            return;

        }

        localStorage.setItem(
            "usuarioId",
            usuarioSeleccionado.id
        );

        navigate("/explorar");

    }

    return (

        <>

            <Header

                titulo="AI Do It"

                subtitulo="Seleccioná un usuario para continuar."

            />

            <div className="user-list">

                {

                    usuarios.map(usuario => (

                        <button

                            key={usuario.id}

                            className={
                                usuarioSeleccionado?.id === usuario.id
                                    ? "user-card selected"
                                    : "user-card"
                            }

                            onClick={() =>
                                setUsuarioSeleccionado(usuario)
                            }

                        >

                            <h3>

                                {usuario.nombre} {usuario.apellido}

                            </h3>

                            <p>

                                {usuario.email}

                            </p>

                        </button>

                    ))

                }

            </div>

            <div className="detail-footer">

                <Button

                    onClick={ingresar}

                    disabled={!usuarioSeleccionado}

                >

                    Ingresar

                </Button>

            </div>

        </>

    );

}

export default SeleccionUsuario;