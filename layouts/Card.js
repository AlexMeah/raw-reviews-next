import React from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import Card from '../components/Card';

const Container = styled.div`
    padding: 3rem;
`;

const Layout = props => (
    <Container>
        <Header />
        <Card>
            {props.children}
        </Card>
    </Container>
);

export default Layout;
