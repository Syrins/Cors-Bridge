/**
 * PM2 process definition for CorsBridge backend.
 * Usage:
 *   npm run build
 *   npm run pm2:start
 */

const path = require('path');

const LOG_DIR = path.resolve(__dirname, 'logs');

module.exports = {
	apps: [
		{
			name: 'corsbridge-backend',
			script: path.resolve(__dirname, 'dist/index.js'),
			watch: false,
			instances: process.env.PM2_INSTANCES || 'max',
			exec_mode: 'cluster',
			env: {
				NODE_ENV: process.env.NODE_ENV || 'production',
			},
			error_file: path.join(LOG_DIR, 'error.log'),
			out_file: path.join(LOG_DIR, 'out.log'),
			log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
			merge_logs: true,
			max_memory_restart: '512M',
		},
	],
	module: {
		'pm2-logrotate': {
			max_size: '50M',
			retain: 3,
			compress: true,
			workerInterval: 60,
			rotateInterval: '0 0 * * *',
			dateFormat: 'YYYY-MM-DD',
			rotateModule: true,
		},
	},
};

