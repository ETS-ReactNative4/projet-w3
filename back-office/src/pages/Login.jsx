import React from "react";
import { LOGIN } from "../graphql/mutations/auth";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [login] = useMutation(LOGIN, {
    onCompleted: ({
      login: {
        user: { id, name, email, role }
      }
    }) => {
      // redirect
      // put on localstorage
      const user = {
        id,
        name,
        email,
        role
      };
      localStorage.setItem("isLoggedIn", "true");
      console.log(JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "http://localhost:80/";
      console.log({ id, name, email, role });
    },
    onError: error => console.log(error.message)
  });

  if (JSON.parse(localStorage.getItem('user'))) {
    return <Redirect to="/"/>
  }

  return (
    <section className="login">
      <div class="login__side"></div>
      <div class="login__content">
        <h1 className="title is-spaced">madu</h1>
        <p className="subtitle center">Identifiez-vous pour accéder à l'espace Madu de votre entreprise.</p>
        <Formik
          initialValues={{ name: "", password: "", email: "" }}
          validationSchema={Yup.object({
            password: Yup.string(),
            email: Yup.string()
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              login({
                variables: {
                  name: values.name,
                  password: values.password,
                  email: values.email
                }
              });
            }, 400);
          }}>
          <Form class="login__form">
            <div className="field">
              <label htmlFor="email" className="label">Adresse </label>
              <div className="control">
                <Field className="input" name="email" type="email" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="password" className="label">Mot de passe</label>
              <div className="control">
                <Field className="input" name="password" type="password" placeholder="Mot de passe"/>
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-link is-fullwidth">Submit</button>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default Login;
