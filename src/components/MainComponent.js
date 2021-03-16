import '../App.css';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    leaders: state.leaders,
    comments: state.comments,
    promotions: state.promotions
  }  
}
class Main extends Component {

  onDishSelect = (dishId) => this.setState( {selectedDish: dishId });
  
  render() {
    const HomePage = () =>{
      return(
        <Home
          dish={this.props.dishes.filter(d => d.featured)[0]}
          promotion ={this.props.promotions.filter(p => p.featured)[0]}
          leader ={this.props.leaders.filter(l => l.featured)[0]}
        />
      )
    }
  
    const DishWithId = ({match}) => {
      return(
        <DishDetail 
          dish={this.props.dishes.filter(d => d.id === parseInt(match.params.dishId,10))[0]} 
          comments={this.props.comments.filter(c => c.dishId === parseInt(match.params.dishId,10))}
        />
      )
    }

    return(
    <div>
      <Header />
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>} />
        <Route path="/menu/:dishId" component={DishWithId} />
        <Route exact path="/contactus" component={Contact} />
        <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>} />
        <Redirect to="/home"/>
      </Switch>
      <Footer />
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
