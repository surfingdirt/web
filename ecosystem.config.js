// pm2 start ecosystem.config.js --env beta

module.exports = {
  apps : [{
    name: 'Surfing Dirt - web server',
    script: 'index.js',
    error_file: 'log_error.log',
    out_file: 'log_out.log',
    log_file: 'log_combined.log',
    time: true,

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_beta: {
      NODE_ENV: 'beta'
    }
  }],

};
