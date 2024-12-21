# 第一阶段：使用 node:22-alpine 作为基础构建镜像
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./

## 使用 --mount=type=cache 来缓存 npm 的依赖库
RUN --mount=type=cache,target=/root/.npm \
    npm install --registry=https://mirrors.tuna.tsinghua.edu.cn/npm/

# 第二阶段：复制应用代码并构建
COPY . .
RUN npm run build

# 最终阶段：创建运行时镜像并使用 Nginx 作为代理
FROM nginx:1.27.0-alpine

RUN rm /etc/nginx/conf.d/default.conf

ADD ./nginx/default.conf /etc/nginx/conf.d/

# 复制构建阶段生成的文件
COPY --from=builder /app/dist/ /usr/share/nginx/html/