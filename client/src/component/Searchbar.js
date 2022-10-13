import React, { useState, useEffect,useContext } from 'react';
import { BiSearch } from 'react-icons/bi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UseAxios } from '../hooks/UseAxios';
import { ImageContext } from "../App";


function Searchbar() {
    
    const {setSearch} = useContext(ImageContext);
    
    const [input_se, setInput_se] = useState("Nature");

    
    const search_click = () => {
        setSearch(input_se)
    }
    const handlesearch = (e) => {
        setInput_se(e.target.value)
    };
    
    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            setSearch(e.target.value)
        }
    };



    return (
        <div className='text-center p-5'>
            <h1>Find images</h1>
            <input type="text"  placeholder="Search Images..." className='form-control' onChange={handlesearch} onKeyDown={handleEnterSearch} />
            <button className='btn btn-info m-2' onClick={search_click} ><BiSearch /></button>
        </div>
    );
}

export default Searchbar