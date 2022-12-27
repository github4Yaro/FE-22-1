import {useState, useEffect} from "react";
import Nav from './Nav';



export default function Spell(){
	const spellsUrl = "https://hp-api.onrender.com/api/spells"

	const [spellsList, setSpellsList] = useState([]);

	const getSpells = () => {
		fetch(spellsUrl).then((response) => {
	    	return response.json();
	  	}).then((data) => {
		   setSpellsList(data);
		});
	}
	const spells = spellsList.map(spell => {
    	return (
    		
	    		<div className="card m-4 spell" style={{width: 18 +'rem'}}>
	                        <div className="card-body">
	                            <h5 className="card-title">Spells: {spell.name}</h5>
	                            <h5 className="card-title">Description: {spell.description}</h5>
	                            <p className="card-text"></p>
	                        </div>
	                    </div>
    	);
	});
	useEffect(()=>getSpells(),[]);
	return ( 
		<>
	    		<Nav active="spell"/>
		<div className="container m-5 d-flex flex-row flex-lg-wrap justify-content-center align-content-center">
			{ spells }
		</div>
		</>
	)
}

