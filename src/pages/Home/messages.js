const messages = (getText, getPlural) => (key) =>
  ({
    more: getText('More...', 'Home') /* Label for a button to display a longer text */,
    title: getText(
      'Your online mountainboard community',
      'Home',
    ) /* Title on the homepage to welcome users */,
    paragraph1: getText(
      'Hello, and welcome to the new Surfing Dirt, a site which we hope will become central to the online mountainboard community! You may remember Surfing Dirt the forum, but this is different, this is going to be a social network... for mountainboarders!',
      'Home',
    ) /*  */,
    paragraph2: getText(
      'Why do we need that, you ask? Well, because the mountainboard community is special and deserves an online space that resembles it! Mountainboard events are known for being open, inclusive and positive. Surfing Dirt intends to provide the same thing online!',
      'Home',
    ) /*  */,
    paragraph3: getText(
      "And since you asked, Facebook sucks!! It's caused a lot of harm, and it would be in everyone's best interest to use it less.",
      'Home',
    ) /*  */,
    paragraph4: getText(
      "Here's the plan: it's a lot of work to create a site like this, so we're going to start small and grow slowly. Initially we'll have user profiles, photos, videos and albums, but soon after, we'll add things like comments, spots, events, and all kinds of other things. So take a look around, and stay in touch, we're in this for the long run!",
      'Home',
    ) /*  */,
  }[key]);

export default messages;
