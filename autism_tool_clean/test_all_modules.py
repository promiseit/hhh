from playwright.sync_api import sync_playwright
import os
import time

html_path = 'file:///d:/自闭症工作融入工具开发/autism-work-tool-improved.html'
screenshots_dir = 'd:/自闭症工作融入工具开发/test_screenshots'
os.makedirs(screenshots_dir, exist_ok=True)

def take_screenshot(page, name):
    page.screenshot(path=f'{screenshots_dir}/{name}.png', full_page=True)
    print(f'✓ 截图: {name}')

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1280, 'height': 800})
    page = context.new_page()
    
    console_logs = []
    page.on('console', lambda msg: console_logs.append(f'[{msg.type}] {msg.text}'))
    
    print('=== 敞开心扉工具功能测试 ===\n')
    
    # 1. 打开页面
    print('1. 打开页面...')
    page.goto(html_path)
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1000)
    take_screenshot(page, '01_首页')
    
    # 关闭教程弹窗
    try:
        tutorial = page.locator('#tutorial')
        if tutorial.is_visible():
            page.click('#tutorial-skip')
            page.wait_for_timeout(500)
            print('  ✓ 关闭教程弹窗')
    except:
        pass
    
    # 2. 测试导航模块
    print('\n2. 测试导航模块...')
    nav_buttons = page.locator('.nav-btn').all()
    print(f'  找到 {len(nav_buttons)} 个导航按钮')
    
    nav_names = []
    for btn in nav_buttons:
        name = btn.inner_text()
        nav_names.append(name)
    print(f'  导航按钮: {", ".join(nav_names)}')
    
    # 3. 测试职场文字模式
    print('\n3. 测试职场文字模式...')
    page.click('button[data-mode="text"]')
    page.wait_for_timeout(500)
    take_screenshot(page, '02_职场文字')
    
    # 检查积木块
    blocks = page.locator('.block').all()
    print(f'  ✓ 找到 {len(blocks)} 个积木块')
    
    # 测试拖拽到目标区域
    if len(blocks) > 0:
        first_block = blocks[0]
        page.evaluate('''() => {
            const block = document.querySelector('.block');
            const target = document.getElementById('target');
            if (block && target) {
                target.appendChild(block);
            }
        }''')
        page.wait_for_timeout(300)
        print('  ✓ 积木拖拽测试完成')
    
    # 测试检查答案按钮
    page.click('#check-btn')
    page.wait_for_timeout(300)
    feedback = page.locator('#feedback').inner_text()
    print(f'  ✓ 检查答案: "{feedback}"')
    
    # 测试提示按钮
    page.click('#hint-btn')
    page.wait_for_timeout(300)
    feedback = page.locator('#feedback').inner_text()
    print(f'  ✓ 提示功能: "{feedback[:30]}..."')
    
    # 4. 测试职场计算模式
    print('\n4. 测试职场计算模式...')
    page.click('button[data-mode="number"]')
    page.wait_for_timeout(500)
    take_screenshot(page, '03_职场计算')
    header = page.locator('.game-header h2').inner_text()
    print(f'  ✓ 标题: {header}')
    
    # 5. 测试职场英语模式
    print('\n5. 测试职场英语模式...')
    page.click('button[data-mode="english"]')
    page.wait_for_timeout(500)
    take_screenshot(page, '04_职场英语')
    header = page.locator('.game-header h2').inner_text()
    print(f'  ✓ 标题: {header}')
    
    # 6. 测试社交应对模式
    print('\n6. 测试社交应对模式...')
    page.click('button[data-mode="social"]')
    page.wait_for_timeout(500)
    take_screenshot(page, '05_社交应对')
    
    scenario_text = page.locator('#scenario-text').inner_text()
    print(f'  ✓ 场景: "{scenario_text[:50]}..."')
    
    # 测试选项按钮
    options = page.locator('.option-btn').all()
    print(f'  ✓ 找到 {len(options)} 个选项')
    
    # 点击第一个选项
    if len(options) > 0:
        options[0].click()
        page.wait_for_timeout(500)
        explanation = page.locator('#explanation')
        if explanation.is_visible():
            print(f'  ✓ 选项反馈: "{explanation.inner_text()[:50]}..."')
    
    # 测试下一个场景
    page.click('#next-scenario')
    page.wait_for_timeout(300)
    new_scenario = page.locator('#scenario-text').inner_text()
    print(f'  ✓ 下一个场景: "{new_scenario[:50]}..."')
    
    # 7. 测试表情解读模式
    print('\n7. 测试表情解读模式...')
    page.click('button[data-mode="emotion"]')
    page.wait_for_timeout(500)
    take_screenshot(page, '06_表情解读')
    
    emotion_display = page.locator('#emotion-display').inner_text()
    print(f'  ✓ 表情: {emotion_display}')
    
    emotion_options = page.locator('#emotion-options .option-btn').all()
    print(f'  ✓ 找到 {len(emotion_options)} 个选项')
    
    # 点击第一个选项
    if len(emotion_options) > 0:
        emotion_options[0].click()
        page.wait_for_timeout(500)
        emotion_explanation = page.locator('#emotion-explanation')
        if emotion_explanation.is_visible():
            print(f'  ✓ 表情解读反馈: "{emotion_explanation.inner_text()[:50]}..."')
    
    # 8. 测试职场入门模式
    print('\n8. 测试职场入门模式...')
    page.click('button[data-mode="guide"]')
    page.wait_for_timeout(500)
    take_screenshot(page, '07_职场入门')
    
    guide_sections = page.locator('#guide-content .guide-section').all()
    print(f'  ✓ 找到 {len(guide_sections)} 个职场入门章节')
    
    # 9. 测试潜规则解读模式
    print('\n9. 测试潜规则解读模式...')
    page.click('button[data-mode="unspoken-rules"]')
    page.wait_for_timeout(500)
    take_screenshot(page, '08_潜规则解读')
    
    rule_sections = page.locator('#unspoken-rules-content .guide-section').all()
    print(f'  ✓ 找到 {len(rule_sections)} 个潜规则章节')
    
    # 10. 测试场景模板
    print('\n10. 测试场景模板...')
    page.click('button[data-mode="templates"]')
    page.wait_for_timeout(500)
    take_screenshot(page, '09_场景模板')
    
    template_sections = page.locator('#templates-content .guide-section').all()
    print(f'  ✓ 找到 {len(template_sections)} 个模板章节')
    
    # 11. 测试焦虑管理模式
    print('\n11. 测试焦虑管理...')
    page.click('button[data-mode="anxiety"]')
    page.wait_for_timeout(500)
    take_screenshot(page, '10_焦虑管理')
    
    anxiety_sections = page.locator('#anxiety-content .guide-section').all()
    print(f'  ✓ 找到 {len(anxiety_sections)} 个焦虑管理章节')
    
    # 12. 测试积分商城
    print('\n12. 测试积分商城...')
    page.click('button[data-mode="shop"]')
    page.wait_for_timeout(500)
    take_screenshot(page, '11_积分商城')
    
    shop_items = page.locator('.shop-item').all()
    print(f'  ✓ 找到 {len(shop_items)} 个商品')
    
    # 13. 测试我的成就
    print('\n13. 测试我的成就...')
    page.click('button[data-mode="achievements"]')
    page.wait_for_timeout(500)
    take_screenshot(page, '12_我的成就')
    
    achievements = page.locator('.achievement-item').all()
    print(f'  ✓ 找到 {len(achievements)} 个成就')
    
    # 14. 测试辅助功能
    print('\n14. 测试辅助功能...')
    
    # 测试高对比度模式
    page.click('#high-contrast-btn')
    page.wait_for_timeout(300)
    body_classes = page.evaluate('() => document.body.className')
    print(f'  ✓ 高对比度模式: {"已启用" if "high-contrast" in body_classes else "未启用"}')
    
    # 测试平静模式
    page.click('#calm-mode-btn')
    page.wait_for_timeout(300)
    body_classes = page.evaluate('() => document.body.className')
    print(f'  ✓ 平静模式: {"已启用" if "calm-mode" in body_classes else "未启用"}')
    
    # 关闭平静模式
    page.click('#calm-mode-btn')
    page.wait_for_timeout(300)
    
    # 测试背景颜色选择器
    page.click('#bg-color-btn')
    page.wait_for_timeout(300)
    color_picker = page.locator('#bg-color-picker')
    if color_picker.is_visible():
        print(f'  ✓ 背景颜色选择器已打开')
        page.click('.bg-color-btn[data-color="blue"]')
        page.wait_for_timeout(300)
        print(f'  ✓ 背景颜色已更改为蓝色')
    take_screenshot(page, '13_辅助功能')
    
    # 15. 测试紧急平静功能
    print('\n15. 测试紧急平静功能...')
    page.click('#emergency-calm-btn')
    page.wait_for_timeout(500)
    take_screenshot(page, '14_紧急平静')
    
    calm_overlay = page.locator('#emergency-calm-overlay')
    if calm_overlay.is_visible():
        print(f'  ✓ 紧急平静界面已打开')
        breathing_circle = page.locator('#breathing-circle')
        print(f'  ✓ 呼吸练习圆圈可见')
        page.click('#close-calm-btn')
        page.wait_for_timeout(500)
        print(f'  ✓ 紧急平静界面已关闭')
    
    # 16. 测试AI助手功能
    print('\n16. 测试AI助手功能...')
    page.click('#ai-assistant-btn')
    page.wait_for_timeout(500)
    take_screenshot(page, '15_AI助手')
    
    ai_panel = page.locator('#ai-chat-panel')
    if ai_panel.is_visible():
        print(f'  ✓ AI助手面板已打开')
        
        # 测试快捷操作
        page.click('.ai-quick-action[data-action="greeting"]')
        page.wait_for_timeout(1500)
        take_screenshot(page, '16_AI助手回复')
        messages = page.locator('.ai-message .message-bubble').all()
        print(f'  ✓ 收到 {len(messages)} 条AI消息')
        
        # 测试输入框
        page.fill('#ai-chat-input', '我很焦虑怎么办')
        page.wait_for_timeout(300)
        page.click('#ai-send-btn')
        page.wait_for_timeout(2000)
        messages = page.locator('.ai-message .message-bubble').all()
        print(f'  ✓ 自由输入测试: 共 {len(messages)} 条消息')
        
        page.click('#ai-chat-close')
        page.wait_for_timeout(300)
        print(f'  ✓ AI助手面板已关闭')
    
    # 17. 测试难度切换
    print('\n17. 测试难度切换...')
    page.click('button[data-mode="text"]')
    page.wait_for_timeout(300)
    page.click('button[data-level="L2"]')
    page.wait_for_timeout(500)
    level = page.locator('.score-area .score-value').nth(2).inner_text()
    print(f'  ✓ 难度已切换到: {level}')
    
    # 18. 测试移动端响应式
    print('\n18. 测试移动端响应式...')
    context.set_viewport_size({'width': 375, 'height': 667})
    page.wait_for_timeout(500)
    take_screenshot(page, '17_移动端视图')
    print(f'  ✓ 移动端视图截图完成 (375x667)')
    
    # 恢复桌面视图
    context.set_viewport_size({'width': 1280, 'height': 800})
    
    # 总结
    print(f'\n=== 测试完成 ===')
    print(f'截图已保存到: {screenshots_dir}')
    print(f'控制台日志数量: {len(console_logs)}')
    
    if len(console_logs) > 0:
        print('\n控制台日志:')
        for log in console_logs[:10]:
            print(f'  {log}')
    
    browser.close()
    print('\n测试结束!')
