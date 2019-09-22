const messages = (getText, getPlural) => (key) =>
  ({
    more: getText('More...', 'Home') /* Label for a button to display a longer text */,
    title: getText(
      'Your online mountainboard community',
      'Home',
    ) /* Title on the homepage to welcome users */,
    paragraph1a: getText(
      `Welcome to the new Surfing Dirt, your new online community!`,
      'Home',
    ) /*  */,
    paragraph1b: getText(
      `Mountainboarding doesn't have a real home online right now, so we're hoping to be it. 
      You may remember Surfing Dirt the forum, but this is different. Think of the new Surfing Dirt more like a social network. Profile pages, galleries, and all kinds of other things.
      A place to showcase all the cool things that are happening in mountainboarding.`,
      'Home',
    ) /*  */,

    title2: getText('Why do we need that, you ask?', 'Home') /* Title of a paragraph */,
    paragraph2: getText(
      `Well, for one, because the mountainboard community is special and deserves an online space that resembles it.
      Mountainboard events are known for being open, inclusive and positive. Surfing Dirt intends to provide the same thing online!
      Also, since you asked, because Facebook sucks! In general, it causes a lot of harm, and it would be in everyone's best interest to use it less.
      But really, the main reason is that we hope to bring you a cool place for everyone to come together!`,
      'Home',
    ) /*  */,
    title3: getText('Here\'s the plan', 'Home') /* Title of a paragraph */,
    paragraph3: getText(
      `It's a lot of work to create a site like this, so we're going to start small and grow slowly.
      To begin, we're going to focus on user profiles, photos, videos and albums, but soon after, we'll add things like comments, spots, events, etc.
      So take a look around, sign up, post photos and we'll see you around!`,
      'Home',
    ) /*  */,
  }[key]);

export default messages;
