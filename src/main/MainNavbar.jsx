
import { Route, Routes } from 'react-router-dom';
import Landing from './landing';
import PropTypes from 'prop-types';
import Login from './Login';
import Registration from './Registration';
import Adminlogin from './Adminlogin';
import NotFound from './NotFound';

export default function MainNavbar({
  onAdminLogin,
  onStudentLogin,
  onOfficerLogin,
  onRecruiterLogin
}) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            <Login
              onStudentLogin={onStudentLogin}
              onOfficerLogin={onOfficerLogin}
              onRecruiterLogin={onRecruiterLogin}
            />
          }
        />
        <Route path="/adminlogin" element={<Adminlogin onAdminLogin={onAdminLogin} />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

MainNavbar.propTypes = {
  onAdminLogin: PropTypes.func.isRequired,
  onStudentLogin: PropTypes.func.isRequired,
  onOfficerLogin: PropTypes.func.isRequired,
  onRecruiterLogin: PropTypes.func.isRequired,
};