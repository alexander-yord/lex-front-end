async function get_post (endpoint, data) {
    const response = await fetch(endpoint, {
        method: "POST", 
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log(response.status)
    const creds = await response.json();
    console.log(creds);
    console.log(creds["first_name"])
    return creds;
}

HOSTNAME = "79.100.219.84";
try {
    if (window.location.hostname == "192.168.1.17") {
        HOSTNAME = "192.168.1.17";
    }
} 
catch {
    console.log("You are probably running this as a local file");
}