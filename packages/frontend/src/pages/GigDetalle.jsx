import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";

import { api } from "../services/api";

function GigDetalle() {

    const { gigId } = useParams();

    const navigate = useNavigate();

    const [gig, setGig] = useState(null);

    const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(null);

    const [requerimientos, setRequerimientos] = useState("");

    useEffect(() => {

        cargarGig();

    }, []);

    async function cargarGig() {

        try {

            const data = await api.getGig(gigId);

            setGig(data);

            if (data.paquetes.length > 0) {

                setPaqueteSeleccionado(data.paquetes[0]);

            }

        } catch (error) {

            console.error(error);

        }

    }

    async function contratar() {

        if (!paqueteSeleccionado) {

            return;

        }

        try {

            await api.crearPedido({

                clienteId: localStorage.getItem("usuarioId"),

                gigId: gig.id,

                paqueteId: paqueteSeleccionado.id,

                requerimientos

            });

            navigate("/mis-pedidos");

        } catch (error) {

            alert(error.message);

        }

    }

    if (!gig) {

        return (

            <div className="loading">

                Cargando servicio...

            </div>

        );

    }

    return (

        <>

            <Header

                titulo={gig.nombre}

                subtitulo={`${gig.vendedor.nombre} ${gig.vendedor.apellido}`}

            />

            <section className="detail-section">

                <h2>

                    Descripción

                </h2>

                <p>

                    {gig.descripcion}

                </p>

            </section>

            <section className="detail-section">

                <h2>

                    Elegí un paquete

                </h2>

                {

                    gig.paquetes.map(paquete => (

                        <button

                            key={paquete.id}

                            className={

                                paqueteSeleccionado?.id === paquete.id

                                    ? "package-card selected"

                                    : "package-card"

                            }

                            onClick={() =>

                                setPaqueteSeleccionado(paquete)

                            }

                        >

                            <div className="space-between">

                                <h3>

                                    {paquete.nombre}

                                </h3>

                                <strong>

                                    ${paquete.precio.toLocaleString("es-AR")}

                                </strong>

                            </div>

                            <p>

                                {paquete.descripcion}

                            </p>

                            <small>

                                Entrega en {paquete.diasEntrega} días

                            </small>

                        </button>

                    ))

                }

            </section>

            <section className="detail-section">

                <h2>

                    Requerimientos

                </h2>

                <textarea

                    className="requirements"

                    rows={6}

                    placeholder="Contale al vendedor todo lo necesario para comenzar el trabajo..."

                    value={requerimientos}

                    onChange={(e) =>

                        setRequerimientos(e.target.value)

                    }

                />

            </section>

            <div className="detail-footer">

                <Button

                    onClick={contratar}

                >

                    Contratar Servicio

                </Button>

            </div>

        </>

    );

}

export default GigDetalle;