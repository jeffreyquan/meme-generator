import React, { Component } from 'react';
import axios from 'axios';

class MemeGenerator extends Component {
  constructor() {
    super()
    this.state = {
      topText: '',
      bottomText: '',
      randomImg: 'http://i.imgflip.com/1bij.jpg',
      allMemeImgs: []
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("https://api.imgflip.com/get_memes").then( (results) => {
      const memes = results.data.data.memes;
      this.setState({
        allMemeImgs: memes
      })
    })
  }

  _handleChange(event) {
    const {name, value} = event.target
    this.setState({ [name]: value })
   }

   _handleSubmit(event) {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImg: randMemeImg });
   }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={ this._handleSubmit }>
          <label>Top text</label>
          <input
            type="text"
            name="topText"
            placeholder="Top Text"
            value={ this.state.topText }
            onChange={ this._handleChange }
          />
          <input
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={ this.state.bottomText }
            onChange={ this._handleChange }
          />
          <button>Generate</button>
        </form>
        <div className="meme">
          <img src={ this.state.randomImg } alt="" />
          <h2 className="top">{ this.state.topText }</h2>
          <h2 className="bottom">{ this.state.bottomText }</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
