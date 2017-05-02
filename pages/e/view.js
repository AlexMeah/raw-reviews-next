import 'isomorphic-fetch';
import { gql, graphql } from 'react-apollo';
import React from 'react';

import BasicLayout from '../../layouts/Basic';
import H1 from '../../components/H1';
import ExifView from '../../components/ExifView';
import ImageCompare from '../../components/ImageCompare';

import withData from '../../hoc/withData';

const Post = props => {
    if (props.data.loading) {
        return <p>Loading...</p>;
    }

    const edit = props.data.edit.edit;
    const exif = (props.data.exif.exif || {}).afterExif || { tags: {} };

    return (
        <BasicLayout>
            <H1 style={{ textAlign: 'center' }}>{edit.description}</H1>

            <ImageCompare before={edit.before} after={edit.after} />

            <ExifView {...exif.tags} />
        </BasicLayout>
    );
};

const editQuery = gql`
  query edit($editId: String!) {
      edit {
          edit(id: $editId) {
              id
              before
              after
              raw
              description
              createdAt
              userId
              votes {
                  ups
                  downs
              }
          }
      }
      exif {
          exif(editId: $editId) {
              afterExif {
                  imageSize {
                      width
                      height
                  }
                  tags {
                      fNumber
                      exposureTime
                      focalLength
                      focalLengthIn35mmFormat
                      iSO
                      lensModel
                      make
                      model
                      shutterSpeedValue
                      software
                  }
              }
          }
      }
  }
`;

export default withData(
    graphql(editQuery, {
        options: props => {
            const query = (props.url && props.url.query) || {};

            return {
                variables: {
                    editId: query.editId || props.editId || null,
                    userId: query.userId || props.userId || null
                }
            };
        }
    })(Post)
);
