import React, { useEffect, useState } from 'react'

import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, getAllTasks, searchTask } from '../../actions';
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { IoIosAddCircleOutline, IoIosArrowDropright } from "react-icons/io";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import moment from "moment";
import DataTable from "react-data-table-component";
import { NavLink, useHistory } from 'react-router-dom';

function HomeTask() {
    const gState = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const [blink, setBlink] = useState({
        turn: true,
    })
    const [input, setInput] = useState({
        search: "",

    });

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch, blink]);

    const navigateTo = (id) => {
        history.push(`/task/editTask/${id}`);
        console.log("id", id)

    }
    const deleteHandle = (id) => {
        dispatch(deleteTask(id))
        setBlink((prevInput) => {
            return {
                ...prevInput,
                turn: !blink.turn,

            }
        })

    }
    const handleInputChange = (event) => {
        event.preventDefault();
        setInput((prevInput) => {
            return {
                ...prevInput,
                [event.target.name]: event.target.value,
            };
        });
    };
    const addHandle = (id) => {
        history.push(`/task/addChildTask/${id}`);


    }
    const addNewHandle = (e) => {

        history.push(`/task/addChildTask`);


    }

    const serchBtn = (event) => {
        event.preventDefault();

        dispatch(
            searchTask(input.search)
        );
    };

    const columnas = [
        { name: "Nro de orden", selector: (row) => row.id, sortable: true, show: false },
        {
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
        },

        {
            name: "Descripción",
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: "Duración",
            selector: (row) => row.duration,
            sortable: true,
        },
        {
            name: "Fecha de inicio",
            selector: (row) => row.beginDate,
            sortable: true,
        },
        { name: "Finalizada", selector: (row) => row.endDate, sortable: true },
        { name: "Prioridad", selector: (row) => row.priority, sortable: true },
        {
            name: "Estado",
            selector: (row) => row.status,
            sortable: true,
        },

        {
            button: true,
            cell: (row) => (
                <button style={{ display: "flex", fontSize: "20px" }}>
                    <FaEdit
                        title="Edit"
                        style={{ marginRight: "15px", fontSize: "30px" }}
                        onClick={e => {
                            console.log("row.id", row)
                            navigateTo(row.id)
                        }}
                    />
                    <FiTrash2
                        title="Delete"
                        style={{ marginRight: "15px", fontSize: "30px" }}
                        onClick={e => {
                            console.log("row.id", row)
                            deleteHandle(row.id)
                        }}
                    />
                    <IoIosAddCircleOutline
                        title="Add"
                        style={{ marginRight: "15px", fontSize: "30px" }}
                        onClick={e => {
                            // console.log("row.id", row)
                            addHandle(row.id)
                        }}
                    />
                </button>
            ),
        },
    ];
    function formatDate(value) {
        return value ? moment(value).format("DD/MM/YYYY") : "";
    }
    const conditionalRowStyles = [
        {
            when: (row) => row.priority === "Urgente" && row.status !== "Terminada",
            style: {
                backgroundColor: "#ff6140",
                color: "white",
                "&:hover": {
                    cursor: "pointer",
                },
            },
        },
    ];
    return (
        <div>
            <Button style={{ marginRight: "15px", fontSize: "30px" }} onClick={(e) => addNewHandle(e)}>Agregar</Button>
            <div>

                <input placeholder="Buscar"
                    type="text"
                    name="search"
                    value={input.search}
                    onChange={handleInputChange} />
                <IoArrowForwardCircleOutline onClick={(e) => serchBtn(e)} />
            </div>
            {gState.allTasks?.length > 0 ? (
                <Row>
                    <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className="text-center p-35 m-auto shadow-sm rounded-lg"
                    >
                        <DataTable
                            columns={columnas}
                            data={gState.allTasks}
                            title="Listado de tareas"
                            conditionalRowStyles={conditionalRowStyles}

                        />
                        <hr />
                        <br />

                    </Col>
                </Row>
            ) : (
                <div style={{ background: 'white', color: '#8c52ff', fontSize: '20px', height: '200px' }}>
                    <br />
                    <Row>
                        <div style={{ marginTop: "100px" }}>
                            <h1>No hay tareas disponibles</h1>
                        </div>
                        <Col
                            lg={6}
                            md={6}
                            sm={12}
                            className="text-center p-5 m-auto rounded-lg"
                            style={{ display: "flex" }}
                        ></Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

export default HomeTask