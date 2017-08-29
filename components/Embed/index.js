import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import config from '../../config';
import Card from '../../components/Card';
import Button from '../../components/Button';

const Well = styled(Card)`
    white-space: nowrap;
    overflow-x: auto;
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
                <h4>Embed on your site</h4>
                <Well>
                    {embedCode}
                </Well>
                <CopyToClipboard text={embedCode}>
                    <Button
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
                        {this.state.copied ? 'Copied!' : 'Copy to clipboard'}
                    </Button>
                </CopyToClipboard>
            </div>
        );
    }
}

export default Embed;
