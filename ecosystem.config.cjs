module.exports = {
  apps: [
    {
      name: 'widget-ratecoo',
      cwd: './apps/widget',
      script: 'pnpm',
      args: 'run serve',
      env: {
        NODE_ENV: 'production',
        PORT: 3003
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/widget-error.log',
      out_file: './logs/widget-out.log',
      log_file: './logs/widget-combined.log',
      time: true
    }
  ]
};