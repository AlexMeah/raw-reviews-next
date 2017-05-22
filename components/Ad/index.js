import Helmet from 'react-helmet';
import React from 'react';

class Ad extends React.Component {

    componentDidMount() {
        if (window)  {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }

    render() {
        const { slot } = this.props;

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
                <div className="col-xs-12">
                    <ins
                        className="adsbygoogle"
                        style={{ display: 'block', marginBottom: '2rem' }}
                        data-ad-client="ca-pub-8155196363770236"
                        data-ad-slot={slot}
                        data-ad-format="auto"
                    />
                </div>
            </div>
        );
    }
}

export default Ad;
