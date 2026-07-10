const API_URL = "http://localhost:3000/api";

async function request(path, options = {}) {

    const response = await fetch(`${API_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            data.error || "No se pudo completar la solicitud."
        );
    }

    return data;
}

export const api = {

    // ==========================
    // USUARIOS
    // ==========================

    getUsuarios: () =>
        request("/usuarios"),

    getUsuario: (usuarioId) =>
        request(`/usuarios/${usuarioId}`),

    crearUsuario: (payload) =>
        request("/usuarios", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    getFavoritos: (usuarioId) =>
        request(`/usuarios/${usuarioId}/favoritos`),

    agregarFavorito: (usuarioId, gigId) =>
        request(`/usuarios/${usuarioId}/favoritos/${gigId}`, {
            method: "POST"
        }),

    quitarFavorito: (usuarioId, gigId) =>
        request(`/usuarios/${usuarioId}/favoritos/${gigId}`, {
            method: "DELETE"
        }),

    // ==========================
    // CATEGORIAS
    // ==========================

    getCategorias: () =>
        request("/categorias"),

    crearCategoria: (payload) =>
        request("/categorias", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    // ==========================
    // GIGS
    // ==========================

    getGigs: (query = {}) => {

        const params = new URLSearchParams();

        Object.entries(query).forEach(([key, value]) => {

            if (
                value !== undefined &&
                value !== null &&
                value !== ""
            ) {
                params.set(key, value);
            }

        });

        const suffix = params.toString()
            ? `?${params.toString()}`
            : "";

        return request(`/gigs/busqueda${suffix}`);

    },

    getGig: (gigId) =>
        request(`/gigs/${gigId}`),

    getMisGigs: (vendedorId) =>
        request(`/gigs/vendedor/${vendedorId}`),

    getPaquetes: (gigId) =>
        request(`/gigs/${gigId}/paquetes`),

    crearGig: (payload) =>
        request("/gigs", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    // ==========================
    // PEDIDOS
    // ==========================

    getPedidosCliente: (clienteId) =>
        request(`/pedidos/cliente/${clienteId}`),

    getPedidosVendedor: (vendedorId) =>
        request(`/pedidos/vendedor/${vendedorId}`),

    getPedidosGig: (gigId) =>
        request(`/pedidos/gig/${gigId}`),

    crearPedido: (payload) =>
        request("/pedidos", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    cancelarPedido: (pedidoId, usuarioId) =>
        request(`/pedidos/${pedidoId}/cancelacion`, {
            method: "PATCH",
            body: JSON.stringify({
                usuarioId
            })
        }),

    confirmarPedido: (pedidoId, usuarioId) =>
        request(`/pedidos/${pedidoId}/confirmacion`, {
            method: "PATCH",
            body: JSON.stringify({
                usuarioId
            })
        }),

    pasarRevision: (pedidoId, usuarioId) =>
        request(`/pedidos/${pedidoId}/revision`, {
            method: "PATCH",
            body: JSON.stringify({
                usuarioId
            })
        }),

    entregarPedido: (pedidoId, usuarioId) =>
        request(`/pedidos/${pedidoId}/entrega`, {
            method: "PATCH",
            body: JSON.stringify({
                usuarioId
            })
        }),

    enviarMensaje: (pedidoId, payload) =>
        request(`/pedidos/${pedidoId}/mensajes`, {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    calificarPedido: (pedidoId, payload) =>
        request(`/pedidos/${pedidoId}/calificacion`, {
            method: "POST",
            body: JSON.stringify(payload)
        })

};