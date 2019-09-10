import React from 'react';
import Wrapper from './wrapper';
import CourseSchema from 'schemas/Course';

class MyComponent extends React.Component {
  static propTypes = {
    course: CourseSchema,
  };

  render() {
    return <div />;
  }
}
