

import React from "react";
import { withRouter } from "react-router-dom";

class QuickSearchItem extends React.Component{
    handleNavigate = (mealtypeId) => {
        const locationId = sessionStorage.getItem("location_Id")
        console.log(locationId)
        if(locationId) {
            this.props.history.push(`/filter?mealtype=${mealtypeId}&location=${locationId}`);

        }else{
            this.props.history.push(`/filter?mealtype=${mealtypeId}`);
        }
    }
    
    render(){
        const {name, content, image, meal_type} = this.props.quicksearchitemData;
        console.log(meal_type)
        return(
                            <div className="col-sm-12 col-md-6 col-lg-4" onClick={() => this.handleNavigate(meal_type)}>
                                <div className="titleContainer">
                                    <div className="titleComponent1">
                                        <img src = {`./${image}`} height='150' width='140'/> 
                                    </div>
                                    <div className="titleComponent2">
                                        <div className="componentHeading">
                                            {name}
                                        </div>
                                        <br/>
                                        <div className="componentSubHeading">
                                            {content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
        )
    }
}

export default withRouter(QuickSearchItem);
