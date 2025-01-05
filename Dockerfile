FROM node:20-buster AS build
WORKDIR /app
COPY package.json ./
RUN npm install && npx prisma generate
COPY . ./
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM node:20-buster-slim AS production
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/prisma ./prisma
ENV NEXT_TELEMETRY_DISABLED 1
EXPOSE 3000
ENTRYPOINT ["sh","./boot.sh"]