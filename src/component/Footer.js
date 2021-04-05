import React, { useState, useRef, useContext } from "react"
import {MovieContext} from "../context/MovieContext"
import axios from "axios"

function Footer({setMovies, pages, featured}) {

    const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=4d4c958db9e1bbd812b389bf4ed3d98c&query="
    const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?api_key=4d4c958db9e1bbd812b389bf4ed3d98c"
    const [currentPage, setCurrentPage] = useState(1)
    const pageRef = useRef();
    const [query] = useContext(MovieContext)

    function handleChange(e) {
        setCurrentPage(e.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (featured) {
            axios(FEATURED_API + "&page=" + pageRef.current.value)
                .then(response => setMovies(response.data.results))
        } else {
            axios(SEARCH_API + query + "&page=" + pageRef.current.value)
                .then(response => setMovies(response.data.results))
        }
    }

    return (
        <div className="footer">
            <form onSubmit={handleSubmit} className="page-form">
                <input type="number" value={currentPage} onChange={handleChange} aria-label="Page Number" className="page-input" placeholder="Go to page..." ref={pageRef}></input>
                <button className="page-btn">Go</button>
            </form>
        </div>
    )
}

export default Footer;