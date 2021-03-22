async function signupQuestionnareFormHandler(event) {
    event.preventDefault();
  
    const age = document.querySelector("#age").value;
    const bio = document.querySelector("#bio").value;
    

    var gender = $('#genderselection input:radio:checked').val();
    //var gender = $('#genderselection label.active input').val()
    const phone = document.querySelector("#phone").value;
   
    // const id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    //   ];
    //   console.log(window.location.toString());
    //   console.log(age);
    //   console.log(bio);
    //   console.log(gender);
    //   console.log(phone);
    //   console.log(id);

  
    // if (age) {
    //   console.log(age);
      const response = await fetch(`api/userProfiles/9`, {
        method: "PUT",
        body: JSON.stringify({
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