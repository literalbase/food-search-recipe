import React, { useState } from 'react';
import './App.css';
import Axios from "axios";
import Recipe from "./Components/recipe"
import { v4 as uuidv4 } from "uuid";
import Alert from "./Components/Alert";

function App() {

  const [query,setQuery] = useState("")
  const [recipes , setRecipes] = useState([]) ;
  const [alert, setAlert] = useState("");


 

const APP_ID = "90051aaf";
const APP_KEY = "6c98154698a880eac5537c2aefa8a8b6"

  const Url =`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;


  const getData = async() =>{

    if (query !==""){
      const result = await Axios.get(Url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      setRecipes(result.data.hits);
  
      console.log(result);
      
      setQuery("");
      setAlert("");
      
  }

  else {
    setAlert("Please fill the form");
       }
  } ;

  const onSubmit = (e) =>{
    e.preventDefault();
    getData();

  }
  const onChange = (e) =>{
    setQuery(e.target.value)
  }

  return (
    <div className="food-app-heading">
     <h1>Search Food Recipe</h1>
     <form className = "search-form"
      onSubmit = {onSubmit}>

         {alert !== "" && <Alert alert={alert} />}

       <input type="text" 
       placeholder = "Search Food"  
       autoComplete = "off" 
        onChange = {onChange}
          value ={query}
        />
       <input type = "submit" value = "search" />
     </form>
     
<div className= "recipes"> 
   {recipes !==[] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
</div>

    </div>
  );
}

export default App;
