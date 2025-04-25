// Основные данные
let currentBuildingId = null;
let currentClientId = null;
let currentGalleryBuilding = null;
let currentRole = 'admin';

// Генерация CSRF токена
function generateCSRFToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Санитизация HTML
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Загрузка данных из localStorage
function loadData() {
    const savedProjects = localStorage.getItem('projectsData');
    const savedRealtors = localStorage.getItem('realtorsData');
    const savedClients = localStorage.getItem('clientsData');
    const savedGallery = localStorage.getItem('galleryData');
    
    if (savedProjects) projectsData = JSON.parse(savedProjects);
    if (savedRealtors) realtorsData = JSON.parse(savedRealtors);
    if (savedClients) clientsData = JSON.parse(savedClients);
    if (savedGallery) galleryData = JSON.parse(savedGallery);
}

// Сохранение данных в localStorage
function saveData() {
    localStorage.setItem('projectsData', JSON.stringify(projectsData));
    localStorage.setItem('realtorsData', JSON.stringify(realtorsData));
    localStorage.setItem('clientsData', JSON.stringify(clientsData));
    localStorage.setItem('galleryData', JSON.stringify(galleryData));
}

// Данные ЖК
let projectsData = [
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
let realtorsData = [
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
let clientsData = [
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
let galleryData = [
    {
        id: 1,
        name: "ЖК Северное Сияние",
        media: [
            { type: "image", url: "placeholder.jpg", dataSrc: "https://via.placeholder.com/600x400?text=Фасад+ЖК+Северное+Сияние", title: "Фасад здания" },
            { type: "image", url: "placeholder.jpg", dataSrc: "https://via.placeholder.com/600x400?text=Вид+из+окна", title: "Вид из окна" },
            { type: "video", url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4", title: "Видео обзор" }
        ]
    },
    {
        id: 2,
        name: "ЖК Центральный",
        media: [
            { type: "image", url: "placeholder.jpg", dataSrc: "https://via.placeholder.com/600x400?text=Входная+группа", title: "Входная группа" },
            { type: "image", url: "placeholder.jpg", dataSrc: "https://via.placeholder.com/600x400?text=Дворовая+территория", title: "Дворовая территория" }
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
    document.getElementById('addFloatingBtn').style.display = role === 'admin' ? 'block' : 'none';
    saveData();
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
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        saveData();
    });
    
    // Восстановление темы
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Шлейф курсора
function initCursorTrail() {
    const buttons = document.querySelectorAll('.menu-button, .back-button, .search-button, .client-button, .gallery-button, .save-button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            createCursorTrailEffect(button);
        });
    });

    function createCursorTrailEffect(element) {
        let dots = [];
        
        element.addEventListener('mousemove', (e) => {
            const dot = document.createElement('div');
            dot.className = 'trail-dot';
            dot.style.left = e.clientX + 'px';
            dot.style.top = e.clientY + 'px';
            document.body.appendChild(dot);
            
            dots.push(dot);
            
            setTimeout(() => {
                dot.style.opacity = '0';
                setTimeout(() => dot.remove(), 300);
            }, 500);
        });
        
        element.addEventListener('mouseleave', () => {
            dots.forEach(dot => {
                dot.style.opacity = '0';
                setTimeout(() => dot.remove(), 300);
            });
            dots = [];
        });
    }
}

// ===== РАЗДЕЛ "ШАХМАТКИ ЖК" =====
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
        tile.setAttribute('role', 'gridcell');
        
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
            <div class="project-title">${sanitizeHTML(project.name)}</div>
            <div><small>Адрес:</small> ${sanitizeHTML(project.address)}</div>
            <div><small>Готовность:</small> ${sanitizeHTML(project.progress)}</div>
            <div class="project-status ${statusClass}">${statusText}</div>
        `;
        
        tile.addEventListener('click', () => showFlats(project));
        tile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') showFlats(project);
        });
        container.appendChild(tile);
    });
}

window.sortProjects = function() {
    const sortBy = document.getElementById('sortProjects').value;
    const sortedProjects = [...projectsData].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'status') return a.status.localeCompare(b.status);
        if (sortBy === 'progress') {
            const progressA = parseInt(a.progress);
            const progressB = parseInt(b.progress);
            return progressB - progressA;
        }
        return 0;
    });
    renderProjects(sortedProjects);
};

function showFlats(project) {
    currentBuildingId = project.id;
    document.getElementById('projectsContainer').style.display = 'none';
    document.getElementById('flatsContainer').style.display = 'block';
    document.getElementById('currentBuildingTitle').textContent = project.name;
    
    const floorsContainer = document.getElementById('floorsContainer');
    floorsContainer.innerHTML = '';
    
    // Группируем квартиры по этажам
    const floors = {};
    project.flats.forEach(flat => {
        if (!floors[flat.floor]) {
            floors[flat.floor] = [];
        }
        floors[flat.floor].push(flat);
    });
    
    // Сортируем этажи и рендерим
    Object.keys(floors).sort((a, b) => b - a).forEach(floor => {
        const floorSection = document.createElement('div');
        floorSection.className = 'floor-section';
        
        const floorTitle = document.createElement('h4');
        floorTitle.className = 'floor-title';
        floorTitle.textContent = `Этаж ${floor}`;
        floorSection.appendChild(floorTitle);
        
        const flatsGrid = document.createElement('div');
        flatsGrid.className = 'flats-grid';
        
        floors[floor].forEach(flat => {
            const flatTile = document.createElement('div');
            flatTile.className = `flat-tile flat-status-${flat.status}`;
            flatTile.tabIndex = 0;
            
            let statusText = '';
            switch(flat.status) {
                case 'sold': statusText = 'Продано'; break;
                case 'available': statusText = 'Свободна'; break;
                case 'reserved': statusText = 'Бронь'; break;
            }
            
            flatTile.innerHTML = `
                <div class="flat-info"><strong>Кв. ${sanitizeHTML(flat.number)}</strong></div>
                <div class="flat-info">Площадь: ${sanitizeHTML(flat.area)} м²</div>
                <div class="flat-info">Цена: ${(flat.area * flat.price).toLocaleString()} ₽</div>
                <div class="flat-info">(${flat.price.toLocaleString()} ₽/м²)</div>
                <div class="flat-info"><strong>${statusText}</strong></div>
            `;
            
            flatsGrid.appendChild(flatTile);
        });
        
        floorSection.appendChild(flatsGrid);
        floorsContainer.appendChild(floorSection);
    });
}

window.hideFlats = function() {
    document.getElementById('flatsContainer').style.display = 'none';
    document.getElementById('projectsContainer').style.display = 'grid';
};

window.filterProjects = function() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = projectsData.filter(project => 
        project.name.toLowerCase().includes(searchTerm) || 
        project.address.toLowerCase().includes(searchTerm)
    );
    renderProjects(filtered);
};

// ===== РАЗДЕЛ "РИЭЛТОРЫ" =====
function renderRealtors(realtors) {
    const container = document.getElementById('realtorsContainer');
    container.innerHTML = '';
    
    if (realtors.length === 0) {
        container.innerHTML = '<div class="no-results">Нет данных о риэлторах</div>';
        return;
    }
    
    realtors.forEach(realtor => {
        const card = document.createElement('div');
        card.className = 'realtor-card';
        card.tabIndex = 0;
        
        let dealsHtml = '';
        if (realtor.deals && realtor.deals.length > 0) {
            dealsHtml = '<div class="realtor-deals"><strong>Сделки:</strong>';
            realtor.deals.forEach(deal => {
                dealsHtml += `
                    <div class="deal-item">
                        <span>${sanitizeHTML(deal.date)}</span>
                        <span>${sanitizeHTML(deal.sum)}</span>
                    </div>
                    <div>${sanitizeHTML(deal.object)}</div>
                `;
            });
            dealsHtml += '</div>';
        }
        
        card.innerHTML = `
            <div class="realtor-name">${sanitizeHTML(realtor.name)}</div>
            <div class="realtor-phone"><i class="fas fa-phone"></i> ${sanitizeHTML(realtor.phone)}</div>
            ${dealsHtml}
        `;
        
        container.appendChild(card);
    });
}

window.filterRealtors = function() {
    const searchTerm = document.getElementById('realtorSearch').value.toLowerCase();
    const filtered = realtorsData.filter(realtor => 
        realtor.name.toLowerCase().includes(searchTerm) || 
        realtor.phone.toLowerCase().includes(searchTerm)
    );
    renderRealtors(filtered);
};

// ===== РАЗДЕЛ "КЛИЕНТЫ" =====
function renderClients(clients) {
    const container = document.getElementById('clientsContainer');
    container.innerHTML = '';
    
    if (clients.length === 0) {
        container.innerHTML = '<div class="no-results">Нет данных о клиентах</div>';
        return;
    }
    
    clients.forEach(client => {
        const button = document.createElement('button');
        button.className = 'client-button';
        
        button.innerHTML = `
            <div class="client-name">${sanitizeHTML(client.name)}</div>
            <div class="client-phone">${sanitizeHTML(client.phone)}</div>
        `;
        
        button.addEventListener('click', () => openClientModal(client));
        container.appendChild(button);
    });
}

function openClientModal(client) {
    currentClientId = client.id;
    document.getElementById('modalClientName').textContent = client.name;
    document.getElementById('modalClientPhone').textContent = client.phone;
    document.getElementById('modalClientLastContact').textContent = client.lastContact || 'нет данных';
    document.getElementById('clientNotes').value = client.notes || '';
    
    document.getElementById('clientModal').style.display = 'block';
}

window.closeModal = function() {
    document.getElementById('clientModal').style.display = 'none';
};

window.saveClientNotes = function() {
    if (currentClientId) {
        const client = clientsData.find(c => c.id === currentClientId);
        if (client) {
            client.notes = document.getElementById('clientNotes').value;
            alert('Заметки сохранены');
            saveData();
            closeModal();
        }
    }
};

window.filterClients = function() {
    const searchTerm = document.getElementById('clientSearch').value.toLowerCase();
    const filtered = clientsData.filter(client => 
        client.name.toLowerCase().includes(searchTerm) || 
        client.phone.toLowerCase().includes(searchTerm)
    );
    renderClients(filtered);
};

// ===== РАЗДЕЛ "ГАЛЕРЕЯ" =====
function renderGalleryButtons() {
    const container = document.getElementById('galleryButtons');
    container.innerHTML = '';
    
    if (galleryData.length === 0) {
        container.innerHTML = '<div class="no-results">Нет доступных галерей</div>';
        return;
    }
    
    galleryData.forEach(building => {
        const button = document.createElement('button');
        button.className = 'gallery-button';
        button.textContent = building.name;
        
        button.addEventListener('click', () => showGalleryContent(building));
        container.appendChild(button);
    });
}

function showGalleryContent(building) {
    currentGalleryBuilding = building.id;
    document.getElementById('galleryButtons').style.display = 'none';
    document.getElementById('galleryContent').style.display = 'block';
    document.getElementById('galleryBuildingTitle').textContent = building.name;
    
    const mediaContainer = document.getElementById('mediaContainer');
    mediaContainer.innerHTML = '';
    
    building.media.forEach(item => {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';
        
        if (item.type === 'image') {
            mediaItem.innerHTML = `
                <img src="${item.url}" data-src="${item.dataSrc || item.url}" alt="${sanitizeHTML(item.title)}" loading="lazy">
                <div class="media-title">${sanitizeHTML(item.title)}</div>
            `;
        } else if (item.type === 'video') {
            mediaItem.innerHTML = `
                <video controls>
                    <source src="${item.url}" type="video/mp4">
                    Ваш браузер не поддерживает видео.
                </video>
                <div class="media-title">${sanitizeHTML(item.title)}</div>
            `;
        }
        
        mediaContainer.appendChild(mediaItem);
    });
    
    // Инициализация lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

window.hideGalleryContent = function() {
    document.getElementById('galleryContent').style.display = 'none';
    document.getElementById('galleryButtons').style.display = 'grid';
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка сохранённых данных
    loadData();
    
    // Установка CSRF токена
    document.getElementById('csrfToken').value = generateCSRFToken();
    
    // Инициализация ролей
    setRole('admin');
    
    // Обработчики для кнопок ролей
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            setRole(this.dataset.role);
        });
    });
    
    // Показываем главное меню при загрузке
    showMainMenu();
    
    // Инициализация темы
    initThemeToggle();
    
    // Инициализация шлейфа курсора
    initCursorTrail();
    
    // Обработчик для модального окна добавления ЖК
    document.getElementById('addFloatingBtn').addEventListener('click', function() {
        document.getElementById('addModal').showModal();
    });
    
    document.getElementById('addForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('projectName').value.trim();
        const address = document.getElementById('projectAddress').value.trim();
        
        if (!name || !address) {
            alert('Заполните все обязательные поля');
            return;
        }
        
        const newProject = {
            id: Date.now(),
            name: sanitizeHTML(name),
            address: sanitizeHTML(address),
            status: document.getElementById('projectStatus').value,
            progress: "0%",
            flats: []
        };
        
        projectsData.push(newProject);
        document.getElementById('addModal').close();
        renderProjects(projectsData);
        document.getElementById('addForm').reset();
        saveData();
    });
    
    // Закрытие модального окна клиента при клике вне его
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('clientModal')) {
            closeModal();
        }
    });
    
    // Сохранение темы при закрытии
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
});
