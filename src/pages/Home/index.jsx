/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

import HOMEPAGE from 'Apollo/queries/homepage.gql';
import ErrorMessage from 'Components/ErrorMessage';
import Section from 'Components/Section';
import LiveShelf from 'Components/ShelfRenderers/LiveShelf';
import VODShelf from 'Components/ShelfRenderers/VODShelf';
import Spinner from 'Components/Spinner';
import Translate from 'Hocs/Translate';
import { getIdFromCategoryName } from 'Utils/shelfUtils';
import { LIVE, HIGHLIGHTS, VIDEO_ON_DEMAND } from '~/categories';

import messages from './messages';

const colCountMap = {
  [LIVE]: 4,
  [HIGHLIGHTS]: 4,
  [VIDEO_ON_DEMAND]: 3,
};

const sections = [
  {
    label: 'Live',
    category: LIVE,
    isLive: true,
    pagination: {},
    items: [
      {
        title: 'Live video 1',
        description: 'This video is about something',
        id: '123456789',
        liveStatus: 'live',
        startDate: '2019-03-16T19:00:00+01:00',
      },
      {
        title: 'Second live video',
        description: 'This video is about something else',
        id: '234567891',
        liveStatus: 'live',
        startDate: '2019-03-16T19:00:00+01:00',
      },
      {
        title: 'One more live video right now',
        description: 'TOTO vs TATA',
        id: '345678912',
        liveStatus: 'notLive',
        startDate: '2019-03-16T19:00:00+01:00',
      },
      {
        title: 'Incredible',
        description: "Men's Round 1",
        id: '456789123',
        liveStatus: 'notLive',
        startDate: '2019-03-16T19:00:00+01:00',
      },
    ],
  },
  {
    label: 'Video On Demand',
    category: VIDEO_ON_DEMAND,
    isLive: false,
    pagination: {},
    items: [
      {
        title: 'Live video 1',
        description: 'This video is about something',
        id: '567891234',
      },
      {
        title: 'Second live video',
        description: 'This video is about something else',
        id: '678912345',
      },
      {
        title: 'One more live video right now',
        description: 'TOTO vs TATA',
        id: '789123456',
      },
      {
        title: 'Incredible',
        description: "Men's Round 1",
        id: '891234567',
      },
    ],
  },
  {
    label: 'Highlights',
    category: HIGHLIGHTS,
    isLive: false,
    pagination: {},
    items: [
      {
        title: 'Live video 1',
        description: 'This video is about something',
        id: '567891234',
      },
      {
        title: 'Second live video',
        description: 'This video is about something else',
        id: '678912345',
      },
      {
        title: 'One more live video right now',
        description: 'TOTO vs TATA',
        id: '789123456',
      },
      {
        title: 'Incredible',
        description: "Men's Round 1",
        id: '891234567',
      },
    ],
  },
];

const Index = ({ t }) => {
  return (
    <Query query={HOMEPAGE}>
      {({ loading, error }) => {
        if (loading) return <Spinner />;
        if (error) return <ErrorMessage />;
        return (
          <Fragment>
            {sections.map(({ label, category, isLive, items }) => {
              const Renderer = isLive ? LiveShelf : VODShelf;
              const rest = isLive ? {} : { label };
              return (
                <Section id={getIdFromCategoryName(category)} key={category} {...rest}>
                  <Renderer items={items} colCount={colCountMap[category]} />
                </Section>
              );
            })}
          </Fragment>
        );
      }}
    </Query>
  );
};

Index.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

export const Home = Translate(messages)(Index);
