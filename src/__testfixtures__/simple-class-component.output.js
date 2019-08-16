import React from 'react';
import CourseSchema from 'schemas/Course';

export default class MyComponent extends React.Component {
  static propTypes = {
    schema: CourseSchema
  };

  render() {
    return <div />;
  }
}
