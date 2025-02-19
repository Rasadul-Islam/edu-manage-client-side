import ourTeamPicture from "../../assets/image/OurTeam.jpg"
const AboutUs = () => {
    return (
      <section className="py-12 px-6 bg-teal-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side: Image */}
          <div className="relative">
            <img
              src={ourTeamPicture}
              alt="Our Team"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>
  
          {/* Right Side: Text */}
          <div>
            <h2 className="text-3xl font-bold text-teal-400">About Us</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              At <span className="font-semibold text-teal-400">EduLoop</span>, we are committed to enhancing education through technology.
              Our mission is to empower educators, students, and institutions with innovative tools that streamline learning and teaching processes.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We believe in the power of education to transform lives. By leveraging modern technologies, we create solutions that make learning more 
              accessible, engaging, and effective for everyone.
            </p>
            
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutUs;
  