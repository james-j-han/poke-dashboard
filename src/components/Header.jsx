import { Link } from "react-router";

function Header() {
    return (
        <div className="header-container">
            <Link to='/'>
                <h1>Poke Dashboard</h1>
            </Link>
        </div>
    )
}

export default Header;