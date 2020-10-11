import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Date from 'Components/Widgets/Date';
import Paragraph from 'Components/Widgets/Paragraph';
import Heading, { headingTypes } from 'Components/Widgets/Heading';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const { SECONDARY } = headingTypes;

const ArticleItem = ({ className, t, locale, data }) => {
  const { date, description, link, thumbnail, title } = data;
  return (
    <Link className={classnames(styles.articleItem, className)} to={link}>
      <img src={thumbnail} alt="" />
      <Heading className={styles.articleTitle} type={SECONDARY}>
        {title}
      </Heading>
      <Paragraph className={styles.articleDescription}>{description}</Paragraph>
      <Date className={styles.articleDate} date={date} locale={locale} />
    </Link>
  );
};

ArticleItem.propTypes = {
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
};

ArticleItem.defaultProps = {
  className: null,
};

export default Translate(messages)(ArticleItem);
