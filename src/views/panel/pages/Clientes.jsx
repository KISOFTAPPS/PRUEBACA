import React from "react";
import { AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../../hooks";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Modal from "../components/modal/Modal";

const SignUpSchema = Yup.object().shape({
    empresa: Yup.string().required("Required"),
    representante: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    telefono: Yup.number().required("Required"),
});

const variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export const Clientes = () => {
    const { clients, startRegisterC, deleteC, editC } = useAuthStore();

    const [modalOpen, setModalOpen] = useState(false);

    const [cliente, setCliente] = useState({})

    const handleClient = (client) => {
        setModalOpen(true)
        setCliente(client)
    }
    console.log("desde cliente",cliente)
    return (
        <div className="d-flex flex-column w-full justify-content-center container mt-5 gap-5">
            <div className="border rounded  shadow bg-light">
                <h3 className="text-center">Alta de cliente</h3>
                <Formik
                    initialValues={{
                        empresa: "",
                        representante: "",
                        email: "",
                        telefono: "",
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
            <h1>Da click sobre uno para editar:</h1>
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
                                <tr key={id} onClick={() => handleClient({
                                    id,
                                    empresa,
                                    representante,
                                    email,
                                    telefono,
                                })}>
                                    <th scope="row">{empresa}</th>
                                    <td>{representante}</td>
                                    <td>{email}</td>
                                    <td>{telefono}</td>
                                    <td>
                                        <button onClick={() => deleteC(id)}>
                                            Borrar
                                        </button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            {/* MODAL */}
            <AnimatePresence
                initial={false}
                mode="wait"
                onExitComplete={() => null}
            >
                {modalOpen && (
                    <Modal
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}

                    >
                        <h1>EDITAR CLIENTE</h1>
                        <Formik
                            initialValues={{
                                id: cliente.id,
                                empresa: cliente.empresa,
                                representante: cliente.representante,
                                email: cliente.email,
                                telefono: cliente.telefono,
                            }}
                            validationSchema={SignUpSchema}
                            onSubmit={(value, { resetForm }) => {
                                // same shape as initial values
                                editC(value);
  
                            }}
                        >
                            <Form className="row justify-content-center">
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
                                <div className="form-group m-1 col-10 d-flex justify-content-center">
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="submit"
                                        style={{ width: "300px" }}
                                    >
                                        Editar
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
};
