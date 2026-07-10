import { Navigate, Route, Routes } from "react-router-dom";

import BottomNavigation from "./components/BottomNavigation";

import Explorar from "./pages/Explorar";
import GigDetalle from "./pages/GigDetalle";
import MisGigs from "./pages/MisGigs";
import NuevoGig from "./pages/NuevoGig";
import MisPedidos from "./pages/MisPedidos";
import MisEncargos from "./pages/MisEncargos";
import SeleccionUsuario from "./pages/SeleccionUsuario";

function App() {
    return (
        <div className="app">

            <main className="app-content">

                <Routes>

                    <Route
                        path="/"
                        element={<SeleccionUsuario />}
                    />

                    <Route
                        path="/explorar"
                        element={<Explorar />}
                    />

                    <Route
                        path="/gigs/:gigId"
                        element={<GigDetalle />}
                    />

                    <Route
                        path="/mis-gigs"
                        element={<MisGigs />}
                    />

                    <Route
                        path="/nuevo-gig"
                        element={<NuevoGig />}
                    />

                    <Route
                        path="/mis-pedidos"
                        element={<MisPedidos />}
                    />

                    <Route
                        path="/mis-encargos"
                        element={<MisEncargos />}
                    />

                </Routes>

            </main>

            <BottomNavigation />

        </div>
    );
}

export default App;