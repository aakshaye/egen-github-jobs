import './JobDetail.css';
import React from 'react';
import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown'

function JobDetail({companyLogo, type, position, companyName, location, createdTime, description, companyURL, howToApply, darkMode}) {
        return (
        <div className={`jobDetail ${darkMode === true ? "darkMode" : ""}`}>
            <div className="jobHeading">
                <div className="companyLogoImage">
                    <img className="companyLogo" src={companyLogo} alt="logo"/>
                </div>
                <div className="companyName">
                    <div className="compName">{companyName}</div>
                    <a href={companyURL} className="companyURL">
                        {companyURL}
                    </a>
                </div>
                <div className="companySiteButton">
                    <button className="companySite">
                        <a className="redirectLink" href={`//${companyURL}`} target="_blank">
                            Company Site
                        </a>
                    </button>
                </div>
            </div>
            <div className="jobDetails">
                <div className="basicInfo">
                    <div className="jobInfo">
                        <div className="timeWithType">
                            <span className="timePosted">
                                <Moment date={createdTime} fromNow/>
                            </span>
                            <span className="dot">&middot;</span>
                            <span className="jobType">{type}</span>
                        </div>        
                        <div className="position">
                            {position}
                        </div>
                        <div className="locations">
                            {location}
                        </div>   
                    </div>
                    <button className="applyButton">
                        <a className="redirectLink" href={companyURL}>
                            Apply Now
                        </a>
                    </button>                 
                </div>
                
                <div className="description">
                    <ReactMarkdown>{description}</ReactMarkdown>
                </div>
            </div>
            <div className="howToApply">
                <h3>How To Apply</h3>
                <p><ReactMarkdown>{howToApply}</ReactMarkdown></p>
            </div>
        </div>
    );
}
  
export default JobDetail;