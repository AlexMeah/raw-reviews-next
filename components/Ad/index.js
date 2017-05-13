import Helmet from 'react-helmet';
import React from 'react';

// 3129031971

export default ({ slot }) => (
    <div className="row center-xs">
        <Helmet
            script={[
                {
                    src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                    async: true
                }
            ]}
        />
        <ins
            className="adsbygoogle col-xs-12"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-8155196363770236"
            data-ad-slot={slot}
            data-ad-format="auto"
        />
        <script
            dangerouslySetInnerHTML={{
                __html: '(adsbygoogle = window.adsbygoogle || []).push({});'
            }}
        />
    </div>
);
