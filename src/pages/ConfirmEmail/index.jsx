import React from 'react';
import queryString from 'query-string';
import { useMutation } from '@apollo/react-hooks';

import CONFIRM_EMAIL from 'Apollo/mutations/confirmEmail.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Heading, { headingTypes } from 'Components/Widgets/Heading';
import Spinner from 'Components/Widgets/Spinner';
import Translate from 'Hocs/Translate';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { ACTION } = buttonTypes;
const { STANDARD } = cardTypes;
const { SECONDARY } = headingTypes;
const { LOGIN } = routes;

const ConfirmEmail = ({ location, t }) => {
  const { id: userId, key: aK } = queryString.parse(location.search);
  const [confirm, { data, error, loading }] = useMutation(CONFIRM_EMAIL, {
    variables: { userId, input: { aK } },
  });

  let content = null;
  if (error) {
    content = <p>{t('couldNotConfirm')}</p>;
  }

  if (data) {
    content = (
      <>
        <p>{t('congratulations')}</p>
        <p>{t('nowWhat')}</p>
        <div className={styles.buttonWrapper}>
          <Button type={ACTION} href={LOGIN} label={t('signIn')} />
        </div>

        <article className={styles.thingsToDo}>
          <Heading type={SECONDARY}>{t('thingsTodo')}</Heading>
          <ol>
            <li>
              <p>{t('personalizeYourAccount')}</p>
              <ul>
                <li>{t('goToYourProfilePage')}</li>
                <li>{t('addCoverPhoto')}</li>
                <li>{t('addProfilePhoto')}</li>
              </ul>
            </li>
            <li>
              <p>{t('uploadPhotosOrVideos')}</p>
              <p>{t('weSupport')}</p>
            </li>
            <li>
              <p>{t('addAnAlbum')}</p>
              {/*<p>{t('privateAlbums')}</p>*/}
              {/*<p>{t('publicAlbums')}</p>*/}
            </li>
          </ol>
        </article>
      </>
    );
  }

  if (loading) {
    content = <Spinner />;
  }

  if (content) {
    return (
      <Card title={t('confirmation')} type={STANDARD}>
        {content}
      </Card>
    );
  }

  confirm();
  return null;
};

export default Translate(messages)(ConfirmEmail);
