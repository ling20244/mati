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
    });
    toggleAddButton();
}
function toggleAddButton() {
    document.getElementById('addFloatingBtn').style.display = currentRole === 'admin' ? 'block' : 'none';
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
// Основные функции
function showPage(pageId) {
    document.getElementById('mainMenu').style.display = 'none';
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
}
function showMainMenu() {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById('mainMenu').style.display = 'block';
}
// Тёмная тема
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = document.body.classList.contains('dark-mode') 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});
// Шлейф курсора
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
// ===== РАЗДЕЛ "ШАХМАТКИ ЖК" =====
function renderProjects(projects) {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';
    projects.forEach(project => {
        const tile = document.createElement('div');
        tile.className = 'project-tile';
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
        container.appendChild(tile);
    });
}
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
    Object.keys(floors).sort().forEach(floor => {
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
            let statusText = '';
            switch(flat.status) {
                case 'sold': statusText = 'Продано'; break;
                case 'available': statusText = 'Свободна'; break;
                case 'reserved': statusText = 'Бронь'; break;
            }
            flatTile.innerHTML = `
                <div class="flat-info"><strong>Кв. ${flat.number}</strong></div>
                <div class="flat-info">Площадь: ${flat.area} м²</div>
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
function hideFlats() {
    document.getElementById('flatsContainer').style.display = 'none';
    document.getElementById('projectsContainer').style.display = 'grid';
}
function filterProjects() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = projectsData.filter(project => 
        project.name.toLowerCase().includes(searchTerm) || 
        project.address.toLowerCase().includes(searchTerm)
    );
    renderProjects(filtered);
}
// ===== РАЗДЕЛ "РИЭЛТОРЫ" =====
function renderRealtors(realtors) {
    const container = document.getElementById('realtorsContainer');
    container.innerHTML = '';
    realtors.forEach(realtor => {
        const card = document.createElement('div');
        card.className = 'realtor-card';
        let dealsHtml = '';
        if (realtor.deals && realtor.deals.length > 0) {
            dealsHtml = '<div class="realtor-deals"><strong>Сделки:</strong>';
            realtor.deals.forEach(deal => {
                dealsHtml += `
                    <div class="deal-item">
                        <span>${deal.date}</span>
                        <span>${deal.sum}</span>
                    </div>
                    <div>${deal.object}</div>
                `;
            });
            dealsHtml += '</div>';
        }
        card.innerHTML = `
            <div class="realtor-name">${realtor.name}</div>
            <div class="realtor-phone"><i class="fas fa-phone"></i> ${realtor.phone}</div>
            ${dealsHtml}
        `;
        container.appendChild(card);
    });
}
function filterRealtors() {
    const searchTerm = document.getElementById('realtorSearch').value.toLowerCase();
    const filtered = realtorsData.filter(realtor => 
        realtor.name.toLowerCase().includes(searchTerm) || 
        realtor.phone.toLowerCase().includes(searchTerm)
    );
    renderRealtors(filtered);
}
// ===== РАЗДЕЛ "КЛИЕНТЫ" =====
function renderClients(clients) {
