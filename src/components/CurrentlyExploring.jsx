import { motion } from 'framer-motion';

const exploringData = [
  {
    id: "ai-eng",
    title: "AI Engineering",
    tag: "AI/ML ROADMAP",
    description: "Currently building a strong foundation in the AI Engineering roadmap by focusing on Python, data manipulation, mathematical fundamentals, and core machine learning concepts. Exploring tools and technologies that form the backbone of modern AI applications and intelligent systems.",
    itemsHeader: "Learning Focus:",
    items: [
      "Python for AI Development",
      "NumPy & Pandas",
      "Data Preprocessing",
      "Machine Learning Fundamentals",
      "AI Application Development",
      "Data Structures & Algorithms"
    ]
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    tag: "DSA & OPTIMIZATION",
    description: "Actively strengthening problem-solving skills through structured DSA practice. Currently progressing through array-based problems while developing a solid understanding of algorithmic thinking, time complexity, and optimization techniques.",
    itemsHeader: "Current Topics:",
    items: [
      "Arrays",
      "Time & Space Complexity",
      "Searching Techniques",
      "Basic Problem Solving Patterns",
      "Object-Oriented Programming"
    ]
  },
  {
    id: "oop",
    title: "Object-Oriented Programming",
    tag: "SOFTWARE ARCHITECTURE",
    description: "Near completion of core Object-Oriented Programming concepts with a focus on writing scalable, maintainable, and reusable software systems.",
    itemsHeader: "Concepts Covered:",
    items: [
      "Classes & Objects",
      "Encapsulation",
      "Inheritance",
      "Polymorphism",
      "Abstraction",
      "Object-Oriented Design Principles"
    ]
  },
  {
    id: "industry-exp",
    title: "Industry Experience & Projects",
    tag: "REAL-WORLD DEVELOPMENT",
    description: "Simultaneously contributing to internship projects by applying development and problem-solving skills in real-world scenarios. Gaining hands-on experience in building practical software solutions, collaborating on project requirements, and working with modern development tools and workflows.",
    itemsHeader: "Focus Areas:",
    items: [
      "Full-Stack Development",
      "UI/UX Implementation",
      "Mobile Application Development",
      "AI-Powered Applications",
      "Project Deployment & Maintenance"
    ]
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16
    }
  }
};

export default function CurrentlyExploring() {
  return (
    <div className="currently-exploring-section">
      <motion.div 
        className="currently-exploring-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {exploringData.map((card, i) => (
          <motion.div
            key={card.id}
            className="exploring-card"
            variants={cardVariants}
            whileHover={{ 
              y: -6, 
              rotateZ: i % 2 === 0 ? -1 : 1,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.12)",
              borderColor: "rgba(139, 0, 0, 0.22)"
            }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
          >
            <span className="exploring-card-index">0{i + 1}</span>
            <div className="exploring-card-header">
              <span className="exploring-card-tag">{card.tag}</span>
            </div>
            
            <div className="exploring-card-content">
              <h3 className="exploring-card-title">{card.title}</h3>
              <p className="exploring-card-desc">{card.description}</p>
            </div>
            
            <div className="exploring-card-list-section">
              <span className="exploring-list-header">{card.itemsHeader}</span>
              <div className="exploring-pill-grid">
                {card.items.map((item) => (
                  <span key={item} className="exploring-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
