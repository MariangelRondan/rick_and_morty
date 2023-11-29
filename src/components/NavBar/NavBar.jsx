import SearchBar from '../SearchBar/SearchBar.jsx';
import React from 'react';
import {  NavLink } from 'react-router-dom';
import style from "./NavBar.module.css"

function NavBar(prop){
    
    return (
        <div className={style.container}>
       
            <button className={style.button} onClick={prop.random}>Random</button>
            <NavLink to='/about'>
            <button  className={style.button} >About</button>
            </NavLink>
            
            <NavLink to='/home'>
                <button className={style.button} >Home</button>
            </NavLink>

            <NavLink>
            <button   className={style.button} onClick={prop.logOut}>Log Out</button>
            </NavLink>

            <NavLink to='/favorites'>
                <button  className={style.button}>Favorites</button>
            </NavLink>
           
        
<SearchBar 
         onSearch={prop.onSearch}/>

         

        </div>

    )
} 

export default NavBar;