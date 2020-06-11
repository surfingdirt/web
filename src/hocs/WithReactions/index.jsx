import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const withReactions = ({}) => (BaseComponent) => {
  class WithReactions extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {};
    }

    render() {
      return <div>with reactions</div>;
    }
  }

  return WithReactions;
};

withReactions.propTypes = {
  className: PropTypes.string,
};

withReactions.defaultProps = {
  className: null,
};

export default withReactions;
