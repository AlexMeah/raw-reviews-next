import React from 'react';
import Helmet from 'react-helmet';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

import BasicLayout from '../layouts/Basic';
import H1 from '../components/H1';
import Ad from '../components/Ad';
import Link from '../components/Link';

import config from '../config';
import styleVars from '../css/vars';

const Img = styled.img`
    width: 100%;
    height: auto;
    vertical-align: middle;
`;

const ImgLink = styled(Link)`
    display: block;
    height: 0;
    padding-bottom: 100%;
    box-shadow: ${styleVars.shadow};
    border-radius: ${styleVars.radius};
    overflow: hidden;
`;

const NextWrapper = styled.div`
    position: relative;
    display: block;
    height: 0;
    padding-bottom: 100%;
    font-weight: ${styleVars.font.bold};
    font-size: 2.3rem;
    box-shadow: ${styleVars.shadow};
    border-radius: ${styleVars.radius};
    height: 100%;
    background: ${styleVars.colors.primary};
    color: #fff;
    font-family: Oswald, sans-serif;
`;

const NextText = styled.svg`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    width: 100%;
`;

const tags = [
    'active',
    'advertising',
    'cold',
    'border',
    'station',
    'apartment',
    'exercise',
    'outside',
    'flower',
    'history',
    'technology',
    'church',
    'age',
    'coffee',
    'people',
    'drawing',
    'concert',
    'bicycle',
    'ticket',
    'bag',
    'dance',
    'window',
    'cash',
    'record',
    'angle',
    'eat',
    'building',
    'black',
    'city',
    'bar',
    'cat',
    'design',
    'conversation',
    'focus',
    'breakfast',
    'telephone',
    'fruit',
    'elevator',
    'pen',
    'corner',
    'guitar',
    'bell',
    'magazine',
    'brown',
    'celebration',
    'clock',
    'stranger',
    'piano',
    'grass',
    'crazy',
    'camera',
    'wine',
    'escape',
    'chair',
    'street',
    'alarm',
    'chocolate',
    'train',
    'university',
    'candle',
    'ring',
    'love',
    'entrance',
    'hair',
    'book',
    'light',
    'development',
    'ball',
    'soup',
    'cook',
    'pizza',
    'clothes',
    'cloud',
    'photo',
    'brick',
    'dare',
    'passion',
    'code',
    'face',
    'hotel',
    'apple',
    'smoke',
    'hat',
    'tree',
    'car',
    'hand',
    'movie',
    'bedroom',
    'water',
    'paper',
    'engine',
    'couple',
    'excitement',
    'reading',
    'animal',
    'afternoon',
    'dirt',
    'bottle',
    'foot',
    'dog',
    'park',
    'bed',
    'home',
    'distance',
    'table',
    'orange',
    'engineering',
    'yellow',
    'money',
    'safe',
    'art',
    'phone',
    'bench',
    'bird',
    'exit',
    'computer',
    'tea',
    'floor',
    'music',
    'device',
    'chain',
    'eye',
    'arm',
    'energy',
    'button',
    'bridge',
    'creative',
    'calm',
    'newspaper',
    'pipe',
    'memory',
    'food',
    'blank',
    'door',
    'night',
    'drink',
    'culture',
    'tourist',
    'bowl',
    'egg',
    'direction',
    'rush',
    'blue',
    'shopping',
    'dream',
    'watch',
    'dress',
    'cigarette'
];

const now = new Date();
const start = new Date(now.getFullYear(), 0, 0);
const diff = now - start;
const oneDay = 1000 * 60 * 60 * 24;
const day = Math.floor(diff / oneDay);

function Tag(tag, index) {
    const tagNumber = 140 + index;

    if (tagNumber > day) {
        return null;
    }

    return (
        <div key={tag} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb2">
            <ImgLink
                href={{
                    pathname: '/tag',
                    query: {
                        tags: [`${tagNumber}_${tag.toUpperCase()}`]
                    }
                }}
                as={`/tag/${tagNumber}_${tag.toUpperCase()}`}
            >
                <LazyLoad once>
                    <Img
                        src={`${config.cdn}/tag-of-the-day/${tag}.jpg`}
                        alt={`Project 365 #${tagNumber}_${tag.toUpperCase()}`}
                    />
                </LazyLoad>
            </ImgLink>
        </div>
    );
}

function NextUp() {
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb2">
            <NextWrapper>
                <NextText id="tagwedn">
                    <defs>
                        <mask id="sample" maskUnits="userSpaceOnUse">
                            <rect
                                id="mask-rect"
                                x="35%"
                                y="36%"
                                height="38"
                                width="80"
                                fill="#fff"
                            />
                            <text
                                id="text"
                                x="50%"
                                y="50%"
                                letterSpacing="0.03em"
                                alignmentBaseline="middle"
                                textAnchor="middle"
                                fontSize="20"
                                fontFamily="Oswald"
                                fontWeight="600"
                            >
                                #{day + 1}_?
                            </text>
                        </mask>
                    </defs>
                    <rect
                        id="wes"
                        fill="#fff"
                        width="100%"
                        height="100%"
                        mask="url(#sample)"
                        x="0"
                        y="0"
                    />
                </NextText>
            </NextWrapper>
        </div>
    );
}

const TagOfTheDay = props => (
    <BasicLayout>
        <Helmet>
            <title>{`${config.siteName} | Project 365`}</title>
            <meta
                name="description"
                content="Share your edits, post before and after pics and practice your editing with re-edits."
            />
            <link
                href="https://fonts.googleapis.com/css?family=Oswald:600&text=1234567890%23%3F"
                rel="stylesheet"
            />
        </Helmet>
        <Ad slot={3129031971} />
        <H1 className="tac">Project 365</H1>
        <div className="row middle-xs">
            {day < 366 && <NextUp />}
            {tags.map(Tag).reverse()}
        </div>
    </BasicLayout>
);

export default TagOfTheDay;
