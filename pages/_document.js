import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import Helmet from 'react-helmet';

import '../css/global';

export default class MyDocument extends Document {
    static async getInitialProps({ renderPage }) {
        const page = renderPage();
        const styles = (
            <style
                dangerouslySetInnerHTML={{
                    __html: styleSheet
                        .rules()
                        .map(rule => rule.cssText)
                        .join('\n')
                }}
            />
        );
        return { ...page, styles, helmet: Helmet.rewind() };
    }

    render() {
        const htmlAttrs = this.props.helmet.htmlAttributes.toComponent();
        const bodyAttrs = this.props.helmet.bodyAttributes.toComponent();

        return (
            <html lang="en" {...htmlAttrs}>
                <Head>
                    <Helmet>
                        <meta
                            name="description"
                            content="Share your edits, post before and after pics and practice your editing with re-edits."
                        />
                    </Helmet>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta
                        name="google-site-verification"
                        content="mkM-b5KZOWo2v-eA_xrv6S1t6kQE8pZJFqDbs4oDSAg"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="57x57"
                        href="/static/apple-icon-57x57.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="60x60"
                        href="/static/apple-icon-60x60.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="72x72"
                        href="/static/apple-icon-72x72.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="76x76"
                        href="/static/apple-icon-76x76.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="114x114"
                        href="/static/apple-icon-114x114.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="120x120"
                        href="/static/apple-icon-120x120.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="144x144"
                        href="/static/apple-icon-144x144.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="152x152"
                        href="/static/apple-icon-152x152.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/static/apple-icon-180x180.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="192x192"
                        href="/static/android-icon-192x192.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/static/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="96x96"
                        href="/static/favicon-96x96.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/static/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/static/manifest.json" />
                    <meta name="msapplication-TileColor" content="#529AFB" />
                    <meta
                        name="msapplication-TileImage"
                        content="/static/ms-icon-144x144.png"
                    />
                    <meta name="theme-color" content="#529AFB" />
                    {this.props.helmet.title.toComponent()}
                    {this.props.helmet.meta.toComponent()}
                    {this.props.helmet.script.toComponent()}
                    <link
                        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600"
                        rel="stylesheet"
                    />
                    <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
                </Head>
                <body {...bodyAttrs}>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
