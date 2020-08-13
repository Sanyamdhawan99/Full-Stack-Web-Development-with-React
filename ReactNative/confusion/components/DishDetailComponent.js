import React, { Component } from 'react';
import { View, Text, StyleSheet, Button ,ScrollView, FlatList, Alert, Modal, TextInput, PanResponder, Share } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function formatDate(unformattedDate) {
    const date = new Date(unformattedDate);
    return (date.toLocaleDateString('en-us', {'year': 'numeric', 'month': 'short', 'day': '2-digit'}));
}

function RenderDish(props) {
    const dish = props.dish;

    handleViewRef = ref => this.view = ref;

    const recognizeLeftDrag = ({moveX, moveY, dx, dy}) => {
        if (dx < 200) 
            return true;
        else 
            return false;
    }

    const recognizeRightDrag = ({moveX, moveY, dx, dy}) => {
        if (dx > -200) 
            return true;
        else 
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },

        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },

        onPanResponderEnd: (e, gestureState) => {
            console.log('Pan responder ends ', gestureState);
            if (recognizeLeftDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel'
                        },
                        {
                            text: 'Ok',
                            onPress: () => props.favorite ? Alert.alert('', 'Already Favourite') : props.onPressFavorite()
                        }
                    ],
                    {cancelable: false}
                );
            }
            else if (recognizeRightDrag(gestureState)) {
                {props.onPressComment()}
            }
            return true;
        }
    })

    const shareDish = (title, msg, url) => {
        Share.share({
            title: title,
            message: title + ': ' + msg + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        });
    }

    if(dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}
            >
                <Card featuredTitle={dish.name} image={ {uri: baseUrl + dish.image} }>
                    <Text style={{margin:10}}>
                        {dish.description}
                    </Text>
                    <View style={{flexDirection:'row', justifyContent: 'center'}}>
                        <Icon 
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? Alert.alert('', 'Already Favourite') : props.onPressFavorite()}
                        />
                        <Icon 
                            raised
                            reverse
                            name={'pencil'}
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => {props.onPressComment()} }
                        />
                        <Icon 
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            onPress= {() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                        />
                    </View>
                </Card>
            </Animatable.View>
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
                <Rating 
                    type='star'
                    ratingCount={5}
                    imageSize={18}
                    startingValue={item.rating}
                    readonly={true}
                    showRating={false}
                /> 
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' +  formatDate(item.date)}</Text>        
            </View>
        );
    };

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            favorites: [],
            showModal: false,
            rating: 5,
            author: '',
            comment: ''
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

    resetState() {
        this.setState({
            rating: 5,
            author: '',
            comment: ''
        });
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal }) 
    }

    markFavorite(dishId, dishName) {
        this.props.postFavorite(dishId);
        Alert.alert('', dishName + ' marked as Favorite!');
    }

    showCommentForm() {
        this.toggleModal();
    }

    handleCommentSubmit(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
    }

    render() {
        const dishId = this.props.route.params.dishId;

        return(
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPressFavorite={() => this.markFavorite(dishId, this.props.dishes.dishes[+dishId].name)}
                    onPressComment={() => {this.showCommentForm(dishId, this.props.dishes.dishes[+dishId].name)}}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal()}}
                    onRequestClose={() => {this.toggleModal()}}
                >
                    <View style={styles.modal}>
                        <View style={{justifyContent:'center', padding:10}}>
                            <Rating 
                                type='star'
                                ratingCount={5}
                                imageSize={45}
                                showRating
                                onFinishRating={rating => this.setState({ rating: rating })}
                            />
                        </View>
                        <View style={styles.modalText}>
                            <Icon 
                                name="user"
                                type='font-awesome'
                                size={24}
                                color="black"
                            />
                            <TextInput 
                                style={styles.inputText}
                                placeholder='Author'
                                onChangeText={text => this.setState({ author: text })}
                            />
                        </View>
                        <View style={styles.modalText}>
                            <Icon 
                                name="comment-o"
                                type="font-awesome"
                                size={24}
                                color="black"
                            />
                            <TextInput 
                                style={styles.inputText}
                                placeholder='Comment'
                                onChangeText={text => this.setState({ comment: text })}
                            />
                        </View>
                        <View style={{margin:10, padding:10}} >
                            <Button
                                onPress = {() => {this.handleCommentSubmit(dishId) ;this.toggleModal() }}
                                color= '#512DA8'
                                title= 'Submit'
                            />
                        </View>
                        <View style={{margin:10, padding:10}}>
                            <Button 
                                onPress = {() => {this.resetState(); this.toggleModal()}}
                                color= 'gray'
                                title= 'Cancel'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 30
    },
    modalText: {
        paddingTop: 10,
        margin: 10,
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    },
    inputText: {
        fontSize: 20,
        paddingLeft: 10
    },
})


export default connect(mapStateToProps,mapDispatchToProps)(DishDetail);