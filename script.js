const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("username");
const result = document.getElementById("result");

searchBtn.addEventListener("click", searchUser);

function searchUser() {
  const username = usernameInput.value.trim();

  if (username === "") {
    result.innerHTML = "<p class='error'>Please enter a username</p>";
    return;
  }

  fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("User not found");
      }
      return res.json();
    })
    .then(user => {
      showUser(user);
    })
    .catch(() => {
      result.innerHTML = "<p class='error'>User not found </p>";
    });
}

function showUser(user) {
  result.innerHTML = `
    <div class="card">
      <img src="${user.avatar_url}" alt="avatar">
      <h2>${user.login}</h2>
      <p>ID: ${user.id}</p>
      <p>Type: ${user.type}</p>
      <a href="${user.html_url}" target="_blank">View Profile</a>
    </div>
  `;
}
