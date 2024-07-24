import React, { useEffect, useRef, useState } from "react";
import Notas from "./Notas";
import { v4 as uuid } from "uuid";
import './estilos.css';

export default function Nota() {
    const [notas, setNotas] = useState([]);
    const [error, setError] = useState("");
    const tituloRef = useRef();
    const descripcionRef = useRef();
    const importanteRef = useRef();

    useEffect(() => {
        const misNotas = JSON.parse(localStorage.getItem("notas-app"));
        if (misNotas) {
            setNotas(misNotas);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("notas-app", JSON.stringify(notas));
    }, [notas]);

    const agregarNota = () => {
        const titulo = tituloRef.current.value;
        const descripcion = descripcionRef.current.value;
        const importante = importanteRef.current.checked;

        if (descripcion === "") {
            setError("La descripción es obligatoria");
            return;
        };

        setError(""); 

        const nuevaNota = {
            id: uuid(),
            titulo: titulo,
            descripcion: descripcion,
            importante: importante
        };

        setNotas(prev => [...prev, nuevaNota]);
        tituloRef.current.value = "";
        descripcionRef.current.value = "";
        importanteRef.current.checked = false;
    }

    const eliminarNota = (id) => {
        const nuevasNotas = notas.filter(nota => nota.id !== id);
        setNotas(nuevasNotas);
    };

    return (
        <div className="app-container">
            <h1>Notas de Tareas</h1>
            <div className="input-group my-3">
                <div className="titulo col-3">
                    <input ref={tituloRef} className="form-control" placeholder="Ingrese el Titulo de la Nota" />
                </div>
                <div className="descrip col-3">
                    <input ref={descripcionRef} className="form-control" placeholder="Ingrese descripción de la Nota" />
                    {error && <div className="error-descripcion">{error}</div>}
                </div>
                <div className="impor col-3">
                    <label>
                        <input ref={importanteRef} type="checkbox" /> Importante
                    </label>
                </div>
                <div className="boton">
                    <button onClick={agregarNota} className="btn btn-dark">Agregar</button>
                </div>
            </div>
            <div className="notas-separator"></div>
            <div className="notas-container">
                {notas.map(nota => (
                    <Notas
                        key={nota.id}
                        id={nota.id}
                        titulo={nota.titulo}
                        descripcion={nota.descripcion}
                        importante={nota.importante}
                        eliminarNota={eliminarNota}
                    />
                ))}
            </div>
        </div>
    );
}
