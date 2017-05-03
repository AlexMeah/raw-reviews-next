import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import Link from './Link';

const logout = () => {
    window.localStorage.removeItem('authtoken');
    window.location = '/api/logout';
};

const Container = styled.div`
    margin-bottom: 3rem;
    
    @media (min-width: 620px) {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`;

const LogoContainer = styled.div`
    text-align: center;

    @media (min-width: 620px) {
        width: 200px;
        text-align: left;
    }
`;

const LinksContainer = styled.div`
    > * {
        margin-right: 2rem;

        &:last-child {
            margin-right: 0
        }
    }

    @media (min-width: 620px) {
        flex: 1;
        text-align: right;
    }
`;

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: true
        };
    }

    componentDidMount() {
        this.setState({
            auth: window.localStorage.getItem('authtoken')
        });
    }

    render() {
        return (
            <Container>
                <LogoContainer>
                    <Link href="/">
                        <Logo />
                    </Link>
                </LogoContainer>

                <LinksContainer>
                    <Link color="link" href="/">
                        Home
                    </Link>
                    <Link color="link" href="/about">
                        About
                    </Link>
                    <Link color="link" href="/faq">
                        FAQ
                    </Link>
                    {this.state.auth &&
                        <Link color="link" href="/e/create">
                            Submit Edit
                        </Link>}
                    {!this.state.auth &&
                        <Link color="link" href="/u/login">
                            Login
                        </Link>}
                    {!this.state.auth &&
                        <Link color="link" href="/u/create">
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
