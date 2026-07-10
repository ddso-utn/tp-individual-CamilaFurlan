import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";

import { api } from "../services/api";

function NuevoGig() {
    
    const navigate = useNavigate();
    const location = useLocation();
    const gig = location.state?.gig;
    const editando = !!gig;

    const usuarioId = localStorage.getItem("usuarioId");

    const [categorias, setCategorias] = useState([]);

    const [nombre, setNombre] = useState(gig?.nombre || "");
    const [descripcion, setDescripcion] = useState(gig?.descripcion || "");
    const [categoriaId, setCategoriaId] = useState(gig?.categoria?.id || "");

    const [paquetes, setPaquetes] = useState(
        gig?.paquetes || [
            {
                nombre: "",
                descripcion: "",
                precio: "",
                diasEntrega: ""
            }
        ]
    );

    useEffect(() => {

        cargarCategorias();

    }, []);

    async function cargarCategorias() {

        try {

            const data = await api.getCategorias();

            setCategorias(data);

        } catch (error) {

            console.error(error);

        }

    }

    function agregarPaquete() {

        setPaquetes([
            ...paquetes,
            {
                nombre: "",
                descripcion: "",
                precio: "",
                diasEntrega: ""
            }
        ]);

    }

    function actualizarPaquete(index, campo, valor) {

        const nuevos = [...paquetes];

        nuevos[index][campo] = valor;

        setPaquetes(nuevos);

    }

    async function guardar() {

        const payload = {

            vendedorId: localStorage.getItem("usuarioId"),

            categoriaId,

            nombre,

            descripcion,

            paquetes

        };

        try {

            if (editando) {

                await api.actualizarGig(

                    gig.id,

                    payload

                );

            } else {

                await api.crearGig(payload);

            }

            navigate("/mis-gigs");

        } catch (error) {

            alert(error.message);

        }

    }

    return (

        <>

            <Header

                titulo={editando ? "Editar Gig" : "Nuevo Gig"}

                subtitulo={
                    editando
                        ? "Actualizá la información de tu servicio."
                        : "Publicá un nuevo servicio."
                }

            />

            <section className="form-section">

                <label>

                    Nombre

                </label>

                <input

                    value={nombre}

                    onChange={(e) =>

                        setNombre(e.target.value)

                    }

                />

                <label>

                    Descripción

                </label>

                <textarea

                    rows={4}

                    value={descripcion}

                    onChange={(e) =>

                        setDescripcion(e.target.value)

                    }

                />

                <label>

                    Categoría

                </label>

                <select

                    value={categoriaId}

                    onChange={(e) =>

                        setCategoriaId(e.target.value)

                    }

                >

                    <option value="">

                        Seleccionar...

                    </option>

                    {

                        categorias.map(categoria => (

                            <option

                                key={categoria.id}

                                value={categoria.id}

                            >

                                {categoria.nombre}

                            </option>

                        ))

                    }

                </select>

            </section>

            <section className="form-section">

                <h2>

                    Paquetes

                </h2>

                {

                    paquetes.map((paquete, index) => (

                        <div

                            key={index}

                            className="package-form"

                        >

                            <input

                                placeholder="Nombre"

                                value={paquete.nombre}

                                onChange={(e) =>

                                    actualizarPaquete(

                                        index,

                                        "nombre",

                                        e.target.value

                                    )

                                }

                            />

                            <textarea

                                rows={3}

                                placeholder="Descripción"

                                value={paquete.descripcion}

                                onChange={(e) =>

                                    actualizarPaquete(

                                        index,

                                        "descripcion",

                                        e.target.value

                                    )

                                }

                            />

                            <input

                                type="number"

                                placeholder="Precio"

                                value={paquete.precio}

                                onChange={(e) =>

                                    actualizarPaquete(

                                        index,

                                        "precio",

                                        e.target.value

                                    )

                                }

                            />

                            <input

                                type="number"

                                placeholder="Días de entrega"

                                value={paquete.diasEntrega}

                                onChange={(e) =>

                                    actualizarPaquete(

                                        index,

                                        "diasEntrega",

                                        e.target.value

                                    )

                                }

                            />

                        </div>

                    ))

                }

                <Button

                    variant="secondary"

                    onClick={agregarPaquete}

                >

                    Agregar paquete

                </Button>

            </section>

            <div className="detail-footer">

                <Button onClick={guardar}>
                    {
                        editando
                            ? "Guardar Cambios"
                            : "Publicar Gig"
                    }
                </Button>

            </div>

        </>

    );

}

export default NuevoGig;