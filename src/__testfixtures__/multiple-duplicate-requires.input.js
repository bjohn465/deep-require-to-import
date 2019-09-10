import React from 'react';
import Wrapper from './wrapper';

class MyComponent extends React.Component {
  static propTypes = {
    course: require('schemas/Course'),
  };

  render() {
    return <div />;
  }
}

export default Wrapper(MyComponent, {
  schemas: {
    course: require('schemas/Course')
  }
});
