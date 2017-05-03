import React from 'react';
import styled from 'styled-components';

import styleVars from '../../css/vars';

import Button from '../Button';

const SplitContainer = styled.div`
    font-size: 0;
    margin-bottom: 2rem;
`;

const SplitImage = styled.img`
    display: inline-block;
    border: 4px solid #fff;
    border-radius: ${styleVars.radius};
    margin: 1rem;
    width: calc(100% - 2rem);
    height: auto;

    @media (min-width: 620px) {
        width: calc(50% - 2rem);
        max-width: 50rem;
    }
`;

const SplitView = ({ before, after }) => (
    <SplitContainer>
        <SplitImage
            src={`https://s3.amazonaws.com/raw-reviews/reduced/${before}`}
            alt="before"
        />
        <SplitImage
            src={`https://s3.amazonaws.com/raw-reviews/reduced/${after}`}
            alt="after"
        />
    </SplitContainer>
);

const CompareContainer = styled.div`
    position: relative;
    font-size: 0;
    display: inline-block;
`;

const CompareBeforeImage = styled.img`
    display: block;
    max-height: 70vh;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
`;

const CompareAfterImageContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    height: 100%;
`;

const CompareImageInner = styled.div`
    position: relative;
    border: 4px solid #fff;
    border-radius: ${styleVars.radius};
`;

const CompareAfterImage = styled.img`
    display: block;
    height: 100%;
    width: auto;
    margin: 0 auto;
`;

const Container = styled.div`
    text-align: center;
    margin-bottom: 2rem;
`;

const CompareView = ({ before, after, width, update, maskWidth }) => (
    <CompareContainer>
        <CompareImageInner>
            <CompareBeforeImage
                src={`https://s3.amazonaws.com/raw-reviews/reduced/${before}`}
                alt="before"
            />
            <CompareAfterImageContainer
                style={{
                    width: `${width}%`
                }}
            >
                <CompareAfterImage
                    src={`https://s3.amazonaws.com/raw-reviews/reduced/${after}`}
                    alt="after"
                />
            </CompareAfterImageContainer>
        </CompareImageInner>

        <WidthSlider
            type="range"
            onChange={update}
            min="0"
            value={maskWidth}
            max="100"
            step="1"
        />
    </CompareContainer>
);

const WidthSlider = styled.input`
    -webkit-appearance:none;
    width:100%;
    height:2px;
    background: #fff;
    background-position:center;
    background-repeat:no-repeat;
    margin: 4rem auto;
    outline: none;

    &::-webkit-slider-thumb{
        -webkit-appearance:none;
        width:4rem;
        height:4rem;
        border-radius: 100%;
        background: ${styleVars.colors.primary};
        position:relative;
        border: 3px solid #fff;
        z-index:3;
        cursor: pointer;
    }
`;

class ImageCompare extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allowComparisonView: !this.props.disableComparison,
            maskWidth: 50,
            split: this.props.splitView || false
        };

        this.update = this.update.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    update(e) {
        this.setState({
            maskWidth: e.target.value
        });
    }

    toggle() {
        this.setState({
            split: !this.state.split
        });
    }

    render() {
        const { before, after } = this.props;

        return (
            <Container>
                {this.state.split
                    ? <SplitView before={before} after={after} />
                    : <CompareView
                        width={this.state.maskWidth}
                        before={before}
                        after={after}
                        update={this.update}
                        maskWidth={this.state.maskWidth}
                    />}

                <div />

                {this.state.allowComparisonView &&
                    <Button onClick={this.toggle}>
                        {this.state.split ? 'Comparison' : 'Split'} View
                    </Button>}
            </Container>
        );
    }
}

export default ImageCompare;
