
import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants, useInView } from 'framer-motion';
import { 
    NAME, 
    ROLE, 
    ABOUT_TEXT,
    EXPERIENCES,
    SKILL_CATEGORIES,
    PROJECTS,
    EMAIL,
    GITHUB_URL,
    LINKEDIN_URL,
    RESUME_CONTEXT,
    askNishadBot,
    generateBiInsights,
    Project,
} from './utils';

// Shared SectionTitle Component
const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h2 className={`text-3xl md:text-4xl font-heading mb-12 text-center ${className}`}>
    {children}
  </h2>
);

// --- LeafyBackground Component ---
const Leaf = ({ style, animationProps }: { style: React.CSSProperties, animationProps: any }) => (
    <motion.div
        className="absolute"
        style={style}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
            ...animationProps.animate,
            opacity: style.opacity || 0.7,
            scale: 1
        }}
        transition={{ ...animationProps.transition }}
    >
        <svg viewBox="0 0 100 100" fill="#4E6C50" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
            <path d="M50 100C20 80 0 60 0 40C0 15 25 0 50 0C75 0 100 15 100 40C100 60 80 80 50 100Z"/>
            <path d="M50 100V0" stroke="#3E563F" strokeWidth="2"/>
        </svg>
    </motion.div>
);

export const LeafyBackground: React.FC = () => {
    const leaves = [
        { style: { top: '5%', left: '10%', width: '100px', opacity: 0.3 }, animate: { y: [0, -10, 0], x: [0, 5, 0] }, transition: { duration: 15, repeat: Infinity, repeatType: 'mirror' } },
        { style: { top: '15%', right: '5%', width: '80px', opacity: 0.4 }, animate: { y: [0, 15, 0], rotate: [0, 10, 0] }, transition: { duration: 20, repeat: Infinity, repeatType: 'mirror' } },
        { style: { bottom: '10%', left: '20%', width: '120px', opacity: 0.25 }, animate: { y: [0, -15, 0] }, transition: { duration: 18, repeat: Infinity, repeatType: 'mirror' } },
        { style: { bottom: '5%', right: '15%', width: '90px', opacity: 0.35 }, animate: { y: [0, 10, 0], x: [0, -5, 0], rotate: [0, -8, 0] }, transition: { duration: 22, repeat: Infinity, repeatType: 'mirror' } },
        { style: { top: '-15%', left: '15%', width: '50px', opacity: 0.9 }, animate: { y: '120vh', x: ['0vw', '4vw', '-4vw', '0vw'], rotate: [0, 60, -20, 0] }, transition: { duration: 25, repeat: Infinity, ease: 'linear', delay: 0 } },
        { style: { top: '-15%', left: '30%', width: '35px', opacity: 0.6 }, animate: { y: '120vh', x: ['0vw', '-3vw', '2vw', '0vw'], rotate: [0, -30, 40, 0] }, transition: { duration: 35, repeat: Infinity, ease: 'linear', delay: 12 } },
        { style: { top: '-15%', left: '40%', width: '65px', opacity: 0.7 }, animate: { y: '120vh', x: ['0vw', '-5vw', '3vw', '0vw'], rotate: [0, -40, 50, 0] }, transition: { duration: 20, repeat: Infinity, ease: 'linear', delay: 5 } },
        { style: { top: '-15%', left: '60%', width: '55px', opacity: 0.8 }, animate: { y: '120vh', x: ['0vw', '5vw', '-6vw', '0vw'], rotate: [0, 120, -30, 0] }, transition: { duration: 28, repeat: Infinity, ease: 'linear', delay: 8 } },
        { style: { top: '-15%', left: '70%', width: '40px', opacity: 0.8 }, animate: { y: '120vh', x: ['0vw', '6vw', '-3vw', '0vw'], rotate: [0, 90, -10, 0] }, transition: { duration: 30, repeat: Infinity, ease: 'linear', delay: 10 } },
        { style: { top: '-15%', left: '90%', width: '75px', opacity: 0.6 }, animate: { y: '120vh', x: ['0vw', '-7vw', '7vw', '0vw'], rotate: [0, -80, 80, 0] }, transition: { duration: 15, repeat: Infinity, ease: 'linear', delay: 2 } },
    ];

    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
            {leaves.map((leaf, index) => <Leaf key={index} style={leaf.style} animationProps={{ animate: leaf.animate, transition: leaf.transition }}/>)}
        </div>
    );
};

// --- Navbar Component ---
const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#insights', label: 'Insights' },
  { href: '#contact', label: 'Contact' },
];

const LeafIconSmall = () => (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.95-4.22C9.94 13.9 17 12 17 8zM17 7c0-2-1-4-3-4s-2 1-2 1c0 2 3 4 5 3z" />
    </svg>
);

const LeafIconLarge = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.95-4.22C9.94 13.9 17 12 17 8zM17 7c0-2-1-4-3-4s-2 1-2 1c0 2 3 4 5 3z" />
    </svg>
)

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[var(--bg-color)]/80 backdrop-blur-sm border-b border-[var(--border-color)]' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center gap-3 text-xl lg:text-2xl font-bold font-heading text-[var(--text-primary)]">
              <span className="text-[var(--accent-green)]"><LeafIconLarge/></span>
              <span>NISHAD WANKHEDE.</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-1.5 text-[var(--accent-green)] hover:text-[var(--text-primary)] px-1 py-2 text-sm lg:text-base font-medium transition-colors"
                >
                  <span className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-[15deg]">
                    <LeafIconSmall />
                  </span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--accent-green)] hover:text-[var(--text-primary)] focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[var(--bg-color)] border-t border-[var(--border-color)]" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-[var(--accent-green)] hover:text-[var(--text-primary)] block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                <LeafIconSmall />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Hero Component ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};


const CarvedWoodButton: React.FC<{ href: string, text: string }> = ({ href, text }) => (
    <motion.a
      href={href}
      className="woody-button font-bold py-2 px-4 text-sm sm:py-3 sm:px-8 sm:text-base rounded-lg relative transition-all duration-300 inline-block text-center"
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        boxShadow: "inset 0px 1px 2px rgba(0,0,0,0.6), inset 0px -1px 2px rgba(255,255,255,0.2), 0 8px 25px rgba(0,0,0,0.25), 0 0 10px rgba(78, 108, 80, 0.3)" 
      }}
      whileTap={{ 
        scale: 0.98, 
        y: -2,
        boxShadow: "inset 0px 2px 4px rgba(0,0,0,0.6), inset 0px -2px 3px rgba(255,255,255,0.1), 0 2px 5px rgba(0,0,0,0.15)"
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      {text}
    </motion.a>
);

const ConnectingVine: React.FC<{ isInView: boolean }> = ({ isInView }) => {
    const vineVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 3, ease: 'easeInOut' }
        }
    };

    const leafContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 1, 
            }
        }
    };

    const leafGrowVariants: Variants = {
        hidden: { scale: 0, rotate: -30, opacity: 0 },
        visible: {
            scale: 1,
            rotate: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 200, damping: 15 }
        }
    };

    const leafSwayVariants: Variants = {
        sway: {
            rotate: [0, 5, -5, 0],
            transition: { duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }
        }
    };
    
    const vinePath = "M-50,250 Q250,300 550,250 T1250,350";
    const leaves = [
        { x: 150, y: 300, scale: 1.2 },
        { x: 350, y: 250, scale: 1.0 },
        { x: 750, y: 240, scale: 1.1 },
        { x: 950, y: 280, scale: 0.9 },
        { x: 1150, y: 330, scale: 1.3 },
    ];

    return (
        <motion.div 
            className="absolute inset-0 z-20 pointer-events-none hidden md:block"
        >
            <motion.svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 1200 600" 
                preserveAspectRatio="xMidYMid slice"
            >
                <motion.path
                    d={vinePath}
                    fill="none"
                    stroke="var(--accent-green)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    variants={vineVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                />
                <motion.g
                     variants={leafContainerVariants}
                     initial="hidden"
                     animate={isInView ? 'visible' : 'hidden'}
                >
                    {leaves.map((leaf, i) => (
                        <motion.g key={i} transform={`translate(${leaf.x} ${leaf.y})`}>
                            <motion.g
                                variants={leafSwayVariants}
                                animate="sway"
                                style={{ transformOrigin: "bottom center"}}
                            >
                                <motion.path
                                    d="M0,0 C15,-15 15,-25 0,-30 C-15,-25 -15,-15 0,0"
                                    fill="var(--accent-green)"
                                    transform={`scale(${leaf.scale})`}
                                    variants={leafGrowVariants}
                                />
                            </motion.g>
                        </motion.g>
                    ))}
                </motion.g>
            </motion.svg>
        </motion.div>
    );
};

const FrameLeaf: React.FC = () => {
    return (
        <motion.div
            className="absolute -top-4 -right-4 z-10 pointer-events-none"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 15 }}
        >
            <motion.div
                animate={{ rotate: [0, -10, 5, -5, 0] }}
                transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
            >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="var(--accent-green)" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.95-4.22C9.94 13.9 17 12 17 8zM17 7c0-2-1-4-3-4s-2 1-2 1c0 2 3 4 5 3z"/>
                </svg>
            </motion.div>
        </motion.div>
    );
};

export const Hero: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
    
  return (
    <section ref={ref} id="home" className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <ConnectingVine isInView={isInView} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <motion.div 
          className="flex flex-col md:grid md:grid-cols-5 gap-12 md:gap-8 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="md:col-span-3 order-last md:order-first text-center md:text-left">
            <motion.h1 
              variants={itemVariants}
              className="font-heading mb-4 leading-tight text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              {NAME}
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-[var(--accent-green)] mb-8 text-xl md:text-2xl lg:text-3xl">
              {ROLE}
            </motion.p>
            <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                variants={itemVariants}
            >
              <CarvedWoodButton href="#projects" text="View My Work" />
              <CarvedWoodButton href="#contact" text="Contact Me" />
            </motion.div>
          </div>
          
          <motion.div 
            className="relative flex items-center justify-center h-full w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto md:col-span-2 order-first md:order-last"
            variants={itemVariants}
            whileHover={{ 
                scale: 1.03, 
                y: -8, 
                boxShadow: "0px 15px 30px rgba(0,0,0,0.15)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
             <div className="wood-mat relative">
                <img
                    src="https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=800&h=800&auto=format&fit=crop"
                    alt={NAME}
                    className="relative w-full h-auto object-cover rounded-md"
                />
                <FrameLeaf />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// --- About Component ---
const AboutSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
    {children}
  </h2>
);

export const About: React.FC = () => {
  return (
    <motion.section 
      id="about" 
      className="py-20 md:py-32"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <AboutSectionTitle>About Me</AboutSectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-lg text-[var(--text-secondary)] mb-4 leading-relaxed">
              {ABOUT_TEXT.p1}
            </p>
            <p className="text-lg text-[var(--text-secondary)] mb-4 leading-relaxed">
              {ABOUT_TEXT.p2}
            </p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {ABOUT_TEXT.p3}
            </p>
          </motion.div>
          <motion.div 
            className="md:col-span-2 md:order-first"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -8, boxShadow: "0px 15px 30px rgba(0,0,0,0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="bg-white p-2 rounded-lg shadow-xl border border-[var(--border-color)]">
                <img
                  src="https://picsum.photos/seed/about_nature_nishad/400/500"
                  alt="About Nishad Wankhede"
                  className="rounded-md w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};


// --- WorkExperience Component ---
const expContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const expItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const LeafMarker = () => (
    <div className="absolute top-1 left-[-2.1rem] transform -translate-x-1/2">
        <svg className="w-5 h-5 text-[var(--accent-green)]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.95-4.22C9.94 13.9 17 12 17 8zM17 7c0-2-1-4-3-4s-2 1-2 1c0 2 3 4 5 3z" />
        </svg>
    </div>
);

export const WorkExperience: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle>Work Experience</SectionTitle>
        
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={expContainerVariants}
        >
          <div className="relative border-l-2 border-dashed border-green-800/20 pl-8 space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <motion.div key={index} className="relative" variants={expItemVariants}>
                <LeafMarker />
                <motion.div 
                  className="wooden-slate p-6 rounded-lg"
                  whileHover={{ scale: 1.03, y: -8, boxShadow: "0px 15px 30px rgba(0,0,0,0.25)" }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <p className="font-semibold text-green-200/80 text-sm mb-1">{exp.period}</p>
                  <h4 className="text-xl font-bold font-heading !text-white mb-1">{exp.role}</h4>
                  <p className="text-gray-300/90 mb-3">{exp.company} &bull; {exp.location}</p>
                  <ul className="list-disc list-inside text-gray-300/90 text-sm space-y-1 text-left">
                      {exp.description.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};


// --- Skills Component ---
const SkillSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-heading mb-12 text-center">
    {children}
  </h2>
);

const SkillsLeafIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.95-4.22C9.94 13.9 17 12 17 8zM17 7c0-2-1-4-3-4s-2 1-2 1c0 2 3 4 5 3z" />
    </svg>
);

const SKILL_ICONS: { [key: string]: React.ReactNode } = {
  'Power BI': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13.63V4h3.93v9.63zm4.54 0V4h3.93v9.63zm4.54 0V4h3.94v9.63zm4.55 6.37h-3.94V8.55h3.94z"></path></svg>,
  'Tableau': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 13h9v9H2zm0-2h9V2H2zm11 11h9V2h-9z"></path></svg>,
  'SQL Server': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 2c4.42 0 8 1.79 8 4s-3.58 4-8 4-8-1.79-8-4 3.58-4 8-4zm0 14c-4.42 0-8-1.79-8-4h16c0 2.21-3.58 4-8 4z"></path></svg>,
  'Python': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.54 11.51c.39-.39.39-1.02 0-1.41l-2.05-2.05c-1.37-1.37-3.58-1.37-4.95 0l-.71.71c-.39.39-.39 1.02 0 1.41l2.05 2.05c1.37 1.37 3.58 1.37 4.95 0zm-5.66 8.49c-1.37-1.37-1.37-3.58 0-4.95l2.05-2.05c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-2.05 2.05c-1.37 1.37-3.59 1.37-4.95 0zm-2.83-7.07L4 14.98c-1.37 1.37-1.37 3.58 0 4.95l.71.71c1.37 1.37 3.58 1.37 4.95 0L12 18.59c1.37-1.37 1.37-3.58 0-4.95zM12.49 4l2.05 2.05c1.37 1.37 1.37 3.58 0 4.95l-2.05 2.05c-.39.39-1.02.39-1.41 0l-.71-.71c-.39-.39-.39-1.02 0-1.41L12.42 9c.59-.59.59-1.54 0-2.12L10.37 4.83c-.39-.39-.39-1.02 0-1.41l.71-.71C12.45 1.34 14.66 1.34 16 2.69l2.05 2.05c1.37 1.37 1.37 3.58 0 4.95L15.46 12c-1.37 1.37-1.37 3.58 0 4.95l2.47 2.47c1.37 1.37 3.58 1.37 4.95 0l.71-.71c1.37-1.37 1.37-3.58 0-4.95L21.54 12Z"></path></svg>,
  'Snowflake': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.1 13.3l-3.3-1.9 3.3-1.9c.2-.1.3-.3.3-.5s-.1-.4-.3-.5l-3.3-1.9 1.9-3.3c.1-.2.1-.5 0-.7s-.3-.4-.5-.4l-3.3 1.9-1.9-3.3c-.1-.2-.3-.3-.5-.3s-.4.1-.5.3l-1.9 3.3-3.3-1.9c-.2-.1-.5-.1-.7 0s-.4.3-.4.5l1.9 3.3-3.3 1.9c-.2.1-.3.3-.3.5s.1.4.3.5l3.3 1.9-1.9 3.3c-.1.2-.1.5 0 .7s.3.4.5.4l3.3-1.9 1.9 3.3c.1.2.3.3.5.3s.4-.1.5-.3l1.9-3.3 3.3 1.9c.2.1.5.1.7 0s.4-.3.4-.5l-1.9-3.3zM12 15.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"></path></svg>,
  'Azure Data Factory': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 17.01V6.99C4 6.45 4.45 6 5 6h14c.55 0 1 .45 1 1v10.01c0 .54-.45.99-1 .99H5c-.55-.01-1-.46-1-1.01zM11 15h2v2h-2zm-4 0h2v2H7zm8 0h2v2h-2zm-4-4h2v2h-2zm-4 0h2v2H7zm8 0h2v2h-2zm-4-4h2v2h-2zm-4 0h2v2H7z"></path></svg>,
  'GitLab CI/CD': <svg viewBox="0 0 24 24" fill="currentColor"><path d="m23.6 9.4l-1.7-5.2c-.2-.5-.6-.8-1.2-.8H3.3c-.6 0-1.1.3-1.2.8L.4 9.4c-.1.4 0 .8.4 1.1l11.1 8.3c.2.2.5.2.7 0l11.1-8.3c.4-.3.5-.7.4-1.1M12 17.3 3.6 10.8l1.2-3.7h14.4l1.2 3.7-8.4 6.5m-3.9-3.7L12 11.2l3.9 2.4-3.9 3-3.9-3m7.8 0L12 11.2"></path></svg>,
  'Microsoft Dynamics': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.23 8.24L11.08 12l-7.85 3.76V8.24m9.4-4.71L4.76 7.42l7.86 3.76L20.5 7.42 12.64 3.53M2.5 6.75l8.85-4.23a1.5 1.5 0 0 1 1.3 0l8.85 4.23a1 1 0 0 1 .5 1v8.5a1 1 0 0 1-.5 1l-8.85 4.23a1.5 1.5 0 0 1-1.3 0L2.5 17.75a1 1 0 0 1-.5-1v-8.5a1 1 0 0 1 .5-1Z"></path></svg>,
  'Salesforce': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 14.2c-1 0-1.9-.4-2.5-1.1-.7-.7-1-1.6-1.1-2.6H9.4c-.1 1-.4 1.9-1.1 2.6-.7.7-1.6 1.1-2.5 1.1-1.2 0-2.2-.5-3-1.4-.8-1.1-1-2.4-.7-3.8.3-1.3 1-2.4 2-3.1.9-.6 2-.9 3.1-.9s2.1.3 3 .9c.2-.9.7-1.6 1.4-2.2.8-.7 1.8-1 2.9-1s2.1.4 2.9 1.1c.8.7 1.2 1.7 1.2 2.8 0 .6-.1 1.1-.3 1.6.4.4.7.9.9 1.4.3.7.4 1.4.4 2.1 0 1.2-.4 2.3-1.3 3.1-.9.8-2 1.2-3.2 1.2M8.1 9.4c-.4.3-.7.7-.8 1.2s0 1 .3 1.4c.2.4.6.7.9.8.4.2.8.2 1.2.1H6.9c-.3 0-.6-.1-.8-.3-.2-.2-.3-.5-.3-.8s.1-.6.3-.8.5-.3.8-.3h3.5c-.1-.4-.1-.7-.2-1.1-.1-.3-.2-.6-.4-.8-.3-.4-.7-.7-1.1-.8-.5-.2-1-.2-1.5 0-.4.2-.8.5-1.1.8m8.6 1.9c.2.1.4.2.6.2.3 0 .5-.1.7-.3s.3-.4.3-.7-.1-.6-.3-.8c-.2-.2-.4-.3-.7-.3h-3.4c.2.9.6 1.7 1.2 2.3.2.1.4.2.6.2"></path></svg>,
  'Windows': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8.5v8.5H3V3m9.5 0H21v8.5h-8.5V3M3 12.5h8.5V21H3v-8.5m9.5 0H21V21h-8.5v-8.5z"></path></svg>,
  'UNIX': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 8l3 3-3 3-1.4-1.4L6.2 11 4.6 9.4zm5 5.6V15h8v-1.4z"></path></svg>,
  'Predictive Modeling': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 19h16v-2H4v2zm1.8-4.2L4 16.6V7h16v8l-2-2-3 3-4-4-3.2 3.2z"></path></svg>,
  'Data Warehousing': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v3H4zm0 5h16v3H4zm0 5h16v3H4z"></path></svg>,
  'Process Automation': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-6 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>,
  'Regulatory Compliance': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.07 14.22L7 11.3l1.41-1.41 2.53 2.53 5.66-5.66L18 8.17l-7.07 7.05z"></path></svg>,
  'Financial Analytics': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8h2.8v6h-2.8z"></path></svg>,
  'Default': <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 17l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>,
};

const getIconForSkill = (skill: string) => {
    const knownSkill = Object.keys(SKILL_ICONS).find(key => 
        key !== 'Default' && skill.toLowerCase().includes(key.toLowerCase())
    );
    return knownSkill ? SKILL_ICONS[knownSkill] : SKILL_ICONS['Default'];
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SkillSectionTitle>Technical Skills</SkillSectionTitle>
        <motion.div 
          className="bg-white/50 p-6 md:p-10 rounded-xl border border-[var(--border-color)]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {SKILL_CATEGORIES.map((category, index) => (
            <div key={category.category} className={index > 0 ? 'mt-8 pt-8 border-t border-[var(--border-color)]' : ''}>
              <h3 className="flex items-center gap-2 text-xl font-heading mb-6">
                <span className="text-[var(--accent-green)]">
                  <SkillsLeafIcon />
                </span>
                {category.category}
              </h3>
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
              >
                {category.skills.map((skill) => (
                  <motion.div 
                    key={skill} 
                    className="group flex flex-col items-center justify-center text-center p-4 bg-[var(--bg-color)] rounded-lg border border-[var(--border-color)] cursor-pointer"
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.05)", borderColor: 'var(--accent-green)' }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <div className="w-10 h-10 mb-3 text-gray-500 group-hover:text-[var(--accent-green)] transition-colors duration-300">
                      {getIconForSkill(skill)}
                    </div>
                    <span className="font-medium text-sm text-[var(--text-secondary)]">{skill}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};


// --- Portfolio Component ---
const PortfolioSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-heading mb-16 text-center">
    {children}
  </h2>
);

const LeafPin = () => (
    <motion.div
        className="absolute -top-3 -right-3 z-10"
        animate={{
            rotate: [0, -5, 0, 5, 0],
        }}
        transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
        }}
    >
        <svg width="40" height="40" viewBox="0 0 50 50" className="drop-shadow-md">
            <motion.path 
                d="M 25, 45 L 25, 10" 
                stroke="#6B4F4F" 
                strokeWidth="2" 
                initial={{pathLength: 0}}
                animate={{pathLength: 1}}
                transition={{duration: 0.5, delay: 0.5}}
            />
            <motion.path 
                d="M 20 15 C 10 10, 10 0, 20 0 C 30 0, 30 10, 20 15 Z" 
                fill="#4E6C50"
                initial={{opacity: 0, scale: 0.5}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5, delay: 0.8}}
            />
        </svg>
    </motion.div>
);

const ProjectCard: React.FC<{ project: Project, index: number }> = ({ project, index }) => {
    const isReversed = index % 2 !== 0;
    
    const hasLink = (project.demoUrl && project.demoUrl !== '#') || (project.githubUrl && project.githubUrl !== '#');
    const link = (project.demoUrl && project.demoUrl !== '#') ? project.demoUrl : project.githubUrl;

    const textContent = (
        <motion.div 
            className="flex flex-col justify-center text-left"
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
        >
            <h3 className="text-3xl font-heading mb-4">{project.title}</h3>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed flex-grow">{project.description}</p>
            <div className="mt-auto">
                {hasLink && link && (
                  <motion.a 
                    href={link}
                    target="_blank" rel="noopener noreferrer"
                    className="woody-button inline-block font-bold py-2 px-6 rounded-md text-sm transition-all duration-300"
                    whileHover={{ filter: 'brightness(1.05)', y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Project
                  </motion.a>
                )}
            </div>
        </motion.div>
    );

    const imageContent = (
        <motion.div 
            className={`relative flex items-center justify-center group ${isReversed ? 'md:order-first' : ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, type: 'spring' }}
        >
            <motion.div
                className="relative w-full max-w-sm transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-transform duration-300 ease-in-out"
            >
                <div className="bg-white p-2 sm:p-3 rounded-lg shadow-xl border border-[var(--border-color)]">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-cover rounded-md" />
                </div>
                <LeafPin />
            </motion.div>
        </motion.div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {textContent}
            {imageContent}
        </div>
    );
};

export const Portfolio: React.FC = () => {
  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <PortfolioSectionTitle>Projects</PortfolioSectionTitle>
        <div className="space-y-24 md:space-y-32">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};


// --- InsightGenerator Component ---
const InsightSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-heading mb-4 text-center">
    {children}
  </h2>
);

export const InsightGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a business question.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAnswer('');
    try {
      const result = await generateBiInsights(prompt);
      setAnswer(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section 
      id="insights" 
      className="py-20 md:py-32"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <InsightSectionTitle>AI-Powered BI Insight Generator</InsightSectionTitle>
        <p className="text-center text-[var(--text-secondary)] max-w-2xl mx-auto mb-12">
          Stuck on a business problem? Enter a question below and my Gemini-powered assistant will help you frame it analytically by suggesting key metrics, visualizations, and analysis steps.
        </p>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., How can we increase customer retention?"
              className="flex-grow bg-white/70 border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg p-3 focus:ring-2 focus:ring-[var(--accent-green)] focus:outline-none transition"
              disabled={isLoading}
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="woody-button font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:bg-opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Thinking...
                </>
              ) : 'Get Insights'}
            </button>
          </div>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          {(isLoading || answer) && (
            <div className="mt-8 p-6 bg-white/50 rounded-lg border border-[var(--border-color)] min-h-[200px]">
              <h4 className="text-lg font-heading text-[var(--accent-green)] mb-4">Insights:</h4>
              {isLoading && !answer && (
                 <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                 </div>
              )}
              {answer && <div className="text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed text-sm">{answer}</div>}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};


// --- Contact Component ---
const ContactSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-heading mb-4 text-center">
    {children}
  </h2>
);

export const Contact: React.FC = () => {
  return (
    <motion.section 
      id="contact" 
      className="py-20 md:py-32"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
        <ContactSectionTitle>Get In Touch</ContactSectionTitle>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
          I'm currently seeking new opportunities and am open to discussing projects, collaborations, or roles. Please feel free to reach out—I'd love to hear from you!
        </p>
        <div className="flex justify-center items-center flex-col gap-8">
            <motion.a 
              href={`mailto:${EMAIL}`} 
              className="woody-button font-bold py-4 px-8 rounded-lg text-lg"
              whileHover={{ filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
                {EMAIL}
            </motion.a>
            <div className="flex space-x-6">
                <motion.a 
                  href={LINKEDIN_URL} 
                  target="_blank" rel="noopener noreferrer" 
                  className="text-[var(--text-secondary)] hover:text-[var(--accent-green)]" 
                  aria-label="LinkedIn"
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                </motion.a>
                <motion.a 
                  href={GITHUB_URL}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[var(--text-secondary)] hover:text-[var(--accent-green)]" 
                  aria-label="GitHub"
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                    <span className="sr-only">GitHub</span>
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                    </svg>
                </motion.a>
            </div>
        </div>
      </div>
    </motion.section>
  );
};


// --- Chatbot Component ---
interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hi! I'm Nishad's AI assistant. Ask me anything about his resume, skills, or projects." }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim() || isLoading) return;

    const userMessage: Message = { text: userInput, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const botResponse = await askNishadBot(userInput, RESUME_CONTEXT);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const BotAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-[var(--accent-green)] flex-shrink-0 flex items-center justify-center text-white">
      🌿
    </div>
  );

  return (
    <>
      <div className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="woody-button w-20 h-20 rounded-full p-4 shadow-lg hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] focus:ring-offset-2 focus:ring-offset-white flex items-center justify-center"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9.43 13.57c-.24-.13-.43-.3-.57-.5L8 11.43l-1.43.86c-.43.26-.93.03-1.15-.42s.03-.93.42-1.15L7 10l-1.14-1.71c-.22-.33-.1-.78.23-1.01s.78-.1 1.01.23L8 8.57l1.43-.86c.43-.26.93-.03 1.15.42s-.03.93-.42 1.15L9 10l1.14 1.71c.22.33.1.78-.23 1.01-.15.09-.32.14-.48.15zm5.14 0c-.16 0-.33-.05-.48-.15-.33-.23-.45-.68-.23-1.01L15 10l-1.14-1.71c-.22-.33-.1-.78.23-1.01s.78-.1 1.01.23L16 8.57l1.43-.86c.43-.26.93-.03 1.15.42s-.03.93-.42 1.15L17 10l1.14 1.71c.22.33.1.78-.23 1.01-.15.09-.32.14-.48.15z"/></svg>
        </button>
      </div>

      <div className={`fixed bottom-5 right-5 z-50 w-[calc(100%-40px)] sm:w-96 h-[70vh] max-h-[500px] bg-[var(--bg-color)]/80 backdrop-blur-md rounded-xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right border border-[var(--border-color)] ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
          <h3 className="font-bold font-heading">Ask Nishad</h3>
          <button onClick={() => setIsOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div ref={chatMessagesRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && <BotAvatar />}
              <div className={`max-w-[80%] rounded-lg px-4 py-2 shadow-sm ${msg.sender === 'user' ? 'bg-[var(--accent-green)] text-white' : 'bg-white text-[var(--text-secondary)] border border-[var(--border-color)]'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
               <BotAvatar />
               <div className="max-w-[80%] rounded-lg px-4 py-2 bg-white text-[var(--text-secondary)] border border-[var(--border-color)]">
                  <div className="flex items-center space-x-1">
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[var(--border-color)]">
          <div className="flex items-center bg-white rounded-lg border border-[var(--border-color)]">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              className="flex-grow bg-transparent text-[var(--text-primary)] placeholder-gray-400 p-3 focus:outline-none"
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading || !userInput.trim()} className="p-3 text-[var(--accent-green)] disabled:text-gray-400 disabled:cursor-not-allowed hover:opacity-80 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 12h14" /></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


// --- Footer Component ---
export const Footer: React.FC = () => {
  return (
    <footer 
        className="h-6 w-full"
        style={{
            backgroundImage: 'url(https://www.transparenttextures.com/patterns/wood-pattern.png)',
            backgroundSize: '300px',
            backgroundColor: '#6B4F4F',
            boxShadow: '0 -5px 15px rgba(0,0,0,0.2)',
        }}
    >
      <div className="sr-only">A decorative wooden footer</div>
    </footer>
  );
};
