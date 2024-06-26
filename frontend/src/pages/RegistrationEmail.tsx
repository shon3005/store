import { useAlertQueue } from "hooks/alerts";
import { api } from "hooks/api";
import { useAuthentication } from "hooks/auth";
import { FormEvent, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";

const RegistrationEmail = () => {
  const auth = useAuthentication();
  const auth_api = new api(auth.api);
  const { addAlert } = useAlertQueue();

  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setSubmitted(true);
      await auth_api.send_register_email(email);
      setSuccess(true);
    } catch (err) {
      setSubmitted(false);
      if (err instanceof Error) {
        addAlert(err.message, "error");
      } else {
        addAlert("Unexpected error.", "error");
      }
    }
  };
  if (success) {
    return (
      <div>
        <h1>Register</h1>
        <p>Check your email for a registration code.</p>
      </div>
    );
  } else if (submitted) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center mt-5"
      >
        <Row className="w-100">
          <Col className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <div>
      <h1>Register</h1>
      <p>
        To create an account, enter your email address. You will then be sent an
        email containing a registration link. (This helps to avoid part of the
        song and dance with email verification.)
      </p>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <Form.Control
          id="email"
          autoComplete="username"
          className="mb-3"
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          required
        />
        <Button type="submit">Send Code</Button>
      </Form>
    </div>
  );
};

export default RegistrationEmail;
