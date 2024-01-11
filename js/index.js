document.addEventListener('DOMContentLoaded', function () {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    githubForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm !== '') {
        searchGitHubUsers(searchTerm);
      }
    });
  
    function searchGitHubUsers(username) {
      const apiUrl = `https://api.github.com/search/users?q=${username}`;
      fetch(apiUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(data => displayUserResults(data.items))
      .catch(error => console.error('Error fetching user data:', error));
    }
  
    function displayUserResults(users) {
      userList.innerHTML = '';
      reposList.innerHTML = '';
  
      users.forEach(user => {
        const userElement = document.createElement('li');
        userElement.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50">
          <p><strong>${user.login}</strong></p>
          <a href="${user.html_url}" target="_blank">View Profile</a>
        `;
        userElement.addEventListener('click', () => {
          getUserRepos(user.login);
        });
  
        userList.appendChild(userElement);
      });
    }
  
    function getUserRepos(username) {
      const apiUrl = `https://api.github.com/users/${username}/repos`;
      fetch(apiUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(data => displayRepos(data))
      .catch(error => console.error('Error fetching repo data:', error));
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
  
      repos.forEach(repo => {
        const repoElement = document.createElement('li');
        repoElement.innerHTML = `
          <p><strong>${repo.name}</strong></p>
          <p>${repo.description || 'No description available'}</p>
          <a href="${repo.html_url}" target="_blank">View Repository</a>
        `;
        reposList.appendChild(repoElement);
      });
    }
  });
  