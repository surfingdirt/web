const messages = (getText, getPlural) => (key) =>
  ({
    // General
    tableOfContents: getText(
      'Table of contents',
      'Matrix 2 top plate article',
    ) /* Label for the article's table of contents */,
    coverAlt: getText(
      'A foundry pouring molten metal with a Matrix 2 truck in the foreground',
      'Matrix 2 top plate article',
    ) /* Article cover description */,
    title: getText('MBS Matrix II Truck mods', 'Matrix 2 top plate article') /* Article title */,
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

    // Instructions
    step1: getText(
      'Remove the shock blocks and bottom preload bolts',
      'Matrix 2 top plate article',
    ) /* Instructions - step 1 */,
    step2: getText(
      'Remove the MBS plate that is bolted to the Top Truck. You will need a 5mm Hex Key. The bolts have thread lock on them so you may need to apply a fair amount of force.',
      'Matrix 2 top plate article',
    ) /* Instructions - step 2 */,
    topPlate: getText(
      'The MBS top plate',
      'Matrix 2 top plate article',
    ) /* Description of a photo */,
    step3: getText(
      'Make sure that the top preload bolts holes in the deck, the riser pad (if fitted) and the Top Truck are in line.',
      'Matrix 2 top plate article',
    ) /* Instructions - step 3 */,
    step4: getText(
      'Insert the top preload bolts through the deck and turn clockwise to engage the thread in the Top Truck. Keep turning the bolts clockwise (use a 4mm Hex Key) until you can see the threaded section of the bolts appear out of the underside of the Top Truck. If the bolts do not turn freely, see Step 3.',
      'Matrix 2 top plate article',
    ) /* Instructions - step 4 */,
    step5: getText(
      'Turn the top preload bolts anti-clockwise until around 2mm of the bolt end is visible out of the underside of the Top Truck.',
      'Matrix 2 top plate article',
    ) /* Instructions - step 5 */,
    step6: getText(
      'Re-insert one of the bottom preload bolts enough to fit a shock block.',
      'Matrix 2 top plate article',
    ) /* Instructions - step 6 */,
    step7: getText(
      'Insert the Mod Plate, make sure that the protruding ends of the top preload bolts sit in the recess holes in the Mod Plate.',
      'Matrix 2 top plate article',
    ) /* Instructions - step 7 */,
    step8: getText(
      'Holding the Mod Plate in place by hand, fit a shock block to the bottom pre load bolt.',
      'Matrix 2 top plate article',
    ) /* Instructions - step 8 */,
    step9: getText(
      'Insert the other shock block and bottom pre load bolt.',
      'Matrix 2 top plate article',
    ) /* Instructions - step 9 */,
    step10: getText(
      'Check that the Mod Plate is located properly then wind the lower pre-load bolts in until the shock blocks are properly seated but not lifted away from the truck.',
      'Matrix 2 top plate article',
    ) /* Instructions - step 10 */,
    step11: getText(
      'Adjust the Mod Plate by turning the top preload bolts clockwise to stiffen your steering or counter clockwise to loosen. It is very important to adjust the top preload bolts evenly so that the Mod Plate stays horizontal in relation to the Top Truck.',
      'Matrix 2 top plate article',
    ) /* Instructions - step 11 */,

    tipsIntro: getText('Tips', 'Matrix 2 top plate article') /* Label for the tips section */,
    tip1: getText(
      'When using the loosest setting make sure that top preload bolts are still in contact with the Mod Plate in their recess holes.',
      'Matrix 2 top plate article',
    ) /* Text for a tip */,
    tip2: getText(
      'Leon recommends a maximum compression of 5mm between the Top Truck and the Mod Plate.',
      'Matrix 2 top plate article',
    ) /* Text for a tip */,
    tip3: getText(
      'Do not over compress your Shock Blocs, if they can’t stiffen your steering to the desired level, insert stiffer shock blocks or replace worn/compressed shock blocks with new ones. If you have the Matrix II’s with the plastic Top Truck, you can replace the Top Truck with an alloy one from the Matrix I Pro trucks, then fit the Mod Plates. The fitting instructions are the same with the exception that there is no MBS plate to remove.',
      'Matrix 2 top plate article',
    ) /* Text for a tip */,
    tip4: getText(
      'This is a peer to peer project, the aim is not to get rich but to innovate, doing our bit to help push the sport forward, your feedback is key to that process',
      'Matrix 2 top plate article',
    ) /* Text for a tip */,
    important: getText('Important', 'Matrix 2 top plate article') /* Warning message */,
    importantMsg: getText(
      'The Mod Plate is designed to work by adjusting the top preload bolts only, do not use the bottom preload bolts to make any adjustments.',
      'Matrix 2 top plate article',
    ) /* Warning message */,

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
      'Because some of you will want more information, we asked Leon a few questions!',
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
