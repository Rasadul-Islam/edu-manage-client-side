import React from 'react';

const CareerPaths = () => {
    const careerPaths = [
        {
            title: "Web Development",
            description: "Master HTML, CSS, JavaScript, and frameworks.",
            icon: "🌐",
        },
        {
            title: "Data Science",
            description: "Learn Python, data visualization, and AI tools.",
            icon: "📊",
        },
        {
            title: "Digital Marketing",
            description: "Explore SEO, social media, and ad campaigns.",
            icon: "📈",
        },
        {
            title: "Graphic Design",
            description: "Unleash creativity with design tools like Photoshop and Illustrator.",
            icon: "🎨",
        },
        {
            title: "Programming Languages",
            description: "Build foundational skills in Java, C++, and Python.",
            icon: "💻",
        },
    ];
    return (
        <div
  className="relative bg-cover bg-fixed bg-center py-10"
  style={{
    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(20, 184, 166, 0.7), rgba(56, 189, 248, 0.7), rgba(72, 187, 120, 0.7)),
    url('https://source.unsplash.com/1600x900/?education')`,
  }}
>
            <div className="bg-transparent px-6">
                <h2 className="text-3xl md:text-4xl text-black font-bold text-center mb-8">
                    Explore Career Paths
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto justify-center items-center">
                    {careerPaths.map((path, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="text-4xl mb-4">{path.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                            <p className="text-gray-700">{path.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CareerPaths;