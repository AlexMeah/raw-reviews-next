import React from 'react';
import styled from 'styled-components';

import Link from './Link';
import CCLogo from './CCLogo';

const Container = styled.div`
    margin-top: 5rem;

    .tac {
        margin-top: 2rem;
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
                <div className="col-xs-12 center-xs">
                    <Link color="link" href="/privacy-policy">
                        Privacy
                    </Link>
                    <span> | </span>
                    <Link color="link" href="/terms">
                        Terms
                    </Link>
                </div>
                <div className="col-xs-12 tac">
                    <CCLogo />
                </div>
            </Container>
        );
    }
}
