export default [
  {
    id: 'q1',
    text: 'Which of the following definitions best describes React.js?',
    answers: [
      'A library to build user interfaces with help of declarative code.',
      'A library for managing state in web applications.',
      'A framework to build user interfaces with help of imperative code.',
      'A library used for building mobile applications only.',
    ],
    difficulty: 'easy',
    hint: 'Think about React\'s main purpose and programming paradigm.',
    explanation: 'React is primarily a library (not a framework) for building user interfaces using declarative programming, where you describe what the UI should look like rather than how to manipulate it.'
  },
  {
    id: 'q2',
    text: 'What purpose do React hooks serve?',
    answers: [
      'Enabling the use of state and other React features in functional components.',
      'Creating responsive layouts in React applications.',
      'Handling errors within the application.',
      'Part of the Redux library for managing global state.',
    ],
    difficulty: 'medium',
    hint: 'Hooks were introduced to solve a specific problem with functional components.',
    explanation: 'React hooks like useState, useEffect, etc., allow functional components to use state and lifecycle features that were previously only available in class components.'
  },
  {
    id: 'q3',
    text: 'Can you identify what JSX is?',
    answers: [
      'A JavaScript extension that adds HTML-like syntax to JavaScript.',
      'A JavaScript library for building dynamic user interfaces.',
      'A specific HTML version that was explicitly created for React.',
      'A tool for making HTTP requests in a React application.',
    ],
    difficulty: 'easy',
    hint: 'JSX looks like HTML but is actually JavaScript.',
    explanation: 'JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript, making React components more readable and intuitive.'
  },
  {
    id: 'q4',
    text: 'What is the most common way to create a component in React?',
    answers: [
      'By defining a JavaScript function that returns a renderable value.',
      'By defining a custom HTML tag in JavaScript.',
      'By creating a file with a .jsx extension.',
      'By using the "new" keyword followed by the component name.',
    ],
    difficulty: 'easy',
    hint: 'Modern React favors functional components over class components.',
    explanation: 'The most common way to create React components is by writing JavaScript functions that return JSX. These are called functional components and are the recommended approach in modern React.'
  },
  {
    id: 'q5',
    text: 'What does the term "React state" imply?',
    answers: [
      'An object in a component that holds values and may cause the component to render on change.',
      'The lifecycle phase a React component is in.',
      'The overall status of a React application, including all props and components.',
      'A library for managing global state in React applications.',
    ],
    difficulty: 'medium',
    hint: 'State is about data that can change and affect what users see.',
    explanation: 'React state is a built-in object that allows components to create and manage their own data. When state changes, React automatically re-renders the component to reflect those changes.'
  },
  {
    id: 'q6',
    text: 'How do you typically render list content in React apps?',
    answers: [
      'By using the map() method to iterate over an array of data and returning JSX.',
      'By using the for() loop to iterate over an array of data and returning JSX.',
      'By using the forEach() method to iterate over an array of data and returning JSX.',
      'By using the loop() method to iterate over an array of data and returning JSX.',
    ],
    difficulty: 'medium',
    hint: 'Think about array methods that return new arrays.',
    explanation: 'The map() method is ideal for rendering lists because it returns a new array of JSX elements, which React can render. Each item should have a unique "key" prop.'
  },
  {
    id: 'q7',
    text: 'Which approach can NOT be used to render content conditionally?',
    answers: [
      'Using a the #if template syntax.',
      'Using a ternary operator.',
      'Using the && operator.',
      'Using an if-else statement.',
    ],
  },
];