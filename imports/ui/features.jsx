import React, { Component } from 'react';

class  Features extends Component{

    render(){
        if(this.props.detalles){
            return(
                <div>
                    <img src={this.props.detalles.thumbnailImage} alt={this.props.detalles.name}/>
                    <h5>Nombre: {this.props.detalles.name}</h5>
                    <p>Descripción: {this.props.detalles.shortDescription}</p>
                    <p>Precio: {this.props.detalles.salePrice}</p>
                </div>
            );
        }else
        {
            return(
                <div></div>
            );
        }

    }

}

export default Features;