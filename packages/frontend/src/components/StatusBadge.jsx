function StatusBadge({ estado }) {

    const clases = {
        PENDIENTE: "status-badge pending",
        CONFIRMADO: "status-badge confirmed",
        EN_PROGRESO: "status-badge progress",
        EN_REVISION: "status-badge review",
        COMPLETADO: "status-badge completed",
        CANCELADO: "status-badge cancelled"
    };

    const textos = {
        PENDIENTE: "Pendiente",
        CONFIRMADO: "Confirmado",
        EN_PROGRESO: "En progreso",
        EN_REVISION: "En revisión",
        COMPLETADO: "Completado",
        CANCELADO: "Cancelado"
    };

    return (

        <span className={clases[estado] || "status-badge"}>

            {textos[estado] || estado}

        </span>

    );

}

export default StatusBadge;