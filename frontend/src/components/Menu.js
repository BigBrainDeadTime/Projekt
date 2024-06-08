import {Link} from "react-router-dom"

const Menu = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li> 
                        <Link to="/loginform">Login</Link>
                    </li>
                    <li> 
                        <Link to="/singupform">Rejestracja</Link>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default Menu;