import * as yup from "yup";

export const YupSchema = yup
	.object({
		cedula: yup.string().required("El campo es obligatorio"),
		nombres: yup.string().required("El campo es obligatorio"),
		apellidos: yup.string().required("El campo es obligatorio"),
		fechaNacimiento: yup.string().required("El campo es obligatorio"),
		sexo: yup.string().required("El campo es obligatorio"),
		primeraVez: yup.boolean().required("El campo es obligatorio"),
		casaCampaña: yup.boolean().required("El campo es obligatorio"),
	})
	.required();
