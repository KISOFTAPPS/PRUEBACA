import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { Log } from "../views/auth";
import { Clientes, Panel, Tickets, Usuarios } from "../views/panel";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const RouterApp = () => {
    const { isAuthenticated, checkToken } = useAuthStore();
    useEffect(() => {
        checkToken();
    }, []);

    return (
        <>
            <Routes>
                <Route
                    path="login"
                    element={
                        <PublicRoute>
                            <Log />
                        </PublicRoute>
                    }
                />
                <Route path="/" element={<PrivateRoute />}>
                    <Route index element={<Panel />} />
                    <Route path="usuarios" element={<Usuarios />} />
                    <Route path="clientes" index element={<Clientes />} />
                    <Route path="tickets" index element={<Tickets />} />
                    <Route
                        path="*"
                        element={
                            <Navigate to="/clientes" />
                        }
                    />
                </Route>

                <Route
                    path="*"
                    element={
                        <Navigate to={`${isAuthenticated ? "/" : "login"}`} />
                    }
                />
            </Routes>
        </>
    );
};

export default RouterApp;
