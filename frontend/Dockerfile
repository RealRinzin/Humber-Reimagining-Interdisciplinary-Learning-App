# # ---------- Stage 1: dependencies ----------
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# # ---------- Stage 2: build ----------
# FROM node:24-alpine AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# RUN npm run build
# # ---------- Stage 3: production ----------
# FROM node:24-alpine AS production
# WORKDIR /app
# ENV NODE_ENV=production
# ENV PORT=3000

# RUN addgroup -g 1001 -S nodejs && adduser -S nextuser -u 1001

# # Next's standalone output includes a minimal server.js and pruned node_modules
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextuser:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextuser:nodejs /app/.next/static ./.next/static

# USER nextuser

# EXPOSE 3000

# HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
#     CMD node -e "require('http').get('http://localhost:3000', res => process.exit(res.statusCode < 500 ? 0 : 1)).on('error', () => process.exit(1))"

# CMD ["node", "server.js"]