import React from "react"

const Total = ({ course }) => {

    const totalExercises = course.parts.map((part)=>part.exercises).reduce((sum,rest)=>sum+rest,0);

    return(
      <p><strong>total of {totalExercises} exercises</strong></p>
    ) 
  }

export default Total