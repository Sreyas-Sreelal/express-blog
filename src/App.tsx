import * as React from 'react';
import './App.css';
import {Classes, Navbar,NavbarDivider,NavbarGroup,NavbarHeading,Alignment,Button} from '@blueprintjs/core'
import {Route, Link,Redirect} from 'react-router-dom';
import {Login} from './login'; 
import {Home} from './home'; 
import cookie from 'react-cookies';
import { PostForm } from './postform';
import { PostView } from './postview';

export const API_HOST  = "192.168.1.2"; // I used exact ipv4 to speed up nginx reverse proxy.Please change it according 
export const	API_PORT = "8000";
export const END_POINT = "http://" + API_HOST + ":" + API_PORT;

export const COOKIE_OPTIONS: {
  path?: string;
  expires?: Date;
  maxAge?: number; 
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
} = {
  path: API_HOST,
  domain : API_HOST
};

class App extends React.Component<any,any>{
  constructor(props:any){
    super(props)
    this.state={
      loggedin:cookie.load("loggedin"),
    };
    this.OnUserLogout = this.OnUserLogout.bind(this);
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

  OnUserLogout(){
    if(!this.state.loggedin){
      location.href = "/"
    }else{
      cookie.remove("name", COOKIE_OPTIONS);
      cookie.remove("password", COOKIE_OPTIONS);
      cookie.remove("loggedin", COOKIE_OPTIONS);
      location.href="/login"
    }
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
                  <div>
                    <Link to={'/post'} >
                      <Button className={Classes.MINIMAL} text="Post" />
                    </Link>
                    <Link to={'/logout'} >
                      <Button className={Classes.MINIMAL} text="Logout" onClick={this.OnUserLogout} />
                    </Link>
                  </div>

                )
              }
          </NavbarGroup>
        
        </Navbar>
        <h1 className={Classes.TEXT_MUTED} id="bigheader">
              Express-Blog
        </h1>
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
        <Route 
          path="/viewpost/:PostID"
          exact 
          component={PostView}
        />
      </div>
    );
  }
}

export default App;
