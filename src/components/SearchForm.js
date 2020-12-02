import './SearchForm.css';
import React from "react";

class SearchForm extends React.Component {
    constructor() {
        super()
        this.state = {
            titleCompanyText: "",
            locationText: "",            
            jobs: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log('herer');
        const jobList = []
        this.setState({
            jobs: jobList
        })
    }

    render() {
        return (
            <div className="searchForm">
                <form className="filter-form" onSubmit={this.handleSubmit}>
                    <input type="text" className="titleCompanyFilter" name="titleCompanyText" onChange={this.handleChange} value={this.state.titleCompanyText} placeholder="Filter by title, companies..."/>                    
                    <input type="text" className="locationFilter" name="locationText" onChange={this.handleChange} value={this.state.locationText} placeholder="Filter by location..."/>
                    <span className="filterAndSearchButton">
                        <label>
                            <input type="checkbox" className="fullTimeFilterCheckbox" name="fullTimeFilter" />
                            <span className="fullTimeFilterText">Full Time Only</span>
                        </label>
                        <button className="searchButton purple">Search</button>
                    </span>
                </form>
            </div>
        )
    }
}

export default SearchForm;