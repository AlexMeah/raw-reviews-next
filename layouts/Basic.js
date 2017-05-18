import React from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import Footer from '../components/Footer';
import withAnalytics from '../hoc/withAnalytics';

const Container = styled.div`
    padding: 3rem;
`;

const Layout = ({ children, loggedIn, ...rest }) => (
    <Container {...rest}>
        <Header loggedIn={loggedIn} />
        {children}
        <Footer />
    </Container>
);

export default withAnalytics(Layout);
