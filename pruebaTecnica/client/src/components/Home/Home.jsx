
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { NavLink } from 'react-router-dom';
import { } from '../../actions';
import NavBar from '../Navbar/Navbar';
//import SearchBar from '../SearchBar/SearchBar';
import styles from "../../styles/Home.module.css"
import Tabs from "react-bootstrap/Tabs";
import HomeTask from '../HomeTask/HomeTask';

function Home() {


    return (
        <div>
            <NavBar />




            <HomeTask />



        </div>
    )
}



export default Home

