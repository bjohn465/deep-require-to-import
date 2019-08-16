# What is this?

This is a [jscodeshift](https://github.com/facebook/jscodeshift) codemod
that converts `require` calls,
no matter where they are in the file,
to `import` statements.

# How to use it

I'd suggest you use the `cjs`
[5to6-codemod](https://github.com/5to6/5to6-codemod)
to convert most of your `require` calls
to `import` statements,
then use this codemod
to convert any leftover `require` calls.

```shell
# To run the cjs 5to6-codemod:
git clone https://github.com/5to6/5to6-codemod.git
cd 5to6-codemod
npm install
npx jscodeshift -t transforms/cjs.js [files]
cd ..

# To run the deep-require-to-import codemod:
git clone https://github.com/bjohn465/deep-require-to-import.git
cd deep-require-to-import
yarn install
npx jscodeshift -t src/transform.js [files]
```

# Example Result

Note: More examples can be found in
[`src/__testfixtures__`](src/__testfixtures__).

## Before

```javascript
import React from 'react'

export default class MyComponent extends React.Component {
  static propTypes = {
    schema: require('schemas/Course'),
    report: require('schemas/Author/CourseReport'),
    enrollment: require('data_models/Enrollment'),
    learners: require('asyncProps/learners'),
    custom: require('MyCustomProp'),
  }

  render() {
    return <div />
  }
}
```

## After

```javascript
import React from 'react'
import CourseSchema from 'schemas/Course'
import Author_CourseReportSchema from 'schemas/Author/CourseReport'
import data_models_Enrollment from 'data_models/Enrollment'
import asyncProps_learners from 'asyncProps/learners'
import MyCustomProp from 'MyCustomProp'

export default class MyComponent extends React.Component {
  static propTypes = {
    schema: CourseSchema,
    report: Author_CourseReportSchema,
    enrollment: data_models_Enrollment,
    learners: asyncProps_learners,
    custom: MyCustomProp,
  }

  render() {
    return <div />
  }
}
```
