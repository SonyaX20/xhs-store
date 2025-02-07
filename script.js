const resources = [
    {
        id: 1,
        name: "2025年2月10日",
        password: "123456",
        type: "url",
        source: "https://firebasestorage.googleapis.com/v0/b/xhs-store.firebasestorage.app/o/files%2FNY20250210.pdf?alt=media&token=9888f384-60d7-472d-a349-01a5a0ecd87d",
        previewUrl: null
    },
    {
        id: 2,
        name: "示例文档2",
        password: "abcdef",
        type: "git",
        source: "path/to/git/file.pdf",
        previewUrl: "path/to/git/file.pdf"
    }
];

let selectedResource = null;

function initializeApp() {
    renderResourceList();
    setupEventListeners();
}

function renderResourceList() {
    const container = document.getElementById('resourceItems');
    container.innerHTML = resources.map(resource => `
        <div class="resource-item" data-id="${resource.id}">
            ${resource.name}
        </div>
    `).join('');
}

function setupEventListeners() {
    document.getElementById('resourceItems').addEventListener('click', handleResourceClick);
    document.getElementById('downloadBtn').addEventListener('click', handleDownload);
}

function handleResourceClick(e) {
    const resourceItem = e.target.closest('.resource-item');
    if (!resourceItem) return;

    const resourceId = parseInt(resourceItem.dataset.id);
    selectedResource = resources.find(r => r.id === resourceId);
    
    document.getElementById('downloadSection').style.display = 'block';
    document.getElementById('resourcePassword').value = '';
    
    updatePreview();
}

function updatePreview() {
    const previewContent = document.getElementById('previewContent');
    const pdfViewer = document.getElementById('pdfViewer');

    if (selectedResource && selectedResource.previewUrl) {
        previewContent.querySelector('.preview-placeholder').style.display = 'none';
        pdfViewer.style.display = 'block';
        // 实现PDF预览逻辑
    } else {
        previewContent.querySelector('.preview-placeholder').style.display = 'block';
        pdfViewer.style.display = 'none';
    }
}

async function handleDownload() {
    if (!selectedResource) return;

    const password = document.getElementById('resourcePassword').value;
    if (password !== selectedResource.password) {
        alert('密码错误！');
        return;
    }

    try {
        if (selectedResource.type === 'url') {
            // 直接在新标签页打开URL
            window.open(selectedResource.source, '_blank');
        } else if (selectedResource.type === 'git') {
            await downloadFromGit(selectedResource.source);
        }
    } catch (error) {
        console.error('下载错误:', error);
        alert('下载失败：' + error.message);
    }
}

async function downloadFromGit(path) {
    // 实现从Git下载的逻辑
    // 这里需要根据实际情况实现
}

document.addEventListener('DOMContentLoaded', initializeApp); 
document.addEventListener('DOMContentLoaded', initializeApp); 