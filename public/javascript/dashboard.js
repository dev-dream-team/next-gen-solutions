async function searchFormHandler(event) {
    event.preventDefault();

    const interest = document.querySelector("#interest-dropdown").value;
    // const age = document.querySelector("#age-dropdown").value;
    const gender = document.querySelector("#gender-dropdown").value;

    console.log(interest, gender)

// add age back in
    if (interest && gender) {
        const response = await fetch(`/dashboard/search-results?interest=${interest}&${gender}`)
        alert("clicked")
        if (response.ok) {
            document.location.replace(`/dashboard/search-results`)
        } else {
            alert(response.statusText)
        }
        // age &age=${age}

    }
}

document.querySelector("#search-button").addEventListener("click", searchFormHandler);