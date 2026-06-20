import { useState } from 'react';
import { motion } from 'framer-motion';

const internshipData = [
  {
    id: "gnuhive",
    company: "GNU Hive (OPC) Private Limited",
    role: "Software Development Intern",
    duration: "Sep 2025 – Dec 2025 (3 Months)",
    location: "Remote",
    description: "Completed a 3-month Software Development Internship at GNU Hive (OPC) Private Limited, gaining hands-on experience in software development, web technologies, debugging, and problem-solving while working under industry mentorship in a remote environment.",
    tech: ["Python", "HTML", "CSS", "JavaScript", "React.js", "Git"],
    skills: [
      "Software Development",
      "Web Development",
      "Problem Solving",
      "Debugging & Testing",
      "Git & Version Control",
      "Team Collaboration"
    ],
    achievements: [
      "Gained practical exposure to real-world software development workflows.",
      "Improved coding, debugging, and analytical skills.",
      "Worked in a professional remote development environment."
    ]
  },
  {
    id: "virasam",
    company: "VIRASAM",
    role: "Summer AI Intern",
    duration: "June 2025 – July 2025",
    location: "Remote",
    description: "VIRASAM is an AI-powered platform designed to preserve, explore, and promote cultural heritage through intelligent digital experiences. The platform enables users to discover cultural information, interact with AI-powered features, and access heritage-related content through a modern web interface.",
    tech: ["Python", "Streamlit", "Supabase", "Genkit", "Gemini AI", "Database Management"],
    contributions: [
      "Developed the complete application architecture.",
      "Integrated AI capabilities using Gemini models.",
      "Built frontend interfaces with Streamlit.",
      "Implemented authentication and database management using Supabase.",
      "Designed and optimized user experience workflows."
    ],
    keyFeatures: [
      "AI-powered cultural heritage assistance",
      "Interactive user interface",
      "Heritage information discovery and exploration",
      "Secure user authentication",
      "Real-time data management",
      "Responsive and modern design"
    ],
    impact: [
      "Digitizes and promotes cultural heritage content.",
      "Provides AI-assisted access to cultural information.",
      "Demonstrates the integration of Generative AI with modern web applications."
    ]
  },
  {
    id: "kodespark",
    company: "KodeSpark",
    role: "Software & AI Development Intern",
    duration: "Feb 2026 – Present",
    location: "Remote",
    description: "Working as a Software & AI Development Intern at KodeSpark, contributing to cross-platform mobile applications, AI-powered systems, and scalable software architectures. Involved in the development of real-time products, enterprise platforms, and next-generation AI-integrated applications.",
    tech: ["React Native", "Expo", "Flutter", "Python", "GenAI", "Microservices", "REST APIs", "Mobile Dev"],
    skillsGained: [
      "Cross-Platform Mobile Development",
      "Software Architecture",
      "Microservices Design",
      "Generative AI Integration",
      "Full-Stack Development",
      "System Design",
      "API Development",
      "Agile Collaboration"
    ],
    responsibilities: [
      "Architecting microservices-based solutions to separate mobile/web applications from AI processing engines.",
      "Developing cross-platform mobile applications for Android and iOS.",
      "Building scalable full-stack web applications and real-time systems.",
      "Integrating Generative AI capabilities into production-ready applications.",
      "Collaborating with development teams on architecture, deployment, and feature delivery."
    ],
    keyContributions: [
      {
        title: "Cross-Platform Mobile Applications",
        desc: "Developed robust mobile applications using React Native, Expo, and modern backend technologies to deliver scalable and real-time experiences across Android and iOS platforms."
      },
      {
        title: "Enterprise LMS Portal",
        desc: "Led the architectural planning and full-stack development of a scalable Learning Management System, focusing on performance, maintainability, and educational workflow management."
      },
      {
        title: "AI & Microservices Engineering",
        desc: "Designed microservices architectures that decouple user-facing applications from computationally intensive AI workloads, improving scalability and maintainability."
      },
      {
        title: "Flutter Initiative",
        desc: "Currently prototyping and planning a greenfield Flutter application with a focus on cross-platform performance, modular architecture, and future scalability."
      }
    ]
  }
];

export default function InternshipCards() {
  const [isDispersed, setIsDispersed] = useState(false);
  const [deckHovered, setDeckHovered] = useState(false);
  const [flippedCards, setFlippedCards] = useState({
    gnuhive: false,
    virasam: false,
    kodespark: false
  });
  const [activeTabs, setActiveTabs] = useState({
    gnuhive: "achievements",
    virasam: "contributions",
    kodespark: "contributions"
  });

  const handleSpread = () => {
    setIsDispersed(true);
  };

  const handleCollapse = () => {
    setIsDispersed(false);
    setFlippedCards({
      gnuhive: false,
      virasam: false,
      kodespark: false
    });
  };

  const handleCardClick = (index, id, e) => {
    if (!isDispersed) {
      setIsDispersed(true);
      return;
    }

    // If clicking on a tab button or scrollable area, don't flip
    if (e.target.closest('.interactive-el')) {
      return;
    }

    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleTabClick = (cardId, tabName, e) => {
    e.stopPropagation();
    setActiveTabs(prev => ({
      ...prev,
      [cardId]: tabName
    }));
  };

  const getCardStyle = (index, id) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    if (!isDispersed) {
      // Stacked state: layered in center with slight offset tilts
      const stackStyles = [
        { x: -5, y: 15, rotate: -4 },
        { x: 0, y: 17, rotate: 1 },
        { x: 5, y: 19, rotate: 5 }
      ];
      
      const hoverStyles = [
        { x: -30, y: 12, rotate: -8 },
        { x: 0, y: 14, rotate: 1 },
        { x: 30, y: 16, rotate: 9 }
      ];

      const mobileStackStyles = [
        { x: -3, y: 12, rotate: -3 },
        { x: 0, y: 14, rotate: 1 },
        { x: 3, y: 16, rotate: 4 }
      ];

      const mobileHoverStyles = [
        { x: -15, y: 10, rotate: -6 },
        { x: 0, y: 12, rotate: 1 },
        { x: 15, y: 14, rotate: 7 }
      ];

      const base = isMobile 
        ? (deckHovered ? mobileHoverStyles[index] : mobileStackStyles[index])
        : (deckHovered ? hoverStyles[index] : stackStyles[index]);

      return {
        x: base.x,
        y: base.y,
        rotateZ: base.rotate,
        rotateY: 0,
        zIndex: 10 + index,
        scale: deckHovered ? 1.03 : 1
      };
    } else {
      // Dispersed state: side-by-side or stacked vertically
      const isFlipped = flippedCards[id];
      if (isMobile) {
        return {
          x: 0,
          y: 10 + index * 250, // standard stack spacing
          rotateZ: index === 0 ? -1.5 : index === 1 ? 1 : -0.5,
          rotateY: isFlipped ? 180 : 0,
          zIndex: isFlipped ? 50 : 10 + index,
          scale: 1
        };
      } else {
        return {
          x: 0,
          y: 15 + index * 330, // vertical stack spacing on desktop (fits 300px card height)
          rotateZ: index === 0 ? -2 : index === 1 ? 1 : -1,
          rotateY: isFlipped ? 180 : 0,
          zIndex: isFlipped ? 50 : 10 + index,
          scale: 1
        };
      }
    }
  };

  return (
    <div className="internships-section">
      <div className="internships-instruction">
        {!isDispersed ? (
          <span onClick={handleSpread} className="instruction-text clickable">
            EXPLORE INTERNSHIPS • CLICK DECK TO SPREAD
          </span>
        ) : (
          <span onClick={handleCollapse} className="instruction-text clickable">
            CLICK CARDS TO FLIP • CLICK HERE TO STACK DECK
          </span>
        )}
      </div>

      <div 
        className={`internships-canvas ${!isDispersed ? 'stacked-state' : 'dispersed-state'}`}
        onMouseEnter={() => !isDispersed && setDeckHovered(true)}
        onMouseLeave={() => setDeckHovered(false)}
      >
        {internshipData.map((data, i) => {
          const style = getCardStyle(i, data.id);
          const isFlipped = flippedCards[data.id];
          const activeTab = activeTabs[data.id];

          return (
            <motion.div
              key={data.id}
              className={`internship-flip-container ${isFlipped ? 'flipped' : ''}`}
              animate={style}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
              onTap={(e) => handleCardClick(i, data.id, e)}
              style={{
                position: 'absolute',
                left: '50%',
                top: '0px',
                transformStyle: 'preserve-3d',
                touchAction: 'none'
              }}
            >
              {/* CARD FRONT FACE */}
              <div className="internship-card-face card-front">
                <span className="card-index-num">0{i + 1}</span>
                <div className="card-header">
                  <span className="card-tag">INTERNSHIP</span>
                  <span className="card-duration">{data.duration}</span>
                </div>
                
                <h3 className="card-company">{data.company}</h3>
                <h4 className="card-role">{data.role}</h4>
                <p className="card-location">📍 {data.location}</p>
                
                <p className="card-desc-preview">
                  {data.description.length > 185 
                    ? `${data.description.substring(0, 180)}...` 
                    : data.description}
                </p>

                <div className="card-footer">
                  <span className="tech-pills-row">
                    {data.tech.slice(0, 4).map(t => (
                      <span key={t} className="tech-badge-mini">{t}</span>
                    ))}
                    {data.tech.length > 4 && (
                      <span className="tech-badge-mini">+{data.tech.length - 4}</span>
                    )}
                  </span>
                  <span className="flip-hint">TAP TO FLIP ↩</span>
                </div>
              </div>

              {/* CARD BACK FACE */}
              <div className="internship-card-face card-back">
                <div className="card-back-header">
                  <h4 className="back-company-title">{data.company}</h4>
                  <span className="flip-hint interactive-el" onClick={(e) => handleCardClick(i, data.id, e)}>FLIP BACK ↩</span>
                </div>
                
                {/* Tab Navigation on Card Back */}
                <div className="card-back-tabs interactive-el">
                  {data.id === 'kodespark' && (
                    <>
                      <button 
                        className={`tab-btn ${activeTab === 'contributions' ? 'active' : ''}`}
                        onClick={(e) => handleTabClick(data.id, 'contributions', e)}
                      >
                        WORK
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'responsibilities' ? 'active' : ''}`}
                        onClick={(e) => handleTabClick(data.id, 'responsibilities', e)}
                      >
                        TASKS
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                        onClick={(e) => handleTabClick(data.id, 'skills', e)}
                      >
                        SKILLS
                      </button>
                    </>
                  )}

                  {data.id === 'virasam' && (
                    <>
                      <button 
                        className={`tab-btn ${activeTab === 'contributions' ? 'active' : ''}`}
                        onClick={(e) => handleTabClick(data.id, 'contributions', e)}
                      >
                        ROLE
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                        onClick={(e) => handleTabClick(data.id, 'features', e)}
                      >
                        FEATURES & IMPACT
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
                        onClick={(e) => handleTabClick(data.id, 'tech', e)}
                      >
                        TECH
                      </button>
                    </>
                  )}

                  {data.id === 'gnuhive' && (
                    <>
                      <button 
                        className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
                        onClick={(e) => handleTabClick(data.id, 'achievements', e)}
                      >
                        ACHIEVEMENTS
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                        onClick={(e) => handleTabClick(data.id, 'skills', e)}
                      >
                        SKILLS & TECH
                      </button>
                    </>
                  )}
                </div>

                {/* Tab content wrapper */}
                <div className="card-back-scrollable interactive-el">
                  {/* KodeSpark Tabs */}
                  {data.id === 'kodespark' && activeTab === 'contributions' && (
                    <div className="contributions-list">
                      {data.keyContributions.map((c, idx) => (
                        <div key={idx} className="contribution-item">
                          <span className="contribution-title">{c.title}</span>
                          <p className="contribution-desc">{c.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {data.id === 'kodespark' && activeTab === 'responsibilities' && (
                    <ul className="achievements-list">
                      {data.responsibilities.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  )}
                  {data.id === 'kodespark' && activeTab === 'skills' && (
                    <>
                      <div className="back-section">
                        <span className="section-label">Skills Gained:</span>
                        <div className="tech-badge-grid">
                          {data.skillsGained.map(s => (
                            <span key={s} className="tech-badge">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div className="back-section" style={{ marginTop: '12px' }}>
                        <span className="section-label">Tech Stack:</span>
                        <div className="tech-badge-grid">
                          {data.tech.map(t => (
                            <span key={t} className="tech-badge">{t}</span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* VIRASAM Tabs */}
                  {data.id === 'virasam' && activeTab === 'contributions' && (
                    <ul className="achievements-list">
                      {data.contributions.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  )}
                  {data.id === 'virasam' && activeTab === 'features' && (
                    <>
                      <div className="back-section">
                        <span className="section-label">Key Features:</span>
                        <ul className="achievements-list compact">
                          {data.keyFeatures.map((f, idx) => (
                            <li key={idx}>{f}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="back-section" style={{ marginTop: '12px' }}>
                        <span className="section-label">Impact:</span>
                        <ul className="achievements-list compact">
                          {data.impact.map((im, idx) => (
                            <li key={idx}>{im}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                  {data.id === 'virasam' && activeTab === 'tech' && (
                    <div className="back-section">
                      <span className="section-label">Platform Stack:</span>
                      <div className="tech-badge-grid">
                        {data.tech.map(t => (
                          <span key={t} className="tech-badge">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GNU Hive Tabs */}
                  {data.id === 'gnuhive' && activeTab === 'achievements' && (
                    <ul className="achievements-list">
                      {data.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  )}
                  {data.id === 'gnuhive' && activeTab === 'skills' && (
                    <>
                      <div className="back-section">
                        <span className="section-label">Key Skills:</span>
                        <div className="tech-badge-grid">
                          {data.skills.map(s => (
                            <span key={s} className="tech-badge">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div className="back-section" style={{ marginTop: '12px' }}>
                        <span className="section-label">Technologies:</span>
                        <div className="tech-badge-grid">
                          {data.tech.map(t => (
                            <span key={t} className="tech-badge">{t}</span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
