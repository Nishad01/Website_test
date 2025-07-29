
import { GoogleGenAI } from "@google/genai";

// From types.ts
export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

export interface Education {
    institution: string;
    degree: string;
    period: string;
}

export interface Certification {
    name: string;
    issuer: string;
    date: string;
}

// From constants.tsx
// --- PERSONAL DATA ---
export const NAME = "Nishad Wankhede";
export const ROLE = "Business Intelligence Analyst";
export const LOCATION = "Mumbai, India";
export const EMAIL = "nishadwankhede1@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/nishad-wankhede/";
export const GITHUB_URL = "https://github.com/nishad-w";


// --- ABOUT SECTION ---
export const ABOUT_TEXT = {
  p1: "Results-driven Business Intelligence Analyst with 3+ years' experience converting complex data into actionable insights for investment and technology firms.",
  p2: "Expert in Power BI, SQL, and Snowflake. I have a track record of raising sales-forecast accuracy, automating reporting tasks, and improving client retention. I am adept at dashboard design, predictive modelling, and reporting automation in fast-paced, compliance-driven environments.",
  p3: "I'm always eager to learn new technologies and methodologies to enhance my ability to tell compelling stories with data and drive business success."
};

// --- RESUME DATA ---
export const SKILL_CATEGORIES: SkillCategory[] = [
    { 
        category: 'Business Intelligence & Analytics', 
        skills: ['Power BI', 'Tableau', 'Advanced Excel', 'DAX', 'MDX'],
    },
    { 
        category: 'Programming & Database Management', 
        skills: ['SQL Server', 'Python', 'GitLab CI/CD', 'ETL/ELT Processes'],
    },
    { 
        category: 'CRM & Enterprise Platforms', 
        skills: ['Microsoft Dynamics', 'Salesforce'],
    },
    { 
        category: 'Cloud Technologies', 
        skills: ['Snowflake', 'Azure Data Factory'],
    },
    { 
        category: 'Operating Systems', 
        skills: ['Windows 10/11', 'UNIX (basic shell scripting)'],
    },
    { 
        category: 'Core Competencies', 
        skills: ['Predictive Modeling', 'Data Warehousing', 'Process Automation', 'Regulatory Compliance', 'Financial Analytics'],
    },
];

export const EXPERIENCES: Experience[] = [
    {
        role: 'Sales Business Intelligence Analyst',
        company: 'Russell Investments',
        period: 'Dec 2023 - Present',
        location: 'Mumbai, India',
        description: [
            'Architected Power BI dashboards for AUM tracking and cash-flow analysis, enabling executive-level strategic decision-making.',
            'Improved sales-strategy effectiveness by 15% by conducting targeted market analysis with MS SQL Server and CRM Dynamics.',
            'Designed and delivered C-suite reports and presentations, directly supporting high-value client engagements and strategic planning.',
            'Led cross-functional collaboration with regional sales teams to implement data-driven monitoring, achieving a 10% rise in client retention.',
            'Spearheaded automation initiatives using agentic frameworks, significantly boosting operational efficiency and reducing manual tasks.',
            'Established comprehensive data-lineage documentation and automated audit trails, ensuring full regulatory compliance.'
        ]
    },
    {
        role: 'Business Intelligence Analyst',
        company: 'Morningstar India (PitchBook)',
        period: 'May 2022 - Nov 2023',
        location: 'Mumbai, India',
        description: [
            'Developed predictive models and optimized SQL algorithms, increasing sales-forecasting accuracy by 50% on the PitchBook platform.',
            'Engineered automated reporting infrastructure with GitLab CI/CD, cutting processing time by 30% and eliminating manual errors.',
            'Created interactive Power BI solutions serving 15+ business units and 2,000+ employees, streamlining executive and operational reporting.',
            'Deployed 15+ intelligent AutoAlert systems, saving 10 hours/week in operational efficiency via proactive monitoring and notifications.',
            'Conducted UX surveys and data-quality audits to maintain 99% data accuracy and drive continuous product enhancements.'
        ]
    },
    {
        role: 'Power BI Developer (Intern)',
        company: 'iNeuron',
        period: 'Nov 2022 - Dec 2022',
        location: 'Remote',
        description: [
            'Built Power BI dashboards to monitor 10+ critical KPIs, ensuring alignment with organizational performance goals.',
            'Executed complex data-transformation scripts using advanced cleaning and modeling, improving data usability by 20%.',
            'Delivered actionable BI visualizations to provide leadership with comprehensive performance-trend analysis.'
        ]
    }
];

// --- PROJECTS ---
export const PROJECTS: Project[] = [
  {
    title: 'Executive Sales Dashboard',
    description: 'A comprehensive Power BI dashboard providing C-level executives with a real-time overview of sales performance, market penetration, and product profitability.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop&q=80',
    tags: ['Power BI', 'SQL', 'Data Modeling', 'DAX'],
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'Customer Segmentation Analysis',
    description: 'Utilized Python (Pandas, Scikit-learn) to perform RFM analysis and K-Means clustering on customer data, identifying key segments for targeted marketing campaigns.',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=500&h=500&fit=crop&q=80',
    tags: ['Python', 'Machine Learning', 'Data Analysis'],
    githubUrl: '#',
  },
  {
    title: 'Inventory Report Automation',
    description: 'Developed an automated reporting system using SQL and Python to track inventory levels, forecast demand, and identify slow-moving products.',
    imageUrl: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
    tags: ['SQL', 'Python', 'Automation', 'ETL'],
    githubUrl: '#',
  },
  {
    title: 'HR Attrition Analytics',
    description: 'Created an interactive Tableau dashboard to analyze employee attrition rates, identifying key factors contributing to turnover and informing retention strategies.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop&q=80',
    tags: ['Tableau', 'Data Visualization', 'HR Analytics'],
    demoUrl: '#',
  },
];


// --- CHATBOT CONTEXT ---
export const RESUME_CONTEXT = `
You are an AI assistant for Nishad Wankhede. Your goal is to answer questions about him based on his resume information provided below. Be friendly, concise, and professional.

**NISHAD WANKHEDE'S RESUME:**

**Contact:**
- Location: Mumbai, India
- Phone: +91-9511718901
- Email: nishadwankhede1@gmail.com
- Other: LinkedIn, Open For Relocation

**PROFESSIONAL PROFILE:**
Results-driven Business Intelligence Analyst with 3+ years' experience converting complex data into actionable insights for investment and technology firms. Expert in Power BI, SQL, and Snowflake; raised sales-forecast accuracy by 50%, automated 50+ reporting tasks, and improved client retention by 10%. Adept at dashboard design, predictive modelling, and reporting automation in fast-paced, compliance-driven environments.

**WORK EXPERIENCE:**
1.  **Sales Business Intelligence Analyst | Russell Investments** (Mumbai, India | Dec 2023 - Present)
    - Architected Power BI dashboards for AUM tracking and cash-flow analysis, enabling executive-level strategic decision-making.
    - Improved sales-strategy effectiveness by 15% by conducting targeted market analysis with MS SQL Server and CRM Dynamics.
    - Designed and delivered C-suite reports and presentations, directly supporting high-value client engagements and strategic planning.
    - Led cross-functional collaboration with regional sales teams to implement data-driven monitoring, achieving a 10% rise in client retention.
    - Spearheaded automation initiatives using agentic frameworks, significantly boosting operational efficiency and reducing manual tasks.
    - Established comprehensive data-lineage documentation and automated audit trails, ensuring full regulatory compliance.

2.  **Business Intelligence Analyst | Morningstar India (PitchBook)** (Mumbai, India | May 2022 - Nov 2023)
    - Developed predictive models and optimized SQL algorithms, increasing sales-forecasting accuracy by 50% on the PitchBook platform.
    - Engineered automated reporting infrastructure with GitLab CI/CD, cutting processing time by 30% and eliminating manual errors.
    - Created interactive Power BI solutions serving 15+ business units and 2,000+ employees, streamlining executive and operational reporting.
    - Deployed 15+ intelligent AutoAlert systems, saving 10 hours/week in operational efficiency via proactive monitoring and notifications.
    - Conducted UX surveys and data-quality audits to maintain 99% data accuracy and drive continuous product enhancements.

3.  **Power BI Developer (Intern) | iNeuron** (Remote | Nov 2022 - Dec 2022)
    - Built Power BI dashboards to monitor 10+ critical KPIs, ensuring alignment with organizational performance goals.
    - Executed complex data-transformation scripts using advanced cleaning and modeling, improving data usability by 20%.
    - Delivered actionable BI visualizations to provide leadership with comprehensive performance-trend analysis.

**SKILLS:**
- **Business Intelligence & Analytics:** Power BI, Tableau, Advanced Excel, DAX, MDX
- **Programming & Database Management:** SQL Server, Python, GitLab CI/CD, ETL/ELT Processes
- **CRM & Enterprise Platforms:** Microsoft Dynamics, Salesforce
- **Cloud Technologies:** Snowflake, Azure Data Factory
- **Operating Systems:** Windows 10/11, UNIX (basic shell scripting)
- **Core Competencies:** Predictive Modeling, Data Warehousing, Process Automation, Regulatory Compliance, Financial Analytics

**PROFESSIONAL CERTIFICATIONS:**
- **HackerRank SQL Advanced Certificate (5-Star SQL Coder Award)** (May 2023)
- **Certified Business Data Analytics Professional (CBDAP)** (No. 884/163/4185) (2023)

**EDUCATION:**
- **Bachelor of Engineering in Civil Engineering** (2017 - 2021)
- K. K. Wagh Institute of Engineering Education & Research, Nashik
`;


// --- MOCK IMPLEMENTATION FOR TESTING ---
// The following code simulates the AI responses to avoid needing an API key.

// const API_KEY = process.env.API_KEY;

// if (!API_KEY) {
//     throw new Error("API_KEY environment variable not set.");
// }

// const ai = new GoogleGenAI({ apiKey: API_KEY });

export const askNishadBot = async (query: string, context: string): Promise<string> => {
    console.log("Mock askNishadBot called with query:", query);
    // Simulate network delay
    await new Promise(res => setTimeout(res, 500)); 
    
    const mockResponse = "This is a mock response for testing. Nishad is skilled in Power BI, SQL, and Python. He has over 3 years of experience as a Business Intelligence Analyst. He is currently working at Russell Investments.";
    return mockResponse;
};


const BI_INSIGHT_CONTEXT = `You are a senior Business Intelligence Analyst. Your goal is to help users frame business problems analytically.
When given a business question, you should provide a structured response using markdown. Your response should include:
1.  **Problem Reframing:** A clear, analyzable problem statement.
2.  **Key Metrics/KPIs:** A bulleted list of 3-4 crucial metrics.
3.  **Recommended Visualizations:** A bulleted list of 2-3 effective chart types.
4.  **Analysis Steps:** A brief, high-level outline of the steps or data required.
Keep your response concise, professional, and well-formatted.`;

export const generateBiInsights = async (prompt: string): Promise<string> => {
    console.log("Mock generateBiInsights called with prompt:", prompt);
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));

    const mockResponse = `
**Problem Reframing:**
How can we identify and reduce the key drivers of customer churn to improve overall retention rates?

**Key Metrics/KPIs:**
*   Monthly Churn Rate (%)
*   Customer Lifetime Value (CLV)
*   Customer Satisfaction Score (CSAT) by segment

**Recommended Visualizations:**
*   A line chart showing churn rate over time.
*   A bar chart comparing CLV for retained vs. churned customers.
*   A treemap visualizing reasons for churn cited in exit surveys.

**Analysis Steps:**
1.  Consolidate customer data from CRM and subscription platforms.
2.  Develop a cohort analysis to track retention over time.
3.  Build a classification model to predict at-risk customers.
    `;
    return mockResponse;
};
