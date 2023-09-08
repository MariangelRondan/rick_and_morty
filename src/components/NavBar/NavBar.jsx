import SearchBar from '../SearchBar/SearchBar.jsx';
import React from 'react';
import {  NavLink } from 'react-router-dom';


function NavBar(prop){
    
    return (
        <div>
           
            <button onClick={prop.random}>Random</button>
            <NavLink to='/about'>
            <button >About</button>
            </NavLink>
            
            <NavLink to='/home'>
                <button>Home</button>
            </NavLink>

            <NavLink>
            <button  onClick={prop.logOut}> Log Out</button>
            </NavLink>

            <NavLink to='/favorites'>
                <button>Favorites</button>
            </NavLink>
           
        
<SearchBar 
         onSearch={prop.onSearch}/>

         

        </div>

    )
} 

export default NavBar;