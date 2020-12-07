import './JobListing.css';
import React from 'react';
import JobTile from './JobTile';

class JobListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          jobs: []
        };
    }
    // get jobs when component mounts
    componentDidMount() {
        this.getJobList();        
    }
    // get jobs when props change
    componentDidUpdate(prevProps) {
        if (prevProps.query !== this.props.query) {
            this.getJobList();
        }
    }
    // get jobs based on query params prop
    getJobList() {
        // CORS workaround in API call
        const proxyURL = 'https://protected-beach-09626.herokuapp.com/'; // self-created heroku domain
        const githubJobsAPI = 'https://jobs.github.com/';
        const queryParams = 'positions.json?' + this.props.query;

        fetch(`${proxyURL}${githubJobsAPI}${queryParams}`)        
            .then(res => res.json(), {
                mode: 'cors',
            })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        jobs: [...this.state.jobs, ...result] // append to jobs object
                    });
                },
            )
            .catch(
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }      
            )
    }
    render() {
        const jobListing = this.state.isLoaded && this.state.jobs.map(                      // conditional operator
            ({id, company, company_logo, location, type, title, created_at}) => {           // destructure job object             
            return (
                <JobTile 
                    key={id}
                    id={id}
                    companyName={company}
                    companyLogo={company_logo}
                    location={location}
                    position={title}
                    type={type}
                    createdTime={created_at}
                    darkMode={this.props.darkMode}
                    handleJobClick={this.props.handleJobClick}
                />
            )
        });
        return (
            <div id="jobList" className="jobListing">
                {jobListing}
            </div>
        )
    }
}

export default JobListing;