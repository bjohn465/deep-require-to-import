import React from 'react';
import { arrayOf, oneOf } from 'prop-types';
import ProgramItemSchema from 'schemas/ProgramItem';
import CourseSchema from 'schemas/Course';
import TaskSchema from 'schemas/Task';
import LiveTrainingSchema from 'schemas/LiveTraining';

export default class MyComponent extends React.Component {
  static propTypes = {
    programItems: arrayOf(ProgramItemSchema),
    currentItem: oneOf([
      CourseSchema,
      TaskSchema,
      LiveTrainingSchema
    ])
  };

  render() {
    return <div />;
  }
}
