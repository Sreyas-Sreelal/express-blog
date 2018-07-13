import * as React from 'react';
import './App.css';
import {Classes, Navbar,NavbarDivider,NavbarGroup,NavbarHeading,Alignment,Button} from '@blueprintjs/core'
import {Route, Link,Redirect} from 'react-router-dom';
import {Login} from './login'; 
import {Home} from './home'; 
import cookie from 'react-cookies';
import { PostForm } from './postform';

const COOKIE_OPTIONS: {
  path?: string;
  expires?: Date;
  maxAge?: number; 
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
} = {
  path: 'localhost',
  domain :'localhost'
};

class App extends React.Component<any,any>{
  constructor(props:any){
    super(props)
    this.state={
      loggedin:cookie.load("loggedin"),
    
    };
    
  }

  OnUserLoggedIn(username:string,password:string){
    this.setState({loggedin:true})
    let options = COOKIE_OPTIONS;
    const expires = new Date();
    expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
    options.expires = expires;
    cookie.save("loggedin",true,options)
    cookie.save("name",username,options)
    cookie.save("password",password,options)
    location.href="/"

  }

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
              {this.state.loggedin === undefined ?(
                <Link to={'/login'} >
                  <Button className={Classes.MINIMAL} text="Login" />
                </Link>
                ):(
                  <Link to={'/post'} >
                  <Button className={Classes.MINIMAL} text="Post" />
                </Link>
                )
              }
          </NavbarGroup>
        
        </Navbar>
        {this.state.loggedin === undefined ?(
          <Route
            path="/login"
            render={props => <Login OnLoggedIn={this.OnUserLoggedIn.bind(this)}/>}
          />
          ):(
          <Route
            path="/login"
            render={props => <Redirect to="/"/>}
          />
        )}
        {this.state.loggedin === undefined ?(
          <Route
            path="/post"
            render={props => <Redirect to="/"/>}
          />
          ):(
          <Route
            path="/post"
            exact
            component={PostForm}
          />
        )}
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
