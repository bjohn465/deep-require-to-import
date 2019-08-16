import React from 'react';
import { arrayOf, oneOf } from 'prop-types';

export default class MyComponent extends React.Component {
  static propTypes = {
    programItems: arrayOf(require('schemas/ProgramItem')),
    currentItem: oneOf([
      require('schemas/Course'),
      require('schemas/Task'),
      require('schemas/LiveTraining')
    ])
  };

  render() {
    return <div />;
  }
}
