console.log("connected");

let btn = document.getElementById("btn");

btn.addEventListener("click", () => {
   let xhr = new XMLHttpRequest();

   //    let count = document.getElementById('country').value;
   //    let state = document.getElementById('state').value;
   xhr.open(
      "GET",
      `http://universities.hipolabs.com/search?country=${count}`,
      true
   );

   xhr.onload = function () {
      if (this.status == 200) {
         //   console.log(JSON.parse(this.responseText));
         let obj = JSON.parse(this.responseText);

         obj.forEach((element) => {
            // if (
            //    element["state-province"] == "" ||
            //    element.name.includes("Kerala")
            // ) {
            console.log(element.name);
            // }
         });
      }
   };

   xhr.send();
});
