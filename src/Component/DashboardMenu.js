import Select from "react-select";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import locationList from '../data'

// const locationList = [
//     { value: "AB", label: "Alberta" },
//     { value: "BC", label: "British Columbia" },
//     { value: "MB", label: "Manitoba" },
//     { value: "NB", label: "New Brunswick" },
//     { value: "NL", label: "Newfoundland and Labrador" },
//     { value: "NT", label: "Northwest Territories" },
//     { value: "NS", label: "Nova Scotia" },
//     { value: "NU", label: "Nunavut" },
//     { value: "ON", label: "Ontario" },
//     { value: "PE", label: "Prince Edward Island" },
//     { value: "QC", label: "Quebec" },
//     { value: "SK", label: "Saskatchewan" },
//     { value: "YT", label: "Yukon" },
//   ];
  

const DashboardMenu = () => {
    
    
    const [activeLocation, setActiveLocation] = useState({ value: 'AB', label: 'Alberta' });
    const [lastUpdated,setLastUpdated] = useState("")
    
    const baseUrl = "https://api.opencovid.ca";
  
    useEffect(() => {
        const getinfo = async () => {
            try {
                const response = await axios.get(`${baseUrl}/version`);
                console.log(response);
                setLastUpdated(response.data.timeseries);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getinfo();
    }, [activeLocation]);

    
    return(
        <div>
 
            <Select 
                options={locationList}
                onChange={(e)=>setActiveLocation(e.value)}
                defaultValue={locationList.find(
                        (options) => options.value === activeLocation
                      )}
                className="dashboard-select"
                />
            <p className="update-date">Last Updated : {lastUpdated}</p>
        </div>
    );
}

export default DashboardMenu;