Sota's Portfolio Site
=====================

A static personal portfolio website built with React 18, Tailwind CSS, and
Babel — all loaded via CDN. No build tools or Node.js required.


Running Locally
---------------

1. Open a terminal and navigate to this folder:

   cd ~/Desktop/portfolio-site

2. Start a local server (Python 3 is required):

   python3 -m http.server 3000

3. Open http://localhost:3000 in your browser.

Note: You need a local server because the browser blocks loading JS modules
from file:// URLs. Any static server works (e.g. npx serve, Live Server in
VS Code, etc.).


Deploying
---------

GitHub Pages:
  1. Create a new GitHub repo (e.g. "portfolio" or "username.github.io")
  2. Push all files in this folder to the repo
  3. Go to Settings > Pages > set source to the main branch
  4. Your site will be live at https://username.github.io/portfolio/

Netlify:
  1. Go to https://app.netlify.com
  2. Drag and drop this entire folder onto the deploy area
  3. Done — Netlify gives you a live URL immediately


Project Structure
-----------------

portfolio-site/
  index.html            Main HTML file. Loads React, Tailwind, Babel, and
                        Google Fonts from CDNs. Contains the Tailwind config
                        and all CSS (animations, grain texture, gradients).

  app.js                The entire React app. Contains:
                        - Data arrays at the top (PROJECTS, ARTWORK) where
                          you add your content
                        - Dark mode toggle with localStorage persistence
                        - Sticky navbar, hero, projects, artwork gallery,
                          footer sections
                        - Lightbox component for viewing artwork full-screen

  assets/
    screenshots/        Drop project screenshots here, then reference them
                        in the PROJECTS array in app.js
    artwork/            Drop artwork images here, then add entries to the
                        ARTWORK array in app.js

  README.txt            This file


Adding Content
--------------

All content is managed through arrays at the top of app.js.

Add a project:
  Open app.js, find the PROJECTS array, and add an object like:
  {
    title: "My Project",
    description: "What it does.",
    tags: ["React", "Python"],
    screenshot: "assets/screenshots/my-project.png",
    github: "https://github.com/sota/my-project",
  }

Add artwork:
  Drop the image in assets/artwork/, then add to the ARTWORK array:
  { title: "Piece Title", src: "assets/artwork/piece.jpg" }
