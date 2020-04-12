import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

function Logout(props) {
  if (props.auth.isAuthenticated) {
    props.logoutUser();
  }
  window.location.href = './';
  return null;
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Logout);
