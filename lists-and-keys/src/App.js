import logo from './logo.svg';
import './App.css';

function ListItem(props) {
  return <li>{props.value}</li>
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map(number =>
    <ListItem
      key={number.toString()}  // key belongs inside map
      value={number}
    />
  );
  return (
    <ul>{listItems}</ul>
  );
}

function App() {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NumberList numbers={numbers} />
        <p>
          Edit(ar) <code>src/App.js</code> and save to reload.
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
