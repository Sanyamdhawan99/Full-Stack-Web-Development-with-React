import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Alert } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments
    }
}

function formatDate(unformattedDate) {
    const date = new Date(unformattedDate);
    return (date.toLocaleDateString('en-us', {'year': 'numeric', 'month': 'short', 'day': '2-digit'}));
}

function RenderDish(props) {
    const dish = props.dish;
    if(dish != null) {
        return (
            <Card featuredTitle={dish.name} image={ {uri: baseUrl + dish.image} }>
                <Text style={{margin:10}}>
                    {dish.description}
                </Text>
                <Icon 
                    raised
                    reverse
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already Favourite') : props.onPress()}
                />
            </Card>
        );
    }
    else {
        return(
            <View></View>
        );
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return (
            <View key={index} style={{margin:10}}> 
                <Text style={{fontSize: 14}}>{item.comment}</Text>        
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>        
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' +  formatDate(item.date)}</Text>        
            </View>
        );
    };

    return (
        <Card title='Comments'>
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class DishDetail extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            favorites: []
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

    markFavorite(dishId, dishName) {
        this.setState({favorites: this.state.favorites.concat(dishId)})
        Alert.alert('', dishName + ' marked as Favorite!')
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.state.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId, this.state.dishes[+dishId].name)}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(DishDetail);