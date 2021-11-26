// http://universities.hipolabs.com/search?country=${count}

let fetchBtn = document.getElementById("fetchBtn"),
    container = document.getElementById("universtityContainer"),
    loader = document.querySelector(".loader"),
    count = document.getElementById("Country"),
    institution = document.getElementById("Institute"),
    state = document.getElementById("state");

function giveValue() {
    if (count.value != "") {
        searchValue = count.value;
        return [searchValue, "country"];
    } else if (state.value != "") {
        searchValue = state.value;
        return [searchValue, "state-province"];
    } else if (institution.value != "") {
        searchValue = institution.value;
        return [searchValue, "name"];
    }
}

fetchBtn.addEventListener("click", () => {
    let arr = giveValue();

    let searchValue = arr.splice(0, 1).toString();
    let key = arr.splice(-1, 1).toString();

    loader.style.display = "block";
    let xhr = new XMLHttpRequest();

    xhr.open("GET", `http://universities.hipolabs.com/search?country`, true);

    let str = "";

    xhr.onload = function () {
        let universityObj = JSON.parse(this.responseText);

        return new Promise((resolve) => {
            universityObj.forEach((element) => {
                if (element[key] == searchValue) {
                    str += `<div class="universityCard">
                <div class="content"><p class="name">${element.name}</p></div>
                <p class="country">${element.country}</p>
                <button class="btn"><a href="${element.web_pages}" target="_blank" style="color:#d05b06;">Go to Website</a></button>
                </div>`;
                }
            });

            loader.style.display = "none";
            container.innerHTML = str;

            error = true;
            if (!error) {
                resolve();
            } else {
                clearValue();
            }
        });
    };

    xhr.send();

    function clearValue() {
        if (count != null) {
            count.value = "";
        }
        if (state != null) {
            state.value = "";
        }
        if (institution != null) {
            institution.value = "";
        }
    }
});
