// https://s3.amazonaws.com/raw-reviews-original/RESET+ALL+SETTINGS.lrtemplate

import React from 'react';

import BasicLayout from '../layouts/Basic';
import H1 from '../components/H1';
import QA from '../components/QA';

const Index = () => (
    <BasicLayout>
        <H1>Frequently Asked Questions</H1>

        <QA question="A question">
            A answer
        </QA>

        <QA question="A question">
            A answer
        </QA>

        <QA question="A question">
            A answer
        </QA>

        <QA question="A question">
            A answer
        </QA>

        <QA question="A question">
            A answer
        </QA>
    </BasicLayout>
);

export default Index;
