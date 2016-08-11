/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import Button from 'react-native-button';
import CheckBox from 'react-native-checkbox';
import { SwipeListView } from 'react-native-swipe-list-view';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  Image,
  View
} from 'react-native';

  var SplashScreen = React.createClass({
    render: function(){
      return (
        <View style={styles.container}>
          <Image style={styles.image} source={require('./splash.png')} resizeMode="cover" />
        </View>
      )
    }
  });


var myFirstApp = React.createClass({
   getInitialState: function() {
    return {
      todoList : [],
      renderSplashscreen: true
    }
  },
  componentDidMount: function() {
   setTimeout(() => this.setState({renderSplashscreen: false}), 3000)
},
  setTodoList : function(todoArray){
    this.setState({
      todoList : todoArray
    });
  },

  updateList : function(todoArray){
     this.setState({
      todoList : todoArray
    });
  },

  render : function() {
    
      if (this.state.renderSplashscreen) {
        return (<SplashScreen />);
      }else{
        return (
         <View style={styles.container}>
            <Input todoList = {this.setTodoList}/> 
            <List updateTodoList={this.updateList} displayTodos = {this.state.todoList}/>     
        </View>
        );
      }
     

  }
});

var Input = React.createClass({
  getInitialState: function() {
    return {
      text: "",
      todoList : []
    }
  },
  _handlePress : function(){  
      var todos = (this.state.todoList) ? this.state.todoList:[];
      todos.push(this.state.text);
      this.setState({
        todoList : todos
      });
      this.props.todoList(todos);
      this.setState({
        text : ""
      });
  },
  render : function(){
    return (
      <View style={styles.form}>
        <TextInput onChangeText={(text) => this.setState({text})}
        value={this.state.text}/>
        <Button
          style={{fontSize: 20, color: 'green',padding:10}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._handlePress()}>
          Add Todo
        </Button>
      </View>  
      )
  }
});

var List = React.createClass({
  getInitialState: function() {
      return {
        dataSource: [],
        todoList : []
      };
  },
  
  render : function(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var todos = (this.props.displayTodos) ? this.props.displayTodos : [];
    var todoList = ds.cloneWithRows(todos);
    return(
        <SwipeListView
            dataSource={todoList}
            renderRow={ data => (
                <View style={styles.rowFront}>
                    <Text>{data}</Text>
                </View>
            )}
            renderHiddenRow={ data => (
                <View style={styles.rowBack}>
                    <Text style={{fontSize: 15, color: 'green'}}>Done</Text>
                    <Text style={{fontSize: 15, color: 'red'}}>Remove</Text>
                </View>
            )}
            enableEmptySections={true}
            leftOpenValue={75}
            rightOpenValue={-75}/>
      )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  form: {
    margin : 20,
  },
  image: {
    flex: 1
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
});

AppRegistry.registerComponent('myFirstApp', () => myFirstApp);
