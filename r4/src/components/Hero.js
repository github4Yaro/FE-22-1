import {useState, useEffect} from "react";
import Nav from './Nav';



export default function Hero(){
	const heroesUrl = "https://hp-api.onrender.com/api/characters"

	const [heroesList, setHeroesList] = useState([]);

	const getHeroes = () => {
		fetch(heroesUrl).then((response) => {
	    	return response.json();
	  	}).then((data) => {
		   setHeroesList(data);
		});
	}
	const heroes = heroesList.map(hero => {
    	return (
    		
	    		<div className="card m-4" style={{width: 18 + 'rem'}}>
		           <img src={hero.image} className="card-img-top"/>
		            <div className="card-body">
		                <h5 className="card-title">Name: {hero.name}</h5>
		                <h5 className="card-title">Birthday: {hero.dateOfBirth}</h5>
		                <h5 className="card-title">Actor: {hero.actor}</h5>
		                <h5 className="card-title">House: {hero.house}</h5>
		                <p className="card-text"></p>
		            </div>
		        </div>
    	);
	});
	useEffect(()=>getHeroes,[]);
	return ( 
		<>
	    <Nav active='hero'/>
		<div className="container m-5 d-flex flex-row flex-lg-wrap justify-content-center align-content-center">
			{ heroes }
		</div>
		</>
	)
}

