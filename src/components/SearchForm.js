import './SearchForm.css';
import React from "react";

class SearchForm extends React.Component {
    render() {
        return (
            <div className="searchForm">
                <form className="filter-form" onSubmit={this.props.handleSubmit}>
                    <input type="text" className="titleCompanyFilter" name="titleSkillText" onChange={this.props.handleChange} value={this.props.titleSkillText} placeholder="Filter by title or company name..."/>                    
                    <input type="text" className="locationFilter" name="locationText" onChange={this.props.handleChange} value={this.props.locationText} placeholder="Filter by location..."/>
                    <span className="filterAndSearchButton">
                        <label className="fullTimeCheckbox">
                            <input type="checkbox"  className="fullTimeFilterCheckbox" name="fullTimeOnly" onChange={this.props.handleChange}/>
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