import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const AllClasses = () => {

    // useEffect()
    return (
        <div>
            <Helmet>
                <title> EduLoop | All Classes</title>
            </Helmet>
            <h1>Here all classes</h1>
        </div>
    );
};

export default AllClasses;