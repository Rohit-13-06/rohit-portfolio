import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

// Assets
import capFrontImg from './assets/Ry cap.png';
import capBackImg from './assets/cap_back.png';
import logoRevealImg from './assets/logo_reveal.png';
import takeoverHeadingImg from './assets/takeover_heading.png';
import takeoverSignatureImg from './assets/takeover_signature.png';
import takeoverExperienceImg from './assets/takeover_experience.png';
import SkillsPlayground from './components/SkillsPlayground';
import takeoverFooterGraphicImg from './assets/takeover_footer_graphic.png';
import InternshipCards from './components/InternshipCards';
import projectsHeadingImg from './assets/projects_heading.png';
import folderIconImg from './assets/folder_icon.png';
import takeoverProjectsFooterImg from './assets/takeover_projects_footer.png';
import toriiGateImg from './assets/torii_gate.png';
import contactHeadingNewImg from './assets/contact_heading_new.png';
import navImg from './assets/nav.png';

// Components
import ProjectDetailsModal from './components/ProjectDetailsModal';
import CurrentlyExploring from './components/CurrentlyExploring';

// Symmetrical range constants to avoid array reference shifts on re-renders
const RANGE_0_1 = [0, 1];
const SCALE_RANGE = [1, 0.35];
const ROTATE_RANGE = [0, 360];

function App() {
  const containerRef = useRef(null);
  
  // Refs for each scroll section
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const projectsRef = useRef(null);
  const section5Ref = useRef(null);

  // Projects scroll-driven entry animations
  const { scrollYProgress: projectsScrollY } = useScroll({
    target: projectsRef,
    offset: ["start end", "center center"] // Settle exactly when projects section enters and centers
  });

  const springConfig = { stiffness: 55, damping: 22, mass: 1.0 }; // Slightly heavier and slower for subtle slow motion
  
  // X coordinates (left corners vs right corners - aligned with viewport diagonals)
  const folderXLeft = useSpring(useTransform(projectsScrollY, [0.0, 0.85], ["-100vw", "0vw"]), springConfig);
  const folderXRight = useSpring(useTransform(projectsScrollY, [0.0, 0.85], ["100vw", "0vw"]), springConfig);
  
  // Y coordinates (top corners vs bottom corners - aligned with viewport diagonals)
  const folderYTop = useSpring(useTransform(projectsScrollY, [0.0, 0.85], ["-100vh", "0vh"]), springConfig);
  const folderYBottom = useSpring(useTransform(projectsScrollY, [0.0, 0.85], ["100vh", "0vh"]), springConfig);
  
  // Rotations (subtle slow spin of 90 degrees)
  const folderRotateLeft = useSpring(useTransform(projectsScrollY, [0.0, 0.85], [-90, 0]), springConfig);
  const folderRotateRight = useSpring(useTransform(projectsScrollY, [0.0, 0.85], [90, 0]), springConfig);
  
  const folderOpacity = useSpring(useTransform(projectsScrollY, [0.0, 0.3, 0.85], [0, 0.4, 1]), springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setFormSubmitted(true);
      } else {
        alert(result.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to send message. Please check your connection.');
    }
  };

  // Monitor scroll height to disable flip once scrolled
  useEffect(() => {
    const handleScrollThreshold = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScrollThreshold, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollThreshold);
  }, []);

  // Monitor resize to calculate target X and Y coordinates in pixels to place the cap in the top-left corner
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 900;
      const cardWidth = isMobile ? 350 : 500;
      const scale = 0.35;
      const scaledSize = cardWidth * scale;
      
      const paddingTop = isMobile ? 8 : 10;
      const paddingLeft = isMobile ? 20 : 35;
      
      const targetXCenter = paddingLeft + (scaledSize / 2);
      const targetYCenter = paddingTop + (scaledSize / 2);
      
      setTargetX(-(window.innerWidth / 2 - targetXCenter));
      setTargetY(-(window.innerHeight / 2 - targetYCenter));
      setWindowHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll tracking for Section 1 (Hero to Header)
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: section1Ref,
    offset: ["start start", "end start"]
  });

  const { scrollY } = useScroll();

  // Transformed values for the cap animation (Section 1 progress)
  const capScale = useTransform(scrollYProgress1, RANGE_0_1, SCALE_RANGE);
  
  // Cap spins (rotate Z) on scroll
  const capRotateZ = useTransform(scrollYProgress1, RANGE_0_1, ROTATE_RANGE);
  
  // Cap translates from center of screen to the top-left corner
  const capX = useTransform(scrollYProgress1, (value) => value * targetX);
  const capY = useTransform(scrollYProgress1, (value) => value * targetY);

  // Scroll tracking for Section 2 (Logo Reveal)
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"]
  });

  // Transformed values for Section 2 (Logo Reveal and Blur)
  // The logo image reveals, stays stuck in center, and blurs/fades out as red card overlaps
  const logoOpacity = useTransform(scrollYProgress2, [0.0, 0.33, 0.5, 0.67], [0, 1, 1, 0]);
  const logoBlur = useTransform(scrollYProgress2, [0.0, 0.33, 0.5, 0.67], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(25px)"]);
  const logoScale = useTransform(scrollYProgress2, [0.0, 0.33, 0.5, 0.67], [0.9, 1, 1, 0.9]);

  // Transformed values for Section 3 (Red Takeover Card)
  // Card remains hidden until progress 0.5 (when logo starts blurring), then slides up to top by 0.67
  const cardY = useTransform(scrollYProgress2, [0.0, 0.5, 0.67, 1.0], ["100vh", "100vh", "0vh", "0vh"]);

  // Determine cap rotation based on scroll threshold
  const rotateYValue = (!isScrolled && isHovered) ? 180 : 0;

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Premium Vignette Overlay */}
      <div className="vignette-overlay" />

      {/* Top Right Navigation Icon */}
      <div 
        className="nav-fixed-container"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <motion.div 
          className="nav-icon-wrapper"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <img src={navImg} className="nav-icon-img" alt="Navigation" />
        </motion.div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="nav-dropdown-tile"
              initial={{ opacity: 0, x: 15, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 15, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div 
                className="nav-dropdown-item" 
                onClick={() => {
                  if (section3Ref.current) {
                    section3Ref.current.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMenuOpen(false);
                }}
              >
                About
              </div>
              <div 
                className="nav-dropdown-item" 
                onClick={() => {
                  const section = document.getElementById('skills-caps');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                Skills
              </div>
              <div 
                className="nav-dropdown-item" 
                onClick={() => {
                  const section = document.getElementById('projects-section-caps');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                Projects
              </div>
              <div 
                className="nav-dropdown-item" 
                onClick={() => {
                  const section = document.getElementById('contact');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                Contact
              </div>
              <div 
                className="nav-dropdown-item" 
                onClick={() => {
                  window.open('/rohit_resume.pdf', '_blank');
                  setIsMenuOpen(false);
                }}
              >
                Resume
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Cap Container that reacts to scroll */}
      <div className="cap-fixed-container">
        <motion.div 
          className="cap-flip-card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (isScrolled) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          style={{
            scale: capScale,
            x: capX,
            y: capY,
            rotateZ: capRotateZ,
            pointerEvents: 'auto',
            cursor: isScrolled ? 'pointer' : 'auto',
          }}
        >
          <motion.div 
            className="cap-flip-inner"
            animate={{ rotateY: rotateYValue }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front of the cap */}
            <img src={capFrontImg} className="cap-front" alt="Ry Cap Front" />
            {/* Back of the cap */}
            <img src={capBackImg} className="cap-back" alt="Ry Cap Back" />
          </motion.div>
        </motion.div>
      </div>

      {/* Section 1: Hero / Home */}
      <section ref={section1Ref} id="home" className="section section-one">
      </section>

      {/* Section 2: Logo Reveal / Skills */}
      <section ref={section2Ref} id="skills" className="section section-two">
        <motion.div 
          className="section-two-content"
          style={{
            opacity: logoOpacity,
            filter: logoBlur,
            scale: logoScale,
          }}
        >
          <img src={logoRevealImg} className="logo-reveal-image" alt="ROHIT YERRARAPU" />
          <p className="logo-reveal-subtitle">Aspiring AI Engineer & Creative Builder.</p>
        </motion.div>
      </section>

      {/* Section 3: Takeover Card Container */}
      <div ref={section3Ref} className="section-three-container">
        <div className="takeover-card-sticky-wrapper">
          <motion.div 
            className="takeover-card"
            style={{
              y: cardY
            }}
          >
            <div className="card-content">
              <img 
                src={takeoverHeadingImg} 
                className="takeover-card-heading-img" 
                alt="Takeover Heading"
              />
              <div 
                className="takeover-card-bio"
              >
                <p>
                  I'm Rohit Yerrarapu — a Computer Science student, builder, and aspiring AI Engineer passionate about transforming ideas into intelligent software and meaningful digital experiences.
                </p>
                <p>
                  My journey began with a curiosity about how software works and has since evolved into building AI-powered applications, full-stack web platforms, and user-centric products. I enjoy working at the intersection of Artificial Intelligence, Web Development, and Product Design, where technology meets creativity.
                </p>
                <p>
                  Currently, I'm strengthening my foundations in Data Structures & Algorithms, Artificial Intelligence, Machine Learning, while actively building projects that solve real-world problems.
                </p>
                <p>
                  Whether it's developing AI-driven solutions, crafting interactive web experiences, or experimenting with new ideas, I enjoy turning concepts into products that are not only functional but memorable. Driven by curiosity and continuous learning, I'm constantly exploring new ways to create impactful technology.
                </p>
              </div>
              <hr className="takeover-divider" />
              <img 
                src={takeoverSignatureImg} 
                className="takeover-card-signature-img" 
                alt="Signature" 
              />
              <div className="takeover-card-education">
                <div className="education-row">
                  <div className="education-left">
                    <div className="education-title">Hyderabad Institute of Technology And Management</div>
                    <div className="education-desc">Bachelor of Technology in Computer Science and Engineering</div>
                  </div>
                  <div className="education-right">
                    <div className="education-meta-bold">Hyderabad, India</div>
                    <div className="education-meta-regular">2023 - Present</div>
                  </div>
                </div>
                
                <div className="education-row">
                  <div className="education-left">
                    <div className="education-title">Sri Chaitanya Junior College</div>
                    <div className="education-desc">Senior Secondary Education</div>
                  </div>
                  <div className="education-right">
                    <div className="education-meta-bold">Hyderabad, India</div>
                    <div className="education-meta-regular">2021 - 2023</div>
                  </div>
                </div>
                
                <div className="education-row">
                  <div className="education-left">
                    <div className="education-title">Sri Chaitanya Techno Schools</div>
                    <div className="education-desc">Secondary Education</div>
                  </div>
                  <div className="education-right">
                    <div className="education-meta-bold">Hyderabad, India</div>
                    <div className="education-meta-regular">2018 - 2021</div>
                  </div>
                </div>
              </div>
              <hr className="takeover-divider" />
              <div id="skills-caps">
                <img 
                  src={takeoverExperienceImg} 
                  className="takeover-card-experience-img" 
                  alt="Experience" 
                />
                <SkillsPlayground />
              </div>
              <hr className="takeover-divider" />
              <img 
                src={takeoverFooterGraphicImg} 
                className="takeover-card-footer-graphic-img" 
                alt="Footer Graphic" 
              />
              <InternshipCards />
              <hr className="takeover-divider" style={{ margin: '40px auto 0 auto' }} />
              <div id="projects-section-caps" style={{ width: '100%' }}>
                <img 
                  src={projectsHeadingImg} 
                  className="takeover-card-projects-heading-img" 
                  alt="Projects Heading" 
                />
                <p className="projects-instruction-text">
                  CLICK THE FOLDER TO SEE THE PROJECT
                </p>
                
                {/* Scroll-driven 4 Projects Section in Red Card */}
                <div 
                  className="projects-takeover-section" 
                  ref={projectsRef}
                >
                  <div className="projects-takeover-grid">
                    {/* Folder 01 - flies from Top-Left, spins clockwise */}
                    <motion.div 
                      className="project-takeover-card"
                      style={{ x: folderXLeft, y: folderYTop, rotate: folderRotateLeft, opacity: folderOpacity }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      onClick={() => setSelectedProject(1)}
                    >
                      <motion.img 
                        layoutId="project-folder-1" 
                        src={folderIconImg} 
                        className="project-folder-icon" 
                        alt="Folder 01" 
                      />
                    </motion.div>
  
                    {/* Folder 02 - flies from Top-Right, spins counter-clockwise */}
                    <motion.div 
                      className="project-takeover-card"
                      style={{ x: folderXRight, y: folderYTop, rotate: folderRotateRight, opacity: folderOpacity }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      onClick={() => setSelectedProject(2)}
                    >
                      <motion.img 
                        layoutId="project-folder-2" 
                        src={folderIconImg} 
                        className="project-folder-icon" 
                        alt="Folder 02" 
                      />
                    </motion.div>
  
                    {/* Folder 03 - flies from Bottom-Left, spins clockwise */}
                    <motion.div 
                      className="project-takeover-card"
                      style={{ x: folderXLeft, y: folderYBottom, rotate: folderRotateLeft, opacity: folderOpacity }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      onClick={() => setSelectedProject(3)}
                    >
                      <motion.img 
                        layoutId="project-folder-3" 
                        src={folderIconImg} 
                        className="project-folder-icon" 
                        alt="Folder 03" 
                      />
                    </motion.div>
  
                    {/* Folder 04 - flies from Bottom-Right, spins counter-clockwise */}
                    <motion.div 
                      className="project-takeover-card"
                      style={{ x: folderXRight, y: folderYBottom, rotate: folderRotateRight, opacity: folderOpacity }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      onClick={() => setSelectedProject(4)}
                    >
                      <motion.img 
                        layoutId="project-folder-4" 
                        src={folderIconImg} 
                        className="project-folder-icon" 
                        alt="Folder 04" 
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
              <hr className="takeover-divider" style={{ margin: '60px auto 0 auto' }} />
              <img 
                src={takeoverProjectsFooterImg} 
                className="takeover-card-projects-footer-img" 
                alt="Projects Footer" 
              />
              <CurrentlyExploring />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section 5: Contact Placeholder */}
      <section ref={section5Ref} id="contact" className="section section-five">
        <div className="contact-content">
          <div className="contact-details">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="torii-container"
            >
              <img 
                src={contactHeadingNewImg} 
                className="torii-heading-overlay" 
                alt="Contact" 
              />

              <div className="torii-form-overlay">
                {formSubmitted ? (
                  <div className="horizontal-success-message">
                    <div className="success-icon-small">✓</div>
                    <p>Thank you! Your message has been sent.</p>
                    <button 
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: '', email: '', message: '' });
                      }} 
                      className="success-reset-btn-small"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form className="horizontal-contact-form" onSubmit={handleFormSubmit}>
                    <div className="fields-row">
                      <div className="input-group">
                        <input 
                          type="text" 
                          required 
                          placeholder="Name" 
                          className="form-input" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      
                      <div className="input-group">
                        <input 
                          type="email" 
                          required 
                          placeholder="Email" 
                          className="form-input" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      
                      <div className="input-group message-group">
                        <input 
                          type="text" 
                          required 
                          placeholder="Message" 
                          className="form-input" 
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <button type="submit" className="form-submit-btn">
                      <span>SEND MESSAGE</span>
                    </button>
                  </form>
                )}
              </div>

              <div className="torii-socials-overlay">
                <a 
                  href="https://www.linkedin.com/in/rohit-yerrarapu-6534ab290" 
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/Rohit-13-06" 
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>

              <img 
                src={toriiGateImg} 
                alt="Torii Gate" 
                className="torii-image" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Specimen Details Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <ProjectDetailsModal projectIndex={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
