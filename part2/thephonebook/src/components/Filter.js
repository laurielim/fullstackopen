import React from "react"

const Filter = ({searchInput, searchHandler}) => {
    return <div>
        filter shown with <input type="text" value={searchInput} onChange={searchHandler}/>
    </div>

}

export default Filter