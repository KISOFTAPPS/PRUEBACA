import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../../../hooks'


export const NavBar = () => {
    const {user} = useAuthStore()
    console.log("hey",user.usuario)
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
            <NavLink to="/" className="navbar-brand ms-2" href="#">PANORAMA</NavLink>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <NavLink to="usuarios" className="nav-link">Usuarios</NavLink>
                    </li>
                    <li class="nav-item">
                    <NavLink to="clientes" className="nav-link">Clientes</NavLink>
                    </li>
                    <li class="nav-item">
                    <NavLink to="tickets" className="nav-link">Tickets</NavLink>
                    </li>
                </ul>
            </div>
            <span className='me-2 fw-bold'>{user.usuario}</span>
        </nav>
    )
}
