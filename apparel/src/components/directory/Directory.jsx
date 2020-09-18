import React from "react";

import MenuItem from '../menu-item/MenuItem'
import './directory.scss'

export default class Directory extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            
            sections: [
                {
                    title: 'hats',
                    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
                    id: 1,
                    linkUrl:'hats'
                },
                {
                    title: 'jackets',
                    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
                    id: 2,
                    linkUrl:''
                },
                {
                    title: 'sneakers',
                    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                    id: 3,
                    linkUrl:''
                },
                {
                    title: 'her',
                    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
                    id: 4,
                    size: 'large',
                    linkUrl:''
                },
                {
                    title: 'him',
                    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
                    id: 5,
                    size: 'large',
                    linkUrl:''
                }
            ]
        }
    }

    render(){
        return(
            <div className ='directory-menu'>
               {this.state.sections.map( section => <MenuItem key={section.id} title={section.title} imageUrl={section.imageUrl} size={section.size} linkUrl={section.linkUrl}/>)}
            </div>
        )
    }
}