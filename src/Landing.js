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
            query: 'page=1',                 // get Page 0 of jobs by default
            page: 1,
            titleSkillText: "",              // lifted up from SearchForm
            locationText: "",                // lifted up from SearchForm
            fullTimeOnly: "",                // lifted up from SearchForm
            showJobDetails : false,          
            jobID: "",                       // lifted up from JobDetails
            currentJob: "",                  // lifted up from JobDetails
            darkMode: false,
            /*lat: "", 
            long: ""*/                       // uncommenting this will use lat and long in search (API isn't very accurate)
        };
        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleJobClick = this.handleJobClick.bind(this);
        this.handleDarkModeToggle = this.handleDarkModeToggle.bind(this);
        this.setLocation = this.setLocation.bind(this);
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
        this.buildQueryString();
    }
    buildQueryString() {
        // Get query parameters
        const locationQuery = this.state.locationText;
        const titleSkillQuery = this.state.titleSkillText;
        const fullTimeQuery = this.state.fullTimeOnly;
        const pageNum = this.state.page;
        
        // Assign params to object
        const queryObj = {}
        queryObj.location = locationQuery !== "" ? locationQuery : "";
        queryObj.description = titleSkillQuery !== "" ? titleSkillQuery : "";
        queryObj.full_time = fullTimeQuery !== "" ? fullTimeQuery : "";
        queryObj.page = pageNum === 0 ? 0 : pageNum; 
        
        // uncommenting this will use lat and long in search
        // COMMENTED BECAUSE API NOT VERY ACCURATE
        /*queryObj.lat = lat !== "" ? lat : "";
        queryObj.long = lat !== "" ? long : "";*/

        const queryString = this.getQueryString(queryObj);

        queryString !== "" && this.setState({
            query: queryString
        })
    }
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocation);
        } else { 
            console.error("Geolocation is not supported by this browser.");
        }
    } 
    setLocation(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;        
        // uncommenting this will use lat and long in search
        // COMMENTED BECAUSE API NOT VERY ACCURATE
        /*this.setState({
            locationText: latitude + "," + longitude,
            
            lat: latitude, 
            long: longitude
        });*/
    }
    handleJobClick(event) {
        event.preventDefault();
        const clickedJobID = event.currentTarget.id;
        // CORS workaround in API call
        /*const fetchURL = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions/${clickedJobID}.json?markdown=true`; // template string*/
        const fetchURL = `positions/${clickedJobID}.json?markdown=true`; // template string
        
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
    handleDarkModeToggle(event) {
        const {checked} = event.target;
        this.setState({
            darkMode: checked
        });
    }
    componentDidMount() {
        this.getLocation();
        document.addEventListener('scroll', this.trackScrolling);
    }
    componentDidUpdate() {
        document.addEventListener('scroll', this.trackScrolling);
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }
    isBottom(ele) {
        return ele.getBoundingClientRect().bottom <= window.innerHeight; // reached bottom of page
    }
    trackScrolling = () => {
        const wrappedElement = document.getElementById('Landing');
        if (this.isBottom(wrappedElement)) {     
            document.removeEventListener('scroll', this.trackScrolling);
            const pageNum = this.state.page;
            this.setState({
                page: pageNum+1
            });
            this.buildQueryString()
        }
      };
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
            <div id="Landing" className={`Landing ${this.state.darkMode === true ? "darkMode" : ""}` }>    
                <header className="App-header purple">
                    <Header 
                        handleDarkModeToggle={this.handleDarkModeToggle}
                    />
                </header>
                {!this.state.showJobDetails && 
                    <div>
                        <SearchForm
                            locationText={this.state.locationText}
                            darkMode={this.state.darkMode}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                        />
                        <JobListing 
                            query={this.state.query}
                            handleJobClick={this.handleJobClick}
                            darkMode={this.state.darkMode}
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
