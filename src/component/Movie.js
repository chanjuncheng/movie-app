import React, { useEffect, useState } from "react"

function Movie({movie}) {

    let [ratingColor, setRatingColor] = useState("")

    useEffect(() => {
        if (movie.vote_average >= 8.0)
            setRatingColor("green")
        else if (movie.vote_average >= 5.0 && movie.vote_average < 8.0) 
            setRatingColor("yellow")
        else
            setRatingColor("red")
    }, [movie.vote_average])

    return (
        <div className="movie">
            <div className="movie-info">
                <img src={"https://image.tmdb.org/t/p/w1280/" + movie.poster_path} className="movie-img" alt="Movie poster"/>
                <p>{movie.title}</p>
                <p style={{color: ratingColor}}>Rating: {movie.vote_average}</p>
                <div className="movie-summary">
                    <h2>Summary:</h2>
                    <p>{movie.overview}</p>
                </div>
            </div>
        </div>
    )

}


export default Movie;