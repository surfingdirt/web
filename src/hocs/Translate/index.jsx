import Gettext from 'node-gettext';
import React from 'react';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';

import AppContext from '~/contexts';

const LC_MESSAGE = 'messages';
const NUMBER_REGEX = /123|%d/;

const TranslateHOC = (messages) => (BaseComponent) => {
  class Translate extends React.PureComponent {
    // noinspection JSUnusedGlobalSymbols
    static contextType = AppContext;

    constructor(props) {
      super(props);

      this.ready = false;
      this.getText = this.getText.bind(this);
      this.getPlural = this.getPlural.bind(this);
    }

    setup() {
      const { locale, translations } = this.context;
      // Set debug to false in order to filter out "No translation was found for x" console warnings
      this.gt = new Gettext({ debug: false });
      this.gt.addTranslations(locale, LC_MESSAGE, translations);
      this.gt.setLocale(locale);
      this.ready = true;
    }

    getText(msgid, msgctxt) {
      return this.gt.pgettext(msgctxt, msgid);
    }

    getPlural(msgid, msgidPlural, count, msgctxt) {
      const actualCount = typeof count === 'number' ? count : 0;
      const rawPluralString = this.gt.npgettext(msgctxt, msgid, msgidPlural, actualCount);
      return rawPluralString.replace(NUMBER_REGEX, actualCount);
    }

    render() {
      if (!this.ready) {
        this.setup();
      }

      const { props, getText, getPlural, context } = this;

      const componentProps = {
        ...props,
        t: (key) => messages(getText, getPlural)(key),
        getText,
        getPlural,
        locale: context.locale,
      };
      return <BaseComponent {...componentProps} />;
    }
  }

  return setDisplayName(wrapDisplayName(BaseComponent, 'Translate'))(Translate);
};

export default TranslateHOC;
