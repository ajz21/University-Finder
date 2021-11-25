// http://universities.hipolabs.com/search?country=${count}

/* <div class="universityCard">
<div class="content"><p>University of Kerala</p></div>
<button class="btn"><a href="">Go to Website</a></button>
</div> */

let fetchBtn = document.getElementById("fetchBtn"),
    container = document.getElementById("universtityContainer"),
    loader = document.querySelector(".loader"),
    count = document.getElementById("Country"),
    state = document.getElementById("state").value;

fetchBtn.addEventListener("click", () => {
    loader.style.display = "block";
    let xhr = new XMLHttpRequest();

    xhr.open(
        "GET",
        `http://universities.hipolabs.com/search?country=${count.value}`,
        true
    );

    let str = "";

    // xhr.onprogress = function () {
    //     loader.style.display = "block";
    // };

    xhr.onload = function () {
        if (this.status == 200) {
            let universityObj = JSON.parse(this.responseText);

            universityObj.forEach((element) => {
                str += `<div class="universityCard">
                <div class="content"><p>${element.name}</p></div>
                <button class="btn"><a href="${element.web_pages}" target="_blank">Go to Website</a></button>
                </div>`;
            });
            loader.style.display = "none";
            container.innerHTML = str;
        }
    };

    xhr.send();
    count.value = "";
});
