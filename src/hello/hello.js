
import React from 'react';

import PropTypes from 'prop-types';

export default class Hello extends React.Component {
  render() {
    return (
      <div>
        Hello, { this.props.name }!
      </div>
    );
  }
}

Hello.defaultProps = {
  name: 'foo',
};

Hello.propTypes = {
  name: PropTypes.string,
};
