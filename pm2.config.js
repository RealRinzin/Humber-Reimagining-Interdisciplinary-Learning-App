module.exports = {
  apps: [
    // 1. FIRST NEXT.JS APP (Development Mode)
    {
      name: "frontend",
      cwd: "./frontend",
      script: "npm",
      args: "run dev -- -p 3000", // Notice "run dev" and the port syntax
      // Production
      // args: "run start -- -p 3000", // Notice "run dev" and the port syntax
      watch: true,
      ignore_watch: [
        "node_modules",
        ".next"
      ],
      env: {
        // NODE_ENV: "production"
        NODE_ENV: "development"
      }
    },

    // 2. SECOND NEXT.JS APP (Development Mode)
    {
      name: "admin-portal",
      cwd: "./admin-portal",
      script: "npm",
      args: "run dev -- -p 3001", // Notice "run dev" and the port syntax
      watch: true,
      ignore_watch: [
        "node_modules",
        ".next"
      ],
      env: {
        NODE_ENV: "development"
      }
    },

    // 3. LARAVEL APPLICATION (Stays the same)
    {
      name: "backend",
      cwd: "./backend",
      script: "artisan",
      interpreter: "php",
      args: "serve --port=8000",
      exec_mode: "fork",
      instances: 1
    }
  ]
};