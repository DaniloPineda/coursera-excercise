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
import { addComment, fetchDishes } from '../redux/ActionCreator';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    leaders: state.leaders,
    comments: state.comments,
    promotions: state.promotions
  }  
}

const mapDispatchToProps = (dispatch) => ({
  addComment : (dishId, rating, author, comment)  => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes : () => { dispatch(fetchDishes())},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback')) }
})
class Main extends Component {

  onDishSelect = (dishId) => this.setState( {selectedDish: dishId });
  
  componentDidMount(){
    this.props.fetchDishes();
  }

  render() {
    const HomePage = () =>{
      return(
        <Home
          dish={this.props.dishes.dishes.filter(d => d.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion ={this.props.promotions.filter(p => p.featured)[0]}
          leader ={this.props.leaders.filter(l => l.featured)[0]}
        />
      )
    }
  
    const DishWithId = ({match}) => {
      return(
        <DishDetail 
          dish={this.props.dishes.dishes.filter(d => d.id === parseInt(match.params.dishId,10))[0]} 
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter(c => c.dishId === parseInt(match.params.dishId,10))}
          addComment = {this.props.addComment}
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
        <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
        <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>} />
        <Redirect to="/home"/>
      </Switch>
      <Footer />
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
