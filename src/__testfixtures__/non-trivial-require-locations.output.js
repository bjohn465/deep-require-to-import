import React from 'react';
import Author_CourseReportSchema from 'schemas/Author/CourseReport';
import data_models_Enrollment from 'data_models/Enrollment';
import asyncProps_learners from 'asyncProps/learners';
import json_loader___helpers_mock_data_json from 'json-loader!./helpers/mock_data.json';

export default class MyComponent extends React.Component {
  static propTypes = {
    report: Author_CourseReportSchema,
    enrollment: data_models_Enrollment,
    learners: asyncProps_learners,
    mockData: json_loader___helpers_mock_data_json
  };

  render() {
    return <div />;
  }
}
