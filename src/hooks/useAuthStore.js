import { useDispatch, useSelector } from "react-redux";
import {
    onChecking,
    onLogin,
    onLogout,
    onRegisterC,
    onRegisterU,
    onRegisterT,
    onGetApi,
    onDeleteC,
    onEditC,
} from "../redux";
import { v4 as uuidv4 } from "uuid";
import { testApi } from "../apis/testApi";
import axios from "axios";

export const useAuthStore = () => {
    const id = uuidv4();
    var f = new Date();
    // Se llama con un selector a los estados de la store
    const { isAuthenticated, user, users, clients, tickets } = useSelector(
        (state) => state.auth
    );
    // Se llama con un dispatch a los acciones de la store
    const dispatch = useDispatch();

    // Funcion encargada de comunicarse con la api y hacer el login
    const startLogin = async (email, password) => {
        // Se hace una funcion async con los datos del usuario
        dispatch(onChecking()); // Se llama a la accion para volver todos los estados por defecto

        try {
            let user = await users.find(
                (user) => user.email === email && user.password === password
            );
            dispatch(onLogin(user));
        } catch (error) {
            dispatch(onLogout("Credenciales incorrectas"));
        }
    };

    const getApiInfo = async () => {
        try {
            const resp = await testApi.get();
            const data = resp.data;
            dispatch(onGetApi(data));
        } catch (error) {}
    };

    // Funcion encargada de comunicarse con la api y hacer el logout
    const startLogout = () => {
        // no hace falta que sea async
        localStorage.clear(); // Se limpia el localStorage
        dispatch(onLogout()); // Se llama a la accion onLogout para volver todos los estados por defecto y salir
    };

    const startRegisterC = async ({
        empresa,
        representante,
        email,
        telefono,
    }) => {
        // Se hace una funcion async con los datos del usuario
        //dispatch(onChecking()); // Se llama a la accion para volver todos los estados por defecto
        try {
            // Se llama a la api para hacer el registro y se le pasa los datos del usuario por post
            let user = await clients.find((user) => user.email === email);

            if (user) {
                return console.log("El usuario ya existe");
            } else {
                dispatch(
                    onRegisterC({
                        id: id,
                        empresa: empresa,
                        representante: representante,
                        email: email,
                        telefono: telefono,
                    })
                );
            }
        } catch (error) {
            dispatch(
                onLogout(error.response.data?.msg || "Error al registrarse")
            );
            // En caso de dar error se borran los datos de localStorage
        }
    };

    const startRegisterU = async ({
        usuario,
        nombres,
        apellidos,
        direccion,
        cp,
        email,
        telefono,
    }) => {
        // Se hace una funcion async con los datos del usuario
        //dispatch(onChecking()); // Se llama a la accion para volver todos los estados por defecto
        try {
            // Se llama a la api para hacer el registro y se le pasa los datos del usuario por post
            let user = await users.find(
                (user) => user.email === email || user.usuario === usuario
            );

            if (user) {
                return console.log("El usuario ya existe");
            } else {
                dispatch(
                    onRegisterU({
                        id: id,
                        usuario: usuario,
                        nombres: nombres,
                        apellidos: apellidos,
                        direccion: direccion,
                        cp: cp,
                        email: email,
                        telefono: telefono,
                    })
                );
            }
        } catch (error) {
            dispatch(
                onLogout(error.response.data?.msg || "Error al registrarse")
            );
            // En caso de dar error se borran los datos de localStorage
        }
    };

    const startRegisterT = async ({ idu = "1", idc = "1", descripcion }) => {
        // Se hace una funcion async con los datos del usuario
        //dispatch(onChecking()); // Se llama a la accion para volver todos los estados por defecto
        try {
            dispatch(
                onRegisterT({
                    id: id,
                    idu: idu,
                    idc: idc,
                    descripcion: descripcion,
                    fecha:
                        f.getDate() +
                        "/" +
                        f.getMonth() +
                        "/" +
                        f.getFullYear(),
                })
            );
        } catch (error) {
            dispatch(
                onLogout(error.response.data?.msg || "Error al registrarse")
            );
            // En caso de dar error se borran los datos de localStorage
        }
    };

    const deleteC = async (id) => {
        dispatch(onDeleteC(id))
    }
    const editC = async ({
        id,
        empresa,
        representante,
        email,
        telefono,
    }) => {
        dispatch(onEditC({
            id: id,
            empresa: empresa,
            representante: representante,
            email: email,
            telefono: telefono,
        }))
    }
    // Funcion que se encarga de checar el token de autenticacion y mantener la sesion
    const checkToken = async () => {
        const token = localStorage.getItem("token"); // Se obtiene el token de localStorage
        if (!token) return dispatch(onLogout()); // Si no hay token se llama a la accion onLogout y sale de la sesion
        try {
            const resp = await logReg.get("/auth/renew"); // Se llama a la api para checar el token y renovarlo
            localStorage.setItem("token", resp.data.token); // Se setea el nuevo token de autenticacion
            localStorage.setItem("token-init-date", new Date().getTime()); // Se setea la hora inicio del token
            dispatch(onLogin({ name: resp.data.name, uid: resp.data.uid })); // Se llama a la accion onLogin una ves completado correctamente y se vuelven a ingresar los datos del usuario
        } catch (error) {
            localStorage.clear(); // Se limpia el localStorage
            dispatch(onLogout()); // Se hace un logout
        }
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    

    // Se comparten las variables o metodos por medio de este hook
    return {
        //* Propiedades
        isAuthenticated,
        user,
        users,
        clients,
        tickets,

        //* Metodos o funciones
        getApiInfo,
        startLogin,
        startRegisterC,
        startRegisterU,
        startRegisterT,
        startLogout,
        checkToken,
        deleteC,
        editC
    };
};
