import React from "react";
import { useState, useRef } from "react";
import { canciones } from "./canciones";
import Controles from "./component/controles.jsx";

function ListaReproduccion() {
	const [reproduciendo, setReproduciendo] = useState(false);
	const [indexActual, setIndexActual] = useState(0);
	let audioRef = useRef();

	const reproducirCancion = (indexCancion) => {
		let cancion = canciones[indexCancion];
		audioRef.src = `https://assets.breatheco.de/apis/sound/${cancion.url}`;
		setIndexActual(indexCancion);
		setReproduciendo(true);
	};

	const alternarReproduccion = () => {
		if (audioRef.paused) {
			audioRef.play();
			setReproduciendo(true);
		} else {
			audioRef.pause();
			setReproduciendo(false);
		}
	};

	const siguienteCancion = () => {
		let nuevoIndex;

		if (indexActual < canciones.length - 1) {
			nuevoIndex = indexActual + 1;
		} else {
			nuevoIndex = 0;
		}

		reproducirCancion(nuevoIndex);
	};

	const cancionAnterior = () => {
		let nuevoIndex;

		if (indexActual === 0) {
			nuevoIndex = canciones.length - 1;
		} else {
			nuevoIndex = indexActual - 1;
		}

		reproducirCancion(nuevoIndex);
	};

	return (
		<div className="container  mt-5">
			<div className="card ">
				<div className="card-header py-0">
					<audio
						className="audioControl"
						ref={(r) => (audioRef = r)}
						autoPlay
					/>
				</div>

				<ul className="list-group list-group-flush ">
					{canciones.map((cancion, index) => {
						return (
							<button
								key={index}
								onClick={() => reproducirCancion(index)}
								type="button"
								className="list-group-item list-group-item-action ">
								{cancion.name}
							</button>
						);
					})}
				</ul>

				<Controles
					reproduciendo={reproduciendo}
					alternarReproduccion={alternarReproduccion}
					cancionAnterior={cancionAnterior}
					siguienteCancion={siguienteCancion}
				/>
			</div>
		</div>
	);
}

export default ListaReproduccion;
