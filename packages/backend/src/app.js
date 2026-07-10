import express from "express";
import cors from "cors";

import router from "./routes/router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "AI Do It API funcionando" });
});

app.use("/api", router);

app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        path: req.originalUrl
    });
});

app.use((error, req, res, next) => {
    const status = error.statusCode || 400;

    res.status(status).json({
        error: error.message || "Error interno del servidor"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
