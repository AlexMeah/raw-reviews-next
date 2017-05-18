import React from 'react';
import BasicLayout from '../layouts/Basic';

import isAuthed from '../hoc/isAuthed';

const Index = props => (
    <BasicLayout loggedIn={props.loggedIn}>
        <p>Hello about page</p>
    </BasicLayout>
);

export default isAuthed(Index);
