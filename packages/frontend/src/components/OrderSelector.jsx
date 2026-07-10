import { ArrowDownWideNarrow } from "lucide-react";

function OrderSelector({
    value,
    onChange
}) {

    return (

        <div className="order-selector">

            <ArrowDownWideNarrow
                size={18}
                className="order-icon"
            />

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >

                <option value="">
                    Más recientes
                </option>

                <option value="precio">
                    Menor precio
                </option>

                <option value="puntaje">
                    Mejor puntuación
                </option>

            </select>

        </div>

    );

}

export default OrderSelector;