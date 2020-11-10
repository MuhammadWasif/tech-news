import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Auth, User, Home, New } from './pages';

import './scss/index.scss';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route exact path='/u/:username' component={User} />
      <Route exact path='/auth' component={Auth} />
      <Route exact path='/new' component={New} />
    </Router>
  );
}

export default App;
