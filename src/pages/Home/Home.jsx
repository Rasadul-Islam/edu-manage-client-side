import React from 'react';
import Banner from './Banner';
import Partners from './Partners/Partners';
import { Helmet } from 'react-helmet-async';
import PopulerClasses from './PopulerClasses';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>
                    EduLoop
                </title>
            </Helmet>
            <Banner></Banner>
            <Partners></Partners>
            <PopulerClasses></PopulerClasses>
        </div>
    );
};

export default Home;