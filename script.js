document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('queryForm');
    const responseContainer = document.getElementById('responseContainer');

    const responseContainer_image=document.getElementById('responseContainer_image');
    const responseContainer_shortdescription=document.getElementById('responseContainer_shortdescription ');
    const responseContainer_video=document.getElementById('responseContainer_video');
    const responseContainer_briefdescription=document.getElementById('responseContainer_briefdescription ');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get the user input from the form
        const query = document.getElementById('query').value;

        // Make a POST request to the backend with the user query
        const response = await fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });


        // Parse the response from the server
        const data = await response.json();

        // Display the AI-generated response on the UI
        responseContainer.innerHTML = `<p>${data.response}</p>`;
        responseContainer.style.display = 'block';

        responseContainer_shortdescription.innerHTML=`<p>${data.response1}</p>`;
        responseContainer_image.innerHTML=`<img src="${data.response2}">`;
        responseContainer_video.innerHTML=` <iframe src="${data.response3}" allowfullscreen></iframe>`;
        responseContainer_briefdescription.innerHTML=`<p>${data.response4}</p>`;
    });
});
