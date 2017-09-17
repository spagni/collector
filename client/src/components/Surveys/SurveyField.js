//Logica para hacer el render de un label y un input
import React from 'react';
//{...input} es lo mismo que poner onBlur={input.onBlur}, etc con todos los eventHandlers que recibe el componente de redux-form...
export default ({ input, label }) => {
	return (
		<div>
			<label>{ label }</label>
			<input {...input} />
		</div>
	);
};
