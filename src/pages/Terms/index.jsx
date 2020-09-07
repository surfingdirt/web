/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const Terms = ({ t }) => <Card>Terms of Service</Card>;

export default Translate(messages)(Terms);
