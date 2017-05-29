import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { appReducer } from "./reducer";
import { increaseCounter } from "./actions";
import { compose, lifecycle, setPropTypes } from "recompose";
import { services } from "./feathersClient";
import Login from './authentication/login';
import Registration from './authentication/registration';

const App = ({counter, increase, users}) =>
    <div>
        <Registration />
        <Login />
    </div>

export default App;