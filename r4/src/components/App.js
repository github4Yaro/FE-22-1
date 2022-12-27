import { Link } from "react-router-dom";
import Nav from './Nav';

function App() {
  return (
  	<>
	  	<Nav />
	    <div className="container text-center text-capitalize text-primary">
		    <h2>Welcome to the Harry Potter <span className="title">API!</span></h2>
		    <p className="fw-bold">
		        "Deathly Hallows"
		        there once was a boy named Harry
		        who constantly conquered death
		        but in one final duel between good and bad
		        he may take his final breath...</p>
		    <div>
		        <Link to="hero"><button type="button" className="btn btn-outline-primary"> HERO </button></Link>
		        <Link to="spells"><button type="button" className="btn btn-outline-warning"> SPELLS </button></Link>
		    </div>
		</div>
	</>
  );
}

export default App;
