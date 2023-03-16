import * as React from 'react';
import eyelogo from './assets/images/eye-logo.jpg';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const navLinks = [
  { icon: <HomeIcon />, url: '/dashboard', name: 'Home' },
  { icon: <AccountCircleIcon/>, url: '/profile', name: 'Profile' },
  { icon: <CloudUploadIcon/>, url: '/upload', name: 'Upload Scans' },
  { icon: <PersonIcon/>, url: '/patient', name: 'Patients' },
];

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: 'menu',
      menuStatus: 'open',
    };
  }

  render() {
    return (
      <div>
        <div className={this.state.style}>
          <div className="image-container">
            <img src={eyelogo} alt="logo" height="100%" width="100%" />
          </div>
          <ul>
            {navLinks.map(({ icon, url, name }) => (
              <li key={url} className="nav-link">
                <div className="nav-link-wrapper">
                  {icon ? <IconButton>{icon}</IconButton> : null}
                  <a className="link" href={url}>
                    {name}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
