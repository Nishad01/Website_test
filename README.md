# BI Analyst Portfolio

This project is a personal portfolio website for a Business Intelligence analyst, built with React, Vite, and Tailwind CSS. Its AI features are powered by a self-hosted open-source model running on Hugging Face Spaces.

## Run Locally

**Prerequisites:** Node.js v20 or later.

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use). The app is configured to connect to the live Hugging Face Space API.

## Deploy to Vercel

This project is configured for easy deployment to Vercel and includes Vercel Analytics out-of-the-box.

1.  **Push your code** to a GitHub, GitLab, or Bitbucket repository.
2.  Go to the [Vercel dashboard](https://vercel.com/new) and **import your repository**.
3.  Vercel will automatically detect that you are using Vite and configure the project settings. The build command is `vite build` and the output directory is `dist`.
4.  **No environment variables are needed.**
5.  **Deploy.** Your site will be built and deployed! Analytics data will automatically be available in your Vercel dashboard.
