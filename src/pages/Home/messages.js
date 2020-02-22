const messages = (getText, getPlural) => (key) =>
  ({
    more: getText('More...', 'Home') /* Label for a button to display a longer text */,
    title: getText(
      'Your online mountainboard community',
      'Home',
    ) /* Title on the homepage to welcome users */,
    paragraph1a: getText(`Surfing Dirt, your mountainboard community`, 'Home') /*  */,
    paragraph1b: getText(
      `Mountainboarding doesn't have a real home online right now, so we're hoping to be it. 
      Unlike the old Surfing Dirt forum, this is more like a social network: profile pages, galleries, and all kinds of other things.
      A place to showcase all the cool things that are happening in mountainboarding.`,
      'Home',
    ) /*  */,

    title2: getText('Why we need that', 'Home') /* Title of a paragraph */,
    paragraph2: getText(
      `Well, for one, because the mountainboard community is special and deserves an online space that resembles it.
      Mountainboard events are known for being open, inclusive and positive. Surfing Dirt intends to provide the same thing online!
      Also, since you asked, because Facebook sucks! In general, it causes a lot of harm, and it would be in everyone's best interest to use it less.
      But really, the main reason is that we hope to bring you a cool place for everyone to come together!`,
      'Home',
    ) /*  */,
    title3: getText('The future', 'Home') /* Title of a paragraph */,
    paragraph3: getText(
      `It's a lot of work to create a site like this, so we're starting small and will grow slowly.
      We're now focusing on user profiles, photos, videos, and albums. Soon after, we'll add things like spots, events, etc.
      So take a look around, sign up, post photos and be part of Surfing Dirt!`,
      'Home',
    ) /*  */,
    moreAlbums: getText(
      'See more photos and videos on the Albums page',
      'Home',
    ) /* Message before a link to go to a page containing more albums */,
    goToAlbums: getText('Go', 'Home') /* Label for a link to navigate */,
  }[key]);

export default messages;
