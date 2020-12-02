import './Landing.css';
import React from 'react';
import Header from './components/Header';
import JobListing from './components/JobListing';
import SearchForm from './components/SearchForm';
import JobDetail from './components/JobDetail';

class Landing extends React.Component {
    constructor() {
        super();
        this.state = {            
            query: 'page=0',                 // get Page 0 of jobs by default
            titleSkillText: "",              // lifted up from SearchForm
            locationText: "",                // lifted up from SearchForm
            fullTimeOnly: "",                // lifted up from SearchForm
            showJobDetails : false,          
            jobID: "",
            currentJob: ""
        };
        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleJobClick = this.handleJobClick.bind(this);
    }

    // lifted up from SearchForm
    handleChange(event) {
        const { name, value, checked } = event.target;
        if (name !== 'fullTimeOnly') {
            this.setState({
                [name]: value
            });
        } else {
            this.setState({
                fullTimeOnly: checked
            });
        }
    }
    // lifted up from SearchForm
    handleSubmit(event) {
        event.preventDefault();

        // Get query parameters
        const locationQuery = this.state.locationText;
        const titleSkillQuery = this.state.titleSkillText;
        const fullTimeQuery = this.state.fullTimeOnly;

        // Assign params to object
        const queryObj = {}
        queryObj.location = locationQuery !== "" ? locationQuery : "";
        queryObj.description = titleSkillQuery !== "" ? titleSkillQuery : "";
        queryObj.full_time = fullTimeQuery !== "" ? fullTimeQuery : "";

        const queryString = this.getQueryString(queryObj);

        queryString !== "" && this.setState({
            query: queryString
        })
    }
    handleJobClick(event) {
        event.stopPropagation();
        const clickedJobID = event.target.id;
        const fetchURL = `/positions/${clickedJobID}.json?markdown=true`; // template string
        console.log(fetchURL, clickedJobID);
        fetch(fetchURL)
            .then(res => res.json())
            .then(
                (result) => {
                    const job = result;
                    this.setState({
                        currentJob:job,
                        showJobDetails: true
                    });
                },
            )
            .catch(
                (error) => {
                    this.setState({
                        error
                    });
                }      
            )
    }


    /* This function takes query parameter object and creates an appropriate query string */
    getQueryString(obj) {
        const queryParams = [];
        for (const key in obj) {
            if (obj[key] !== "") {
                queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])); // encode URL to make sure special characters are parsed
            }
        }
        return queryParams.join('&');
    }
    render() {
        const currentJob = this.state.currentJob;
        return (
            <div className="Landing">
                <header className="App-header purple">
                    <Header />
                </header>
                {!this.state.showJobDetails && 
                    <div>
                        <SearchForm
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                        />
                        <JobListing 
                            query = {this.state.query}
                            handleJobClick={this.handleJobClick}
                        />
                    </div>    
                }
                {this.state.showJobDetails && 
                    <JobDetail                    
                        companyName={currentJob.company}
                        companyLogo={currentJob.company_logo}
                        location={currentJob.location}
                        position={currentJob.title}
                        type={currentJob.type}
                        createdTime={currentJob.created_at}
                        description={currentJob.description}
                        companyURL={currentJob.company_url}
                        howToApply={currentJob.how_to_apply}
                    />
                }
            </div>
        );
    }
}
export default Landing;
