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
    
    componentDidMount() {
        fetch("/positions.json?page=1")
            .then(res => res.json())
            .then(
                (result) => {
                    const jobs = result;
                    this.setState({
                        isLoaded: true,
                        jobs
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
        const jobListing = this.state.isLoaded && this.state.jobs.map( 
            ({id, company, company_logo, location, type, title, created_at}) => {                        
            return (
                <JobTile 
                    key={id}
                    companyName={company}
                    companyLogo={company_logo}
                    location={location}
                    position={title}
                    type={type}
                    createdTime={created_at}
                />
            )
        });
        return (
            <div className="jobListing light-gray">
                {jobListing}
            </div>
        )
    }
}

export default JobListing;