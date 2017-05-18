import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import Link from './Link';

import styleVars from '../css/vars';

const logout = () => {
    window.localStorage.removeItem('authtoken');
    window.location = '/api/logout';
};

const Container = styled.div`
    margin-bottom: 3rem;
`;

const LogoContainer = styled.div`
margin-bottom: 1rem;

@media (min-width: ${styleVars.breakpoints.sm}) {
    margin-bottom: 0;
}
`;

const LinksContainer = styled.div`
    > * {
        margin-right: 2rem;

        &:last-child {
            margin-right: 0
        }
    }
`;

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: typeof window !== 'undefined' &&
                window.localStorage.getItem('authtoken')
        };
    }

    render() {
        return (
            <Container className="row">
                <LogoContainer className="col-xs-12 col-sm-6 center-xs start-sm">
                    <Link href="/">
                        <Logo color={styleVars.colors.primary} />
                    </Link>
                </LogoContainer>

                <LinksContainer className="col-xs-12 col-sm-6 center-xs end-sm">
                    <Link color="link" href="/">
                        Home
                    </Link>
                    <Link color="link" href="/faq">
                        FAQ
                    </Link>
                    {this.state.auth &&
                        <Link color="link" href="/e/create">
                            Submit Edit
                        </Link>}
                    {!this.state.auth &&
                        <Link color="link" href="/login">
                            Login
                        </Link>}
                    {!this.state.auth &&
                        <Link color="link" href="/register">
                            Register
                        </Link>}
                    {this.state.auth &&
                        <Link color="link" onClick={logout}>
                            Logout
                        </Link>}
                </LinksContainer>
            </Container>
        );
    }
}
