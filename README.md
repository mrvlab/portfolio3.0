![initials logo](/app/apple-icon.png 'initials logo')

# Portfolio 3.5

My third portfolio website, built with next.js 15 and Sanity as my CMS.

### Prerequisites

This project uses Node.js v22.16.0. Make sure you have [nvm](https://github.com/nvm-sh/nvm) installed.

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   ```
2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env.local` and fill in the required values:
     - `NEXT_PUBLIC_SANITY_PROJECT_ID`
     - `NEXT_PUBLIC_SANITY_DATASET`
     - `NEXT_PUBLIC_SANITY_API_VERSION`
     - `NEXT_PUBLIC_SANITY_STUDIO_URL`
     - `SANITY_API_READ_TOKEN`

4. **Run the development server:**

   ```bash
   yarn dev
   # or
   npm run dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) to view the site.
   - Visit [http://localhost:3000/studio](http://localhost:3000/studio) for Sanity Studio (content management).
