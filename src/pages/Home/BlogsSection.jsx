import { useState } from "react";
import technichPicture from "../../assets/image/Techniques.jpg";
import strategiesPicture from "../../assets/image/Strategies.jpg";
import careerPicture from "../../assets/image/Career.jpg";
import { ImCross } from "react-icons/im";

const BlogsSection = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    {
      id: 1,
      title: "Effective Learning Strategies",
      category: "Skill Development",
      image: strategiesPicture,
      fullDescription:
        "Learning is a lifelong journey, and using the right strategies can significantly improve retention and comprehension. In this guide, we explore powerful techniques such as active recall, spaced repetition, and mind mapping. By integrating these strategies into daily study routines, learners can maximize efficiency and reduce cognitive overload. Additionally, we'll discuss the role of habit formation, goal setting, and effective note-taking in mastering complex subjects and retaining information for the long term.",
    },
    {
      id: 2,
      title: "How to Build a Successful Teaching Career",
      category: "Career Tips",
      image: careerPicture,
      fullDescription:
        "A teaching career is more than just delivering lessons—it's about mentorship, continuous growth, and adapting to evolving educational landscapes. This guide covers essential career-building tips, including obtaining necessary certifications, networking with educators, and leveraging technology to enhance teaching. We also explore strategies for professional development, time management, and student engagement. Whether you're an aspiring teacher or an experienced educator looking to grow, this article provides insights into making teaching a fulfilling and successful career path.",
    },
    {
      id: 3,
      title: "Classroom Management Techniques",
      category: "Teacher Guidance",
      image: technichPicture,
      fullDescription:
        "Effective classroom management is crucial for maintaining a productive and engaging learning environment. This article delves into proven strategies for fostering discipline, building positive relationships with students, and creating structured routines that minimize disruptions. From implementing behavior management plans to encouraging active participation, teachers can utilize these techniques to establish a classroom culture of respect and cooperation. Additionally, we'll discuss ways to handle challenges such as diverse learning styles, student motivation, and conflict resolution.",
    },
  ];

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">📚 Blogs & Resources</h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-lg p-5 rounded-xl flex flex-col justify-between items-start"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-lg font-bold mt-4">{blog.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{blog.category}</p>
              <p className="text-gray-700 mt-2 line-clamp-2">
                {blog.fullDescription}
              </p>
              <button
                className="mt-4 text-blue-600 font-semibold"
                onClick={() => setSelectedBlog(blog)}
              >
                Read More →
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedBlog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-teal-50 p-6 rounded-lg max-w-3xl relative max-h-[80vh] overflow-y-auto">
              <button
                className="absolute top-3 right-3 text-gray-600 text-xl"
                onClick={() => setSelectedBlog(null)}
              >
                <ImCross />
              </button>
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-80 object-cover mt-3 rounded-lg"
              />
              <h3 className="text-2xl font-bold mt-4">{selectedBlog.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedBlog.category}</p>
              <p className="text-gray-700 mt-3">{selectedBlog.fullDescription}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogsSection;
