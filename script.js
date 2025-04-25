// Основные данные
let currentBuildingId = null;
let currentClientId = null;
let currentGalleryBuilding = null;
let currentRole = 'admin';

// Данные ЖК
const projectsData = [
    { 
        id: 1, 
        name: "ЖК Северное Сияние", 
        status: "active", 
        address: "ул. Ленина, 15", 
        progress: "75%",
        flats: [
            { floor: 1, number: "101", area: 45, price: 120000, status: "available" },
            { floor: 1, number: "102", area: 50, price: 125000, status: "sold" },
            { floor: 2, number: "201", area: 60, price: 135000, status: "reserved" },
            { floor: 2, number: "202", area: 55, price: 130000, status: "available" }
        ]
    },
    { 
        id: 2, 
        name: "ЖК Центральный", 
        status: "completed", 
        address: "пр. Мира, 42", 
        progress: "100%",
        flats: [
            { floor: 1, number: "101", area: 48, price: 140000, status: "sold" },
            { floor: 1, number: "102", area: 52, price: 145000, status: "sold" },
            { floor: 2, number: "201", area: 65, price: 155000, status: "sold" }
        ]
    }
];

// Данные риэлторов
const realtorsData = [
    {
        id: 1,
        name: "Иванов Иван Иванович",
        phone: "+7 (123) 456-78-90",
        deals: [
            { date: "15.05.2023", object: "ЖК Северное Сияние, кв. 102", sum: "6 250 000 ₽" },
            { date: "22.06.2023", object: "ЖК Центральный, кв. 201", sum: "10 075 000 ₽" }
        ]
    },
    {
        id: 2,
        name: "Петрова Анна Сергеевна",
        phone: "+7 (987) 654-32-10",
        deals: [
            { date: "10.04.2023", object: "ЖК Северное Сияние, кв. 101", sum: "5 400 000 ₽" }
        ]
    }
];

// Данные клиентов
const clientsData = [
    {
        id: 1,
        name: "Смирнов Алексей Владимирович",
        phone: "+7 (111) 222-33-44",
        lastContact: "20.06.2023",
        notes: "Интересуется 2-комнатными квартирами в центре"
    },
    {
        id: 2,
        name: "Кузнецова Елена Петровна",
        phone: "+7 (555) 666-77-88",
        lastContact: "15.07.2023",
        notes: "Рассматривает варианты с отделкой"
    }
];

// Данные галереи
const galleryData = [
    {
        id: 1,
        name: "ЖК Северное Сияние",
        media: [
            { type: "image", url: "https://via.placeholder.com/600x400?text=Фасад+ЖК+Северное+Сияние", title: "Фасад здания" },
            { type: "image", url: "https://via.placeholder.com/600x400?text=Вид+из+окна", title: "Вид из окна" },
            { type: "video", url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4", title: "Видео обзор" }
        ]
    },
    {
        id: 2,
        name: "ЖК Центральный",
        media: [
            { type: "image", url: "https://via.placeholder.com/600x400?text=Входная+группа", title: "Входная группа" },
            { type: "image", url: "https://via.placeholder.com/600x400?text=Дворовая+территория", title: "Дворовая территория" }
        ]
    }
];

// Система ролей
function setRole(role) {
    currentRole = role;
    document.body.className = role + (document.body.classList.contains('dark-mode') ? ' dark-mode' : '');
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.role === role);
        btn.setAttribute('aria-pressed', btn.dataset.role === role);
    });
    updateAddButtonsVisibility();
}

function updateAddButtonsVisibility() {
    const addButtons = document.querySelectorAll('.add-floating-btn');
    addButtons.forEach(btn => {
        btn.style.display = currentRole === 'admin' ? 'flex' : 'none';
    });
}

// Основные функции
window.showPage = function(pageId) {
    document.getElementById('mainMenu').style.display = 'none';
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
    
    if (pageId === 'chess') {
        renderProjects(projectsData);
    } else if (pageId === 'realtors') {
        renderRealtors(realtorsData);
    } else if (pageId === 'clients') {
        renderClients(clientsData);
    } else if (pageId === 'gallery') {
        renderGalleryButtons();
    }
};

window.showMainMenu = function() {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById('mainMenu').style.display = 'block';
};

// Тёмная тема
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        this.innerHTML = document.body.classList.contains('dark-mode') 
            ? '<i class="fas fa-lightbulb"></i>' 
            : '<i class="fas fa-lightbulb" style="color: #fdcb6e"></i>';
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Восстановление темы
    if (localStorage.getItem('darkMode') === 'false') {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-lightbulb" style="color: #fdcb6e"></i>';
    }
}

// Модальные окна
function openAddModal() {
    document.getElementById('addModal').showModal();
}

function openAddRealtorModal() {
    document.getElementById('addRealtorModal').showModal();
}

window.closeModal = function() {
    document.getElementById('clientModal').style.display = 'none';
};

// Шахматки ЖК
function renderProjects(projects) {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';
    
    if (projects.length === 0) {
        container.innerHTML = '<div class="no-results">Нет доступных ЖК</div>';
        return;
    }
    
    projects.forEach(project => {
        const tile = document.createElement('div');
        tile.className = 'project-tile';
        tile.tabIndex = 0;
        
        let statusClass = '';
        let statusText = '';
        
        switch(project.status) {
            case 'active': 
                statusClass = 'status-active';
                statusText = 'В работе';
                break;
            case 'completed':
                statusClass = 'status-completed';
                statusText = 'Завершён';
                break;
            default:
                statusClass = 'status-planned';
                statusText = 'Планируется';
        }
        
        tile.innerHTML = `
            <div class="project-title">${project.name}</div>
            <div><small>Адрес:</small> ${project.address}</div>
            <div><small>Готовность:</small> ${project.progress}</div>
            <div class="project-status ${statusClass}">${statusText}</div>
        `;
        
        tile.addEventListener('click', () => showFlats(project));
        tile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') showFlats(project);
        });
        container.appendChild(tile);
    });
}

// ... (остальные функции renderRealtors, renderClients и т.д.)

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация ролей
    setRole('admin');
    
    // Обработчики для кнопок ролей
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            setRole(this.dataset.role);
        });
    });
    
    // Обработчики для кнопок добавления
    document.getElementById('addFloatingBtn').addEventListener('click', openAddModal);
    document.getElementById('addRealtorBtn').addEventListener('click', openAddRealtorModal);
    
    // Обработчики форм
    document.getElementById('addForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const newProject = {
            id: Date.now(),
            name: document.getElementById('projectName').value,
            address: document.getElementById('projectAddress').value,
            status: document.getElementById('projectStatus').value,
            flats: []
        };
        projectsData.push(newProject);
        document.getElementById('addModal').close();
        renderProjects(projectsData);
        this.reset();
    });
    
    document.getElementById('addRealtorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const newRealtor = {
            id: Date.now(),
            name: document.getElementById('realtorName').value,
            phone: document.getElementById('realtorPhone').value,
            deals: []
        };
        realtorsData.push(newRealtor);
        document.getElementById('addRealtorModal').close();
        renderRealtors(realtorsData);
        this.reset();
    });
    
    // Показываем главное меню при загрузке
    showMainMenu();
    initThemeToggle();
    updateAddButtonsVisibility();
});
