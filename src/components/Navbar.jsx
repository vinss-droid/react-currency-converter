import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow">
            <div className="container">
                <Link className="navbar-brand fw-bold" to={'/'}>
                    Currency Converter
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={ ({isActive}) => isActive ? 'nav-link active' : 'nav-link' } aria-current="page" to={'/'}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/convert'} className={ ({isActive}) => isActive ? 'nav-link active' : 'nav-link' }>Converter</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
