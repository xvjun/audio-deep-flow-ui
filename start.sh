#!/usr/bin/env bash

proxy=$proxy
sed -i "s!proxyUrl!${proxy}!g" /etc/nginx/conf.d/default.conf
/bin/bash -c nginx -g 'daemon off;'

tail -f /var/log/nginx/access.log