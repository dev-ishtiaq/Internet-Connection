const popup = document.querySelector(".popup");
const wifiIcon = document.querySelector(".icon i");
const popupTitle = document.querySelector(".popup .title");
const popupDesc = document.querySelector(".desc");
reconnectBtn = document.querySelector(".reconnect");

// if online
let isOn = true, intervalId, timer = 10; 

const chkCon = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOn = response.status >= 200 && response.status < 300;
    } catch (error) {
        isOn = false;
    }
    timer = 10;
    clearInterval(intervalId);
    hndlPop(isOn);
}
// handle popup bar
    const hndlPop = (status) => {
        if (status) { //if the status is true (online), update icon, title, and description
            wifiIcon.className = "fa-solid fa-wifi";
            popupTitle.innerText = "restored connection";
            popupDesc.innerHTML = "Your device is successfully connected to internet";
            popup.classList.add("online");
            return setTimeout(() => popup.classList.remove("show", "online"), 2000);
        }
        //if the status is false (offline), update icon, title, and description
        wifiIcon.className = "fa-solid fa-xmark";
        popupTitle.innerText = "lost connection";
        popupDesc.innerHTML = "Your connection unavailable we will redirect you within <b>10</b> seconds";
        popup.className = "popup show";
        intervalId = setInterval(() => {
            timer--;
            if(timer === 0) chkCon();
            popup.querySelector(".desc b").innerText = timer;

        }, 1000);
    }

setInterval(() => isOn && chkCon(), 3000);
reconnectBtn.addEventListener("click", chkCon);