import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import CommentForm from './CommentFormComponent';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Stagger, Fade } from 'react-animation-components';

function formatDate(unformattedDate) {
    const date = new Date(unformattedDate);
    return (date.toLocaleDateString('en-us', {'year': 'numeric', 'month': 'short', 'day': '2-digit'}));
}

function RenderDish({dish}) {
    return (
        <FadeTransform in transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );        
}

function RenderComments({comments, postComment, dishId}) {
    const commentDisplay = comments.map((comment) => {
        if(comment.comment === null || comment.comment.length === 0) {
            return (
                <div></div>
            );
        }
        return (
            <Stagger in>
                <Fade in>
                    <li key={comment.id}>
                        <strong>
                        <p> {comment.comment} </p>
                        <p>-- {comment.author} , {formatDate(comment.date)}</p>
                        </strong>
                    </li>
                </Fade>
            </Stagger>
            );
    });

    return (
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {commentDisplay}
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    );
}

const DishDetail = (props) => {
    if(props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    
    else if(props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    else if(props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem> <Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                    </div>
                </div>
            </div>
        );
    }

    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;