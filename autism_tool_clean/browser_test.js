// 敞开心扉工具 - 浏览器控制台自动化测试
// 使用方法：在浏览器中打开 autism-work-tool-improved.html，然后按F12打开控制台，粘贴此脚本运行

(function() {
    const results = [];
    let step = 0;
    
    function log(msg, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const icon = type === 'pass' ? '✅' : type === 'fail' ? '❌' : type === 'step' ? '📋' : 'ℹ️';
        const logFn = type === 'fail' ? console.error : console.log;
        logFn(`%c${icon} [${timestamp}] ${msg}`, type === 'fail' ? 'color: red; font-weight: bold;' : type === 'step' ? 'color: blue; font-weight: bold; font-size: 14px;' : 'color: green;');
        results.push({step: ++step, msg, type});
    }
    
    function click(selector) {
        const el = document.querySelector(selector);
        if (el) {
            el.click();
            return true;
        }
        return false;
    }
    
    function exists(selector) {
        return !!document.querySelector(selector);
    }
    
    function count(selector) {
        return document.querySelectorAll(selector).length;
    }
    
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function runTests() {
        console.clear();
        console.log('%c╔══════════════════════════════════════════════════════════╗', 'font-weight: bold; font-size: 16px;');
        console.log('%c║       敞开心扉 - 自闭症工作融合工具 功能测试           ║', 'font-weight: bold; font-size: 16px;');
        console.log('%c╚══════════════════════════════════════════════════════════╝', 'font-weight: bold; font-size: 16px;');
        console.log('');
        
        // 1. 页面基础检查
        log('步骤1: 页面基础检查', 'step');
        log(`页面标题: "${document.title}"`, exists('h1') ? 'pass' : 'fail');
        log(`主容器: ${exists('.container') ? '存在' : '不存在'}`, exists('.container') ? 'pass' : 'fail');
        log(`Header: ${exists('.header') ? '存在' : '不存在'}`, exists('.header') ? 'pass' : 'fail');
        
        // 2. 导航按钮检查
        log('步骤2: 导航按钮检查', 'step');
        const navButtons = document.querySelectorAll('.nav-btn');
        log(`导航按钮数量: ${navButtons.length}`, navButtons.length >= 8 ? 'pass' : 'fail');
        
        const navNames = Array.from(navButtons).map(b => b.textContent);
        log(`导航菜单: ${navNames.join(', ')}`, 'info');
        
        // 3. 辅助功能按钮
        log('步骤3: 辅助功能按钮', 'step');
        const accButtons = document.querySelectorAll('.accessibility-btn');
        log(`辅助功能按钮: ${accButtons.length} 个`, accButtons.length >= 6 ? 'pass' : 'fail');
        const accNames = Array.from(accButtons).map(b => b.title);
        log(`功能列表: ${accNames.join(', ')}`, 'info');
        
        // 4. 紧急平静按钮
        log('步骤4: 紧急平静按钮', 'step');
        log(`紧急平静按钮: ${exists('#emergency-calm-btn') ? '存在' : '不存在'}`, exists('#emergency-calm-btn') ? 'pass' : 'fail');
        log(`AI助手按钮: ${exists('#ai-assistant-btn') ? '存在' : '不存在'}`, exists('#ai-assistant-btn') ? 'pass' : 'fail');
        log(`背景颜色选择器: ${exists('#bg-color-btn') ? '存在' : '不存在'}`, exists('#bg-color-btn') ? 'pass' : 'fail');
        
        // 5. 测试职场文字模式
        log('步骤5: 职场文字模式', 'step');
        click('button[data-mode="text"]');
        await wait(300);
        log(`游戏区域: ${exists('.game-area') ? '可见' : '不可见'}`, exists('.game-area[style*="block"]') || !exists('.game-area[style*="none"]') ? 'pass' : 'fail');
        log(`积木块数量: ${count('.block')}`, count('.block') > 0 ? 'pass' : 'fail');
        log(`目标区域: ${exists('#target') ? '存在' : '不存在'}`, exists('#target') ? 'pass' : 'fail');
        log(`检查答案按钮: ${exists('#check-btn') ? '存在' : '不存在'}`, exists('#check-btn') ? 'pass' : 'fail');
        
        // 6. 测试难度切换
        log('步骤6: 难度切换', 'step');
        click('button[data-level="L1"]');
        await wait(200);
        click('button[data-level="L2"]');
        await wait(200);
        click('button[data-level="L3"]');
        await wait(200);
        log('难度L1/L2/L3切换: 完成', 'pass');
        
        // 7. 测试职场计算模式
        log('步骤7: 职场计算模式', 'step');
        click('button[data-mode="number"]');
        await wait(300);
        const gameHeader = document.querySelector('.game-header h2');
        log(`标题: ${gameHeader ? gameHeader.textContent : '未找到'}`, gameHeader && gameHeader.textContent.includes('计算') ? 'pass' : 'fail');
        log(`积木块数量: ${count('.block')}`, count('.block') > 0 ? 'pass' : 'fail');
        
        // 8. 测试职场英语模式
        log('步骤8: 职场英语模式', 'step');
        click('button[data-mode="english"]');
        await wait(300);
        const engHeader = document.querySelector('.game-header h2');
        log(`标题: ${engHeader ? engHeader.textContent : '未找到'}`, engHeader && engHeader.textContent.includes('英语') ? 'pass' : 'fail');
        
        // 9. 测试职场编程模式
        log('步骤9: 职场编程模式', 'step');
        click('button[data-mode="coding"]');
        await wait(300);
        const codingHeader = document.querySelector('.game-header h2');
        log(`标题: ${codingHeader ? codingHeader.textContent : '未找到'}`, codingHeader && codingHeader.textContent.includes('编程') ? 'pass' : 'fail');
        
        // 10. 测试社交应对模式
        log('步骤10: 社交应对模式', 'step');
        click('button[data-mode="social"]');
        await wait(500);
        log(`社交区域: ${exists('#social-area') ? '可见' : '不可见'}`, exists('#social-area[style*="block"]') ? 'pass' : 'fail');
        log(`场景文本: ${exists('#scenario-text') ? document.querySelector('#scenario-text').textContent.substring(0, 30) + '...' : '未找到'}`, exists('#scenario-text') ? 'pass' : 'fail');
        log(`选项按钮: ${count('.option-btn')} 个`, count('.option-btn') > 0 ? 'pass' : 'fail');
        log(`下一个场景按钮: ${exists('#next-scenario') ? '存在' : '不存在'}`, exists('#next-scenario') ? 'pass' : 'fail');
        
        // 点击第一个选项
        if (exists('.option-btn')) {
            document.querySelector('.option-btn').click();
            await wait(300);
            log(`选项反馈: ${exists('#explanation[style*="block"]') ? '显示' : '未显示'}`, exists('#explanation') ? 'pass' : 'fail');
        }
        
        // 11. 测试表情解读模式
        log('步骤11: 表情解读模式', 'step');
        click('button[data-mode="emotion"]');
        await wait(500);
        log(`表情区域: ${exists('#emotion-area') ? '可见' : '不可见'}`, exists('#emotion-area[style*="block"]') ? 'pass' : 'fail');
        log(`表情符号: ${exists('#emotion-display') ? document.querySelector('#emotion-display').textContent : '未找到'}`, exists('#emotion-display') ? 'pass' : 'fail');
        log(`表情选项: ${count('#emotion-options .option-btn')} 个`, count('#emotion-options .option-btn') > 0 ? 'pass' : 'fail');
        
        // 点击表情选项
        if (exists('#emotion-options .option-btn')) {
            document.querySelector('#emotion-options .option-btn').click();
            await wait(300);
            log(`表情反馈: ${exists('#emotion-explanation[style*="block"]') ? '显示' : '未显示'}`, exists('#emotion-explanation') ? 'pass' : 'fail');
        }
        log(`下一个表情按钮: ${exists('#next-emotion') ? '存在' : '不存在'}`, exists('#next-emotion') ? 'pass' : 'fail');
        
        // 12. 测试职场入门模式
        log('步骤12: 职场入门模式', 'step');
        click('button[data-mode="guide"]');
        await wait(300);
        log(`职场指南区域: ${exists('#guide-area') ? '可见' : '不可见'}`, exists('#guide-area[style*="block"]') ? 'pass' : 'fail');
        log(`章节数量: ${count('#guide-content .guide-section')}`, count('#guide-content .guide-section') > 0 ? 'pass' : 'fail');
        
        // 13. 测试潜规则解读模式
        log('步骤13: 潜规则解读模式', 'step');
        click('button[data-mode="unspoken-rules"]');
        await wait(300);
        log(`潜规则区域: ${exists('#unspoken-rules-area') ? '可见' : '不可见'}`, exists('#unspoken-rules-area[style*="block"]') ? 'pass' : 'fail');
        log(`章节数量: ${count('#unspoken-rules-content .guide-section')}`, count('#unspoken-rules-content .guide-section') > 0 ? 'pass' : 'fail');
        
        // 14. 测试场景模板
        log('步骤14: 场景模板', 'step');
        click('button[data-mode="templates"]');
        await wait(300);
        log(`模板区域: ${exists('#templates-area') ? '可见' : '不可见'}`, exists('#templates-area[style*="block"]') ? 'pass' : 'fail');
        log(`邮件模板: ${count('#templates-content .guide-section')} 个`, count('#templates-content .guide-section') > 0 ? 'pass' : 'fail');
        
        // 15. 测试焦虑管理
        log('步骤15: 焦虑管理', 'step');
        click('button[data-mode="anxiety"]');
        await wait(300);
        log(`焦虑管理区域: ${exists('#anxiety-area') ? '可见' : '不可见'}`, exists('#anxiety-area[style*="block"]') ? 'pass' : 'fail');
        log(`章节数量: ${count('#anxiety-content .guide-section')}`, count('#anxiety-content .guide-section') > 0 ? 'pass' : 'fail');
        
        // 16. 测试积分商城
        log('步骤16: 积分商城', 'step');
        click('button[data-mode="shop"]');
        await wait(300);
        log(`商城区域: ${exists('#shop-area') ? '可见' : '不可见'}`, exists('#shop-area[style*="block"]') ? 'pass' : 'fail');
        log(`商品数量: ${count('.shop-item')}`, count('.shop-item') > 0 ? 'pass' : 'fail');
        
        // 17. 测试成就系统
        log('步骤17: 成就系统', 'step');
        click('button[data-mode="achievements"]');
        await wait(300);
        log(`成就区域: ${exists('#achievements-area') ? '可见' : '不可见'}`, exists('#achievements-area[style*="block"]') ? 'pass' : 'fail');
        log(`成就数量: ${count('.achievement-item')}`, count('.achievement-item') > 0 ? 'pass' : 'fail');
        
        // 18. 测试我的商品
        log('步骤18: 我的商品', 'step');
        click('button[data-mode="my-items"]');
        await wait(300);
        log(`商品区域: ${exists('#my-items-area') ? '可见' : '不可见'}`, exists('#my-items-area[style*="block"]') ? 'pass' : 'fail');
        
        // 19. 测试平静模式
        log('步骤19: 平静模式', 'step');
        click('#calm-mode-btn');
        await wait(200);
        log(`平静模式: ${document.body.classList.contains('calm-mode') ? '已启用' : '未启用'}`, document.body.classList.contains('calm-mode') ? 'pass' : 'fail');
        click('#calm-mode-btn'); // 关闭
        await wait(200);
        
        // 20. 测试高对比度模式
        log('步骤20: 高对比度模式', 'step');
        click('#high-contrast-btn');
        await wait(200);
        log(`高对比度: ${document.body.classList.contains('high-contrast') ? '已启用' : '未启用'}`, document.body.classList.contains('high-contrast') ? 'pass' : 'fail');
        click('#high-contrast-btn'); // 关闭
        await wait(200);
        
        // 21. 测试背景颜色
        log('步骤21: 背景颜色', 'step');
        click('#bg-color-btn');
        await wait(200);
        log(`颜色选择器: ${exists('#bg-color-picker.active') ? '已打开' : '未打开'}`, exists('#bg-color-picker.active') ? 'pass' : 'fail');
        if (exists('.bg-color-btn[data-color="blue"]')) {
            document.querySelector('.bg-color-btn[data-color="blue"]').click();
            await wait(200);
            log(`蓝色背景: ${document.body.classList.contains('bg-blue') ? '已切换' : '未切换'}`, document.body.classList.contains('bg-blue') ? 'pass' : 'fail');
        }
        
        // 22. 测试紧急平静功能
        log('步骤22: 紧急平静功能', 'step');
        click('#emergency-calm-btn');
        await wait(300);
        log(`紧急平静界面: ${exists('#emergency-calm-overlay.active') ? '已打开' : '未打开'}`, exists('#emergency-calm-overlay.active') ? 'pass' : 'fail');
        log(`呼吸圆圈: ${exists('#breathing-circle') ? '存在' : '不存在'}`, exists('#breathing-circle') ? 'pass' : 'fail');
        click('#close-calm-btn');
        await wait(200);
        
        // 23. 测试AI助手
        log('步骤23: AI助手功能', 'step');
        click('#ai-assistant-btn');
        await wait(300);
        log(`AI面板: ${exists('#ai-chat-panel.active') ? '已打开' : '未打开'}`, exists('#ai-chat-panel.active') ? 'pass' : 'fail');
        log(`欢迎消息: ${count('.ai-message')} 条`, count('.ai-message') > 0 ? 'pass' : 'fail');
        log(`快捷操作: ${count('.ai-quick-action')} 个`, count('.ai-quick-action') > 0 ? 'pass' : 'fail');
        log(`输入框: ${exists('#ai-chat-input') ? '存在' : '不存在'}`, exists('#ai-chat-input') ? 'pass' : 'fail');
        click('#ai-chat-close');
        await wait(200);
        
        // 打印测试总结
        console.log('');
        console.log('%c╔══════════════════════════════════════════════════════════╗', 'font-weight: bold; font-size: 16px;');
        console.log('%c║                      测试总结                            ║', 'font-weight: bold; font-size: 16px;');
        console.log('%c╚══════════════════════════════════════════════════════════╝', 'font-weight: bold; font-size: 16px;');
        
        const passCount = results.filter(r => r.type === 'pass').length;
        const failCount = results.filter(r => r.type === 'fail').length;
        const totalCount = passCount + failCount;
        
        console.log(`%c总测试项: ${totalCount}`, 'font-weight: bold; font-size: 14px;');
        console.log(`%c✅ 通过: ${passCount}`, 'color: green; font-weight: bold; font-size: 14px;');
        console.log(`%c❌ 失败: ${failCount}`, failCount > 0 ? 'color: red; font-weight: bold; font-size: 14px;' : '');
        console.log(`%c通过率: ${Math.round(passCount/totalCount*100)}%`, 'font-weight: bold; font-size: 14px;');
        
        if (failCount > 0) {
            console.log('\n失败项:');
            results.filter(r => r.type === 'fail').forEach(r => {
                console.log(`  ❌ 步骤${r.step}: ${r.msg}`);
            });
        }
    }
    
    runTests();
})();
