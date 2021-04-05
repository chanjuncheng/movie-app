import React from "react"
import Movie from "./Movie"

function MovieList({movies}) {

    return (
        <div className="movie-grid">
            {
                movies.map((movie) => {
                    if (movie.poster_path && movie.overview) {
                        return <Movie key={movie.id} movie={movie}></Movie>
                    }
                    return null
                }) 
            }
        </div>
    )
}

export default MovieList;