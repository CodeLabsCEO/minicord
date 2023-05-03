// Import React and ReactDOM.
const React = require('react');
const ReactDOM = require('react-dom');

// Define your React component.
function App() {
  return (
    <div>
      <h1>Welcome to Minicord!</h1>
      <p>This is a modified version of the Discord website built with ElectronJS and React.</p>
    </div>
  );
}

// Render your component to the app's window.
ReactDOM.render(<App />, document.getElementById('root'));
