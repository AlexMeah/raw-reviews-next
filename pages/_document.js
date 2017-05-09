import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import Helmet from 'react-helmet';

import '../css/global';
import config from '../config';

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
                    <Helmet
                        htmlAttributes={{ lang: 'en' }}
                        titleTemplate={`%s | ${config.siteName}`}
                        meta={[
                            {
                                name: 'viewport',
                                content: 'width=device-width, initial-scale=1'
                            }
                        ]}
                    />
                    {this.props.helmet.title.toComponent()}
                    {this.props.helmet.meta.toComponent()}
                    <link
                        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,600"
                        rel="stylesheet"
                    />
                    <link
                        href="https://unpkg.com/flexboxgrid@6.3.1/dist/flexboxgrid.min.css"
                        rel="stylesheet"
                    />
                </Head>
                <body {...bodyAttrs}>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
