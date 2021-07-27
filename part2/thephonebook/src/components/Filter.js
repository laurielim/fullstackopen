import React from "react"

const Filter = ({searchInput, handleSearch}) => {
    return <div>
        filter shown with <input type="text" value={searchInput} onChange={handleSearch}/>
    </div>

}

export default Filter