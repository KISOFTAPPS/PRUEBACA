import React from "react";
import { useAuthStore } from "../../../hooks";

export const Panel = () => {
    const { startLogout, user } = useAuthStore();
    console.log("desde pagina de bienvenida: ", user.nombre)

    return (
        <h1>PANEL</h1>
    );
};
