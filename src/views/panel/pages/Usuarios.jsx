import React from 'react'
import { useAuthStore } from "../../../hooks";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
    usuario: Yup.string().required("Required"),
    nombre: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    telefono: Yup.number().required("Required")
});

export const Usuarios = () => {
    const { clients, startRegisterC } = useAuthStore();


  return (
    <div className="d-flex flex-column w-full justify-content-center container mt-5 gap-5">
    <div className="border rounded  shadow bg-light">
        <h3 className="text-center">Alta de usuario</h3>
        <Formik
            initialValues={{
                usuaro: "",
                nombre: "",
                apellidos: "",
                direccion: "",
                cp:"",
                email:"",
                telefono:""
            }}
            validationSchema={SignUpSchema}
            onSubmit={(value, { resetForm }) => {
                // same shape as initial values
                startRegisterC(value);
                resetForm();
            }}
        >
            <Form className="row justify-content-center ">
                <div className="form-group m-1 col-10 ">
                    <Field
                        name="empresa"
                        type="text"
                        className="form-control"
                        placeholder="Nombre de empresa"
                        required
                    />
                </div>
                <div className="form-group m-1 col-10 ">
                    <Field
                        name="representante"
                        type="text"
                        className="form-control"
                        placeholder="Nombre de representante"
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
                <div className="form-group m-1 col-10 ">
                    <Field
                        name="telefono"
                        type="number"
                        className="form-control"
                        placeholder="Telefono"
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
                    <th scope="col">Empresa</th>
                    <th scope="col">Representante</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telefono</th>
                </tr>
            </thead>
            <tbody>
                {clients.map(
                    ({
                        id,
                        empresa,
                        representante,
                        email,
                        telefono,
                    }) => (
                        <tr key={id}>
                            <th scope="row">{empresa}</th>
                            <td>{representante}</td>
                            <td>{email}</td>
                            <td>{telefono}</td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    </div>
</div>
  )
}
