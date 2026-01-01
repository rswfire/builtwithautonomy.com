# @rswfire/builtwithautonomy.com

[![Next.js](https://img.shields.io/badge/Next.js-16.0-blue)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-orange)](https://www.typescriptlang.org)
[![Documentation](https://img.shields.io/badge/Status-Active-green)](https://oprdvolunteerabuse.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Developer](https://img.shields.io/badge/Creator-@rswfire-red)](https://rswfire.com/handshake)

## Autonomy Setup

### Service Setup

`sudo nano /etc/systemd/system/builtwithautonomy.service`

```ini
[Unit]
Description=Next.js App - builtwithautonomy.com
After=network.target

[Service]
Type=simple
User=rswfire
WorkingDirectory=/home/rswfire/www/builtwithautonomy.com
ExecStart=/usr/bin/npm run start
Restart=always
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

### Enable & Start

```bash
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable builtwithautonomy
sudo systemctl start builtwithautonomy
```

### Nginx Configuration

```nginx
server {
    listen 443 ssl;
    server_name builtwithautonomy.com;

    ssl_certificate /path/to/.pem;
    ssl_certificate_key /path/to/.pem;
    include /path/to/.conf;
    ssl_dhparam /path/to/.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass $http_upgrade;
    }

    add_header Permissions-Policy "interest-cohort=()" always;
}
```
