async function get_post (endpoint, data) {
    const response = await fetch(endpoint, {
        method: "POST", 
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log(response.status);
    if (response.status == 200) {
        const res = await response.json();
        return res;
    }
    else {
        return {"success": false};
    }
}

function create_lex(number, data) {
    const card = document.createElement("div");
    card.className = "lex";
    card.id = "lex-"+number.toString();
    content = "<normalsize float='left'><b>"+data["first_name"]+ " " + data["last_name"]+"</b></normalsize>";
    content += "&nbsp &nbsp <a style='font-size: 16px;'>@"+data["username"]+"</a>";
    content += "<a style='float: right; display: none;'  onclick='copyUrl()'> Share</a> <br>";
    content += "<p>"+data["content"]+"</p>";
    content += "<normalsize style='float: right'>Published: "+data["publish_dt"] +" </normalsize><br>";
    card.innerHTML = content;
    return card;
}

async function add_lex_bulk(index, container) {
    response = await get_post("http://"+HOSTNAME+":5000/all_lexes" , {"index": index});
    if (response["success"] == true) {
        lexes_data = response["result"];
        for (i=0; i<lexes_data.length; i++) {
            // lexes_data[i] returns the i-th lex object
            container.appendChild(create_lex(index*10+i, lexes_data[i]));
        }
    }
}

HOSTNAME = "192.168.1.17";
try {
    if (window.location.hostname == "192.168.1.17") {
        HOSTNAME = "192.168.1.17";
    }
    if (window.location.hostname == "79.100.219.84") {
        HOSTNAME = "79.100.219.84";
    }
} 
catch {
    console.log("You are probably running this as a local file");
}