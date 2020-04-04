import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

const About = props => {
    const { general } = useSelector(state => state);

    const [loading, setLoading] = useState(true);
    const [res, setRes] = useState();

    useEffect(() => {
        const fetch = async() => {
            try{
                const response = await axios({
                    url: `${general.baseURL}/`,
                    method: 'GET'
                })
                setRes(response.data);
                setLoading(false);
            }
            catch(err){
                throw err;
            }
        }

        fetch();

        return () => {
        };
    }, [loading])

    return (
        <h1 style={{position:"absolute", top:"0",right:"0"}}>GOOGA</h1>
    )
}

export default About
