import React from 'react';
import Helmet from 'react-helmet';

import config from '../config';
import BasicLayout from '../layouts/Basic';
import Markdown from '../components/Markdown';
import H1 from '../components/H1';

const Index = () => (
    <BasicLayout>
        <Helmet>
            <title>{`${config.siteName} | Privacy Policy`}</title>
        </Helmet>
        <div className="readable">
            <H1>Privacy Policy</H1>
            <Markdown>
                {`
Raw Reviews provides this Privacy Policy to let you know about our policies and procedures regarding the collection, use and disclosure of information through rawreviews.co (the “ Website”), and any other websites, features, applications, widgets or online services that are owned or controlled by Raw Reviews and that post a link to this Privacy Policy (together with the Website, the “Service”), as well as any information Raw Reviews collects offline in connection with the Service.

Please note that we combine the information we collect from you from the Website, and through the Service generally, or offline. By accessing the Website, you are consenting to the collection and the use of your information by Raw Reviews, but only to the extent described herein. Should you wish to revoke your consent, you may do so in accordance with the provisions of Section 5 below.

## Security of Your Information

Raw Reviews takes reasonable steps to help protect and secure the information it collects and stores about Raw Reviews Users.Therefore, when we collect or use your information, we will utilize commercially reasonable safeguards to ensure its protection. We encrypt the transmission of your information using secure socket layer technology (SSL). We also use HTTP strict transport security to add an additional layer of protection for our Users. But please remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. Should any breach of your Personal Information occur, we will inform you as soon as reasonably possible, as required by applicable law.

## Information Collection

We collect information at various points in the Website to facilitate the experience for our Users. The types of the information collected are the following:

Personal Information: In the course of using the Service (whether as a Client or a Team member), we may require or otherwise collect information that identifies you as a specific individual. Personal Information may include your name, email address, phone number, postal address, payment information such as credit card, PayPal or bank account information, billing address, and resume/portfolio info.This type of information will not be collected without your consent. We will only collect Personal Information to the extent necessary for the purposes mentioned in Section 3, and we specifically acknowledge that we will not use your Personal Information for any other purposes without your consent.

Non-Personal Information: Upon accessing the Website, non-personal information such as IP address, referring sites, demographic data, information regarding your use of the Service, and general project-related data (“Non-Personal Information”) will be automatically collected without your knowledge or consent. We use Non-Personal Information to examine our traffic and to view how our customers use the Website. This type of information will not allow you to be personally identified.

For example, we use “cookies”, which contains only certain statistical information. You can instruct your computer to inform you whenever a cookie is being sent, or you can disallow cookies through your web browser. If you do choose to disallow cookies, your experience on the Website may be diminished, or your ability to choose some of the options on the Website may be limited.

You can also examine any of your Personal Information that we collect. Should you wish to examine such information, please send us a written request to support@rawreviews.co. In certain cases, we may not be able to provide you with access to all of your Personal Information (ex: if the information you request also relates to the Personal Information of another user)

## Use And Retention Of Information

The information collected will be used:

*   To administer and develop our business relationship with you and, if applicable, the company you represent;
*   To provide and improve the Service, complete your transactions, and address your inquiries, process your registration, verify the information you provide is valid and for compliance and internal business purposes;
*   To contact you with administrative communications, newsletters, marketing or promotional materials and other information that may be of interest to you.
*   To improve your experience and offers we may present to you;
*   Or for any other purposes disclosed at the time you provide your information, with your consent, and as further described in this Privacy Policy.
*   Unless you request that we delete certain information, we retain the information we collect for at least 5 years and may retain the information for as long as needed for our business and legal purposes.

## Sharing Information

We will not sell, rent or disclose information we collect to outside parties, save and except that we may share the collected information with other parties as follows:

Service Providers: We may share the information we collected with service providers with whom we have service level agreements to facilitate the functioning of the Website. These services may include credit card processing, maintenance and database management, analytics, fraud detection, and online advertising services. We make sure that our service providers have the same level of privacy protection as we have, and therefore we expect that your information will be handled with the same level of care that we employ.

Project Teams or Clients: We reserve the right to share all information of our Teams with the projects’ Clients. We may also share information of a Client with Teams related with the project in case the Client requests otherwise.

Legal Authorities: We may share the collected where required by law, specifically in response to a demand from legal courts or other government authorities.

## Withdrawal of Consent or Opting Out

You may withdraw your consent to the collection of Personal Information or opt-out of receiving marketing emails from us at any time by sending a written request to support@rawreviews.co. Upon receiving notice, we will stop using your Personal Information within a reasonable time, which will vary depending on what information we have collected and for what purpose. Please note that we will send you an email confirmation upon receipt of your request. Therefore, if you do not receive a confirmation email, please contact us again with your request. If you do choose to withdraw such consent, your experience on the Website may be diminished, or your ability to choose some of the options on the Website or the services provided therein may be limited.

## External Links

The Website contains links and references to other websites. We are not responsible for the collection, use and disclosure of information, or the privacy practices of such websites, and we expressly disclaim any liability relating thereto.

## International Transfer

Your information may be transferred and maintained on computers located outside of your jurisdiction, where privacy laws may not be as protective as your jurisdiction. Your consent to this Privacy Policy represents your consent to any such transfer.

## Terms of Use

This Privacy Policy is incorporated into and forms part of the Terms of Use, which outlines the terms and conditions you agree to when accessing and using the Website, and which can be found at [rawreviews.co/terms](/terms)

## Persons Under 18

The Website is not marketed toward persons under the age of 18\. If Raw Reviews discovers that it has inadvertently collected Personal Information about individuals under the age 18, it will promptly delete such information.
`}
            </Markdown>
        </div>
    </BasicLayout>
);

export default Index;
