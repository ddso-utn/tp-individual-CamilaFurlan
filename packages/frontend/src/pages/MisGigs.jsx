import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import MiGigCard from "../components/MiGigCard";

import { api } from "../services/api";

function MisGigs() {

    const navigate = useNavigate();

    const usuarioId = localStorage.getItem("usuarioId");
    

    const [gigs, setGigs] = useState([]);

    useEffect(() => {

        cargarGigs();

    }, []);

    async function cargarGigs() {

        try {

            const data = await api.getMisGigs(usuarioId);

            setGigs(data);

        } catch (error) {

            console.error(error);

        }

    }

    async function eliminarGig(gig) {

        if (!confirm(`¿Eliminar "${gig.nombre}"?`)) {

            return;

        }

        try {

            await api.eliminarGig(gig.id);

            cargarGigs();

        } catch (error) {

            alert(error.message);

        }

    }

    function editarGig(gig) {

        navigate("/nuevo-gig", {

            state: {

                gig

            }

        });

    }

    return (

        <>

            <Header

                titulo="Mis Gigs"

                subtitulo="Administrá los servicios que ofrecés."

            />

            <div className="page-actions">

                <Button

                    fullWidth={false}

                    onClick={() => navigate("/nuevo-gig")}

                >

                    Nuevo Gig

                </Button>

            </div>

            {

                gigs.length === 0 && (

                    <div className="empty-state">

                        Todavía no publicaste ningún Gig.

                    </div>

                )

            }

            {

                gigs.map(gig => (

                    <MiGigCard

                        key={gig.id}

                        gig={gig}

                        onEditar={editarGig}

                        onEliminar={eliminarGig}

                    />

                ))

            }

        </>

    );

}

export default MisGigs;