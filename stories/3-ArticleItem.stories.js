import React from 'react';

import ArticleItem from '../src/pages/Home/Aside/ArticleItem';

export default {
  title: 'ArticleItem',
};

const BASIC_ITEM = {
  date: '2020-10-10',
  description: 'Leon Dove makes modifications to the MBS Matrix IIs',
  id: 'mbs-matrix-2-mods',
  link: 'link-to-an-article',
  title: 'MBS Matrix II mods',
  thumbnail:
    'https://apisurfingdirt.b-cdn.net/files/22b9b3af-4f7a-41bf-9fba-83018a44095b/img_tl.jpg',
};

export const Basic = () => <ArticleItem className="toto" data={BASIC_ITEM} />;
