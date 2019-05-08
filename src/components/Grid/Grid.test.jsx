import React from 'react';
import contexts from '~/contexts';

import Grid from './index';

const { AppContext } = contexts;

const items = [
  {
    id: '8dda478e-342b-44f1-b6d8-3a99278efbf0',
    name: 'ByOAo6wtG',
    description: null,
    url:'toto',
    poster: 'tata',
  },
  {
    id: '9bca784d-212a-32f9-d8b6-2b77648deae8',
    name: 'H1VXq1bX7',
    description: null,
    url: null,
    poster: 'titi',
  },
];

const contextValue = { availableLanguages: ['en'], language: 'en' };

const Card = ({ item }) => {
  return (
    <div>
      <img style={{ width: '100%' }} src={item.poster} alt={`item #${item.id}`} />
    </div>
  );
};

describe('Grid', () => {
  it('type "col3" should render a grid with 3 items', () => {
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Grid type="col3" items={items} resourceType="video" renderer={Card} />
      </AppContext.Provider>,
    );
    expect(wrapper).toMatchSnapshot();

    const grid = wrapper.find('div.col3');
    expect(grid.children()).toHaveLength(3);
  });

  it('type "col4" should render a grid with 4 items', () => {
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Grid type="col4" items={items} resourceType="video" renderer={Card} />
      </AppContext.Provider>,
    );
    expect(wrapper).toMatchSnapshot();

    const grid = wrapper.find('div.col4');
    expect(grid.children()).toHaveLength(4);
  });
});
