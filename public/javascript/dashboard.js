async function searchFormHandler(event) {
    event.preventDefault();

    const interest = document.querySelector("#interest-dropdown").value;
    const age = document.querySelector("#age-dropdown").value;
    const gender = document.querySelector("#gender-dropdown").value;

    if (interest && age && gender) {
        document.location.replace(`dashboard?interest=${interest}&age=${age}&gender=${gender}`)
    }
}

document.querySelector("#search-button").addEventListener("click", searchFormHandler);