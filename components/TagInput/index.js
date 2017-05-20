import React from 'react';
import styled from 'styled-components';

import styleVars from '../../css/vars';
import H3 from '../H3';

const Container = styled.label`
    display: block;
    max-width: 50rem;
    margin: 0 auto;
    text-align: center;
`;

const Error = styled.div`
    color: ${styleVars.colors.negative};
    font-weight: ${styleVars.font.bold};
    margin-bottom: 2rem;
`;

const Tag = styled.span`
    display: inline-block;
    background: ${styleVars.colors.primary};
    box-shadow: ${styleVars.shadow};
    border-radius: ${styleVars.radius};
    color: #fff;
    padding: 1.5rem 2rem;
    line-height: normal;
    margin: 0 1rem 2rem;
    cursor: pointer;
`;

const TagInputEl = styled.input`
    border: 0;
    box-shadow: ${styleVars.shadow};
    border-radius: ${styleVars.radius};
    padding: 1.5rem 2rem;
    font-size: inherit;
    outline: none;
    width: 100%;
    max-width: 50rem;
    margin-bottom: 2rem;
    text-transform: uppercase;
`;

const settings = {
    addKeys: [13, 9],
    removeKeys: [8],
    maxTags: 10
};

class TagInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            value: '',
            error: ''
        };

        this._onKeyPress = this._onKeyPress.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    _onChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    _onKeyPress(e) {
        const key = e.keyCode;

        const val = (e.target.value || '').toUpperCase();
        const empty = val === '';
        const isRemoveKey = settings.removeKeys.indexOf(key) !== -1;
        const isAddKey = settings.addKeys.indexOf(key) !== -1;

        if (!isRemoveKey && !isAddKey) {
            return;
        }

        if (isAddKey) {
            e.preventDefault();
        }

        if (this.state.tags.length === settings.maxTags && isAddKey) {
            return this.setState({
                error: `Sorry we only allow up to ${settings.maxTags} tags`
            });
        }

        if (empty && isRemoveKey) {
            const tags = this.state.tags.slice(0, -1);

            return this.setState(
                {
                    tags,
                    error: tags.length === settings.maxTags
                        ? this.state.error
                        : ''
                },
                () => {
                    this.props.onChange(this.state.tags);
                }
            );
        }

        if (!empty && isAddKey) {
            const shouldAdd = this.state.tags.indexOf(val) === -1;

            return this.setState(
                {
                    value: shouldAdd ? '' : this.state.value,
                    tags: shouldAdd
                        ? [...this.state.tags, val]
                        : this.state.tags
                },
                () => {
                    if (shouldAdd) {
                        this.props.onChange(this.state.tags);
                    }
                }
            );
        }
    }

    _removeTag(t) {
        return () => {
            this.setState({
                tags: this.state.tags.filter(v => v !== t),
                error: ''
            });
        };
    }

    render() {
        return (
            <Container>
                <H3>Tags (optional)</H3>
                {this.state.tags.map(t => (
                    <Tag onClick={this._removeTag(t)} key={t}>{t} ×</Tag>
                ))}
                <TagInputEl
                    value={this.state.value}
                    onKeyDown={this._onKeyPress}
                    onChange={this._onChange}
                />
                {this.state.error && <Error>{this.state.error}</Error>}
            </Container>
        );
    }
}

export default TagInput;
