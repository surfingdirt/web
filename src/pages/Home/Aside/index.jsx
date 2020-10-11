/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';
import { albumRoute } from 'Utils/links';
import routes from '~/routes';

import ArticleItem from './ArticleItem';
import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;
const { ARTICLE_MBS_MATRIX_2_MODS } = routes;

const Aside = ({ className, t }) => {
  const ARTICLES = [
    {
      id: 'mbs-matrix-2-mods',
      date: '2020-10-10',
      description: t('matrixArticle'),
      link: ARTICLE_MBS_MATRIX_2_MODS,
      thumbnail:
        'https://apisurfingdirt.b-cdn.net/files/22b9b3af-4f7a-41bf-9fba-83018a44095b/img_tl.jpg',
      title: 'MBS Matrix II mods',
    },
    {
      id: '2020-4-down',
      date: '2020-09-14',
      description: t('the2020FourDown'),
      link: albumRoute('bf8bac1c-4a2a-42bb-a801-6d85a9ed49a3'),
      thumbnail:
        'https://apisurfingdirt.b-cdn.net/files/1525d0d6-9cdf-45a6-bc37-7bb9c2b1bad7/img_tl.jpg',
      title: 'Videos from the 2020 edition of the 4 Down Project',
    },
  ];

  return (
    <Card type={STANDARD} className={classnames(styles.wrapper, className)}>
      <ul className={styles.articles}>
        {ARTICLES.map((article) => (
          <li key={article.id} className={styles.articleListItem}>
            <ArticleItem data={article} />
          </li>
        ))}
      </ul>
    </Card>
  );
};

Aside.propTypes = {
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
};

Aside.defaultProps = {
  className: null,
};

export default Translate(messages)(Aside);
