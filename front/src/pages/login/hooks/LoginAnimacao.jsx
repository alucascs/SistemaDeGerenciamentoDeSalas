import { useEffect } from 'react';


export function LoginAnimacao() {
	useEffect(() => {
		const signUpButton = document.getElementById('signUp');
		const signInButton = document.getElementById('signIn');
		const container = document.getElementById('container');

		if (signUpButton && signInButton && container) {
			const handleSignUp = () => container.classList.add("right-panel-active");
			const handleSignIn = () => container.classList.remove("right-panel-active");

			signUpButton.addEventListener('click', handleSignUp);
			signInButton.addEventListener('click', handleSignIn);

			// Cleanup ao desmontar o componente
			return () => {
				signUpButton.removeEventListener('click', handleSignUp);
				signInButton.removeEventListener('click', handleSignIn);
			};
		}
	}, []);
}



