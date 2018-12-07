import {ImageGallery} from "react-image-gallery";
import {Lightbox} from "react-images";

const React = require('react');

export default class FileUpload extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pictures: []
        };
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({
            pictures: this.state.pictures.concat(URL.createObjectURL(event.target.files[0]))
        })
    }
    render() {

        const images = [
            {
                src: 'http://lorempixel.com/250/150/nature/1/',
            },
            {
                src: 'http://lorempixel.com/250/150/nature/2/'
            },
            {
                src: 'http://lorempixel.com/250/150/nature/3/'
            }
        ];

        return (
            <div>
                <input type="file" onChange={this.handleChange}/>
                <Lightbox images={[{src: 'http://lorempixel.com/250/150/nature/1/',}, {src: 'http://lorempixel.com/250/150/nature/2/'}, {src: 'http://lorempixel.com/250/150/nature/3/'}]}/>
            </div>
        );
    }
}