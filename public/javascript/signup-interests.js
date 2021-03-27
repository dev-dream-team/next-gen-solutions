async function signupInterestFormHandler(event) {
    event.preventDefault();
  

    var interest = $('#interest input:checkbox:checked').val();
   
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

  
    if (interest) {
      console.log(age);
      const response = await fetch(`/api/userProfiles/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          interest
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/bio");
      } else {
        alert(response.statusText);
      }
    } 
  }
  
  document
    .querySelector(".nextbtn")
    .addEventListener("click", signupInterestFormHandler);