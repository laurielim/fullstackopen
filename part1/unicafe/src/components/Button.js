import React from "react";

const Button = ({update, state, setFn, text}) => <button onClick={()=>update(state, setFn)}>{text}</button>

export default Button