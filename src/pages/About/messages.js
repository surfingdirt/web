const messages = (getText, getPlural) => (key) =>
  ({
    title: getText('Surfing Dirt is back!', 'About') /* Title of the About page */,
    paragraph1: getText(
      'Remember before Facebook? There were so many resources for mountainboarding online. Forums, websites, photo galleries… Where are those now? The sad answer is they’re mostly gone. Facebook has made it so easy to post photos and videos and share them that people slowly stopped using other sites. That’s actually what happened to the old Surfing Dirt forum!',
      'About',
    ) /* Paragraph */,
    paragraph2: getText(
      'When you meet someone who seems genuinely excited to try mountainboarding, where do you send them? To a Facebook group, maybe? Sure there are many mountainboard groups on Facebook, and a lot of people use them. But they feel wrong. We need a place for mountainboarders to come together online and grow as a community again.',
      'About',
    ) /* Paragraph */,
    paragraph3: getText(
      'Surfing Dirt hopes to solve that problem. We intend to be the social network for mountainboarders. The place where you’ll share photos and videos from your last session. Where you’ll learn about riders and spots near you. Where you’ll discuss trucks and jumps. And where people can see what mountainboarding is about.',
      'About',
    ) /* Paragraph */,
    paragraph4: getText(
      "We hoped to launch a long time ago, but we're here now, so enjoy the new Surfing Dirt!",
      'About',
    ) /* Paragraph */,
  }[key]);

export default messages;
