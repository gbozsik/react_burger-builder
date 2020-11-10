import React from 'react'

import classes from './Layout.css'
import Aux from '../../hoc/Aux'
import Toolbar from '../navigation/toolbar/Toolbar'

const layout = (props) => (
    <Aux>
        <Toolbar/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;