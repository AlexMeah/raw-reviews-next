import React from 'react';
import Link from 'next/link';

const linkStyle = {
    marginRight: 15
};

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: true
        };
    }

    componentDidMount() {
        this.setState({
            auth: window.localStorage.getItem('authtoken')
        });
    }

    render() {
        return (
            <div>
                <Link href="/">
                    <a style={linkStyle}>Home</a>
                </Link>
                <Link href="/about">
                    <a style={linkStyle}>About</a>
                </Link>
                {!this.state.auth &&
                    <Link href="/u/login">
                        <a style={linkStyle}>Login</a>
                    </Link>}
                {!this.state.auth &&
                    <Link href="/u/create">
                        <a style={linkStyle}>Register</a>
                    </Link>}
            </div>
        );
    }
}
