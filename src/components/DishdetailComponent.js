import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component{

    render(){
        const details = this.props.dish;
        if(details != null)
        return(
            <div className="container">
                <div className="row">                
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg src={details.image} alt={details.name} />
                            <CardBody>
                                <CardTitle>{details.name}</CardTitle>
                                <CardText>{details.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <div className="unstyled-list">
                            {this.renderComments(details.comments)}
                        </div>
                    </div>
                </div>
            </div>
        );
        return (<div>   </div>)
    }

    renderComments = (comments) =>{   
        if(comments != null)     
            return(comments.map(comment =>{ 
                return(
                    <div key={comment.id} className="col-12 pt-3"> 
                        <div>{comment.comment}</div>
                        <div>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date))) }</div>
                    </div>
                    )
                })
            )
        return(<div></div>)
        }
}

export default DishDetail;