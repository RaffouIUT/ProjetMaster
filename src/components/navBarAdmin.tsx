import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import React from 'react';

export default function NavBarAdmin({presence= true, seance = true}) {

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
		</Navbar>
	</>)
}