import React from 'react';
import Banner from './Banner';
import Partners from './Partners/Partners';
import { Helmet } from 'react-helmet-async';
import PopulerClasses from './PopulerClasses';
import FeedBack from './FeedBack';
import EduLoopOverView from './EduLoopOverView';
import BecomeATeacher from './BecomeATeacher';
import CareerPaths from './CareerPaths';
import UpCommingClassEvent from './UpCommingClassEvent';
import BlogsSection from './BlogsSection';
import AboutUs from './AboutUs';

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
            <UpCommingClassEvent></UpCommingClassEvent>
            <CareerPaths></CareerPaths>
            <BlogsSection></BlogsSection>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;