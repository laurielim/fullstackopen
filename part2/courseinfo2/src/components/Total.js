import React from "react"

const Total = ({ course }) => {

    const totalExercises = course.parts.map((part)=>part.exercises).reduce((sum,rest)=>sum+rest,0);

    return(
      <p>total of exercises {totalExercises}</p>
    ) 
  }

export default Total