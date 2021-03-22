async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#psw").value.trim();
  console.log("###################");
  console.log(username);
  if (username && email && password) {
    console.log(username);
    const response = await fetch("api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(JSON.stringify(response.body))
    console.log(String(response.body.id))
    console.log(""+response.body.id)
    console.log(response.body.username)
    console.log(response.body.email)


    // let userid = response.body.id
    // window.alert(String(userid))
// localhost:3008/api/users    
// REsponse should look like this:
// {
//   "id": 17,
//   "username": "sss",
//   "email": "abc@red.com",
//   "password": "$2b$10$omJYLeMuEnCJXVufphCteeljVePkWI7Yc/JHBStiJhMe1DaUJpgtq"
// }
// Print out the response.json
//Copy out the id response from the response json into a variable
// Use that in the put request body to update user info

    if (response.ok) {
      document.location.replace("/questionnare");
    } else {
      alert(response.statusText);
    }
  } 

}

document
  .querySelector(".nextbtn")
  .addEventListener("click", signupFormHandler);


  // $(document).ready(function(){
  //   // Prepare the preview for profile picture
  //       $("#wizard-picture").change(function(){
  //           readURL(this);
  //       });
  //   });
  //   function readURL(input) {
  //       if (input.files && input.files[0]) {
  //           var reader = new FileReader();
    
  //           reader.onload = function (e) {
  //               $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
  //           }
  //           reader.readAsDataURL(input.files[0]);
  //       }
  //   }

