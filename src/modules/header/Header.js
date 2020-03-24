import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import './header.css'

const Nav = styled.div`
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    margin-left:auto;
`
const CustomLink = styled(NavLink)`
    padding: 7px 9px;
    border:1px solid #007bff;
    text-align:center;
    
`
const LayoutHeader = styled.div`
		display: flex; 
		padding: 7px 9px;
		border-bottom: 1px solid #88885B;
		background: #fbd93c;
		align-items: center;
`
const Header = (props) => {
	const activeLink = 'header-active-link'
	return (
		<LayoutHeader>
			<div>Herolo task</div>
			<Nav>
				<CustomLink exact to="/" activeClassName={activeLink}>Home</CustomLink>
				<CustomLink exact to="/favorites" activeClassName={activeLink}>Favorites</CustomLink>
			</Nav>

		</LayoutHeader>
	);
}

export default Header;