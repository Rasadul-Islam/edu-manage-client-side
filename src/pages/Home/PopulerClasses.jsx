import React from "react";
import useClasses from "../../hooks/useClasses";

const PopulerClasses = () => {
  // Use the custom hook to fetch classes
  const [classes] = useClasses();
// filter highest enrollment
  const popularClasses = classes
    .sort((a, b) => b.enrollmentCount - a.enrollmentCount) 
    .slice(0, 4);

  return (
    <div>
      <h2>Top 6 Popular Classes</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {popularClasses.map((classItem) => (
          <div key={classItem._id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img src={classItem.image} alt={classItem.title} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{classItem.title}</h3>
            <p>{classItem.description}</p>
            <p><strong>Price:</strong> ${classItem.price}</p>
            <p><strong>Enrollments:</strong> {classItem.enrollmentCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopulerClasses;
