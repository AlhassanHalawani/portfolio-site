# Use Nginx (listening on 8080 per your conf)
FROM nginx:1.27-alpine

# Nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# --- Site content ---
# Copy all root HTML pages
COPY ./*.html /usr/share/nginx/html/

# Copy the projects subpages and shared assets
COPY projects/ /usr/share/nginx/html/projects/
COPY assets/ /usr/share/nginx/html/assets/
COPY pages/ /usr/share/nginx/html/pages/
COPY blogs/ /usr/share/nginx/html/blogs/
COPY public/ /usr/share/nginx/html/public/
COPY sw.js /usr/share/nginx/html/sw.js

# Misc
COPY robots.txt /usr/share/nginx/html/robots.txt

# Perms for non-root user
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx \
  && chown -R nginx:nginx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html

USER nginx

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
