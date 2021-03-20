import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, FormGroup,Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent'


function DishDetail(props){        
    if(props.isLoading){
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if(props.dish != null)
    return(
        <div className="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">                
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>                        
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} addComment={props.addComment}
                     dishId={props.dish.id}/>
                </div>
            </div>
        </div>
    );
    return (<div></div>)
}

const RenderDish = ({dish}) =>{
    return(
        <Card>
            <CardImg src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

const RenderComments= ({comments, addComment, dishId}) => {   
    const commentsList = comments.map(comment =>{ 
        return(
            <div key={comment.id} className="col-12 pt-3"> 
                    <div>{comment.comment}</div>
                    <div>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date))) }</div>
                </div>
                )
            });
            
    if(comments != null){
        return(
            <>
                <h4>Comments</h4>
                <div className="unstyled-list">
                    {commentsList}
                </div>
                <CommentForm dishId={dishId} addComment={addComment}/>
            </>
        )                
    }
        
    return(<div></div>)
}

const required = (val) => {    
    return val !== undefined && val !== "";
}
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
class CommentForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }

    toggleNav = () => this.setState({isNavOpen: !this.state.isNavOpen})
    
    toggleModal = () => this.setState({isModalOpen: !this.state.isModalOpen})
    

    handleSubmit = (values) => {
        this.toggleModal();
        this.props.addComment(this.props.dishId, parseInt(values.rating), values.author, values.comment);
    }

    render(){
        return(
            <div className="row">
                <div className="col-12 m-3">
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span>{' '}Submit Comment
                    </Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup className="form-group">
                                <Label htmlFor="rating">Rating</Label>                     
                                <Control.select model=".rating" name="rating"
                                    className="form-control"
                                    validators={{required}}>
                                    <option selected value="">-- Select --</option>
                                    <option value="1">1</option>            
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                                <Errors className="text-danger" model=".rating" show="touched"
                                    messages={{                                                                                
                                        required: "Must select a range"
                                    }}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                        className="form-control" placeholder="Your Name"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}/>
                                <Errors className="text-danger" model=".author" show="touched"
                                    messages={{                                        
                                        minLength: "Must be at least 3 characters long",
                                        maxLength: "Must be 15 characters or less"
                                    }}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                        className="form-control" rows="6"/>
                            </FormGroup>
                            <Button type="submit" color="primary">Submit</Button>                            
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default DishDetail;