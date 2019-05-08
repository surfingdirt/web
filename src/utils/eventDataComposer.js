import Event from 'Models/Event';

/**
 * Builds an object containing data suitable for rendering by FixtureSlider
 * @param fixtures
 * @return {Array}
 */
export const buildFixtureEventsByDate = (fixtures) => {
  const days = [];
  let currentDay = { date: null };

  fixtures.forEach((f) => {
    const event = new Event(f);
    const eventDay = event.getDay();

    if (eventDay === currentDay.date) {
      currentDay.events.push(event.getData());
    } else {
      currentDay = {
        date: eventDay,
        events: [event.getData()],
      };
      days.push(currentDay);
    }
  });
  return days;
};

/**
 * Builds an object containing data suitable for rendering by UpcomingFixtures
 * @param fixtures
 * @return {Array}
 */
export const buildClientSideEvents = (fixtures) => {
  const items = fixtures.map((f) => {
    const event = new Event(f);
    return event.getData();
  });
  return items;
};
