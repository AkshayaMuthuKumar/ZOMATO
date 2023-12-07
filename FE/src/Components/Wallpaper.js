import React from "react";
import axios from "axios";
import { withRouter} from 'react-router-dom';

class Wallpaper extends React.Component {
    constructor (){
        super();
        this.state = {
            restaurant : [],
            inputText : '',
            suggestions: []
        }
    }
    handleLocation = (event) => {
        const locationId = event.target.value;
        console.log(locationId)
        sessionStorage.setItem ('location_Id', locationId)

        axios({
            method: 'GET',
            url: `http://localhost:5000/common/restaurantslocation/${locationId}`,
            headers : {'Content-Type': 'application/json'}
        })

        .then(response =>{
            this.setState({restaurant: response.data.data.restaurant});
            console.log(response)
        })
        .catch(err => console.log(err));
    }

    handleSearch = (event) => {
        let inputText = event.target.value;
        const {restaurant} = this.state;
        console.log(restaurant)
        const suggestions = restaurant.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));

        this.setState({suggestions, inputText});
    }

    showSuggestion = () => {
    const {suggestions, inputText} = this.state;
        if(suggestions.length === 0 && inputText === undefined){
            return null;
        }
        if(suggestions.length > 0 && inputText === ''){
            return null;
        }
        if(suggestions.length === 0 && inputText){
            return <ul>
                <li>No search results found</li>
            </ul>
        }
        return (
            <ul>
            {
                suggestions.map((item, index) => (<li key={index} onClick={() => this.selectingRestaurant(item)}>{`${item.name} - ${item.locality}, ${item.city}`}</li>))
            }
            </ul>
        );
    }

    selectingRestaurant = (resObj) => {
        this.props.history.push(`/details?restaurant=${resObj._id}`);
    }

    render() {
        const {locationsData, isUserAuthenticated} = this.props;
        Wallpaper.defaultProps = {
            locationsData: [] // Set a default empty array
        };
    
        return (
            <div>
                 {isUserAuthenticated ? (
        <Wallpaper locationsData={locationsData} />
      ) : (
        <div>
      <img src = "./Assets/bgimage.jpg" width='100%' height ='450'/>
      <div>
          <div className = "logo">
              <p>e!</p>
          </div>

          <div className="headings">
              Find the best restaurants, cafes, bars
          </div>

          <div className="locationSelector">
              <select className="locationDropdown" onChange={this.handleLocation}>
                  <option value="0" >Select</option>
                  {locationsData.map((item, index) => {
                      return <option key={index} value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                  })}
                  
              </select>

              <div>
                  <span className="glyphicon glyphicon-search search"></span>
                  <div id="notebooks">
                  <input id="query" className="restaurantinput" type = "text" 
                  placeholder="Please enter Reataurant name" onChange={this.handleSearch}></input>
                  {this.showSuggestion()}
                  </div>
              </div>
          </div>
          </div>
          </div>

      ) }
                </div>
        )
        
    }
}
export default withRouter(Wallpaper);
