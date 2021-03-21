// create a custom api 
// check npm package that would make a fetch request to 3rd party

// const secretKey = process.env.CLOUD_NAME

const url = `https://api.cloudinary.com/v1_1/${secretKey}/image/upload`;

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const files = document.querySelector("[type=file]").files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    formData.append("file", file);
    formData.append("upload_preset", "docs_upload_unsigned_us_preset");

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.getElementById("data").innerHTML += data.secure_url;
        // make put request to userProofile route
      });
  }
});
