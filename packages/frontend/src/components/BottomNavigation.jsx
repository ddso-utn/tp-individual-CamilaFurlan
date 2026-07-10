import { NavLink } from "react-router-dom";
import {
    Search,
    BriefcaseBusiness,
    ShoppingBag,
    ClipboardList
} from "lucide-react";

function BottomNavigation() {

    return (

        <nav className="bottom-navigation">

            <NavLink
                to="/explorar"
                className={({ isActive }) =>
                    isActive ? "bottom-nav-item active" : "bottom-nav-item"
                }
            >
                <Search size={22} />
                <span>Explorar</span>
            </NavLink>

            <NavLink
                to="/mis-gigs"
                className={({ isActive }) =>
                    isActive ? "bottom-nav-item active" : "bottom-nav-item"
                }
            >
                <BriefcaseBusiness size={22} />
                <span>Mis Gigs</span>
            </NavLink>

            <NavLink
                to="/mis-pedidos"
                className={({ isActive }) =>
                    isActive ? "bottom-nav-item active" : "bottom-nav-item"
                }
            >
                <ShoppingBag size={22} />
                <span>Pedidos</span>
            </NavLink>

            <NavLink
                to="/mis-encargos"
                className={({ isActive }) =>
                    isActive ? "bottom-nav-item active" : "bottom-nav-item"
                }
            >
                <ClipboardList size={22} />
                <span>Encargos</span>
            </NavLink>

        </nav>

    );

}

export default BottomNavigation;