import { Link } from "react-router-dom";


export default function Nav({active}) {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		    <div className="container-fluid">
		        <Link className="navbar-brand" to="/">Harry Potter </Link>
		        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
		            <span className="navbar-toggler-icon"></span>
		        </button>
		        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
		            <div className="navbar-nav">
		                <Link className={(active)?'nav-link':'nav-link active'}  to="/">Home</Link>
		                <Link className={(active == 'hero')?'nav-link active ':'nav-link'} to="/hero">Hero</Link>
		                <Link className={(active == 'spell')?'nav-link active ':'nav-link'} to="/spells">Spells</Link>
		            </div>
		        </div>
		    </div>
		</nav>
	);
}