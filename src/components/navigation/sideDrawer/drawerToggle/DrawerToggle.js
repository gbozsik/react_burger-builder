import React from 'react'

const menu = (props) => (
    <button onClick={props.clicked}>{props.children}</button>
)

export default menu;