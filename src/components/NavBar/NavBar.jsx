import SearchBar from '../SearchBar/SearchBar.jsx';
import React from 'react';
import {  NavLink } from 'react-router-dom';
import style from "./NavBar.module.css"
import styles from "../generalStyles.module.css"
function NavBar({random, logOut,onSearch}){
    
    return (
        <div className={style.container}>
       
            <button className={style.button} onClick={random}>Random</button>
            <NavLink to='/about'>
            <button  className={style.button} >About</button>
            </NavLink>
            
            <NavLink to='/home'>
                <button className={style.button} >Home</button>
            </NavLink>

            <NavLink>
            <button   className={style.button} onClick={logOut}>Log Out</button>
            </NavLink>

            <NavLink to='/favorites'>
                <button  className={style.button}>Favorites</button>
            </NavLink>
           
        
<SearchBar 
         onSearch={onSearch}/>

         

        </div>

    )
} 

export default NavBar;