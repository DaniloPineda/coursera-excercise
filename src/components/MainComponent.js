import '../App.css';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent'
import { Component } from 'react';
import { DISHES } from '../shared/dishes'
import { PROMOTIONS } from '../shared/promotions'
import { LEADERS } from '../shared/leaders'
import { COMMENTS } from '../shared/comments'
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    }
  }

  onDishSelect = (dishId) => this.setState( {selectedDish: dishId });

  
  render() {
    const HomePage = () =>{
      return(
        <Home dish={this.state.dishes.filter(d => d.featured)[0]}
              promotion ={this.state.promotions.filter(p => p.featured)[0]}
              leader ={this.state.leaders.filter(l => l.featured)[0]}
        />
      )
    }

    return(
    <div>
      <Header />
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>} />
        <Route exact path="/contactus" component={Contact} />
        <Redirect to="/home"/>
      </Switch>
      <Footer />
    </div>
  );
  }
}

export default Main;
