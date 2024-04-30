// get the tags from html and store it as constants
const userInput = document.querySelector(".userInput");
const submitButton = document.querySelector("#submitButton");
const tableBody = document.querySelector("#tableBody");

// function that does the fetch request to the API
function fetchResults(event) {
    
    
    event.preventDefault();
    // Api resource
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b5a229a0a0msha55cb792598a8b7p1af127jsne8c47ffa25f0',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    fetch(`https://spotify23.p.rapidapi.com/search/?q=${userInput.value}&type=albums&offset=0&limit=10&numberOfTopResults=5`, options)
        .then(response => response.json())
        .then(json => displayResults(json)); // Using our function to take Json object
    
};


function displayResults(json) {

      // store the array as a variable
    let ArtistAlbums = json.albums.items;

    if (ArtistAlbums.length === 0) {
        // Display a message or show an alert
        alert("No albums found for the provided artist name.");
        return; // Exit the function early
    }
    
    // loop throught the array
    for (let i = 0; i < ArtistAlbums.length; i++) {
        console.log(ArtistAlbums[i].items);
        
        // create elements for the dom
        let tableTr = document.createElement("tr"); // <tr></tr>
        let albumNameTd= document.createElement("td"); // <td></td>
        let linkTd = document.createElement("td"); // <td></td>
        let yearTd = document.createElement("td"); // <td></td>
        let posterTd = document.createElement("td"); // <td></td>

         // Create the <a> element to wrap the SVG icon and set its attributes
        let a = document.createElement("a");

        // Modify the Spotify URI to a Spotify URL
    function convertToSpotifyURL(uri) {
    // Split the URI by ':'
         const parts = uri.split(':');
    // Extract the album ID from the parts
        const albumID = parts[2];
    // Construct the Spotify URL using the album ID
        const spotifyURL = `https://open.spotify.com/album/${albumID}`;

        return spotifyURL;
    }
    // creating the correct URL
        let albumURI  = ArtistAlbums[i].data.uri;
        let albumURL = convertToSpotifyURL(albumURI);
//  Adding the url and the option to open in a new link
        a.setAttribute("href", albumURL);         
        a.setAttribute("target", "_blank");
        // adding the icons
        let svgHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" class="bi bi-file-music-fill" viewBox="0 0 16 16">
         <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-.5 4.11v1.8l-2.5.5v5.09c0 .495-.301.883-.662 1.123C7.974 12.866 7.499 13 7 13s-.974-.134-1.338-.377C5.302 12.383 5 11.995 5 11.5s.301-.883.662-1.123C6.026 10.134 6.501 10 7 10c.356 0 .7.068 1 .196V4.41a1 1 0 0 1 .804-.98l1.5-.3a1 1 0 0 1 1.196.98"/>
        </svg>`;
        a.innerHTML = svgHtml;

        albumNameTd.textContent = ArtistAlbums[i].data.name;              
        yearTd.textContent = ArtistAlbums[i].data.date.year;             

        let image = document.createElement("img"); // creating <img>
        image.setAttribute("src", ArtistAlbums[i].data.coverArt.sources[2].url);
        image.setAttribute("height", "100px");
        image.setAttribute("alt", ArtistAlbums[i].data.name);
        posterTd.appendChild(image);

        // add all the td tags to tr tag
        tableTr.appendChild(posterTd);
        tableTr.appendChild(albumNameTd);
        tableTr.appendChild(yearTd);
        tableTr.appendChild(linkTd);

        linkTd.appendChild(a);   
        // add the completed tr tag to tbody
        tableBody.appendChild(tableTr);
         
    }
}

// create an event listener on the button, which calls the fetch function
submitButton.addEventListener("click", fetchResults);