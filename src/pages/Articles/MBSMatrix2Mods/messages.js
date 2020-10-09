const messages = (getText, getPlural) => (key) =>
  ({
    // General
    coverAlt: getText(
      'A foundry pouring molten metal with a Matrix 2 truck in the foreground',
      'Matrix 2 top plate article',
    ) /* Article cover description */,
    title: getText(
      'Keep On Trucking - MBS Matrix II Channel Truck modification',
      'Matrix 2 top plate article',
    ) /* Article title */,
    description: getText(
      'Leon Dove recently designed new top plates to improve the adjustability and reliability of MBS Matrix II Trucks. Read on to find out why and where to get some!',
      'Matrix 2 top plate article',
    ) /* Article description */,
    articleIntro1: getText(
      'Leon is a long time UK mountainboarder, a former MBS team rider with a couple of UK and a World Masters Boarder X title under his belt. Leon’s passion for boarding doesn’t stop at riding, he’s been tinkering and modifying his boards ever since he started riding nearly two decades ago.',
      'Matrix 2 top plate article',
    ) /* Text content */,
    leonPhoto: getText(
      'Leon in the lead at the 2017 World Championships',
      'Matrix 2 top plate article',
    ) /* Description of a photo */,
    articleIntro2: getText(
      'In 2010, Leon modified his Matrix Pro trucks to run without springs just using the egg shocks. This generated enough interest from other riders for him to make a conversion kit under the name of WestCoastATB which while never going mainstream, did gain a cult following among a small core of boarders. Ten years later he’s back with another modification that’s caught the attention of riders from around the world, this time it’s for the latest incarnation of the MBS channel truck, the Matrix Pro II.',
      'Matrix 2 top plate article',
    ) /* Text content */,

    // Questions and Answers
    qaTitle: getText(
      'The full story behind this project',
      'Matrix 2 top plate article',
    ) /* Questions and Answers section title */,
    qaMore: getText(
      'Click here for the full interview',
      'Matrix 2 top plate article',
    ) /* Label for a button to reveal a paragraph */,
    qaIntro1: getText(
      'Having seen pictures of the design and being intrigued by the explanation of how it works, we asked Leon for a bit more info.',
      'Matrix 2 top plate article',
    ) /* Text content */,
    qa1: getText(
      'Leon, can you explain what your modification is and why you made it?',
      'Matrix 2 top plate article',
    ) /* Text content */,
    qa2: getText(
      'Yeah of course, with the exception of my first board (a Mongoose Unicamb) I’ve always ridden MBS channel trucks. MBS kept tweaking the design over the years, making improvements, always producing something that kept them ahead of their rivals. However because of my background in motor cycle mechanics I always thought it was odd to use a spring without any form of rebound dampening and that’s why in 2010 I decided on a bit of an experiment, to run my Matrix Pro’s without any springs. To my surprise it worked incredibly well for me and quite a few other riders.',
      'Matrix 2 top plate article',
    ) /* Text content */,
    qa3: getText(
      'So why do you think it didn’t catch on?',
      'Matrix 2 top plate article',
    ) /* Text content */,
    qa4: getText(
      'I think it was a combination of disbelief in the wider mountainboard community that you didn’t need the springs that we had all become accustomed to, plus the extra stress it put on the egg shocks meant the design wasn’t as bullet-proof as the standard design. The trade off in performance against durability was not something the majority of riders wanted to make. That being said, I and many others rode that design trouble-free right up until MBS released the Matrix II.',
      'Matrix 2 top plate article',
    ) /* Text content */,
    qa5: getText(
      'Why did you swap that set up for the Matrix II ?',
      'Matrix 2 top plate article',
    ) /* Text content */,
    qa6: getText(
      'I had always wanted to take my initial idea further but I was put off by the expense of creating my own truck from scratch, when MBS released the Matrix II I was really pleased that it looked very close to the design that had been floating around my head since 2010.',
      'Matrix 2 top plate article',
    ) /* Text content */,
    qa7: getText(
      'If you like new design so much, why have you felt the need to modify it?',
      'Matrix 2 top plate article',
    ) /* Text content */,
    qa8: getText(
      'Well, I pretty much like everything about the Matrix II, the turning is so much more progressive and responsive than any other truck I’ve ridden before plus it’s lighter and the shape of the lower truck is so much better for rails, copings and ground clearance. The one thing I didn’t like was its preload system, after a certain point the more I tried to stiffen the steering, the looser it got.\n' +
        'On closer inspection, I could see this was because the shock blocks were lifted away from the lower truck to such a degree that they started pivoting on the preload bolts, this allowed them to slide off the top plate rather than compress up against it.',
      'Matrix 2 top plate article',
    ) /* Text content */,
    qa9: getText(
      'Going back to our first question, what is your modification and how does it work?',
      'Matrix 2 top plate article',
    ) /* Text content */,
    qa10: getText(
      'It’s a pretty simple solution, rather than adjusting the shock blocks by moving them up, I designed a plate that could be adjusted down from the Top Truck. As the plate compress the shock blocks they stay in position because they sit squarely on the bottom truck and can’t move around.',
      'Matrix 2 top plate article',
    ) /* Text content */,

    // Instructions
    instructionsTitle: getText(
      'Fitting Instructions',
      'Matrix 2 top plate article',
    ) /* Instructions section title */,
    instructionsIntro: getText('', 'Matrix 2 top plate article') /* Text content */,
  }[key]);

export default messages;
