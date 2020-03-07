import React from 'react';
import PropTypes from 'prop-types';

// Inspired by https://github.com/banyan/react-autolink/blob/master/src/react-autolink.js
const DELIMITER = /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,:_\/~#&=;%+?\-\\(\\)]*)/gi;

const strStartsWith = (str, prefix) => {
  return str.slice(0, prefix.length) === prefix;
};

const AutoLink = ({ children: text, attrs = {}, ugc = false }) => {
  if (!text) return [];

  return text.split(DELIMITER).map((word, index) => {
    const match = word.match(DELIMITER);
    if (match) {
      const url = match[0];

      const segments = url.split('/');
      // no scheme given, so check host portion length
      if (segments[1] !== '' && segments[0].length < 5) {
        return word;
      }

      let href;
      if (strStartsWith(url, 'https')) {
        href = url;
      } else if (strStartsWith(url, 'http')) {
        href = url;
      } else {
        href = `http://${url}`;
      }

      const thisAttrs = Object.assign({}, attrs, { key: index });

      if (ugc) {
        thisAttrs.rel = 'ugc';
      }

      return React.createElement('a', Object.assign({ href }, thisAttrs), url);
    } else {
      return word;
    }
  });
};

AutoLink.propTypes = {
  text: PropTypes.string,
  attrs: PropTypes.objectOf(PropTypes.any),
  ugc: PropTypes.bool,
};

AutoLink.defaultProps = {
  text: '',
  attrs: {},
  ugc: false,
};

export default AutoLink;
