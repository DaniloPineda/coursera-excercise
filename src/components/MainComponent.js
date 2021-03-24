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
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreator';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    leaders: state.leaders,
    comments: state.comments,
    promotions: state.promotions
  }  
}

const mapDispatchToProps = (dispatch) => ({
  postComment : (dishId, rating, author, comment)  => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback : (firstname, lastname, telnum, email, agree, contactType, message)  => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
  fetchDishes : () => { dispatch(fetchDishes())},
  fetchComments : () => { dispatch(fetchComments())},
  fetchPromos : () => { dispatch(fetchPromos())},
  fetchLeaders : () => { dispatch(fetchLeaders())},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback')) }
})
class Main extends Component {

  onDishSelect = (dishId) => this.setState( {selectedDish: dishId });
  
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () =>{
      return(
        <Home
          dish={this.props.dishes.dishes.filter(d => d.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion ={this.props.promotions.promotions.filter(p => p.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader ={this.props.leaders.leaders.filter(l => l.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}          
        />
      )
    }
  
    const DishWithId = ({match}) => {
      return(
        <DishDetail 
          dish={this.props.dishes.dishes.filter(d => d.id === parseInt(match.params.dishId,10))[0]} 
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(c => c.dishId === parseInt(match.params.dishId,10))}
          commentsErrMess={this.props.comments.errMess}
          postComment = {this.props.postComment}
        />
      )
    }

    return(
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedbackForm={this.props.postFeedback}/>} />
            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>} />
            <Redirect to="/home"/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
