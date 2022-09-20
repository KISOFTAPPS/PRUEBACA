import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "../../../hooks";


const SignInSchema = Yup.object().shape({
    correo: Yup.string().email("Invalid email").required("Required"),
    contraseña: Yup.string().required("Required"),
});

// const SignUpSchema = Yup.object().shape({
//     nombre: Yup.string().required("Required"),
//     apellido_p: Yup.string().required("Required"),
//     apellido_m: Yup.string().required("Required"),
//     correo: Yup.string().email("Invalid email").required("Required"),
//     contraseña: Yup.string().required("Required"),
//     repContraseña: Yup.string()
//         .required("Dato requerido")
//         .when("contraseña", {
//             is: (val) => (val && val.length > 0 ? true : false),
//             then: Yup.string().oneOf(
//                 [Yup.ref("contraseña")],
//                 "Ambas contraseñas tienen que ser iguales"
//             ),
//         }),
//     rol: Yup.string().required("Required"),
// });

export const Log = () => {
    const { startLogin } = useAuthStore();
    return (
        <section className="bg-light">
            <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
                <h1
                    className="text-center m-5"
                >
                    PRUEBA PANORAMA
                </h1>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div
                                className="p-1 rounded bg-white shadow-lg"
                            >
                                <h5 className="text-center">
                                    INICIA SESIÓN
                                </h5>
                                <Formik
                                    initialValues={{
                                        correo: "",
                                        contraseña: "",
                                    }}
                                    validationSchema={SignInSchema}
                                    onSubmit={(value) => {
                                        // same shape as initial values
                                        startLogin(
                                            value.correo,
                                            value.contraseña,
                                        );
                                    }}
                                >
                                    <Form className="row justify-content-center ">
                                        <div className="form-group m-1 col-10 ">
                                            <Field
                                                name="correo"
                                                type="email"
                                                className="form-control"
                                                placeholder="Correo"
                                                required
                                            />
                                        </div>
                                        <div className="form-group m-1 col-10 ">
                                            <Field
                                                name="contraseña"
                                                type="password"
                                                className="form-control"
                                                placeholder="Contraseña"
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
