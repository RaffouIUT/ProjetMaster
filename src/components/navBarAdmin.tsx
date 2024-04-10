import { Button, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { fonctionRedirectHome } from '@/components/utils/connexionUtils';

export default function NavBarAdmin({presence= true, seance = true}) {

	const router = useRouter();
	async function HandleDeconnexion() {
		Cookies.set('authAdmin', '');
		router.push('/');
		const serverUrl = process.env.SERVER_URL;
		if(serverUrl === undefined) {
			alert('Erreur lors de la redirection');
			return ;
		}else{
			await fonctionRedirectHome()
		}

	}

	return (<>
		<Navbar color={"light"} className={"border-b-4"}>
			<NavbarBrand href="/admin">Espace Administrateur</NavbarBrand>
			<Nav className={"me-auto flex-row"} navbar>
				{presence ?
					<NavItem className={"mr-3 underline underline-offset-4"}>
						<NavLink href="/admin/presence" className={""}>Gérer les données de présence</NavLink>
					</NavItem> : ""}
				{seance ?
					<NavItem className={"mr-3 underline underline-offset-4"}>
						<NavLink href="/admin/seance">Gérer les séances</NavLink>
					</NavItem> : ""}
			</Nav>
			<NavItem className={"ml-auto list-none mr-8"}>
				<Button onClick={HandleDeconnexion} size={"sm"} color={"danger"} >Déconnexion</Button>
			</NavItem>
		</Navbar>
	</>)
}