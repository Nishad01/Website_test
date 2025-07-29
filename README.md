# BI Analyst Portfolio

This project is a personal portfolio website for a Business Intelligence analyst, built with React, Vite, Tailwind CSS, and powered by the Google Gemini API for its AI features.

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

3.  **Set up environment variables:**
    Create a file named `.env` in the root of the project and add your Google Gemini API key.
    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Deploy to Vercel

This project is configured for easy deployment to Vercel and includes Vercel Analytics out-of-the-box.

1.  **Push your code** to a GitHub, GitLab, or Bitbucket repository.
2.  Go to the [Vercel dashboard](https://vercel.com/new) and **import your repository**.
3.  Vercel will automatically detect that you are using Vite and configure the project settings. The build command is `vite build` and the output directory is `dist`. Vercel's framework preset for Vite automatically handles routing for single-page applications.
4.  **Set your environment variable** in the Vercel project settings:
    -   Go to **Settings > Environment Variables**.
    -   Add a new variable:
        -   **Key:** `GEMINI_API_KEY`
        -   **Value:** Your Google Gemini API key.
5.  **Deploy.** Your site will be built and deployed! Analytics data will automatically be available in your Vercel dashboard.