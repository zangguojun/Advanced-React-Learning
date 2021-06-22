import App from "./App";
import ReactDOM from 'react-dom';
let props = {
  name: 'bu',
  age: 1110,
  // gender: 'male2',
  hobbies: ['smoking', 'drinking'],
  positions: {
    x: 10,
    y: 20
  }
}
ReactDOM.render(<App {...props} />, document.getElementById('root'))