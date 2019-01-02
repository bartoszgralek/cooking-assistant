import React, {Component} from 'react';
import {Loader} from "./utils/Loader";
import {NotAuth} from "./utils/NotAuth";
import axios from "axios";
import {Button} from 'reactstrap';
import {stop, play, init, close} from "../utils/voiceContinuous.js";
import {showModal} from "../redux/modalReducer";
import {connect} from "react-redux";
import "../css/recipeDetails.css";

class RecipeDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
            loading: true,
            err: null,
        }
    }

    async componentDidMount() {
        init();
        const id = this.props.match.params.id;
        axios.get("/recipes/" + id)
            .then(response => {
                console.log(response);
                this.setState({recipe: response.data, loading: false})
            })
            .catch(err => this.setState({err: err, loading: false}))
    }

    componentWillUnmount() {
        close();
    }

    addToFavourite = () => {
        axios.post("/users/" + localStorage.getItem("id")+ "/favourites/" + this.state.recipe.id)
            .then(() => {
                this.props.confirm("Recipe has been added to favourites");
            })
    };

    render() {
        if(this.state.loading) {
            return <Loader/>
        }

        if(this.state.err) {
            return <NotAuth/>
        }

        const ingredients = this.state.recipe.ingredients.map(el => {
            return <tr key={el.id}>
                <td>{el.name}</td><td>{el.quantity}</td><td>{el.unit}</td>
            </tr>
        });

        const tools = this.state.recipe.tools.map(el => {
            return <li>
                {el}
            </li>
        });

        const steps = this.state.recipe.steps.map(el => {
            return <li key={el.id}>
                    {el.description}
            </li>
        });

        return (
            <div className="content mycontainer">
                <img src={"http://192.168.0.165:8080/downloadFile/" + this.state.recipe.picture} className="picture" alt=""/>
                <div className="title">
                    <h1>{this.state.recipe.title}</h1> <br/>
                    {this.state.recipe.author.username}
                </div>
                <div className="buttons">
                    {!this.state.recording ?
                        <Button color="primary" onClick={
                            () => {play(this.props.match.params.id);this.setState({recording: true});}
                        }>Assistant</Button> :
                        <Button color="danger" onClick={
                            () => {stop();this.setState({recording: false});}
                        }>Stop</Button>
                    }
                    <Button color="info" onClick={this.addToFavourite}>Add to favourites</Button>
                </div>
                <div className="ing">
                    Ingredients
                    <table>
                        {ingredients}
                    </table>
                </div>
                <div className="tools">
                    Tools
                    <ul>
                        {tools}
                    </ul>
                </div>
                <div className="steps">
                    Steps:
                    <ol>
                        {steps}
                    </ol>
                </div>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        confirm: text => {
            dispatch(showModal('CONFIRM',{text: text, dispatch: dispatch}));
        }
    }
}

export default connect(null, mapDispatchToProps)(RecipeDetails);