import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Timekeeper from './Timekeeper';
import NotFound from './NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import userActions from '../actions/userActions';
import timekeeperActions from '../actions/timekeeperActions';

const App = () => {
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.loginAgain());
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(timekeeperActions.getAll());
    }
  }, [userId]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {userId ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/dashboard">
          {userId ? <Dashboard /> : <Redirect to="/" />}
        </Route>
        <Route path="/timekeeper/:id" component={Timekeeper} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
