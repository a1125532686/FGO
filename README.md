
## 创建本地仓库

- 创建.gitignore文件, 并配置忽略
- git init  初始化工作区
- git add .  添加到暂存区
- git commit -m "init app"  提交版本区



## 创建远程仓库

- 指定仓库名称
- 指定为公开的



## 将本地仓库的代码推送到远程仓库

- git remote add origin https://gitee.com/zxfjd3g/code-210422.git : 记录远程仓库
- git push -u origin master: 将master分支推送到远程
- 创建dev分支并推送到远程
  - git checkout -b dev
  - git push origin dev



## 入职第一天

- clone远程仓库到本地:

  ```
  git clone 仓库clone地址
  ```

- 根据远程dev, 创建本地dev

  ```
  git checkout -b dev origin/dev
  ```

- 根据本地dev, 创建个人分支

  ```
  git checkout -b xfzhang
  ```

- 编码实现功能, 并提交(本地仓库)

  ```
  git add .
  git commit -m "update README"
  ```

- 将个人分支的修改合并到dev分支

  ```
  git checkout dev
  git merge xfhzhang
  ```

- 将dev分支推送到远程

  ```
  git push origin dev
  ```

  

## 第二天工作流程

1. 拉取dev分支远程更新 

   ```
   git pull origin dev
   ```

2. 切换到个人分支，将dev分支的更新合并到个人分支

   ```
   git checkout xfzhang
   git merge dev
   ```

3. 开发功能， 提交到本地仓库

   ```
   git add .
   git commit -m "update"
   ```

4. 合并到dev分支

   ```
   git checkout dev
   git merge xfzhang
   ```

5. 将dev分支的更新推送到远程

   ```
   git push origin dev
   ```
