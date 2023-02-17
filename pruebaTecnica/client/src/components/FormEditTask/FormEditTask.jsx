import { React, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editTask } from "../../actions";

function FormEditTask(props) {
    const gState = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();
    let id = props.match.params.id;


    const [input, setInput] = useState({
        name: "",
        description: "",
        duration: 0,
        beginDate: "",
        endDate: "",
        priority: "",
        status: "",
    });


    const handleInputChange = (event) => {
        event.preventDefault();
        setInput((prevInput) => {
            return {
                ...prevInput,
                [event.target.name]: event.target.value,
            };
        });
    };
    const handleBack = (event) => {
        event.preventDefault();
        history.goBack();
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(
            editTask(
                id,
                {
                    name: input.name,
                    description: input.description,
                    duration: input.duration,
                    beginDate: input.beginDate,
                    endDate: input.endDate,
                    priority: input.priority,
                    status: input.status,
                },
            )
        );
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col
                        lg={8}
                        md={6}
                        sm={12}
                        className="text-center p-5 m-auto shadow-sm rounded-lg"
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            placeholder="Nombre"
                                            type="text"
                                            name="name"
                                            value={input.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    placeholder="Descripción"
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Duración</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={input.duration}
                                    name="duration"
                                    id="duration"
                                    required
                                    placeholder="Minutos"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Fecha de Inicio</Form.Label>
                                <Form.Control
                                    type="Date"
                                    value={input.beginDate}
                                    name="beginDate"
                                    id="beginDate"
                                    required

                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Fecha de Finalización</Form.Label>
                                <Form.Control
                                    type="Date"
                                    value={input.endDate}
                                    name="endDate"
                                    id="endDate"
                                    required

                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Select aria-label="Default select example" name="priority" required
                                    onChange={handleInputChange}>
                                    <option>Prioridad</option>
                                    <option value="Bajo">Bajo</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Urgente">Urgente</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Select aria-label="Default select example" name="status" required
                                    onChange={handleInputChange}>
                                    <option>Estado</option>
                                    <option value="Iniciada">Iniciada</option>
                                    <option value="En Proceso">En Proceso</option>
                                    <option value="Terminada">Terminada</option>
                                </Form.Select>
                            </Form.Group>
                            <Row>
                                <Col
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    className="text-center p-5 m-auto shadow-sm rounded-lg"
                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <Button onClick={(e) => handleBack(e)}>Atras</Button>

                                    <Button type="submit">Listo</Button>

                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default FormEditTask