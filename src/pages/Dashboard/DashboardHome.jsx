import useAuth from "../../hooks/useAuth";

const DashboardHome = () => {
    const {user}=useAuth();
    return (
        <div className='w-full'>
            <h1 className='text-black text-xl md:text-4xl text-center mt-20 font-bold'>Hey <span className='text-teal-500'>{user.displayName},</span> Welcome to the Dashboard</h1>
            <p className='text-center mt-5 md:text-lg'>Manager your courses, track your learning progress, and engage with assignments to achieve your academic goals.</p>
        </div>
    );
};

export default DashboardHome;