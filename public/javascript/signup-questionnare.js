async function signupQuestionnareFormHandler(event) {
    event.preventDefault();
  
    const age = document.querySelector("#age").value;
    const bio = document.querySelector("#bio").value;
    var gender = $( "input:checked" ).val();
    const phone = document.querySelector("#phone").value;
   
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    // if (age) {
    //   console.log(age);
      const response = await fetch("api/userProfiles/questionnare", {
        method: "PUT",
        body: JSON.stringify({
            id,
          age,
          bio,
          gender,
          phone
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/bio");
      } else {
        alert(response.statusText);
      }
    } 
//   }
  
  document
    .querySelector(".nextbtn")
    .addEventListener("click", signupQuestionnareFormHandler);

