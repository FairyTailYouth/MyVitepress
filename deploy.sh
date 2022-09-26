#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
npm run docs:build

rm -rf D:\MyVitpress2\dist\*
# 将build生成的dist目录拷贝至上一层目录中
cp -rf ./docs/.vitepress/dist  D:\MyVitpress2\dist\

# 进入待发布的目录
cd D:\MyVitpress2\dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
git push -f https://github.com/fairytailyouth/fairytailyouth.github.io.git master

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

