/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import Header, { headerTypes } from 'Components/Header';
import Paragraph from 'Components/Paragraph';
import Logo from 'Components/Logo';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { PRIMARY } = headerTypes;

class AboutRaw extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    const { title } = this.context;

    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Logo title={title} />
        </header>

        <div className={styles.content}>
          <Header type={PRIMARY} className={styles.title}>
            Surfing Dirt is back!
          </Header>

          <section className={styles.section1}>
            <Paragraph widthDropCap>
              Remember before Facebook? There were so many resources for mountainboarding online.
              Forums, websites, photo galleries… Where are those now? The sad answer is they’re
              mostly gone. Facebook has made it so easy to post photos and videos and share them
              that people slowly stopped using other sites. That’s actually what happened to{' '}
              <a href="https://www.surfingdirt.com/forum">the old Surfing Dirt forum</a>!
            </Paragraph>

            <Paragraph>
              When you meet someone who seems genuinely excited to try mountainboarding, where do
              you send them? To a Facebook group, maybe? Sure there are many mountainboard groups on
              Facebook, and a lot of people use them. But they feel wrong. We need a place for
              mountainboarders to come together online and grow as a community again.
            </Paragraph>

            <Paragraph>
              Surfing Dirt hopes to solve that problem. We intend to be the social network for
              mountainboarders. The place where you’ll share photos and videos from your last
              session. Where you’ll learn about riders and spots near you. Where you’ll discuss
              trucks and jumps. And where people can see what mountainboarding is about.
            </Paragraph>
          </section>

          <section className={styles.section2}>
            <Paragraph widthDropCap>
              For those of you who attended the{' '}
              <a href="https://www.surfingdirt.com/wmc-2017">2017 World Champs in Compiègne</a>, you
              may remember stickers that were passed around announcing our comeback in… 2018.
            </Paragraph>

            <Paragraph>
              Looks like we’re a little late! Well, to tell you the truth, we aren’t quite ready to
              launch yet, but we’re definitely launching this year! We’ll start small and build up
              until mountainboarders across the world have an online home again.
            </Paragraph>

            <Paragraph>
              Also, that logo’s gone now! Thanks to{' '}
              <a href="https://highmountaincreative.com/" rel="noopener noreferrer" target="_blank">
                High Mountain Creative
              </a>
              , we’ll be using the shiny new logo you can see above, what a treat!
            </Paragraph>
          </section>
        </div>
      </div>
    );
  }
}

export const About = Translate(messages)(AboutRaw);
