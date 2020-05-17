module.exports = {
    apps : [{
        name: 'IOT_Project_App',
        script: './server.js',
        instances: 1,
        autorestart: true,
        error_file: 'err.log',
        time: true,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'production',
        }
    }],
};
