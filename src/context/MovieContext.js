import React, { createContext, useState } from "react"

export const MovieContext = createContext();

export function MovieProvider({children}) {

    const [query, setQuery] = useState("")

    return (
        <MovieContext.Provider value={[query, setQuery]}>
            {children}
        </MovieContext.Provider>
    )
}