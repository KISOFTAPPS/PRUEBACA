import React from "react";
import { useAuthStore } from "../../../hooks";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
    usuario: Yup.string().required("Required"),
    nombre: Yup.string().required("Required"),
    apellidos: Yup.string().required("Required"),
    direccion: Yup.string().required("Required"),
    cp: Yup.number().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    telefono: Yup.number().required("Required"),
});

export const Usuarios = () => {
    const { users, startRegisterU } = useAuthStore();

    return (
        <div className="d-flex flex-column w-full justify-content-center container mt-5 gap-5">
            <div className="border rounded  shadow bg-light">
                <h3 className="text-center">Alta de usuario</h3>
                <Formik
                    initialValues={{
                        usuario: "",
                        nombre: "",
                        apellidos: "",
                        direccion: "",
                        cp: "",
                        email: "",
                        telefono: "",
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={(value, { resetForm }) => {
                        // same shape as initial values
                        startRegisterU(value);
                        resetForm();
                    }}
                >
                    <Form className="row justify-content-center ">
                        <div className="form-group m-1 col-10 ">
                            <Field
                                name="usuario"
                                type="text"
                                className="form-control"
                                placeholder="Nombre de usuario"
                                required
                            />
                        </div>
                        <div className="form-group m-1 col-10 ">
                            <Field
                                name="nombre"
                                type="text"
                                className="form-control"
                                placeholder="Nombre(s)"
                                required
                            />
                        </div>
                        <div className="form-group m-1 col-10 ">
                            <Field
                                name="apellidos"
                                type="text"
                                className="form-control"
                                placeholder="Apellidos"
                                required
                            />
                        </div>
                        <div className="form-group m-1 col-10 ">
                            <Field
                                name="direccion"
                                type="text"
                                className="form-control"
                                placeholder="Direccion"
                                required
                            />
                        </div>
                        <div className="form-group m-1 col-10 ">
                            <Field
                                name="cp"
                                type="number"
                                className="form-control"
                                placeholder="cp"
                                required
                            />
                        </div>
                        <div className="form-group m-1 col-10 ">
                            <Field
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                required
                            />
                        </div>
                        <div className="form-group m-1 col-10 ">
                            <Field
                                name="telefono"
                                type="number"
                                className="form-control"
                                placeholder="Telefono"
                                required
                            />
                        </div>
                        <div className="form-group m-1 col-10 d-flex justify-content-center">
                            <button
                                className="btn btn-outline-secondary"
                                type="submit"
                                style={{ width: "300px" }}
                            >
                                Entrar
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
            <div className="border rounded shadow">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Usuario</th>
                            <th scope="col">Nombre(s)</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Direccion</th>
                            <th scope="col">CP</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(
                            ({
                                id,
                                usuario,
                                nombre,
                                apellidos,
                                direccion,
                                cp,
                                email,
                                telefono,
                            }) => (
                                <tr key={id}>
                                    <th scope="col">{usuario}</th>
                                    <th scope="col">{nombre}</th>
                                    <th scope="col">{apellidos}</th>
                                    <th scope="col">{direccion}</th>
                                    <th scope="col">{cp}</th>
                                    <th scope="col">{email}</th>
                                    <th scope="col">{telefono}</th>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
