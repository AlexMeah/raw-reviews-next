import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import config from '../../config';
import Button from '../../components/Button';
import styleVars from '../../css/vars';

const Well = styled.div`
    background: #fff;
    max-width: 40rem;
    width: 100%;
    position: relative;
    padding: 2rem;
    box-shadow: ${styleVars.shadow};
    border-radius: ${styleVars.radius};
    word-wrap: break-word;
    hyphens: none;
    margin: 0 auto;
    user-select: none;
`;

const Pre = styled.pre`
    white-space: normal;
    cursor: default;
    margin: 0;
`;

const FloatingButton = styled(Button)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 20rem;
`;

class Embed extends Component {
    constructor() {
        super();

        this.state = {
            copied: false
        };
    }

    render() {
        const { id, before, after } = this.props;
        const embedCode = `<div class="raw-progress-embed" data-id="${id}" data-before="${before}" data-after="${after}"></div><script src="${config.embedUrl}"></script>`;

        return (
            <div>
                <h3>Embed on your site</h3>
                <Well>
                    <Pre>
                        {embedCode}
                    </Pre>
                    <CopyToClipboard text={embedCode}>
                        <FloatingButton
                            color="positive"
                            type="button"
                            onClick={() => {
                                this.setState({ copied: true }, () => {
                                    setTimeout(() => {
                                        this.setState({ copied: false });
                                    }, 1500);
                                });
                            }}
                        >
                            {this.state.copied
                                ? 'Copied!'
                                : 'Copy to clipboard'}
                        </FloatingButton>
                    </CopyToClipboard>
                </Well>
            </div>
        );
    }
}

export default Embed;
