import React from 'react';
import Wrapper from './wrapper';
import CourseSchema from 'schemas/Course';

class MyComponent extends React.Component {
  static propTypes = {
    course: require('schemas/Course'),
  };

  render() {
    return <div />;
  }
}
