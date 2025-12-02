// Portfolio Script - Gestión de Portafolio y Perfil Público

// Estado del Portafolio
let portfolioState = {
  artistName: 'Artista@1',
  artistRole: 'Artista Digital',
  description: 'Tu descripción aparecerá aquí. Máximo 150 caracteres.',
  premiumStatus: 'free',
  avatarColor: '#667eea',
  backgroundGradient: ['#221D2B', '#1a3a52'],
  works: [],
  artistNumber: 1
};

// Elementos del DOM
const backBtn = document.getElementById('backBtn');
const artistNameInput = document.getElementById('artistName');
const artistRoleInput = document.getElementById('artistRole');
const artistDescriptionInput = document.getElementById('artistDescription');
const premiumStatusSelect = document.getElementById('premiumStatus');
const charCountSpan = document.getElementById('charCount');
const btnSaveProfile = document.querySelector('.btn-save-profile');
const btnAddWork = document.querySelector('.btn-add-work');
const editWorkModal = document.getElementById('editWorkModal');
const closeModal = document.querySelector('.close-modal');
const btnModalSave = document.querySelector('.btn-modal-save');
const btnModalCancel = document.querySelector('.btn-modal-cancel');
const workTitleInput = document.getElementById('workTitle');
const workDescriptionInput = document.getElementById('workDescription');
const workCategorySelect = document.getElementById('workCategory');
const workImageInput = document.getElementById('workImage');
const btnChangeAvatar = document.getElementById('btnChangeAvatar');
const changeAvatarModal = document.getElementById('changeAvatarModal');
const closeAvatarModal = document.getElementById('closeAvatarModal');
const previewAvatar = document.getElementById('previewAvatar');
const previewCard = document.getElementById('previewCard');
const btnTogglePreview = document.getElementById('btnTogglePreview');
const btnBackPreview = document.getElementById('btnBackPreview');
const publicPreviewSection = document.getElementById('publicPreviewSection');
const portfolioManagerSection = document.getElementById('portfolioManagerSection');

// Cargar estado guardado
function loadPortfolioState() {
  const saved = localStorage.getItem('portfolioState');
  if (saved) {
    portfolioState = JSON.parse(saved);
    updateForm();
    updatePreview();
  }
}

// Guardar estado
function savePortfolioState() {
  localStorage.setItem('portfolioState', JSON.stringify(portfolioState));
}

// Actualizar formulario con datos del estado
function updateForm() {
  artistNameInput.value = portfolioState.artistName;
  artistRoleInput.value = portfolioState.artistRole;
  artistDescriptionInput.value = portfolioState.description;
  premiumStatusSelect.value = portfolioState.premiumStatus;
  updateCharCount();
}

// Actualizar preview con datos actuales
function updatePreview() {
  const previewHeader = document.querySelector('.preview-info');
  const premiumBadge = document.querySelector('.premium-badge');
  const previewDescription = document.querySelector('.preview-description');

  previewHeader.querySelector('h3').textContent = portfolioState.artistName;
  previewHeader.querySelector('.preview-role').textContent = portfolioState.artistRole;
  previewDescription.textContent = portfolioState.description;
  previewAvatar.style.backgroundColor = portfolioState.avatarColor;
  
  // Actualizar fondo del perfil con gradiente
  const [color1, color2] = portfolioState.backgroundGradient;
  previewCard.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;

  // Actualizar badge premium
  if (portfolioState.premiumStatus === 'free') {
    premiumBadge.textContent = 'Gratuito';
    premiumBadge.style.backgroundColor = '#95a5a6';
  } else if (portfolioState.premiumStatus === 'premium') {
    premiumBadge.textContent = 'Premium';
    premiumBadge.style.backgroundColor = '#f39c12';
  } else if (portfolioState.premiumStatus === 'pro') {
    premiumBadge.textContent = 'Pro';
    premiumBadge.style.backgroundColor = '#e74c3c';
  }

  // Actualizar previsualización pública
  updatePublicPreview();
}

// Actualizar previsualización pública
function updatePublicPreview() {
  const publicPreviewAvatar = document.getElementById('publicPreviewAvatar');
  const publicPreviewName = document.getElementById('publicPreviewName');
  const publicPreviewRole = document.getElementById('publicPreviewRole');
  const publicPremiumBadge = document.getElementById('publicPremiumBadge');
  const publicPreviewDescription = document.getElementById('publicPreviewDescription');
  const publicWorksCount = document.getElementById('publicWorksCount');
  const publicPortfolioGrid = document.getElementById('publicPortfolioGrid');

  // Actualizar datos personales
  publicPreviewAvatar.style.backgroundColor = portfolioState.avatarColor;
  publicPreviewName.textContent = portfolioState.artistName;
  publicPreviewRole.textContent = portfolioState.artistRole;
  publicPreviewDescription.textContent = portfolioState.description;
  publicWorksCount.textContent = portfolioState.works.length;

  // Actualizar badge
  if (portfolioState.premiumStatus === 'free') {
    publicPremiumBadge.textContent = 'Gratuito';
    publicPremiumBadge.style.backgroundColor = '#95a5a6';
  } else if (portfolioState.premiumStatus === 'premium') {
    publicPremiumBadge.textContent = 'Premium';
    publicPremiumBadge.style.backgroundColor = '#f39c12';
  } else if (portfolioState.premiumStatus === 'pro') {
    publicPremiumBadge.textContent = 'Pro';
    publicPremiumBadge.style.backgroundColor = '#e74c3c';
  }

  // Renderizar obras en la galería pública
  publicPortfolioGrid.innerHTML = '';
  if (portfolioState.works.length === 0) {
    publicPortfolioGrid.innerHTML = '<div class="empty-portfolio-message">Sin obras publicadas aún</div>';
  } else {
    portfolioState.works.forEach((work) => {
      const item = document.createElement('div');
      item.className = 'public-portfolio-item';
      item.innerHTML = `
        <div class="public-portfolio-item-image" style="background-color: #${Math.floor(Math.random()*16777215).toString(16)};"></div>
        <div class="public-portfolio-item-info">
          <h4>${work.title}</h4>
          <p>${work.category}</p>
        </div>
      `;
      publicPortfolioGrid.appendChild(item);
    });
  }
}

// Contar caracteres
function updateCharCount() {
  const count = artistDescriptionInput.value.length;
  charCountSpan.textContent = `${count}/150`;
}

// Guardar cambios de perfil
function saveProfileChanges() {
  portfolioState.artistName = artistNameInput.value.trim() || 'Artista@1';
  portfolioState.artistRole = artistRoleInput.value.trim() || 'Artista Digital';
  portfolioState.description = artistDescriptionInput.value.trim() || 'Tu descripción aparecerá aquí.';
  portfolioState.premiumStatus = premiumStatusSelect.value;

  // Extraer número del nombre si sigue el patrón Artista@N
  const match = portfolioState.artistName.match(/Artista@(\d+)/);
  if (match) {
    portfolioState.artistNumber = parseInt(match[1]);
  }

  savePortfolioState();
  updatePreview();

  // Animación de verificación
  const btn = btnSaveProfile;
  btn.textContent = 'Guardado';
  btn.style.backgroundColor = '#27ae60';
  setTimeout(() => {
    btn.textContent = 'Guardar Perfil';
    btn.style.backgroundColor = '';
  }, 2000);
}

// Abrir modal para editar obra
function openEditModal(itemIndex) {
  if (itemIndex !== undefined && portfolioState.works[itemIndex]) {
    const work = portfolioState.works[itemIndex];
    workTitleInput.value = work.title;
    workDescriptionInput.value = work.description;
    workCategorySelect.value = work.category;
    workImageInput.value = work.image;
    editWorkModal.dataset.index = itemIndex;
  } else {
    workTitleInput.value = '';
    workDescriptionInput.value = '';
    workCategorySelect.value = 'Ilustración';
    workImageInput.value = '';
    editWorkModal.dataset.index = -1;
  }
  editWorkModal.style.display = 'block';
}

// Cerrar modal
function closeEditModal() {
  editWorkModal.style.display = 'none';
  delete editWorkModal.dataset.index;
}

// Guardar obra
function saveWork() {
  const newWork = {
    title: workTitleInput.value || 'Sin título',
    description: workDescriptionInput.value,
    category: workCategorySelect.value,
    image: workImageInput.value
  };

  const index = editWorkModal.dataset.index;
  if (index === '-1' || index === undefined) {
    portfolioState.works.push(newWork);
  } else {
    portfolioState.works[parseInt(index)] = newWork;
  }

  savePortfolioState();
  renderPortfolioGrid();
  closeEditModal();
}

// Renderizar grid de portafolio
function renderPortfolioGrid() {
  const portfolioGrid = document.querySelector('.portfolio-grid');
  
  // Limpiar grid excepto el botón de agregar
  const items = portfolioGrid.querySelectorAll('.portfolio-item:not(.add-item)');
  items.forEach(item => item.remove());

  // Agregar obras
  portfolioState.works.forEach((work, index) => {
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    item.innerHTML = `
      <div class="portfolio-image" style="background-color: #${Math.floor(Math.random()*16777215).toString(16)};"></div>
      <div class="portfolio-item-info">
        <h4>${work.title}</h4>
        <p>${work.category}</p>
        <div class="portfolio-item-actions">
          <button class="btn-edit-item" data-index="${index}">Editar</button>
          <button class="btn-delete-item" data-index="${index}">Eliminar</button>
        </div>
      </div>
    `;
    portfolioGrid.insertBefore(item, portfolioGrid.querySelector('.add-item'));
  });

  // Agregar event listeners a botones
  document.querySelectorAll('.btn-edit-item').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(parseInt(btn.dataset.index)));
  });

  document.querySelectorAll('.btn-delete-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      portfolioState.works.splice(index, 1);
      savePortfolioState();
      renderPortfolioGrid();
    });
  });
}

// Event Listeners
backBtn.addEventListener('click', () => {
  window.location.href = 'dashboard.html';
});

artistDescriptionInput.addEventListener('input', updateCharCount);

btnSaveProfile.addEventListener('click', saveProfileChanges);

btnAddWork.addEventListener('click', () => openEditModal());

closeModal.addEventListener('click', closeEditModal);

btnModalSave.addEventListener('click', saveWork);

btnModalCancel.addEventListener('click', closeEditModal);

// Cerrar modal al hacer click fuera
window.addEventListener('click', (event) => {
  if (event.target === editWorkModal) {
    closeEditModal();
  }
  if (event.target === changeAvatarModal) {
    closeAvatarModal.click();
  }
});

// Abrir/Cerrar modal de avatar
btnChangeAvatar.addEventListener('click', () => {
  changeAvatarModal.style.display = 'block';
});

closeAvatarModal.addEventListener('click', () => {
  changeAvatarModal.style.display = 'none';
});

// Seleccionar color de avatar
document.querySelectorAll('.avatar-option').forEach(option => {
  option.addEventListener('click', () => {
    const color = option.dataset.color;
    portfolioState.avatarColor = color;
    savePortfolioState();
    updatePreview();
  });
});

// Seleccionar color de fondo del perfil
document.querySelectorAll('.bg-option').forEach(option => {
  option.addEventListener('click', () => {
    const color = option.dataset.color;
    // Si es el primer clic, se establece como primer color del gradiente
    // Si es el segundo, se establece como segundo color
    if (portfolioState.backgroundGradient[0] === portfolioState.backgroundGradient[1]) {
      portfolioState.backgroundGradient[1] = color;
    } else {
      portfolioState.backgroundGradient[0] = color;
      portfolioState.backgroundGradient[1] = color;
    }
    savePortfolioState();
    updatePreview();
  });
});

// Toggle previsualización pública
btnTogglePreview.addEventListener('click', () => {
  document.querySelector('.portfolio-preview').style.display = 'none';
  document.querySelector('.portfolio-editor').style.display = 'none';
  document.querySelector('.portfolio-manager').style.display = 'none';
  publicPreviewSection.style.display = 'block';
  window.scrollTo(0, 0);
});

btnBackPreview.addEventListener('click', () => {
  document.querySelector('.portfolio-preview').style.display = 'block';
  document.querySelector('.portfolio-editor').style.display = 'block';
  document.querySelector('.portfolio-manager').style.display = 'block';
  publicPreviewSection.style.display = 'none';
  window.scrollTo(0, 0);
});

// Cambiar número de artista
function changeArtistNumber(increment) {
  portfolioState.artistNumber += increment;
  if (portfolioState.artistNumber < 1) {
    portfolioState.artistNumber = 1;
  }
  portfolioState.artistName = `Artista@${portfolioState.artistNumber}`;
  artistNameInput.value = portfolioState.artistName;
  savePortfolioState();
  updatePreview();
}

// Atajos de teclado para cambiar número de artista
document.addEventListener('keydown', (event) => {
  // Alt + Flecha arriba para incrementar
  if (event.altKey && event.key === 'ArrowUp') {
    event.preventDefault();
    changeArtistNumber(1);
  }
  // Alt + Flecha abajo para decrementar
  if (event.altKey && event.key === 'ArrowDown') {
    event.preventDefault();
    changeArtistNumber(-1);
  }
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  loadPortfolioState();
  renderPortfolioGrid();
  // Insertar botones de contacto en cada item del portafolio
  const portfolioItems = document.querySelectorAll('.portfolio-item .portfolio-item-actions');
  portfolioItems.forEach(actions => {
    if (!actions.querySelector('.contact-btn')) {
      const contact = document.createElement('button');
      contact.className = 'contact-btn';
      contact.textContent = 'Contactar / Comisión';
      actions.appendChild(contact);
    }
  });

  // Insertar botones en el grid público si aplica
  const publicGrid = document.getElementById('publicPortfolioGrid');
  if (publicGrid) {
    const publicItems = publicGrid.querySelectorAll('.public-portfolio-item');
    publicItems.forEach(it => {
      if (!it.querySelector('.contact-btn')) {
        const contact = document.createElement('button');
        contact.className = 'contact-btn';
        contact.textContent = 'Contactar / Comisión';
        it.appendChild(contact);
      }
    });
  }

  // Modal handling for portfolio page
  const modal = document.getElementById('commissionModal');
  const closeX = modal ? modal.querySelector('.commission-close') : null;
  const cancelBtn = modal ? modal.querySelector('.btn-cancel-commission') : null;
  const form = modal ? modal.querySelector('#commissionForm') : null;

  document.body.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('contact-btn')) {
      // find artist name in related card
      let card = e.target.closest('.portfolio-item') || e.target.closest('.public-portfolio-item') || e.target.closest('.public-profile-card');
      let artistEl = card ? card.querySelector('h4, h3, .public-preview-info h3') : null;
      let artistName = artistEl ? artistEl.textContent : 'Artista';
      if (modal) {
        modal.style.display = 'flex';
        const artistLabel = modal.querySelector('.commission-artist-name');
        if (artistLabel) artistLabel.textContent = artistName;
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

      const commissions = JSON.parse(localStorage.getItem('commissions') || '[]');
      commissions.push({artist, name, email, phone, payment, details, date: new Date().toISOString()});
      localStorage.setItem('commissions', JSON.stringify(commissions));

      alert('Solicitud de comisión enviada correctamente. El artista será notificado.');
      modal.style.display = 'none';
    });
  }
});
