import React from 'react';
import styled from 'styled-components';

import Header from '../components/Header';

const Container = styled.div`
    padding: 3rem;
`;

const Layout = props => (
    <Container>
        <Header />
        {props.children}
    </Container>
);

export default Layout;
