import Helmet from 'react-helmet';
import React from 'react';

// 3129031971

export default ({ slot }) => (
    <div>
        <Helmet
            script={[
                {
                    src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                    async: true
                }
            ]}
        />
        <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-8155196363770236"
            data-ad-slot={slot}
            data-ad-format="auto"
            data-ad-test="on"
        />
        <script
            dangerouslySetInnerHTML={{
                __html: '(adsbygoogle = window.adsbygoogle || []).push({});'
            }}
        />
    </div>
);
