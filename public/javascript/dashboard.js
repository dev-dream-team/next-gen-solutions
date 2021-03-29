async function searchFormHandler(event) {
    event.preventDefault();

    const interest = document.querySelector("#interest-dropdown").value;
    // const age = document.querySelector("#age-dropdown").value;
    const gender = document.querySelector("#gender-dropdown").value;

    console.log("interest:" + interest + " gender:" + gender)

// add age back in
    if (interest && gender) {
        // const response = await fetch(`/dashboard/search-results?interest=${interest}&gender=${gender}`)
        // alert("clicked")
        // if (response.ok) {
        //     const data = await response.json();
        //     // document.location.replace(`/dashboard/search-results-views`)
        //     const secondFetch = await fetch('/dashboard/search-results-views', {
        //         method: "POST",
        //         body: JSON.stringify(data)
        //     })
        // } else {
        //     alert(response.statusText)
        // }

        document.location.replace(`/dashboard/search-results?interest=${interest}&gender=${gender}`)

        // age &age=${age}
    }
}

document.querySelector("#search-button").addEventListener("click", searchFormHandler);