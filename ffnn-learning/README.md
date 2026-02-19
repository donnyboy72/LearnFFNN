# Interactive Feedforward Neural Network Guide

An educational website built from scratch using only HTML, CSS, and Vanilla JavaScript to teach the mathematical and implementation details of Feedforward Neural Networks (FFNN).

## Features

- **Zero Dependencies:** No frameworks, no libraries, no CDNs.
- **Interactive Math:** Visualizations for matrix multiplication, activation functions, and gradient descent.
- **Step-by-Step Derivations:** Full mathematical breakdown of Backpropagation.
- **Java Implementation:** Complete guide to building a NN in Java from scratch.
- **PWA Ready:** Installable as a standalone app on Desktop and Mobile with offline support.

## Project Structure

```
ffnn-learning/
│
├── index.html            # 1. Overview & Interactive Network
├── math.html             # 2. Math Foundations (Graphs)
├── forward-pass.html     # 3. Forward Pass Calculator
├── backprop.html         # 4. Backpropagation & Gradient Descent
├── java-implementation.html # 5. Java Code & XOR Demo
├── style.css             # Dark theme styles
├── main.js               # Navigation & PWA Logic
├── service-worker.js     # Offline Caching
├── manifest.json         # PWA Config
└── modules/              # Core Logic
      ├── matrix.js       # Matrix Math Library
      ├── visualizer.js   # Canvas Visualization
      └── interactive.js  # UI Helpers
```

## How to Run Locally

1.  **Clone or Download** this repository.
2.  Navigate to the `ffnn-learning` folder.
3.  **Open `index.html`** directly in your web browser.
    *   *Note:* Some features (like Service Workers for PWA) require the files to be served over HTTP/HTTPS, not `file://`.
    *   To test PWA features locally, use a simple server like Python's `http.server`:
        ```bash
        cd ffnn-learning
        python -m http.server
        ```
        Then visit `http://localhost:8000`.

## Deployment to GitHub Pages

1.  Create a new repository on GitHub (e.g., `ffnn-guide`).
2.  Push this project to the repository.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/ffnn-guide.git
    git push -u origin main
    ```
3.  Go to **Settings** > **Pages** in your GitHub repository.
4.  Under **Source**, select `main` branch and `/ffnn-learning` folder (if you uploaded the root) or `/` (if you uploaded the contents of `ffnn-learning` to the root).
5.  Click **Save**.
6.  Your site will be live at `https://YOUR_USERNAME.github.io/ffnn-guide/`.

## Installing as an App (PWA)

1.  Open the deployed website (or localhost server).
2.  You should see an **"Install App"** prompt appear at the bottom right.
3.  Click "Install".
4.  The app will now run offline and appear in your app drawer/desktop.

## Contributing

Feel free to open issues or submit PRs to improve the visualizations or add more advanced topics like Optimizers (Adam, RMSProp) or Regularization.
