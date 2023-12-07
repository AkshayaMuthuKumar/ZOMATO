import React from "react";
import axios from "axios";
import Wallpaper from "./Wallpaper";
import QuickSearch from "./QuickSearch";
import '../Styles/Home.css'

class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            location : [],
            mealtypes : []
        }
    }

    componentDidMount(){
        sessionStorage.clear();
        axios({
            method: 'GET',
            url: 'http://localhost:5000/common/location',
            headers : {'Content-Type': 'application/json'}
        })

        .then(response =>{
            this.setState({location: response.data.data.location});
        })
        .catch(err => console.log(err));

        axios({
            method: 'GET',
            url: 'http://localhost:5000/common/mealtypes',
            headers : {'Content-Type': 'application/json'}
        })

        .then(response =>{
            this.setState({mealtypes: response.data.data.mealtypes});
        })
        .catch(err => console.log(err));
    }

    render (){
        const {location, mealtypes} = this.state;
        return(

<div>
            <Wallpaper locationsData={location}/>
            <QuickSearch quicksearchData={mealtypes} />
            </div>
        )
    }
}

export default Home;