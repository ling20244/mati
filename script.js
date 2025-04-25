// Основные данные
let currentBuildingId = null;
let currentClientId = null;
let currentGalleryBuilding = null;
let currentRole = 'admin';

// Данные (из вашего кода)
const projectsData = [...];
const realtorsData = [...];
const clientsData = [...];
const galleryData = [...];

// Система ролей
function setRole(role) {
    currentRole = role;
    document.body.className = `${role} ${document.body.classList.contains('dark-mode') ? 'dark-mode' : ''}`;
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.role === role);
    });
    toggleAddButton();
}

function toggleAddButton() {
    document.getElementById('addFloatingBtn').style.display = 
        currentRole === 'admin' ? 'block' : 'none';
}

// Добавление ЖК
document.getElementById('addFloatingBtn').addEventListener('click', () => {
    document.getElementById('addModal').showModal();
});

document.getElementById('addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newProject = {
        id: Date.now(),
        name: document.getElementById('projectName').value,
        address: document.getElementById('projectAddress').value,
        status: document.getElementById('projectStatus').value,
        flats: []
    };
    projectsData.push(newProject);
    localStorage.setItem('projectsData', JSON.stringify(projectsData));
    document.getElementById('addModal').close();
    renderProjects(projectsData);
    document.getElementById('addForm').reset();
});

// [Все ваши предыдущие функции сохраняются без изменений...]

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    setRole('admin');
    showMainMenu();
    
    // Обработчики для кнопок ролей
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', () => setRole(btn.dataset.role));
    });
});
