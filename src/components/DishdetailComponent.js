import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, FormGroup,Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';


function DishDetail(props){        
    if(props.dish != null)
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
                    <RenderComments comments={props.comments} />
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

const RenderComments= ({comments}) => {   
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
                <CommentForm />
            </>
        )                
    }
        
    return(<div></div>)
}

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
class CommentForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOopen: false
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleNav = () => this.setState({isNavOpen: !this.state.isNavOpen})
    
    toggleModal = () => this.setState({isModalOopen: !this.state.isModalOopen})

    handleSubmit = (values) => {
        this.toggleModal();
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }

    render(){
        return(
            <div className="row">
                <div className="col-12 m-3">
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span>{' '}Submit Comment
                    </Button>
                </div>
                <Modal isOpen={this.state.isModalOopen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup className="form-group">
                                <Label htmlFor="rating">Rating</Label>                     
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
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