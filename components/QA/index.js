import React from 'react';
import styled from 'styled-components';

import Markdown from '../Markdown';
import H3 from '../H3';

const Container = styled.div``;

const Q = styled(H3)`
    cursor: pointer;
    user-select: none;
`;
const A = styled(Markdown)`
    display: ${props => (props.visible ? 'block' : 'none')}
`;

class QA extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        const { children, question } = this.props;

        return (
            <Container>
                <Q onClick={this.toggle}>{question}</Q>
                <A visible={this.state.visible}>
                    {children}
                </A>
            </Container>
        );
    }
}

export default QA;
