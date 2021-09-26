import logo from './logo.svg';
import './App.css';
import MyComponent from './MyComponent.js'

function App(props) {
  let createLine = props.template;
  return (
    <div className="App">
      <header className="App-header">
        {props.datasource.map(createLine)}
        <MyComponent />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
