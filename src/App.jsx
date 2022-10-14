import "./App.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { YupSchema as schema } from "./YupSchema";
import React, { useEffect, useRef, useState } from "react";

function App() {
	const [checkout, setCheckout] = useState(false);

	const [successfullOrder, setSuccesfullOrder] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		console.log(data);

		setCheckout(true);
	};

	return (
		<>
			<h1>Excursión Pico Duarte</h1>

			<form onSubmit={handleSubmit(onSubmit)} target='_blank'>
				<label htmlFor='cedula'>Cédula</label>
				<input
					type='text'
					name='cedula'
					id='cedula'
					{...register("cedula")}
				/>
				<span className='error'>{errors.cedula?.message}</span>

				<label htmlFor='nombres'>Nombres</label>
				<input
					type='text'
					name='nombres'
					id='nombres'
					{...register("nombres")}
				/>
				<span className='error'>{errors.nombres?.message}</span>

				<label htmlFor='apellidos'>Apellidos</label>
				<input
					type='text'
					name='apellidos'
					id='apellidos'
					{...register("apellidos")}
				/>
				<span className='error'>{errors.apellidos?.message}</span>

				<label htmlFor='fechaNacimiento'>Fecha de Nacimiento</label>
				<input
					type='date'
					name='fechaNacimiento'
					id='fechaNacimiento'
					{...register("fechaNacimiento")}
				/>
				<span className='error'>{errors.fechaNacimiento?.message}</span>

				<label htmlFor='Sexo'>Sexo</label>
				<select name='Sexo' defaultValue='M' {...register("sexo")}>
					<option value='M'>Masculino</option>
					<option value='F'>Femenino</option>
					<option value='Otro'>Otro</option>
				</select>
				<span className='error'>{errors.sexo?.message}</span>

				<label htmlFor='primeraVez'>Sexo</label>
				<select
					name='primeraVez'
					defaultValue={true}
					{...register("primeraVez")}
				>
					<option value={true}>Si</option>
					<option value={false}>No</option>
				</select>
				<span className='error'>{errors.primeraVez?.message}</span>

				<label htmlFor='casaCampaña'>Casa de campaña</label>
				<select
					name='casaCampaña'
					defaultValue={true}
					{...register("casaCampaña")}
				>
					<option value={true}>Si</option>
					<option value={false}>No</option>
				</select>
				<span className='error'>{errors.casaCampaña?.message}</span>

				<h3>
					Precio: <span>$ 60 USD</span>
				</h3>

				<input type='submit' value='Inscribirme' />

				{checkout && <Paypal setOrder={setSuccesfullOrder} />}

				{successfullOrder && (
					<SuccesfullOrderMessage person={successfullOrder} />
				)}
			</form>
		</>
	);
}

const Paypal = ({ setOrder, setMessage }) => {
	const paypal = useRef();

	useEffect(() => {
		window.paypal
			.Buttons({
				createOrder: (data, actions, err) => {
					return actions.order.create({
						intent: "CAPTURE",
						purchase_units: [
							{
								description: "Excursión Pico Duarte",
								amount: {
									currency_code: "USD",
									value: 60.0,
								},
							},
						],
					});
				},
				onApprove: async (data, actions) => {
					const order = await actions.order.capture();

					setOrder(order);
				},
				onError: (err) => {
					console.error(err);
				},
			})
			.render(paypal.current);
	}, []);

	return (
		<div>
			<div ref={paypal}></div>
		</div>
	);
};

const SuccesfullOrderMessage = ({ person }) => {
	const { id, status, payer, update_time } = person;

	const { name } = payer;

	const { given_name, surname } = name;

	return (
		<div>
			<h1>Orden satisfactoria!!</h1>
			<p>Orden: {id}</p>
			<p>Estado: {status}</p>
			<p>Nombre: {given_name}</p>
			<p>Apellidos: {surname}</p>
			<p>Fecha: {update_time}</p>
		</div>
	);
};

export default App;
