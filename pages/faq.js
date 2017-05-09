import React from 'react';
import Helmet from 'react-helmet';

import config from '../config';

import BasicLayout from '../layouts/Basic';
import H1 from '../components/H1';
import QA from '../components/QA';

const Index = () => (
    <BasicLayout>
        <Helmet>
            <title>Frequently Asked Questions</title>
        </Helmet>
        <H1 className="tac">Frequently Asked Questions</H1>

        <QA question="Why can't I see my upload in the feed?">
            We cache the feeds for upto 30 seconds so our servers don't melt, try refreshing :)
        </QA>

        <QA question="I already edited my photo how can I save the before?">
            Download [this]({`${config.cdn}/RESET+ALL+SETTINGS.lrtemplate`})
            lightroom preset and apply it to your edited image, it will reset
            {' '}
            all develop changes except crop. Don't worry you can undo it right after.
        </QA>

        <QA question="Why can't we upload a screenshot of our settings?">
            Because anyone can copy some settings, we hope that you'll instead
            {' '}
            study the edit and description and learn how achieve the edit
            {' '}
            yourself.
        </QA>
    </BasicLayout>
);

export default Index;
