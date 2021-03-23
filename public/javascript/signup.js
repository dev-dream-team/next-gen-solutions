async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#psw").value.trim();

  if (username && email && password) {
    fetch("api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    })
    .then(function(response){
      if(response.ok){
      window.alert(response.json.username);  
      document.location.replace("/questionnare");
    } else {
      alert(response.statusText);
    }
  }
  );
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

