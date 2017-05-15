import Helmet from 'react-helmet';
import React from 'react';

export default ({ slot }) => {
    if (process.env.NODE_ENV === 'dev') {
        return null;
    }

    return (
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
};
