// http://universities.hipolabs.com/search?country=${count}

// decalring varables
let fetchBtn = document.getElementById("fetchBtn"),
    container = document.getElementById("universtityContainer"),
    loader = document.querySelector(".loader"),
    count = document.getElementById("Country"),
    institution = document.getElementById("Institute"),
    state = document.getElementById("state");

// function to return the searched value and type in an array
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

// calling function when search button is clicked
fetchBtn.addEventListener("click", loadUniversity);

// funciton loaduniversity
function loadUniversity() {
    // calling givevalue function declard outside to recive search value and type
    let arr = giveValue();

    // splitting the two values from array and assigning them to variable
    let searchValue = arr.splice(0, 1).toString();
    let key = arr.splice(-1, 1).toString();

    // displaying loader animation
    loader.style.display = "block";

    // making XMLHttpRequest object and assigning it to variable xhr
    let xhr = new XMLHttpRequest();

    // opening the xhr object and extracting the JSON data asynchronously
    xhr.open("GET", `http://universities.hipolabs.com/search?country`, true);

    // declaring an empty string
    let str = "";

    // function when the xhr object loads
    xhr.onload = function () {
        // parsing the recieved JSON data and assigning to universityObj
        let universityObj = JSON.parse(this.responseText);

        // declaring a promise
        return new Promise((resolve) => {
            // looping the through the object to get each element
            universityObj.forEach((element) => {
                // checking if the searched value is in the given type of key
                if (element[key] == searchValue) {
                    // if found adding an html string using template literal
                    str += `<div class="universityCard">
                <div class="content"><p class="name">${element.name}</p></div>
                <p class="country">${element.country}</p>
                <button class="btn"><a href="${element.web_pages}" target="_blank" style="color:#d05b06;">Go to Website</a></button>
                </div>`;
                }
            });

            // hiding the loader animation
            loader.style.display = "none";

            // adding the strhtml to container
            container.innerHTML = str;

            // to clear the value inside the input tag if all the functions are over
            error = true;
            if (!error) {
                resolve();
            } else {
                clearValue();
            }
        });
    };

    // sending the xhr request
    xhr.send();

    // function to clear value inside the input tag
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
}
