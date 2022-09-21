import React from "react";
import { useAuthStore } from "../../../hooks";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
    idu: Yup.string(),
    idc: Yup.string(),
    descripcion: Yup.string().required("Required"),
});

export const Tickets = () => {
    const { tickets, users, clients, startRegisterT } = useAuthStore();

    return (
        <div className="d-flex flex-column w-full justify-content-center container mt-5 gap-5">
            <div className="border rounded  shadow bg-light">
                <h3 className="text-center">Alta de ticket</h3>
                <Formik
                    initialValues={{
                        idu: "1",
                        idc: "1",
                        descripcion: "",
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={(value, { resetForm }) => {
                        // same shape as initial values
                        startRegisterT(value);
                        resetForm();
                    }}
                >
                    <Form className="row justify-content-center ">
                        <div className="form-group m-1 col-10 ">
                            <span>ID usuario asignado: </span>
                            <Field as="select" name="idu">
                                {users.map(({ id }) => (
                                    <option value={id}>{id}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="form-group m-1 col-10 ">
                            <span>ID cliente asignado: </span>
                            <Field as="select" name="idc">
                                {clients.map(({ id }) => (
                                    <option value={id}>{id}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="form-group m-1 col-10 ">
                            <Field
                                name="descripcion"
                                type="text"
                                className="form-control"
                                placeholder="Descripción"
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
                            <th scope="col">ID usuario asignado</th>
                            <th scope="col">ID cliente asignado</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Fecha de reporte</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(({ id, id_usuario, id_cliente, descripcion, fecha_reporte }) => (
                            <tr key={id}>
                                <th scope="row">{id_usuario}</th>
                                <td>{id_cliente}</td>
                                <td>{descripcion}</td>
                                <td>{fecha_reporte}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
