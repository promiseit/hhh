#!/bin/bash
echo "=== 自闭症工作融入工具 - GitHub 自动推送脚本"
echo ""

# 设置仓库路径
REPO_PATH="/workspace/autism_tool_repo"
cd "$REPO_PATH"

echo "1. 检查当前状态"
git status
echo ""

echo "2. 检查远程仓库"
git remote -v
echo ""

echo "3. 尝试推送代码到 GitHub"
echo ""
echo "提示：如果需要使用 GitHub Personal Access Token (PAT)"
echo ""
echo "请按照以下步骤操作："
echo ""
echo "方法一：使用 GitHub Web 界面上传（最简单）"
echo "1. 访问 https://github.com/promiseit/hhh"
echo "2. 点击 'creating a new repository' 创建仓库（如果还没有）"
echo "3. 点击 'uploading an existing file'"
echo "4. 拖拽并上传 /workspace/autism_tool_repo/ 目录下的所有文件"
echo ""
echo "方法二：使用 GitHub Personal Access Token 推送"
echo "1. 访问 https://github.com/settings/tokens"
echo "2. 创建一个新的 token，勾选 repo 权限"
echo "3. 运行："
echo "   git push https://<YOUR_TOKEN>@github.com/promiseit/hhh main"
echo ""
echo "方法三：使用 gh CLI（如果已安装）"
echo "   gh auth login"
echo "   git push -u origin main"
echo ""

# 尝试检查是否有环境变量中的 token
if [ -n "$GITHUB_TOKEN" ]; then
    echo "检测到 GitHub token，尝试自动推送..."
    git push "https://${GITHUB_TOKEN}@github.com/promiseit/hhh" main
fi

echo ""
echo "文件也可以在 /workspace/autism_work_tool_clean.zip 找到干净的版本"
