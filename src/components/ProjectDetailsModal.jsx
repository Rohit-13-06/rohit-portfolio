import { useEffect } from 'react';
import { motion } from 'framer-motion';
import folderIconImg from '../assets/folder_icon.png';

const projectsData = [
  {
    id: "hubert",
    title: "Native Language Identification of Indian English Speakers Using HuBERT",
    subtitle: "Speech Signal Processing & Self-Supervised Speech Representations",
    overview: "Native language influences how people speak English, creating unique accent patterns. This project aims to automatically identify the native language of Indian English speakers using speech recordings and machine learning techniques. The system analyzes speech characteristics and predicts the speaker's linguistic background.",
    problem: "Accent and pronunciation patterns often reveal a speaker's native language. Building an automated system to identify these patterns can support applications in speech recognition, linguistic research, accent analysis, and personalized language-learning systems.",
    solution: "We engineered a pipeline using both traditional acoustics (MFCCs) and state-of-the-art self-supervised speech representations (HuBERT) to classify regional Indian accents, achieving near-perfect accuracy across several linguistic groups.",
    dataset: {
      name: "IndicAccentDB",
      files: "8,116 Audio Files",
      type: "English speech from Indian speakers",
      classes: ["Andhra Pradesh", "Karnataka", "Kerala", "Tamil Nadu", "Gujarat", "Jharkhand"]
    },
    methodology: [
      { title: "1. Audio Preprocessing", desc: "Loaded and standardized speech recordings, removed sampling rate inconsistencies, and prepared audio vectors." },
      { title: "2. Feature Extraction (MFCC)", desc: "Extracted Mel-Frequency Cepstral Coefficients (MFCCs) to capture basic spectral shape and phonetic content." },
      { title: "3. Feature Extraction (HuBERT)", desc: "Utilized Facebook's HuBERT (Hidden Unit BERT) model to extract 768-dimensional contextual embeddings, mean-pooling them into static vectors." },
      { title: "4. Model Training", desc: "Trained traditional classifiers (Random Forest, SVM) and deep learning models to predict native language classes." }
    ],
    architecture: [
      { name: "Speech Audio Input", icon: "🎙️" },
      { name: "Preprocessing & Normalization", icon: "⚙️" },
      { name: "Feature Extraction (MFCC / HuBERT)", icon: "🎛️" },
      { name: "Feature Vector Generation (768-D)", icon: "📊" },
      { name: "ML Classifier (Random Forest / Deep Net)", icon: "🧠" },
      { name: "Native Language Prediction", icon: "🎯" }
    ],
    results: [
      { feature: "MFCC + Random Forest", accuracy: "100%" },
      { feature: "HuBERT Embeddings", accuracy: "98%" }
    ],
    achievements: [
      "Processed over 8,000+ real-world speech samples.",
      "Compared traditional spectral descriptors (MFCC) against deep self-supervised transformers (HuBERT).",
      "Achieved high classification accuracy across multiple distinct Indian language groups.",
      "Demonstrated the effectiveness of self-supervised acoustic models for fine-grained accent identification."
    ],
    tech: ["Python", "PyTorch", "HuBERT", "Torchaudio", "Scikit-learn", "NumPy", "Pandas", "Jupyter Notebook"],
    skills: ["Speech Processing", "Machine Learning", "Deep Learning", "Feature Engineering", "Audio Signal Analysis", "Data Preprocessing", "Model Evaluation"],
    impact: "This project showcases the application of modern AI techniques in speech understanding and accent analysis. It demonstrates expertise in handling real-world audio datasets, extracting meaningful speech representations, and building high-performance classification systems using both classical machine learning and transformer-based models."
  },
  {
    id: "edupredict",
    title: "EduPredict: AI-Powered Academic & Classroom Management System",
    subtitle: "Full-Stack Educational Ecosystem with Predictive Analytics & GenAI",
    overview: "EduPredict is an intelligent academic management platform designed to help educational institutions streamline classroom operations, student management, attendance tracking, performance monitoring, and academic decision-making. The platform leverages Artificial Intelligence to provide insights, predictions, and automated assistance for students, faculty, and administrators.",
    problem: "Traditional academic management systems primarily store information but provide little intelligence or predictive capability. Educational institutions need a centralized platform that not only manages academic data but also helps identify student performance trends, engagement levels, and potential academic risks before they become serious issues.",
    solution: "EduPredict combines modern web technologies with AI-powered analytics to create a comprehensive academic ecosystem where students, teachers, and administrators can efficiently manage educational activities while gaining actionable insights from institutional data.",
    features: [
      { name: "Student Management", desc: "Profile administration, enrollment status, and academic record tracking through a personalized student dashboard." },
      { name: "Attendance Tracking", desc: "Digital attendance tracking, real-time analytics reports, trend visualizations, and low-attendance triggers." },
      { name: "Performance Analytics", desc: "Subject-wise progress tracking, student performance monitoring, academic trend analysis, and AI-generated performance insights." },
      { name: "Classroom Administration", desc: "Administration panel for course catalogs, assignment management, faculty dashboards, and interactive communication systems." },
      { name: "AI-Powered Features", desc: "Academic performance prediction, personalized learning recommendations, automated insights, and AI-assisted student support." }
    ],
    architecture: [
      { name: "Student / Faculty / Admin Portal", icon: "👤" },
      { name: "Next.js Frontend Client", icon: "💻" },
      { name: "TypeScript + React Dashboard Components", icon: "⚙️" },
      { name: "Genkit AI Orchestration Layer", icon: "🤖" },
      { name: "Gemini AI Core Models", icon: "🧠" },
      { name: "Supabase Backend (DB, Auth, Edge Functions)", icon: "☁️" }
    ],
    implementation: [
      { title: "Frontend Client", desc: "Built responsive dashboards using Next.js, React, and TypeScript, styled with Tailwind CSS, and structured with ShadCN UI components." },
      { title: "Backend Infrastructure", desc: "Utilized Supabase for real-time PostgreSQL database synchronization, integrated Go/Node-based Edge Functions, and enforced role-based access controls." },
      { title: "AI Integration Layer", desc: "Connected Google Gemini models using Genkit to generate academic insights, predict performance thresholds, and generate recommendations." }
    ],
    challenges: [
      "Managing complex permission levels (Student vs. Faculty vs. Admin) within a single unified platform.",
      "Integrating GenAI insights dynamically into fast-moving educational workflows.",
      "Handling real-time academic evaluations and rendering complex dashboards with zero latency."
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "ShadCN UI", "Genkit", "Gemini AI", "Supabase", "PostgreSQL"],
    skills: ["Full-Stack Development", "AI Integration", "Frontend Engineering", "Backend Development", "Database Design", "Authentication & Authorization", "API Development", "Cloud Database Management", "UI/UX Design"],
    impact: "EduPredict transforms traditional academic management into a data-driven ecosystem by combining administrative functionality with AI-powered decision support. The platform helps educators monitor student progress more effectively while providing students with personalized academic guidance."
  },
  {
    id: "emotion-recogniser",
    title: "Multimodal Emotion Recogniser",
    subtitle: "Acoustic-Semantic Fusion Deep Learning Framework & Real-Time Web Dashboard",
    overview: "Multimodal Emotion Recogniser is an advanced deep learning framework that identifies human emotions by simultaneously analyzing speech signals and text transcriptions. The system combines acoustic and semantic understanding through a multimodal architecture consisting of a custom CNN-BiLSTM speech model, a BERT-based text classifier, and a Late Fusion Neural Network.\n\nTo enhance usability, the framework is integrated into a premium real-time web dashboard featuring live training logs, spectrogram visualizations, emotion prediction displays, and interactive performance analytics.",
    problem: "Emotion recognition systems that rely solely on speech or text often struggle with ambiguity:\n\n• Speech models may confuse emotions with similar vocal characteristics.\n• Text models may misinterpret emotionally neutral transcripts.\n• Single-modal approaches fail to capture the complete emotional context.\n\nThe objective was to build a multimodal AI system capable of combining both vocal and linguistic information to improve emotion classification accuracy.",
    solution: "Developed a three-stage emotion recognition pipeline:\n\n1. Speech Emotion Model: Custom 1D Convolutional Neural Network & Bidirectional LSTM architecture with MFCC-based feature extraction to learn acoustic characteristics of emotional speech.\n2. Text Emotion Model: Fine-tuned BERT transformer for semantic understanding of speech transcripts and context-aware emotion classification.\n3. Multimodal Fusion Model: Concatenates speech and text embeddings using a Late Fusion Neural Network to learn relationships between acoustic and semantic signals, producing the final emotion prediction.",
    features: [
      { name: "Multimodal Learning", desc: "Combines speech and text information for enhanced emotional understanding." },
      { name: "Real-Time Inference Dashboard", desc: "Upload and analyze audio samples with instant emotion prediction, live audio playback, and confidence visualization." },
      { name: "Spectrogram Visualization", desc: "Dynamic MFCC heatmap generation and canvas-rendered visual representations for real-time feature inspection." },
      { name: "Live Training Console", desc: "Server-Sent Event (SSE) log streaming for real-time training progress and interactive model monitoring." },
      { name: "Emotion Visualization", desc: "Dynamic emotion-specific emoji responses and emotion-based UI glow effects with interactive prediction feedback." }
    ],
    architecture: [
      { name: "Speech Audio Input ➔ MFCC Feature Extraction", icon: "🎙️" },
      { name: "CNN + BiLSTM Speech Encoder (256-D)", icon: "📊" },
      { name: "Text Transcript ➔ BERT Text Encoder (768-D)", icon: "📝" },
      { name: "Late Fusion Neural Network Embedding Concatenation", icon: "🔗" },
      { name: "Emotion Classification (Accuracy: 98.9%)", icon: "🎯" }
    ],
    results: [
      { feature: "Speech Model (CNN + BiLSTM)", accuracy: "96.3%" },
      { feature: "Text Model (BERT)", accuracy: "64.3%" },
      { feature: "Multimodal Fusion Model", accuracy: "98.9%" }
    ],
    optimizations: [
      { title: "Global Model Caching", desc: "Models loaded once into memory, eliminating repeated weight loading and reducing inference latency dramatically." },
      { title: "RAM-Based Feature Caching", desc: "Cached MFCC representations to minimize preprocessing overhead." },
      { title: "Dynamic Model Hot-Swapping", desc: "Automatic model refresh after training with no server restart required." },
      { title: "Optimized Evaluation Pipeline", desc: "PyTorch torch.no_grad() inference to reduce memory consumption and achieve faster prediction throughput." },
      { title: "Performance Improvement", desc: "Reduced inference time from approximately 2000ms to 180-240ms (more than 10x speed improvement)." }
    ],
    tech: ["PyTorch", "Hugging Face", "BERT", "CNN", "BiLSTM", "Late Fusion Networks", "Librosa", "Flask", "Python", "HTML", "CSS", "JavaScript", "Server-Sent Events (SSE)"],
    skills: ["Deep Learning", "Multimodal AI Systems", "Natural Language Processing", "Speech Emotion Recognition", "Transformer Models", "Audio Signal Processing", "Model Optimization", "Full-Stack Development", "Real-Time Inference Systems", "Machine Learning Deployment"],
    impact: "This project demonstrates the development of an end-to-end multimodal AI system capable of understanding human emotions from both speech and language. By integrating deep learning, NLP, speech processing, and real-time web technologies, the system achieves near-human-level emotion recognition performance while maintaining production-grade responsiveness."
  },
  {
    id: "mockr",
    title: "Mockr: AI-Powered Interview Preparation Platform",
    subtitle: "Simulated Interview Arena & AI Feedback Engine for Career Readiness",
    overview: "Mockr is an AI-driven interview preparation platform designed to help students and job seekers practice technical, aptitude, and HR interviews in a realistic environment. The platform simulates real interview experiences, evaluates responses, and provides actionable feedback to improve confidence and performance.",
    problem: "Many candidates struggle during interviews because they lack practical interview experience and personalized feedback. Traditional preparation methods focus on theory but do not replicate real interview scenarios or identify individual weaknesses.",
    solution: "Mockr provides a virtual interview environment where users can practice interviews, receive AI-generated feedback, track progress, and improve communication and problem-solving skills before facing actual recruiters.",
    features: [
      { name: "AI Mock Interviews", desc: "Simulated HR, technical, and behavioral interview paths tailored to specific job descriptions and experience levels." },
      { name: "AI Feedback Engine", desc: "Evaluates text responses, analyzes communication clarity, assesses confidence levels, and delivers improvements." },
      { name: "Aptitude Practice Arena", desc: "Quantitative, logical, and verbal practice modules with timed assessments to prepare for screening tests." },
      { name: "Technical & DSA Assessments", desc: "Integrated code editor with standard DSA challenges, compiler checks, and subject-specific quizzes." },
      { name: "Performance Analytics", desc: "Interactive dashboards detailing cumulative scores, category-wise weaknesses, and session-by-session progress charts." }
    ],
    architecture: [
      { name: "Candidate Frontend Interface", icon: "👤" },
      { name: "Next.js Web Client & Interview Arena", icon: "💻" },
      { name: "FastAPI Backend Gateway (Python)", icon: "⚡" },
      { name: "Gemini AI Interview Engine", icon: "🤖" },
      { name: "Supabase & PostgreSQL Database", icon: "💾" },
      { name: "Actionable Feedback & Analytics Dashboard", icon: "🎯" }
    ],
    implementation: [
      { title: "Frontend Client", desc: "Built dynamic interview panels using Next.js, React, and TypeScript with real-time response capture." },
      { title: "Backend Core", desc: "Developed FastAPI backend routers to handle user management, progress charts, and database connections." },
      { title: "AI Prompt Engineering", desc: "Integrated Google Gemini AI for contextual interview questioning, dynamic logic puzzles, and rigorous answer evaluation." }
    ],
    challenges: [
      "Generating contextually relevant questions that follow the user's previous answers naturally.",
      "Providing highly objective and actionable AI feedback scores that candidate can trust.",
      "Designing responsive, distraction-free assessment environments for timed coding challenges."
    ],
    future: [
      "Voice-Based Interviews: Synchronized real-time speech-to-text evaluations.",
      "Video Accent & Behavior Analysis: Tracking eye contact, posture, and facial indicators.",
      "Resume-Based Generation: Custom interview tracks generated on-the-fly from uploaded PDF resumes.",
      "Company-Specific Simulations: Replicating interview patterns from Google, Microsoft, and top startups."
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "Gemini AI", "Supabase", "PostgreSQL"],
    skills: ["Full-Stack Development", "AI Integration", "Prompt Engineering", "Database Design", "API Development", "Analytics Dashboard Design", "Authentication Systems", "Product Development"],
    impact: "Mockr helps students and job seekers build interview confidence through realistic practice sessions and personalized feedback. By combining AI-driven evaluation with performance analytics, the platform enables users to identify weaknesses and improve interview readiness effectively."
  }
];

export default function ProjectDetailsModal({ projectIndex, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Listen for escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (projectIndex === null || projectIndex < 1 || projectIndex > 4) {
    return null;
  }

  const project = projectsData[projectIndex - 1];

  // Stop propagation to prevent card flips or parent interactions
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <motion.div 
      className="project-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="project-modal-container"
        initial={{ y: 50, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 30, scale: 0.98, opacity: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        onClick={handleContentClick}
      >
        {/* Top Control Bar */}
        <div className="project-modal-header-bar">
          <button className="project-modal-close-btn" onClick={onClose}>
            <span className="close-cross">×</span>
          </button>
        </div>

        {/* Project Header with transitioning folder image */}
        <div className="project-modal-title-section-with-icon">
          <motion.img 
            layoutId={`project-folder-${projectIndex}`} 
            src={folderIconImg} 
            className="project-modal-folder-icon" 
            alt="Project Folder"
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          />
          <div className="project-modal-title-section">
            <h1 className="project-modal-title">{project.title}</h1>
            <p className="project-modal-subtitle">{project.subtitle}</p>
          </div>
        </div>

        <div className="project-modal-divider" />

        {/* 2-Column Responsive Layout */}
        <div className="project-modal-grid">
          
          {/* Left Column: Descriptions, Goals, Tech, Skills, Impact */}
          <div className="project-modal-col-left">
            
            {/* Overview */}
            <div className="project-modal-section">
              <h2 className="project-modal-section-heading">Overview</h2>
              <p className="project-modal-body-text">{project.overview}</p>
            </div>

            {/* Problem Statement */}
            <div className="project-modal-section">
              <h2 className="project-modal-section-heading">Problem Statement</h2>
              <p className="project-modal-body-text">{project.problem}</p>
            </div>

            {/* Solution */}
            <div className="project-modal-section">
              <h2 className="project-modal-section-heading">Solution</h2>
              <p className="project-modal-body-text">{project.solution}</p>
            </div>

            {/* Tech Stack Grids */}
            <div className="project-modal-section">
              <h2 className="project-modal-section-heading">Technologies Used</h2>
              <div className="project-modal-tag-grid">
                {project.tech.map(t => (
                  <span key={t} className="project-modal-tag-pill tech">{t}</span>
                ))}
              </div>
            </div>

            {/* Skills Gained */}
            <div className="project-modal-section">
              <h2 className="project-modal-section-heading">Skills Demonstrated</h2>
              <div className="project-modal-tag-grid">
                {project.skills.map(s => (
                  <span key={s} className="project-modal-tag-pill skill">{s}</span>
                ))}
              </div>
            </div>

            {/* Impact */}
            <div className="project-modal-section project-modal-impact-box">
              <h2 className="project-modal-section-heading">Impact</h2>
              <p className="project-modal-body-text italic">{project.impact}</p>
            </div>

          </div>

          {/* Right Column: Visual Architecture, Features, Metrics */}
          <div className="project-modal-col-right">
            
            {/* System Architecture Flowchart */}
            <div className="project-modal-section">
              <h2 className="project-modal-section-heading">System Architecture</h2>
              <div className="project-modal-architecture-flow">
                {project.architecture.map((node, idx) => (
                  <div key={idx} className="architecture-flow-node-wrapper">
                    <div className="architecture-flow-node">
                      <span className="architecture-node-icon">{node.icon}</span>
                      <span className="architecture-node-name">{node.name}</span>
                    </div>
                    {idx < project.architecture.length - 1 && (
                      <div className="architecture-flow-arrow">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4V20M12 20L6 14M12 20L18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Project 1 Specific: Dataset Details & Results */}
            {project.id === "hubert" && (
              <>
                <div className="project-modal-section">
                  <h2 className="project-modal-section-heading">Dataset: {project.dataset.name}</h2>
                  <ul className="project-modal-bullets">
                    <li><strong>Total Audio Size:</strong> {project.dataset.files}</li>
                    <li><strong>Speech Category:</strong> {project.dataset.type}</li>
                    <li><strong>Native Language Categories:</strong>
                      <div className="project-modal-tag-grid" style={{ marginTop: '8px' }}>
                        {project.dataset.classes.map(c => (
                          <span key={c} className="project-modal-mini-pill">{c}</span>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="project-modal-section">
                  <h2 className="project-modal-section-heading">Model Performance Metrics</h2>
                  <div className="project-modal-table-wrapper">
                    <table className="project-modal-results-table">
                      <thead>
                        <tr>
                          <th>Feature Type / Model</th>
                          <th>Classification Accuracy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.results.map((res, idx) => (
                          <tr key={idx}>
                            <td>{res.feature}</td>
                            <td className="accuracy-val">{res.accuracy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* Project 2 Specific: Key Features & Technical Details */}
            {project.id === "edupredict" && (
              <div className="project-modal-section">
                <h2 className="project-modal-section-heading">Key Functional Modules</h2>
                <div className="project-modal-features-list">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="project-modal-feature-card">
                      <div className="feature-card-header">
                        <span className="feature-card-num">0{idx + 1}</span>
                        <h4 className="feature-card-title">{feat.name}</h4>
                      </div>
                      <p className="feature-card-desc">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project 3 Specific: Key Features & Engineering Optimizations */}
            {project.id === "emotion-recogniser" && (
              <>
                <div className="project-modal-section">
                  <h2 className="project-modal-section-heading">Key Features</h2>
                  <div className="project-modal-features-list">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="project-modal-feature-card">
                        <div className="feature-card-header">
                          <span className="feature-card-num">0{idx + 1}</span>
                          <h4 className="feature-card-title">{feat.name}</h4>
                        </div>
                        <p className="feature-card-desc">{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="project-modal-section">
                  <h2 className="project-modal-section-heading">Performance Results</h2>
                  <div className="project-modal-table-wrapper">
                    <table className="project-modal-results-table">
                      <thead>
                        <tr>
                          <th>Model</th>
                          <th>Accuracy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.results.map((res, idx) => (
                          <tr key={idx}>
                            <td>{res.feature}</td>
                            <td className="accuracy-val">{res.accuracy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="project-modal-section">
                  <h2 className="project-modal-section-heading">Engineering Optimizations</h2>
                  <div className="project-modal-features-list">
                    {project.optimizations.map((opt, idx) => (
                      <div key={idx} className="project-modal-feature-card thin">
                        <h4 className="feature-card-title">{opt.title}</h4>
                        <p className="feature-card-desc">{opt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Project 4 Specific: Features & Future Roadmap */}
            {project.id === "mockr" && (
              <>
                <div className="project-modal-section">
                  <h2 className="project-modal-section-heading">Key Features</h2>
                  <div className="project-modal-features-list">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="project-modal-feature-card">
                        <div className="feature-card-header">
                          <span className="feature-card-num">0{idx + 1}</span>
                          <h4 className="feature-card-title">{feat.name}</h4>
                        </div>
                        <p className="feature-card-desc">{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="project-modal-section">
                  <h2 className="project-modal-section-heading">Future Expansion Roadmap</h2>
                  <div className="project-modal-features-list">
                    {project.future.map((fut, idx) => {
                      const [title, desc] = fut.split(": ");
                      return (
                        <div key={idx} className="project-modal-feature-card thin">
                          <h4 className="feature-card-title">🚀 {title}</h4>
                          <p className="feature-card-desc">{desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
