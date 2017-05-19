import React from 'react';
import styled, { keyframes } from 'styled-components';

import styleVars from '../../css/vars';

const scale = keyframes`
    0% {
        opacity: 0.3;
        transform: scale(0);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

const Message = styled.div`
    animation: ${scale} 0.3s ease-in;
    border-radius: ${styleVars.radius};
    box-shadow: ${styleVars.shadow};
    background: ${styleVars.colors.primary};
    padding: 2rem 3rem;
    color: #fff;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 600;
    cursor: pointer;

    p {
        margin: 0
    }
`;

class Welcome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };

        this._hide = this._hide.bind(this);
    }

    componentDidMount() {
        this.setState(
            {
                show: !window.localStorage.getItem('msg-welcome-shown') &&
                    !window.localStorage.getItem('authtoken')
            },
            () => {
                if (this.state.show) {
                    window.localStorage.setItem('msg-welcome-shown', true);
                }
            }
        );
    }

    _hide() {
        this.setState({
            show: false
        });
    }

    render() {
        if (this.state.show) {
            return (
                <Message onClick={this._hide}>
                    Hey, thanks for checking out the site! Take a look around, share some edits and vote your favourites to the top.
                </Message>
            );
        }

        return null;
    }
}

export default Welcome;
