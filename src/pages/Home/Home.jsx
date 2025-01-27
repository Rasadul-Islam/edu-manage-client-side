import React from 'react';
import Banner from './Banner';
import Partners from './Partners/Partners';
import { Helmet } from 'react-helmet-async';
import PopulerClasses from './PopulerClasses';
import FeedBack from './FeedBack';
import EduLoopOverView from './EduLoopOverView';
import BecomeATeacher from './BecomeATeacher';

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
            <FeedBack></FeedBack>
            <EduLoopOverView></EduLoopOverView>
            <BecomeATeacher></BecomeATeacher>
        </div>
    );
};

export default Home;