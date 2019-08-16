import React from 'react';

export default class MyComponent extends React.Component {
  static propTypes = {
    report: require('schemas/Author/CourseReport'),
    enrollment: require('data_models/Enrollment'),
    learners: require('asyncProps/learners'),
    mockData: require('json-loader!./helpers/mock_data.json')
  };

  render() {
    return <div />;
  }
}
