// 对话数据 - 直接从Python代码转换而来
const dialogueTree = {
    "0": {
        "text": "王源：'诶...哈喽哈喽…'",
        "options": [
            {"text": "'你好，你是？'", "target": "0.5"},
            {"text": "'拜拜。'", "target": "9"}
        ]
    },
    "0.5": {
        "text": "王源：'哈喽... 我是王源。'",
        "options": [
            {"text": "'你看起来有点累？'", "target": "1"},
            {"text": "'听说你是音乐人？'", "target": "2"},
            {"text": "'不打扰你了。'", "target": "9"}
        ]
    },
    "1": {
        "text": "王源：'忙了一天累惨了。'",
        "options": [
            {"text": "'怎么办呢？'", "target": "3"},
            {"text": "'这么忙是在做音乐？'", "target": "2"},
            {"text": "'那你先休息吧~'", "target": "9"}
        ]
    },
    "2": {
        "text": "王源：'诶...就是我觉得对于我这种i人来说，好难啊这个。'",
        "options": [
            {"text": "'创作遇到困难了？'", "target": "6"},
            {"text": "'但你在坚持做音乐。'", "target": "5"},
            {"text": "'先休息吧。'", "target": "9"}
        ]
    },
    "3": {
        "text": "王源：'多注意，注意身体，然后注意心情，每天都开心就好。'",
        "options": [
            {"text": "'你也要开心。'", "target": "4"},
            {"text": "'说得好专业。'", "target": "5"},
            {"text": "'拜拜。'", "target": "9"}
        ]
    },
    "4": {
        "text": "王源：'很开心...希望我们在音乐里面相见。'\n\n🎵 《彩虹云朵》播放 🎵",
        "options": [],
        "music": "https://music.163.com/#/song?id=1372798751"
    },
    "5": {
        "text": "王源：'谢谢谢谢...跟随内心往前走，永远不会错哦~'",
        "options": [
            {"text": "'说得对！'", "target": "7"},
            {"text": "'你就是这样做的！'", "target": "10"},
            {"text": "'先走了。'", "target": "9"}
        ]
    },
    "6": {
        "text": "王源：'不知道说什么...抱歉抱歉。'",
        "options": [
            {"text": "'不用道歉。'", "target": "7"},
            {"text": "'有灵感吗？'", "target": "8"},
            {"text": "'下次聊。'", "target": "9"}
        ]
    },
    "7": {
        "text": "王源：'谢谢谢谢。'",
        "options": [
            {"text": "'期待你的新作品'", "target": "2"},
            {"text": "'坚持做自己'", "target": "5"},
            {"text": "'先走啦'", "target": "9"}
        ]
    },
    "8": {
        "text": "王源：'有点意思...希望我们在后面，在音乐里面相见。'\n\n🎵 《疯人公园》播放 🎵",
        "options": [],
        "music": "https://music.163.com/#/song?id=1859245776"
    },
    "9": {
        "text": "王源：'那我就先撤了，拜拜。'",
        "options": []
    },
    "10": {
        "text": "王源：'谢谢谢谢...非常开心。'\n\n🎵 《Will You》播放 🎵",
        "options": [],
        "music": "https://music.163.com/#/song?id=1824045033"
    }
};

// 获取DOM元素
const dialogueText = document.getElementById('dialogue-text');
const optionsContainer = document.getElementById('options-container');
const audioPlayer = document.getElementById('audio-player');

// 显示对话节点
function showNode(nodeId) {
    const node = dialogueTree[nodeId];
    if (!node) {
        console.error(`找不到节点: ${nodeId}`);
        return;
    }

    // 更新对话文本
    dialogueText.textContent = node.text;

    // 清空选项容器
    optionsContainer.innerHTML = '';

    // 如果有音乐链接，添加音乐按钮
    if (node.music) {
        const musicBtn = document.createElement('button');
        musicBtn.className = 'option-btn music-btn';
        musicBtn.textContent = '🎵 播放音乐';
        musicBtn.onclick = () => {
            window.open(node.music, '_blank');
        };
        optionsContainer.appendChild(musicBtn);
    }

    // 添加选项按钮
    node.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option.text;
        btn.onclick = () => showNode(option.target);
        optionsContainer.appendChild(btn);
    });

    // 如果没有选项，显示结束信息
    if (node.options.length === 0 && !node.music) {
        const endMsg = document.createElement('div');
        endMsg.className = 'end-message';
        endMsg.textContent = '对话结束';
        optionsContainer.appendChild(endMsg);
    }
}

// 初始化游戏，显示第一个节点
showNode('0');