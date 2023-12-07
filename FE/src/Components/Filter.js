import React from "react";
import '../Styles/Filter.css'
import queryString from "query-string";
import axios from "axios";

class Filter extends React.Component {
    constructor(){
        super();
        this.state = {
            restaurants : [],
            location : undefined,
            locations : [],
            meal_type : undefined,
            cuisine : [],
            lcost : undefined,
            hcost : undefined,
            sort : 1,
            page : 1, 
            pageCount : []
        }
    }

    componentDidMount () {
        const qs = queryString.parse(this.props.location.search);
        const { mealtype, location, cuisine, sort, page } = qs;
        const filterObj = {
            meal_type : Number(mealtype),
            location,
            cuisine ,
            sort ,
            page
        };

        axios({
            method: 'POST',
            url: `http://localhost:5000/common/filter`,
            headers : {'Content-Type': 'application/json'},
            data: filterObj
        })

        .then(response =>{
            this.setState({restaurants: response.data.restaurants, pageCount: response.data.pageCount});
        })
        .catch(err => console.log(err));

        axios({
            method: 'GET',
            url: 'http://localhost:5000/common/location',
            headers : {'Content-Type': 'application/json'}
        })

        .then(response =>{
            this.setState({locations: response.data.data.location});
        })
        .catch(err => console.log(err));
    
    }

    handleSortChange = (sort) => {
        const { mealtype, cuisine, location, lcost, hcost, page } = this.state;

        const filterObj = {
            meal_type : Number(mealtype),
            cuisine : cuisine.length === 0 ? undefined : cuisine ,
            location,
            lcost,
            hcost,
            sort ,
            page
        };

        axios({
            method: 'POST',
            url: `http://localhost:5000/common/filter`,
            headers : {'Content-Type': 'application/json'},
            data: filterObj
        })

        .then(response =>{
            this.setState({restaurants: response.data.restaurants, sort, pageCount: response.data.pageCount});
        })
        .catch(err => console.log(err));
    }

    handleCostChange = (lcost, hcost) => {
        const { mealtype, cuisine, location, sort, page } = this.state;

        const filterObj = {
            meal_type : Number(mealtype),
            cuisine : cuisine.length === 0 ? undefined : cuisine ,
            location,
            lcost,
            hcost,
            sort ,
            page
        };

        axios({
            method: 'POST',
            url: `http://localhost:5000/common/filter`,
            headers : {'Content-Type': 'application/json'},
            data: filterObj
        })

        .then(response =>{
            this.setState({restaurants: response.data.restaurants, lcost, hcost, pageCount: response.data.pageCount});
        })
        .catch(err => console.log(err));
    }

    handleLocation = (event) => {

        const location = event.target.value;
        console.log(location)

        const { mealtype, cuisine, lcost, hcost, sort, page } = this.state;

        const filterObj = {
            meal_type : Number(mealtype),
            cuisine : cuisine.length === 0 ? undefined : cuisine ,
            location,
            lcost,
            hcost,
            sort ,
            page
        };

        axios({
            method: 'POST',
            url: `http://localhost:5000/common/filter`,
            headers : {'Content-Type': 'application/json'},
            data: filterObj
        })

        .then(response =>{
            this.setState({restaurants: response.data.restaurants, location, pageCount: response.data.pageCount});
        })
        .catch(err => console.log(err));
    }

    handlePageChange = (page) => {
        const { mealtype, cuisine, location, lcost, hcost, sort } = this.state;

        const filterObj = {
            meal_type : Number(mealtype),
            cuisine : cuisine.length === 0 ? undefined : cuisine ,
            location,
            lcost,
            hcost,
            sort ,
            page
        };

        axios({
            method: 'POST',
            url: `http://localhost:5000/common/filter`,
            headers : {'Content-Type': 'application/json'},
            data: filterObj
        })

        .then(response =>{
            this.setState({restaurants: response.data.restaurants, page, pageCount: response.data.pageCount});
        })
        .catch(err => console.log(err));
    }


    handleCuisineChange = (cuisineId) => {
        
        const { mealtype, cuisine, location, lcost, hcost, sort, page } = this.state;

        const index = cuisine.indexOf(cuisineId)
        if(index == -1){
            cuisine.push(cuisineId);
        } else {
            cuisine.splice(index, 1);
        }

        const filterObj = {
            mealtype : Number(mealtype),
            cuisine : cuisine.length == 0 ? undefined : cuisine ,
            location,
            lcost,
            hcost,
            sort ,
            page
        };

        axios({
            method: 'POST',
            url: `http://localhost:5000/common/filter`,
            headers : {'Content-Type': 'application/json'},
            data: filterObj
        })

        .then(response =>{
            this.setState({restaurants: response.data.restaurants, cuisine, pageCount: response.data.pageCount});
        })
        .catch(err => console.log(err));
    }

    handleNavigate = (resId) => {
        this.props.history.push(`/details?restaurant=${resId}`);
    }

    

    render(){
        const {restaurants, locations, pageCount} = this.state;
        return (
            <div>
                <h2>Breakfast places in Mumbai</h2>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-2 filter-options">
                            <div className="filter-heading">Filters / Sort</div>
                            <div id="filter" className="collapse show">
                                <div className="Select-Location">Select Location</div>
                                
                                <select className="Rectangle-2236" onChange={this.handleLocation}>
                                <option value="0" >Select</option>
                                {locations.map((item, index) => {
                                return <option key={index} value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                            })}
                                </select>

                                <div className="Cuisine">Cuisine</div>
                                <div style={{display:'block'}}>
                                    <input type = "checkbox" name = "cuisine" onChange = {() => this.handleCuisineChange(1)} />
                                    <span className="checkbox-items">North Indian</span>
                                </div>

                                <div style={{display:'block'}}>
                                    <input type = "checkbox" name = "cuisine" onChange = {() => this.handleCuisineChange(2)} />
                                    <span className="checkbox-items">South Indian</span>
                                </div>

                                <div style={{display:'block'}}>
                                    <input type = "checkbox" name = "cuisine" onChange = {() => this.handleCuisineChange(3)}/>
                                    <span className="checkbox-items">Chinese</span>
                                </div>

                                <div style={{display:'block'}}>
                                    <input type = "checkbox" name = "cuisine" onChange = {() => this.handleCuisineChange(4)}/>
                                    <span className="checkbox-items">Fast Food</span>
                                </div>

                                <div style={{display:'block'}}>
                                    <input type = "checkbox" name = "cuisine" onChange = {() => this.handleCuisineChange(5)}/>
                                    <span className="checkbox-items">Street Food</span>
                                </div>

                                <div className="Cuisine">Cost For Two</div>
                                <div style={{display:'block'}}>
                                    <input type="radio"name="cost" onChange = {() => this.handleCostChange(1, 500)}/>
                                    <span className="checkbox-items">Less than &#8377; 500 </span>
                                </div>

                                <div style={{display:'block'}}>
                                <input type="radio"name="cost" onChange = {() => this.handleCostChange(500,1000)}/>
                                    <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                </div>

                                <div style={{display:'block'}}>
                                <input type="radio"name="cost" onChange = {() => this.handleCostChange(1000,1500)}/>
                                    <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                </div>

                                <div style={{display:'block'}}>
                                <input type="radio"name="cost" onChange = {() => this.handleCostChange(1500,2000)}/>
                                    <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                </div>

                                <div style={{display:'block'}}>
                                <input type="radio"name="cost" onChange = {() => this.handleCostChange(2000,500000)}/>
                                    <span className="checkbox-items">&#8377; 2000+</span>
                                </div>

                                <div className="Cuisine">Sort</div>
                                <div style={{display:'block'}}>
                                    <input type="radio" name="sort" onChange = {() => this.handleSortChange(1)}/>
                                    <span className="checkbox-items">Price low to high</span>
                                </div>

                                <div style={{display:'block'}}>
                                    <input type="radio" name="sort" onChange = {() => this.handleSortChange(-1)}/>
                                    <span className="checkbox-items">Price high to low</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-sm-8 col-md-8 col-lg-8">
                        

{restaurants.length > 0 ? restaurants.map(item =>{
    return  <div className="Item" onClick={this.handleNavigate(item._id)}>
    <div>
        <div className="small-item vertical">
            <img id="imginfo" className="img" src={`./${item.image}`}/>
        </div>

        <div className="big-item">
            <div className="rest-name">{item.name }</div>
            <div className="rest-location">{item.locality}</div>
            <div className="rest-address">{item.city}</div>
            <hr/>
        </div>
    </div>
    <hr/>
    <div>
        <div className="margin-left">
        <div className="Bakery">CUISINES: {item.cuisine.map(cuisineItem => cuisineItem.name)}</div>            
        <div className="Bakery">COST FOR TWO : &#8377; {item.min_price}</div>
        </div>
    </div>
</div> 
}) : <div className='no-records'>No records found...</div>}
                        

                            {restaurants.length > 0 ?
                                <div className="pagination">
                                <span className="page-num">&laquo;</span>
                                {pageCount.map(pageNo=>{
                                    return<span className="page-num">{pageNo}</span>
                                })}
                                
                                <span className="page-num">&raquo;</span>
                            </div> : null }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Filter;