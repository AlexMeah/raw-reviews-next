import React from 'react';

export default ({ width = 136 }) => (
    <a
        href="https://creativecommons.org/licenses/by-nc/4.0/"
        target="_blank"
        rel="noreferrer noopener"
    >
        <svg
            width={width}
            viewBox="0 0 136 20"
            style={{ verticalAlign: 'middle' }}
        >
            <linearGradient id="b" x2="0" y2="100%">
                <stop offset="0" stopColor="#bbb" stopOpacity=".1" />
                <stop offset="1" stopOpacity=".1" />
            </linearGradient>
            <clipPath id="a">
                <rect width="136" height="20" rx="3" fill="#fff" />
            </clipPath>
            <g clipPath="url(#a)">
                <path fill="#555" d="M0 0h51v20H0z" />
                <path fill="#9f9f9f" d="M51 0h85v20H51z" />
                <path fill="url(#b)" d="M0 0h136v20H0z" />
            </g>
            <g
                fill="#fff"
                textAnchor="middle"
                fontFamily="DejaVu Sans,Verdana,Geneva,sans-serif"
                fontSize="11"
            >
                <text x="25.5" y="15" fill="#010101" fillOpacity=".3">
                    License
                </text>
                <text x="25.5" y="14">License</text>
                <text x="92.5" y="15" fill="#010101" fillOpacity=".3">
                    CC BY-NC 4.0
                </text>
                <text x="92.5" y="14">CC BY-NC 4.0</text>
            </g>
        </svg>
    </a>
);
