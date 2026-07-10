import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import GigCard from "../components/GigCard";

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

                    <GigCard

                        key={gig.id}

                        gig={gig}

                    />

                ))

            }

        </>

    );

}

export default MisGigs;