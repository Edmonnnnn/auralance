// js/profile.js

// =============== 1. Проверка токена и загрузка пользователя ===============
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html';
}

fetch('http://127.0.0.1:8000/auth/me', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  }
})
  .then(response => {
    if (!response.ok) throw new Error('Unauthorized');
    return response.json();
  })
  .then(user => {
    setupProfile(user);
  })
  .catch(err => {
    console.error(err);
    window.location.href = 'login.html';
  });

// =============== 2. Настройка профиля ===============
function setupProfile(user) {
  let profile = JSON.parse(localStorage.getItem('profile')) || {};

  document.getElementById('profile-firstname').value = profile.firstname || (user.username.split('@')[0] || '');
  document.getElementById('profile-lastname').value = profile.lastname || '';
  document.getElementById('profile-email').value = user.username || '';
  document.getElementById('profile-date-joined').value = profile.dateJoined || user.dateJoined || new Date().toISOString().split('T')[0];
  document.getElementById('profile-role').value = profile.role || 'Freelancer';
  document.getElementById('profile-bio').value = profile.bio || '';
  document.getElementById('profile-skills').value = (profile.skills || []).join(', ');
  document.getElementById('profile-telegram').value = profile.telegram || '';
  document.getElementById('profile-lastseen').value = profile.lastSeen || 'just now';
  document.getElementById('profile-status').textContent = profile.role || 'Freelancer';

  setEditable(false);
  renderSkills();
}

// =============== 3. Редактировать/Сохранить ===============
document.getElementById('edit-profile-btn').onclick = function () {
  setEditable(true);
  document.getElementById('edit-profile-btn').style.display = 'none';
  document.getElementById('save-profile-btn').style.display = '';
};

document.getElementById('profile-form').onsubmit = function (e) {
  e.preventDefault();
  const firstname = document.getElementById('profile-firstname').value.trim();
  const lastname = document.getElementById('profile-lastname').value.trim();
  const bio = document.getElementById('profile-bio').value.trim();
  const skillsRaw = document.getElementById('profile-skills').value.trim();
  const skills = skillsRaw ? skillsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
  const telegram = document.getElementById('profile-telegram').value.trim();
  const role = document.getElementById('profile-role').value;

  if (!firstname || !lastname) {
    showMsg('Please enter first and last name', 'error');
    return;
  }

  const profile = {
    firstname,
    lastname,
    bio,
    skills,
    telegram,
    role,
    dateJoined: document.getElementById('profile-date-joined').value,
    lastSeen: 'just now',
  };

  localStorage.setItem('profile', JSON.stringify(profile));
  setEditable(false);
  document.getElementById('edit-profile-btn').style.display = '';
  document.getElementById('save-profile-btn').style.display = 'none';
  document.getElementById('profile-status').textContent = role;
  showMsg('Profile saved!', 'success');
  renderSkills();
};

// =============== 4. Skills as tags ===============
function renderSkills() {
  const list = document.getElementById('skills-list');
  list.innerHTML = '';
  const skillsRaw = document.getElementById('profile-skills').value.trim();
  const skills = skillsRaw ? skillsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
  skills.forEach(skill => {
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.textContent = skill;
    list.appendChild(tag);
  });
}
document.getElementById('profile-skills').addEventListener('input', renderSkills);

// =============== 5. Log Out ===============
document.getElementById('logout-btn').onclick = function () {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
};

// =============== 6. Delete Account ===============
document.getElementById('delete-account-btn').onclick = function () {
  if (confirm('Delete account? This cannot be undone!')) {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    window.location.href = 'signup.html';
  }
};

// =============== 7. Helpers ===============
function setEditable(editable) {
  [
    'profile-firstname', 'profile-lastname', 'profile-bio',
    'profile-skills', 'profile-telegram', 'profile-role'
  ].forEach(id => {
    document.getElementById(id).readOnly = !editable;
    document.getElementById(id).disabled = !editable && id === 'profile-role';
  });
  document.getElementById('profile-bio').readOnly = !editable;
  document.getElementById('profile-skills').readOnly = !editable;
  document.getElementById('profile-role').disabled = !editable;
}

function showMsg(msg, type) {
  const m = document.getElementById('profile-message');
  m.textContent = msg;
  m.className = 'profile-message ' + (type || '');
  setTimeout(() => { m.textContent = ''; }, 2200);
}
