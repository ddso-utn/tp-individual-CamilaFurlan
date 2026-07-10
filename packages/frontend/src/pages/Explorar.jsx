import { useEffect, useState } from "react";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoryChips from "../components/CategoryChips";
import OrderSelector from "../components/OrderSelector";
import GigCard from "../components/GigCard";

import { api } from "../services/api";

function Explorar() {

    const [gigs, setGigs] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [texto, setTexto] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [ordenarPor, setOrdenarPor] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        cargarCategorias();

    }, []);

    useEffect(() => {

        cargarGigs();

    }, [texto, categoriaId, ordenarPor]);

    async function cargarCategorias() {

        try {

            const data = await api.getCategorias();

            setCategorias(data);

        } catch (error) {

            console.error(error);

        }

    }

    async function cargarGigs() {

        try {

            setLoading(true);

            const data = await api.getGigs({

                texto,
                categoriaId,
                ordenarPor

            });

            setGigs(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    return (

        <>

            <Header

                titulo="AI Do It"

                subtitulo="Encontrá el profesional ideal para tu próximo proyecto."

            />

            <SearchBar

                value={texto}

                onChange={setTexto}

                placeholder="Buscar servicios..."

            />

            <CategoryChips

                categorias={categorias}

                categoriaSeleccionada={categoriaId}

                onSeleccionar={setCategoriaId}

            />

            <OrderSelector

                value={ordenarPor}

                onChange={setOrdenarPor}

            />

            {

                loading && (

                    <div className="loading">

                        Cargando servicios...

                    </div>

                )

            }

            {

                !loading && gigs.length === 0 && (

                    <div className="empty-state">

                        No encontramos servicios.

                    </div>

                )

            }

            {

                !loading &&

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

export default Explorar;