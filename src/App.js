import React, {useState, useEffect} from 'react';
import './App.css';
import MovieList from "./component/MovieList"
import Header from "./component/Header"
import Footer from "./component/Footer"
import axios from "axios"
import {MovieProvider} from "./context/MovieContext"


function App() {

  const [movies, setMovies] = useState([])
  const [pages, setPages] = useState(0)
  const [featured, setFeatured] = useState(true)

  useEffect(() => {
    axios(`https://api.themoviedb.org/3/discover/movie?api_key=4d4c958db9e1bbd812b389bf4ed3d98c`)
      .then(response => {
        setMovies(response.data.results)
        setPages(response.data.total_pages)
      })
  }, [])

  return (
    <MovieProvider>
      <div>
        <Header setMovies={setMovies} setFeatured={setFeatured} setPages={setPages}/>
        <MovieList movies={movies}/>
        <Footer setMovies={setMovies} pages={pages} featured={featured}/>
      </div>
    </MovieProvider>
  );
}


export default App;
