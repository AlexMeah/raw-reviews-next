import React from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Container = styled.div`
    padding: 3rem;
`;

const Layout = ({ children, ...rest }) => (
    <Container {...rest}>
        <Header />
        {children}
        <Footer />
    </Container>
);

export default Layout;
