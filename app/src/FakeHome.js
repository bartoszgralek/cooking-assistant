import React from 'react';
import './react/style/Galery.css'
import {Loader} from "./react/loader/Loader";

export default class Main extends React.Component {
    state = {
        images: [],
        isLoading: false
    };

    async componentDidMount() {
        this.setState({
            isLoading: true
        });
          const response = await fetch('https://pixabay.com/api/?key=10075481-3f58b58184ac52cd25434e6e2&category=food&per_page=20', {
              method: 'GET'
          });
          const data = await response.json();
          this.setState({
              images: data.hits.map(hit => hit.largeImageURL),
              isLoading: false
          })
    }

    render() {
        if(this.state.isLoading) {
            return <Loader/>;
        }
        return <section id="photos">
            {this.state.images.map(item => <img src={item}/>)}
        </section>;
    }
}