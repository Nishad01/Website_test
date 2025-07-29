
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import {
  Navbar,
  Hero,
  About,
  WorkExperience,
  Skills,
  Portfolio,
  InsightGenerator,
  Contact,
  Footer,
  Chatbot,
  LeafyBackground
} from './Sections';

const App: React.FC = () => {
  return (
    <div>
      <LeafyBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <WorkExperience />
          <Skills />
          <Portfolio />
          <InsightGenerator />
          <Contact />
        </main>
        <Chatbot />
        <Footer />
      </div>
      <Analytics />
    </div>
  );
};

export default App;
