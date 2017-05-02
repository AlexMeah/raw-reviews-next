import React from 'react';
import styled from 'styled-components';

import Card from '../Card';

const ExifView = styled(Card)`
    margin-bottom: 2rem;
`;

const ItemBase = styled.div`
margin-bottom: 1rem;

&:last-child {
    margin-bottom: 0;
}
`;

const Camera = styled(ItemBase)`
`;

export default ({
    make,
    model,
    exposureTime,
    focalLength,
    focalLengthIn35mmFormat,
    iSO,
    software
}) => {
    if (
        !make &&
        !model &&
        !exposureTime &&
        !focalLength &&
        !focalLengthIn35mmFormat &&
        !iSO &&
        !software
    ) {
        return null;
    }

    return (
        <ExifView>
            {make &&
                model &&
                <Camera>
                    <strong>Camera:</strong> {make} {model}
                </Camera>}

            {exposureTime &&
                <ItemBase>
                    <strong>Shutter speed:</strong> {exposureTime}
                </ItemBase>}

            {iSO &&
                <ItemBase>
                    <strong>ISO:</strong> {iSO}
                </ItemBase>}

            {focalLength &&
                <ItemBase>
                    <strong>Focal length:</strong> {focalLength}
                </ItemBase>}

            {focalLengthIn35mmFormat &&
                <ItemBase>
                    <strong>Focal length (50mm):</strong>
                    {' '}
                    {focalLengthIn35mmFormat}
                </ItemBase>}

            {software &&
                <ItemBase>
                    <strong>Software:</strong> {software}
                </ItemBase>}
        </ExifView>
    );
};
