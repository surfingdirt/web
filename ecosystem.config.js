// pm2 start ecosystem.config.js --env beta

const commonConfig = {
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
};

module.exports = {
  apps: [
    Object.assign({}, commonConfig, {
      name: 'SurfingDirtWebBeta',
      env: {
        NODE_ENV: 'beta',
      },
    }),
    Object.assign({}, commonConfig, {
      name: 'SurfingDirtWebProduction',
      env: {
        NODE_ENV: 'production',
      },
    }),
  ],
};
