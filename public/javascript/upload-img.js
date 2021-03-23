async function uploadFileHandler(e) {
  e.preventDefault(); //prevents default behavior, in this case, form submission
  const files = document.querySelector("[type=file]").files;
  let file = files[0];
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    // set userProfile picture
    response.json().then((data) => {
      // TODO: remove hardcoding and replace w/ actual userProfile id
      fetch("/api/userProfiles/1", {
        method: "PUT",
        body: JSON.stringify({
          profile_url: data.url,
        }),
        headers: { "Content-Type": "application/json" },
      });
    });
    alert("Your profile picture has been successfully saved");
    // TODO: redirect to next screen
  } else {
    alert(response.statusText);
  }
}

document.querySelector("form").addEventListener("submit", uploadFileHandler);
