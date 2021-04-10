import React, { useRef, useContext } from "react"
import logo from "../images/logo.png"
import search from "../images/search.png"
import axios from "axios"
import {MovieContext} from "../context/MovieContext"
import {useAuth0} from "@auth0/auth0-react"

function Header({setMovies, setFeatured, setPages}) {

    const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=4d4c958db9e1bbd812b389bf4ed3d98c&query="
    const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?api_key=4d4c958db9e1bbd812b389bf4ed3d98c"
    const [query, setQuery] = useContext(MovieContext)
    const queryRef = useRef()
    const {loginWithRedirect, logout, isAuthenticated} = useAuth0()

    function handleChange(e) {
        setQuery(e.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        setFeatured(false)
        setQuery(queryRef.current.value)
        axios(SEARCH_API + queryRef.current.value)
            .then(response => {
                setMovies(response.data.results)
                setPages(response.data.total_pages)
            })
    }

    function handleIconClick(e) {
        setFeatured(true)
        axios(FEATURED_API).then(response => {
            setMovies(response.data.results)
            setPages(response.data.total_pages)
        })
    }

    return (
        <div className="header">
            <img src={logo} alt="Netflix logo" className="netflix-logo" onClick={handleIconClick}/>
            <form className="search-bar" onSubmit={handleSubmit}>
                <input type="search" placeholder="Search" value={query} onChange={handleChange} aria-label="Search" className="search-input" ref={queryRef}/>
                <button type="submit" className="search-btn">
                    <img src={search} alt="search button"/>
                </button>
            </form>
            {
                isAuthenticated ? 
                    <button className="logout-btn" onClick={() => logout()}>Log Out</button>: 
                    <button className="login-btn" onClick={() => loginWithRedirect()}>Log In</button>
            }
        </div>
    )
}

export default Header