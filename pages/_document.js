import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import styleSheet from 'styled-components/lib/models/StyleSheet';

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
        return { ...page, styles };
    }

    render() {
        return (
            <html lang="en">
                <Head>
                    <title>My page</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link
                        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,600"
                        rel="stylesheet"
                    />
                    <link
                        href="https://unpkg.com/flexboxgrid@6.3.1/dist/flexboxgrid.min.css"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
