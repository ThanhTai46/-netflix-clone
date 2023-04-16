# Install dependencies only when needed
FROM node:lts-buster-slim AS base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

COPY package.json yarn.lock ./


FROM base as build
RUN export NODE_ENV=production
RUN yarn

COPY . .

# Prisma
RUN yarn run prisma generate
RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

FROM base as prod-build

RUN yarn install --production
COPY prisma prisma
RUN yarn run prisma generate
RUN cp -R node_modules prod_node_modules

FROM base as prod

COPY --from=prod-build /app/prod_node_modules /app/node_modules
COPY --from=build  /app/.next /app/.next
COPY --from=build  /app/public /app/public
COPY --from=build  /app/prisma /app/prisma

EXPOSE 3000

EXPOSE 3000

CMD ["yarn", "start"]