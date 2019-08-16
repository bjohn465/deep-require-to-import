import React from 'react';

export default class MyComponent extends React.Component {
  static propTypes = {
    schema: require('schemas/Course')
  };

  render() {
    return <div />;
  }
}
