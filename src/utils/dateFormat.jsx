import moment from 'moment';

export const dateSlideDate = (date, language) => {
  moment.locale(language);
  const formattedDate = moment(date);

  const month = formattedDate.format('MMM');
  const day = formattedDate.format('D');
  const dayWeek = formattedDate.format('ddd');

  return [month, day, dayWeek];
};

export const HOURS_MINUTES = 'h:mm a';
export const DAY_MONTH_YEAR = 'ddd MMM D, YYYY';

const dateFormat = (date, format, language) => {
  moment.locale(language);

  let newDate;

  switch (format) {
    case HOURS_MINUTES:
    case DAY_MONTH_YEAR:
      newDate = moment(date).format(format);
      break;
    default:
      throw new Error(`Unsupported date format '${format}'`);
  }

  return newDate;
};

export default dateFormat;