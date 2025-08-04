module.exports = {
  apps: [
    {
      name: 'monitor-app',
      script: 'dist/src/main/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M'
    }
  ]
}
