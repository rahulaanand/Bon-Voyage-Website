import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

export default function Tourpackages() {
    const navigate = useNavigate(); // Initialize useNavigate

    const [tourPackageData, setTourPackageData] = useState([]);

    useEffect(() => {
        fetchTourPackageData();
    }, []);

    const fetchTourPackageData = () => {
        axios.get('https://localhost:7087/api/TourPackage')
            .then((response) => {
                const data = response.data;
                setTourPackageData(data);
            })
            .catch((error) => {
                console.error('Error fetching tour package data:', error);
            });
    };

    return (
        <section className="my-background-radial-gradient overflow-hidden" style={{ marginTop: '50px' }}>
            <div className="my-agents-container container">
                <div className="my-page-heading">
                    <h2>Tour Packages</h2>
                    <hr />
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {tourPackageData.map(tourPackages => (
                            <div key={tourPackages.PackageId} className="col">
                                <div className="card my-bg-glass">
                                    <div className="card-body">
                                        <img
                                            src={`https://localhost:7087/Uploads/${tourPackages.image}`}
                                            className="card-img-top"
                                            alt=""
                                            style={{ width: '200px', height: '200px', transform: 'scale(1.2)', marginTop: '20px' }}
                                        />

                                        <div className="flex flex-wrap" style={{marginTop: '6%'}}>
                                            <br />
                                            <span className="inline-block w-1/2">
                                                <p className="text-sm text-gray-600">{tourPackages.packageName}</p>
                                                <p className="text-sm text-gray-600">Agent Id: {tourPackages.agentId}</p>
                                                <p className="text-sm text-gray-600">Price: {tourPackages.price}</p>
                                                <p className="text-sm text-gray-600">Duration: {tourPackages.duration}</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <br/>
            <br/>

        </section>
    )
}
