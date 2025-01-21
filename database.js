document.getElementById('fetchUsers').addEventListener('click', async () => {
  const response = await fetch('/api/users');
  const users = await response.json();
  const usersList = document.getElementById('usersList');
  usersList.innerHTML = users.map(user => `<li>${user.name}</li>`).join('');
});