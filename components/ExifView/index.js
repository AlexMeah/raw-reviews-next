import React from 'react';
import styled from 'styled-components';
import CameraIcon from 'react-icons/lib/fa/camera-retro';
import EyeIcon from 'react-icons/lib/fa/eye';
import FileIcon from 'react-icons/lib/fa/file-image-o';

import ClockIcon from '../ClockIcon';
import ShutterIcon from '../ShutterIcon';
import ISOIcon from '../ISOIcon';
import H3 from '../H3';

const ExifView = styled.div`
    margin-bottom: 2rem;

    .col-sm-8,
    .col-sm-4 {
        margin-bottom: 1rem;

        &:nth-child(7),
        &:nth-child(8) {
            margin-bottom: 0;
        }
    }
`;

const ItemBase = styled.span`
display: inline-block;
vertical-align: middle;
margin-left: 1rem;
max-width: calc(100% - 5.4rem);
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`;

export default ({
    make,
    model,
    exposureTime,
    focalLength,
    focalLengthIn35mmFormat,
    iSO,
    software,
    fNumber,
    lensMake,
    lensModel
}) => {
    if (
        !make &&
        !model &&
        !exposureTime &&
        !focalLength &&
        !focalLengthIn35mmFormat &&
        !iSO &&
        !software &&
        !lensMake &&
        !lensModel
    ) {
        return null;
    }

    return (
        <div className="row">
            <H3>Exif</H3>
            <ExifView className="col-xs-12">
                <div className="row">
                    {make &&
                        <div className="col-xs-12 col-sm-4">
                            <div className="box">
                                <CameraIcon size={30} />
                                {' '}
                                <ItemBase>{make} {model}</ItemBase>
                            </div>
                        </div>}
                    {exposureTime &&
                        <div className="col-xs-12 col-sm-8">
                            <div className="box">
                                <ClockIcon size={30} />
                                {' '}
                                <ItemBase>{exposureTime}</ItemBase>
                            </div>
                        </div>}
                    {focalLength &&
                        <div className="col-xs-12 col-sm-4">
                            <div className="box">
                                <EyeIcon size={30} />
                                {' '}
                                <ItemBase>{focalLength}mm</ItemBase>
                            </div>
                        </div>}
                    {focalLengthIn35mmFormat &&
                        <div className="col-xs-12 col-sm-8">
                            <div className="box">
                                <EyeIcon size={30} />
                                {' '}
                                <ItemBase>
                                    {focalLengthIn35mmFormat}mm (Full Frame)
                                </ItemBase>
                            </div>
                        </div>}
                    {fNumber &&
                        <div className="col-xs-12 col-sm-4">
                            <div className="box">
                                <ShutterIcon size={30} />
                                {' '}
                                <ItemBase>ƒ/{fNumber}</ItemBase>
                            </div>
                        </div>}
                    {(lensMake || lensModel) &&
                        <div className="col-xs-12 col-sm-8">
                            <div className="box">
                                <EyeIcon size={30} />
                                {' '}
                                <ItemBase>{lensMake} {lensModel}</ItemBase>
                            </div>
                        </div>}
                    {iSO &&
                        <div className="col-xs-12 col-sm-4">
                            <div className="box">
                                <ISOIcon size={30} /> <ItemBase>{iSO}</ItemBase>
                            </div>
                        </div>}
                    {software &&
                        <div className="col-xs-12 col-sm-8">
                            <div className="box">
                                <FileIcon size={30} />
                                {' '}
                                <ItemBase>{software}</ItemBase>
                            </div>
                        </div>}
                </div>
            </ExifView>
        </div>
    );
};
