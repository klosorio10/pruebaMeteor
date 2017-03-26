import React, { Component } from 'react';
import '../../client/main.css';
import Image from './image';
import Features from './features';
import Comments from './comments';
import VideoPlayer from './videoPlayer';

import axios from 'axios';
import YTSearch from 'youtube-api-search';
var instance = axios.create({
  baseURL: 'http://api.walmartlabs.com/v1',
  timeout: 1000
});


const API_KEY = 'AIzaSyD7AeJ_fi01jWanRgPibiUCgWuSFb7nFkE';
const api_walm = 'nw8qw3u8ja5qhtzwkz4ex9ws';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selected: false,
            brands: [],
            videosA: [],
            videosB: [],
            selectedA: null,
            selectedB: null,
            contador:0,
            comments:[]
        };
    }

    getObjetos(keyword) {
        this.state.data = [];
        this.state.selected = true;
        axios.get('/search?apiKey='+api_walm+'&query='+keyword)
            .then(response => {
                this.setState({data: response.data.items});
                var array = [];
                for (var i = 0; i < response.data.items.length; i++) {
                    axios.get('/item/' + response.data.items[i].itemId)
                        .then(response => {
                            array.push(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
                this.setState({brands: array});
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log(this.state.data);
        console.log(this.state.brands);
    }


    buscarVideoYoutubeA(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videosA: videos[0]
            });
        });
    }

    buscarVideoYoutubeB(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videosB: videos[0]
            });
        });
    }


    showInstructions() {
        if (this.state.selected == true) {
            return (
                <div className="instruction">
                    <h3>Selecciona los dos objetos que vas a comparar </h3>
                </div>
            );
        }
    }

    showOptions(){
        if (this.state.contador<2) {
            return (
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        {this.state.data.map(image => {
                            return (
                                <div className="producto">
                                    <Image producto={image} callFather={(producto)=> this.childChanged(producto)}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        return (<div><h2 className="center">Comparar</h2></div>);
    }

    childChanged(producto){
        if(this.state.selectedA === null){
            this.setState({
                selectedA:producto
            });
            this.state.contador=1;
        }else {
            this.setState({
                selectedB:producto
            });
            this.state.contador=2;
        }
    }

    comment(){
        if(document.getElementById("comments").value !== null){
            var text = document.getElementById("comments").value;
            var arrayC = this.state.comments;
            arrayC.push(text);
            this.setState({comments:arrayC});
            document.getElementById("comments").value = "";
        }
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">

                        <br></br>

                        <input type="text" id="text" className="form-control" placeholder="busca el objeto a comparar"/>
                        <br></br>
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <button className="btn btn-info btn-block" onClick={(evt) => {
                                    this.getObjetos(document.getElementById("text").value)
                                }}>
                                    buscar productos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>

                <p>{this.showInstructions()}</p>
                <p>{this.showOptions()}</p>

                <div className="col-md-2"></div>
                <div className="col-md-4 center">
                    <Features detalles={this.state.selectedA}/>
                    <VideoPlayer />
                </div>
                <div className="col-md-4 center">
                    <Features detalles={this.state.selectedB} />
                    <VideoPlayer/>
                </div>
                <div className="col-md-2"></div>

                <br/>
                <br/>
                <div className="antesComment"><br></br><h2>Cuentanos de tu experiencia</h2></div>
                <br></br><br></br><br></br>
                <div className="row">
                  <div className="col-md-2 center"></div>
                    <div className="col-md-8 center comentarios">
                    <input type="text" id="comments" className="form-control" placeholder="escribe..." />
                        <br/>
                    <button id="botonComments" className="btn btn-success btn-block" onClick={()=> this.comment()}>
                        Comentar
                    </button>
                        <br/>
                    <Comments comments={this.state.comments}/>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
