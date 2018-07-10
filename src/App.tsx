import * as React from 'react';
import './App.css';
import {Classes, Navbar,NavbarDivider,NavbarGroup,NavbarHeading,Alignment,Button} from '@blueprintjs/core'
import {Route, Link} from 'react-router-dom';
import {Login} from './login'; 
import {Home} from './home'; 

class App extends React.Component {
  public render() {
    return (
      <div id="main">
         <Navbar fixedToTop={true}>
          <NavbarGroup align={Alignment.LEFT} className={Classes.LARGE}>
              <NavbarHeading className={Classes.TEXT_MUTED}>
                Express Blog
              </NavbarHeading> 
              <NavbarDivider />
          </NavbarGroup>
          
          <NavbarGroup align={Alignment.RIGHT}>
              <Link to={'/'} >
                <Button className={Classes.MINIMAL} icon="home" text="Home" />
              </Link>
              <Link to={'/login'} >
                <Button className={Classes.MINIMAL} text="Login" />
              </Link>
          </NavbarGroup>
        
        </Navbar>
        <Route
          path="/login"
          component={Login}
        />
        <Route
          path="/" 
          exact
          component={Home}
        />
      </div>
    );
  }
}

export default App;
