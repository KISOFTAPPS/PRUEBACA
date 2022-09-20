import { createSlice } from "@reduxjs/toolkit";

// Se crea el slice el cual contiene todos los estados de la store y sus acciones
export const authSlice = createSlice({
    name: "auth", // Se le pasa el nombre del slice
    initialState: {
        // Se le pasa el estado inicial
        isAuthenticated: null,
        user: {},
        users: [
            {
                id: 1,
                email: "karim@karim.com",
                password: "123",
                usuario: "KISOFT",
                nombre: "Karim",
                apellidos: "Sabag Ochoa",
                direccion: "mesa del seri 111",
                cp: 11111,
                telefono: 1111111111,
            },
            {
                id: 2,
                email: "karim2@karim.com",
                password: "123",
                usuario: "KISOFT2",
                nombre: "Karim",
                apellidos: "Sabag Ochoa",
                direccion: "mesa del seri 111",
                cp: 11111,
                telefono: 1111111111,
            },
            {
                id: 3,
                email: "karim3@karim.com",
                password: "123",
                usuario: "KISOFT3",
                nombre: "Karim",
                apellidos: "Sabag Ochoa",
                direccion: "mesa del seri 111",
                cp: 11111,
                telefono: 1111111111,
            },
        ],
        clients: [
            {
                id: 1,
                empresa: "karimE",
                representante: "KarimR",
                email: "karimC@karim.com",
                telefono: 1111111111,
            },
            {
                id: 2,
                empresa: "karimE2",
                representante: "KarimR2",
                email: "karimC2@karim.com",
                telefono: 1111111111,
            },
            {
                id: 3,
                empresa: "karimE3",
                representante: "KarimR3",
                email: "karimC3@karim.com",
                telefono: 1111111111,
            },
            {
                id: 4,
                empresa: "karimE4",
                representante: "KarimR4",
                email: "karimC4@karim.com",
                telefono: 1111111111,
            },
        ],
        tickets: [
            {
                id: 1,
                idu: 1,
                idc: 2,
                descripcion: "Ticket levantado",
                telefono: 1111111111,
                fecha: "19/09/2022",
            },
        ],
    },
    reducers: {
        // Se le pasa las acciones
        onChecking: (state) => {
            state.isAuthenticated = null;
            state.user = {};
        },
        onLogin: (state, { payload }) => {
            state.isAuthenticated = true;
            state.user = payload;
        },
        onLogout: (state, action) => {
            state.isAuthenticated = false;
            state.user = {};
        },
        onRegisterC:(state, { payload }) => {
            state.isAuthenticated = true;
            state.clients = [...state.clients,payload];
        },
    },
});

export const { onChecking, onLogin, onLogout,onRegisterC } = authSlice.actions;
