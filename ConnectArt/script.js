// Botón de perfil
const userProfileBtn = document.getElementById("userProfileBtn");
userProfileBtn.onclick = () => window.location.href = "profile.html";

// Botón de portafolio
const userPortfolioBtn = document.getElementById("userPortfolioBtn");
userPortfolioBtn.onclick = () => window.location.href = "portfolio.html";

// Elementos principales
const trendsSection = document.getElementById("trendsSection");
const categoriesSection = document.getElementById("categoriesSection");
const communitiesSection = document.getElementById("communitiesSection");
const notificationsSection = document.getElementById("notificationsSection");
const savedSection = document.getElementById("savedSection");
const settingsSection = document.getElementById("settingsSection");
const navButtons = document.querySelectorAll(".nav-buttons .nav-btn");
const backButtonContainer = document.getElementById("backButtonContainer");
const backBtn = document.getElementById("backBtn");
const navButtonsContainer = document.getElementById("navButtons");

let previousSection = null;
let isFromMainNav = true;

// Función para mostrar solo una sección
function showSection(section) {
  trendsSection.style.display = "none";
  categoriesSection.style.display = "none";
  communitiesSection.style.display = "none";
  notificationsSection.style.display = "none";
  savedSection.style.display = "none";
  settingsSection.style.display = "none";

  // Reiniciar el grid de tendencias cuando se muestra
  if (section === "trends" && trendsSection) {
    trendsSection.style.display = "grid";
    // Forzar reflow para reiniciar el grid
    void trendsSection.offsetHeight;
  } else if (section === "trends") {
    trendsSection.style.display = "block";
  } else if (section === "categories") {
    categoriesSection.style.display = "block";
  } else if (section === "communities") {
    communitiesSection.style.display = "block";
  } else if (section === "notifications") {
    notificationsSection.style.display = "block";
  } else if (section === "saved") {
    savedSection.style.display = "block";
  } else if (section === "settings") {
    settingsSection.style.display = "block";
  }
}

// Botones de navegación principal
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remover active de todos
    navButtons.forEach(b => b.classList.remove("active"));
    
    // Agregar active al actual
    btn.classList.add("active");

    // Ocultar botón de volver y mostrar navegación
    isFromMainNav = true;
    backButtonContainer.style.display = "none";
    navButtonsContainer.style.display = "flex";

    // Mostrar sección correspondiente
    const section = btn.textContent.trim();
    if (section === "Tendencias") {
      showSection("trends");
    } else if (section === "Categorías") {
      showSection("categories");
    } else if (section === "Comunidades") {
      showSection("communities");
    }
  });
});

// Botón de volver
backBtn.addEventListener("click", () => {
  isFromMainNav = true;
  backButtonContainer.style.display = "none";
  navButtonsContainer.style.display = "flex";
  
  if (previousSection) {
    showSection(previousSection);
    navButtons.forEach(b => b.classList.remove("active"));
    
    if (previousSection === "trends") {
      navButtons[0].classList.add("active");
    } else if (previousSection === "categories") {
      navButtons[1].classList.add("active");
    } else if (previousSection === "communities") {
      navButtons[2].classList.add("active");
    }
  }
});

// Filtros de categorías
const filterButtons = document.querySelectorAll(".filter-btn");
const categoryPins = document.querySelectorAll("#categoriesGrid .pin");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remover active de todos los filtros
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    // Filtrar pins
    categoryPins.forEach(pin => {
      if (filter === "all") {
        pin.style.display = "block";
      } else {
        const category = pin.getAttribute("data-category");
        pin.style.display = category === filter ? "block" : "none";
      }
    });
  });
});

// Sidebar navigation
const sidebarItems = document.querySelectorAll(".sidebar-item");

sidebarItems.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Guardar sección anterior
    if (isFromMainNav) {
      const activeNavBtn = document.querySelector(".nav-buttons .nav-btn.active");
      if (activeNavBtn) {
        const text = activeNavBtn.textContent.trim();
        if (text === "Tendencias") previousSection = "trends";
        else if (text === "Categorías") previousSection = "categories";
        else if (text === "Comunidades") previousSection = "communities";
      }
    }

    isFromMainNav = false;

    // Mostrar botón de volver y ocultar navegación
    backButtonContainer.style.display = "block";
    navButtonsContainer.style.display = "none";

    // Remove active class from nav buttons
    navButtons.forEach(nb => nb.classList.remove("active"));

    // Remove active class from sidebar items
    sidebarItems.forEach(si => si.classList.remove("active"));
    
    // Add active class to clicked sidebar item
    item.classList.add("active");

    // Show selected section
    const section = item.getAttribute("data-section");
    showSection(section);
  });
});

// Botones Guardar y Unirse
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("save-btn") || e.target.classList.contains("btn-join")) {
    const btn = e.target;
    const originalText = btn.textContent;
    
    // Cambiar texto y agregar verificación
    btn.textContent = "Verificado";
    btn.classList.add("verified");
    btn.disabled = true;
    
    // Después de 2 segundos, volver al estado original
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove("verified");
      btn.disabled = false;
    }, 2000);
  }
});

// ---------- Comisión / Contacto desde imágenes ----------
// Insertar botones de contacto junto a cada botón de guardar
function insertContactButtons() {
  const saveBtns = document.querySelectorAll('.save-btn');
  saveBtns.forEach(btn => {
    if (btn.nextElementSibling && btn.nextElementSibling.classList && btn.nextElementSibling.classList.contains('contact-btn')) return;
    const contact = document.createElement('button');
    contact.className = 'contact-btn';
    contact.textContent = 'Contactar';
    btn.parentNode.appendChild(contact);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  insertContactButtons();

  // Modal elements
  const modal = document.getElementById('commissionModal');
  const closeX = modal ? modal.querySelector('.commission-close') : null;
  const cancelBtn = modal ? modal.querySelector('.btn-cancel-commission') : null;
  const form = modal ? modal.querySelector('#commissionForm') : null;

  document.body.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('contact-btn')) {
      // find artist name in related card
      let card = e.target.closest('.pin') || e.target.closest('.portfolio-item') || e.target.closest('.pin-content');
      let artistEl = card ? card.querySelector('.artist') : null;
      let artistName = artistEl ? artistEl.textContent.replace(/^Por\s*/i, '') : 'Artista';
      if (modal) {
        modal.style.display = 'flex';
        const artistLabel = modal.querySelector('.commission-artist-name');
        if (artistLabel) artistLabel.textContent = artistName;
        // clear form
        if (form) form.reset();
      }
    }
  });

  if (closeX) closeX.onclick = () => modal.style.display = 'none';
  if (cancelBtn) cancelBtn.onclick = () => modal.style.display = 'none';

  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const name = document.getElementById('reqName').value.trim();
      const email = document.getElementById('reqEmail').value.trim();
      const phone = document.getElementById('reqPhone').value.trim();
      const payment = document.getElementById('reqPayment').value;
      const details = document.getElementById('reqDetails').value.trim();
      const artist = modal.querySelector('.commission-artist-name').textContent;

      if (!name || !email || !details) {
        alert('Por favor completa los campos obligatorios (nombre, email y detalle).');
        return;
      }

      // aquí podrías enviar la solicitud a un servidor; por ahora guardamos en localStorage como ejemplo
      const commissions = JSON.parse(localStorage.getItem('commissions') || '[]');
      commissions.push({artist, name, email, phone, payment, details, date: new Date().toISOString()});
      localStorage.setItem('commissions', JSON.stringify(commissions));

      alert('Solicitud de comisión enviada correctamente. El artista será notificado.');
      modal.style.display = 'none';
    });
  }
});
