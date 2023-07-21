// SELECTIONS
const btnLogin = document.querySelector(".btn-login");
const btnLogout = document.querySelector(".btn-logout");
const ipUsername = document.querySelector(".ip-username");
const ipPassword = document.querySelector(".ip-password");
const loginMessage = document.querySelector(".login-message");
const curUsername = document.querySelector(".cur-username");
const profile = document.querySelector(".profile");

const formCtn = document.querySelector(".form-ctn");
const userInfo = document.querySelector(".user-info");
const usersListCtn = document.querySelector(".users-lists-ctn");
const usersLists = document.querySelector(".user-lists");
const btnShowList = document.querySelector(".btn-users-list");
const btnBackToUser = document.querySelector(".btn-back-to-user");

// DECLARE
let curUser = "";

// FUNCTIONALITIES
async function checkUser(e) {
   e.preventDefault();
   const res = await fetch("users.json");
   const users = await res.json();

   users.forEach((user) => {
      if (
         user.username === ipUsername.value &&
         user.password === ipPassword.value
      ) {
         curUser = user;
         changeUser(user);
         formCtn.reset();
      } else {
         loginMessage.textContent = "INVALID LOGIN";
      }
   });
}

let haveFetched = false;

async function showUserList() {
   if (!haveFetched) {
      const res = await fetch("users.json");
      const users = await res.json();

      users.forEach((user) => {
         const html = `
            <div class="user-list">
               <span>
                  <img class="user-profile" src="${user.profile}">
                  <span class="user-name">${user.name}</span>
               </span>
               <div class="user-status">ACTIVE</div>
            </div>
         `;
         usersLists.innerHTML += html;
      });
      haveFetched = true;
   }
}

function showUser() {
   usersListCtn.classList.remove("hide");
   userInfo.classList.add("hide");
   showUserList();
}

function changeUser(user) {
   curUsername.textContent = user.name;
   formCtn.classList.add("hide");
   userInfo.classList.remove("hide");

   profile.src = user.profile;
   if (user.account === "admin") {
      btnShowList.classList.remove("hide");
   } else {
      btnShowList.classList.add("hide");
   }
}

function logout() {
   formCtn.classList.remove("hide");
   userInfo.classList.add("hide");
   loginMessage.textContent = "";
   ipUsername.focus();
}
function backToCurUser() {
   usersListCtn.classList.add("hide");
   changeUser(curUser);
}

// HANDLERS
btnLogin.addEventListener("click", checkUser);
btnLogout.addEventListener("click", logout);
btnShowList.addEventListener("click", showUser);
btnBackToUser.addEventListener("click", backToCurUser);
