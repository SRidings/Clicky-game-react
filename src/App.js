import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import GameInstructions from "./components/GameInstructions";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    score: 0,
    highScore: 0,
    friends: friends
  };

  randomRender = id => {
    this.state.friends.forEach((pic) => {
      if (pic.id === id) {
        if (pic.cliked) {
          console.log('You lose, this card has been selected before.');
          this.setState({})
          this.reset();
          return false;
        }
        else {
          this.updateScore();
          pic.cliked = true;
        }
        if (this.state.score >= this.state.highScore) {
          this.newHighScore();
        }
      }
    });
  }

  changePage = (array) => {
    let copy = [], n = array.length, i;
    while (n) {
      i = Math.floor(Math.random() * array.length);

      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }
    this.setState({ friends: copy });
  }

  updateScore = () => {
    this.setState((newState) => ({
      score: newState.score + 1
    }), () => this.winning())
  }

  newHighScore = () => {
    this.setState((newState) => ({
      highScore: newState.score
    }))
  }

  winning = () => {
    if (this.state.score === this.state.friends.length) {
      this.setState({});
      this.reset();
    }
    else {
      setTimeout(() => {
        this.changePage(this.state.friends)
      }, 500);
    }
  }

  reset = () => {
    this.state.friends.forEach((pic) => {
      pic.cliked = false;
    })
    this.setState({ score: 0 })
  }

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <div className='row'>
          <Nav score={this.state.score} highScore={this.state.highScore} />
        </div>

        <div className='row'>
          <GameInstructions />
        </div>

        {this.state.friends.map(friend => {
          return <FriendCard
            {...friend}
            key={friend.id}
            randomRender={this.randomRender}
            changePage={() => this.changePage(this.state.friends)}
          />;
        })}

      </Wrapper>
    );
  }
}

export default App;
