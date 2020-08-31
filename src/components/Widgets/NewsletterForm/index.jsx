import React from 'react';
import PropTypes from 'prop-types';

import Button, { buttonTypes } from 'Components/Widgets/Button';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const formActionUrl =
  'https://surfingdirt.us16.list-manage.com/subscribe/post?u=9fec4c3436956eb6a87fee575&amp;id=5f4cbf0663';

const NewsletterForm = ({ t }) => (
  <form action={formActionUrl} method="post" className={styles.form} target="_blank">
    <label className={styles.label} htmlFor="mce-EMAIL">
      {t('emailAddress')}
    </label>
    <div className={styles.fields}>
      <input type="email" name="EMAIL" className={styles.email} id="mce-EMAIL" />

      <Button type={buttonTypes.ACTION} buttonType="submit" label={t('subscribe')} />
    </div>
    <div className={styles.mcPlumbing} aria-hidden="true">
      <input type="text" name="b_9fec4c3436956eb6a87fee575_5f4cbf0663" tabIndex="-1" value="" />
    </div>
  </form>
);

NewsletterForm.propTypes = { t: PropTypes.func.isRequired };

export default Translate(messages)(NewsletterForm);
