import { NavLink } from "react-router-dom";

export const Menu = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Pet Clinic</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">                                
                                <NavLink className={'nav-link'} to={'/'}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className={'nav-link'} to={'/propietario'}>Owner</NavLink>                                
                            </li>
                            <li className="nav-item">
                            <NavLink className={'nav-link'} to={'/mascota'}>Mascota</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className={'nav-link'} to={'/visita'}>Visita</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className={'nav-link'} to={'/veterinario'}>Veterinario</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}