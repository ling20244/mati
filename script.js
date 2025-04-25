// Данные (из вашего кода + новые поля)
let projectsData = JSON.parse(localStorage.getItem('projectsData')) || [...];
let currentRole = 'admin';

// Система ролей (новое)
function setRole(role) {
    currentRole = role;
    document.body.className = role;
    updateUI();
}

function updateUI() {
    // Скрываем кнопки добавления для риэлторов
    document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = currentRole === 'admin' ? 'block' : 'none';
    });
}

// Плавающая кнопка "+" (новое)
document.getElementById('addFloatingBtn').addEventListener('click', () => {
    if (currentRole !== 'admin') {
        alert('Только админ может добавлять данные!');
        return;
    }
    document.getElementById('addProjectModal').showModal();
});

// Добавление ЖК (новое)
document.getElementById('projectForm').addEventListener('submit', (e) => {
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
    document.getElementById('addProjectModal').close();
    renderProjects(projectsData); // Ваша существующая функция
});

// Ваши существующие функции остаются без изменений
// function showPage(), renderProjects(), и т.д.

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    setRole('admin');
    showMainMenu();
});
