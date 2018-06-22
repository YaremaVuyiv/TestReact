import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Button, FormGroup, FormControl, ControlLabel, Nav, NavItem, Navbar}from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class ListComponent extends React.Component{
    constructor(props){
        super(props);
        this.topics = [];
        this.state = {topics: []};
    }

    componentDidMount(){
        fetch('http://localhost:62887/api/topics',{
            method:'GET',    
        headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(
            (res)=>{
                return res.json();
            }
        )
        .then((data)=>{
            this.setState({topics: data.map(topic=>{
                return <TopicItem topic={topic}/>//<li key={topic.id}>{topic.name}</li>
            })});

        })
    }

    render(){
        return(
            <div className="container">
                <div><h1>All Topics</h1></div>
                <div className="listContainer">
                    <ul className="topicsList list-unstyled list-group">{this.state.topics}</ul>
                </div>
            </div>
        );
    }
}

function TopicItem(props){
    console.log(props.topic.id);
    return(
        <li key={props.topic.id} className="list-group-item">
            <div>
                <h2>
                    <a href="/topic">
                        {props.topic.name}
                    </a>
                </h2>
            </div>
            <div>
                {props.topic.body}
            </div>
   
        </li>
    );
}

export default class Login extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: "",
        password: ""
      };
    }
  
    validateForm() {
      return this.state.username.length > 0 && this.state.password.length > 0;
    }
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }

    handleSubmit = event => {
      event.preventDefault();
      fetch('http://localhost:62887/api/account/login',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({username:this.state.username, password:this.state.password})
      })
        .then(
            (res)=>{
                return res.json();
            }
        )
        .then((data)=>{
            localStorage.setItem('token', data);
            this.props.history.push('/');
        })
    }
  
    render() {
      return (
        <div className="Login container">
            <div>
                <h2>Login</h2>
            </div>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="username" bsSize="large">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <p>Password</p>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
             bsStyle="primary"
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      );
    }
  }

  class Account extends React.Component{
constructor(props){
    super(props);

    this.state = {username:"", email:""};
}

      async componentDidMount(){
        let token = localStorage.getItem('token');

        let response = await fetch('http://localhost:62887/api/topics/1',{
            method:'get',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`,
            }
        });
        //let responseJson = await response.json();
        console.log(response);

        fetch('http://localhost:62887/api/account/userDetails',{
            method:'GET',
            headers: {
                'Accept': 'q=0.8;application/json;q=0.9',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(
            (res)=>{
                //console.log(res);
                return res.json();
            }
        )
        .then((data)=>{
            //console.log(data);
            this.setState({username: data.username, email: data.email});

        })
      }

      render(){
          return(
              <h2>Account details</h2>
          );
      }
  }

function NavBarComponent(props){
        return(
           /* <Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home">React-Bootstrap</a>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={1} href="#">
      Link
    </NavItem>
    <NavItem eventKey={2} href="#">
      Link
    </NavItem>
    
  </Nav>
</Navbar>*/

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="/account">Disabled</a>
            </li>
          </ul>
        </div>
      </nav>

            /*<Nav className="navbar sticky-top navbar-toggleable-sm navbar-dark bg-dark">
            <button className="navbar-toggle collapsed" data-toggle="collapse" aria-expanded="false" data-target="#mainNav">b</button>
                <div className="collapse navbar-collapse" id="mainNav">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">DU Blog</a>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">

                <li className="nav-item">
                    <a className="nav-link">Create</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/account">Account</a>
                </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                    <a href="/login" className="nav-link" id="logButton">Log off</a>
                </li>
            </ul>
            </div>
        </div>
            </Nav>*/
        );
}

function TopicComponent(props){
    return(
        <div>
            <h1>Topic</h1>
            </div>
    );
}

class MainContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {temp: 30};
        this.onCelsiumChanged = this.onCelsiumChanged.bind(this);
        this.onFarenheitChanged = this.onFarenheitChanged.bind(this);
    }

    componentDidMount(){
        
    }

    onCelsiumChanged(e){
        this.setState({temp: +e})
    }

    onFarenheitChanged(e){
        this.setState({temp: +e})
    }
    
    clickHandler(e){
        
    }

    render(){
        return(
            <div className="mainContainer">
                <NavBarComponent/>
                <Router>
                    <Switch>
                        <Route exact path="/" component={ListComponent}/>
                        <Route path="/topic" component={TopicComponent}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/account" component={Account}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

  // ========================================

  ReactDOM.render(
    <MainContainer/>,
    //<Game />,
    document.getElementById('root')
  );
  