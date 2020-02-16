import * as React from 'react';
import { Link } from "react-router-dom";

class Landing extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/register" >
            Register
          </Link>
        </div>
        <div>
          <Link to="/login" >
            Log In
          </Link>
        </div>
      </div>
    );
  }
}
export default Landing;