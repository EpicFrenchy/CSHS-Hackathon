function volunteer(){
    document.getElementById("info").style.display="none"
    document.getElementById("forms").style.display="block"
    document.getElementById("game").style.display="none"
}
function information(){
    document.getElementById("forms").style.display="none"
    document.getElementById("info").style.display="block"
    document.getElementById("game").style.display="none"
}
function game(){
    document.getElementById("forms").style.display="none"
    document.getElementById("info").style.display="none"
    document.getElementById("game").style.display="block"
}

let results = [];

        function btnClick() {
            try {
                const firstName = document.getElementById("firstName").value;
                const lastName = document.getElementById("lastName").value;
                const gender = document.querySelector('input[name="gender"]:checked').value;
                const database = document.getElementById("database").checked ? "Yes" : "No";
                const phone = document.getElementById("phone").value;

                if (database === "Yes") {
                    results.push({
                        "firstName": firstName,
                        "lastName": lastName,
                        "phoneNumber": phone,
                        "Gender": gender,
                        "databaseAcceptable": database
                    });
                }

                console.log(results);

                localStorage.setItem("results", JSON.stringify(results));
                console.log(localStorage);
                updateTable();

                const dataToSend = {
                    "firstName": firstName,
                    "lastName": lastName,
                    "phoneNumber": phone,
                    "Gender": gender,
                    "databaseAcceptable": database
                };

                fetch('http://localhost:3000/api/saveData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

                document.getElementById("firstName").value = "";
                document.getElementById("lastName").value = "";
                document.getElementById("phone").value = "";
                document.querySelector('input[name="gender"]:checked').checked = false;
                document.getElementById("database").checked = false;
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }


function updateTable() {
    const tableBody = document.getElementById("table");

    while (tableBody.rows.length > 1) {
        tableBody.deleteRow(1);
    }


    results.forEach((data, index) => {
        const newRow = tableBody.insertRow();
        const keys = Object.keys(data);

        keys.forEach(key => {
            const newCell = newRow.insertCell();
            newCell.textContent = data[key];
        });


        const deleteCell = newRow.insertCell();
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.onclick = function () {
            const rowIndex = this.parentNode.parentNode.rowIndex - 1;
            deleteRowAndData(index);
            console.log(results);
        };

        deleteCell.appendChild(deleteButton);
    });
}

function deleteRowAndData(index) {
    results.splice(index, 1);
    updateTable(); 

    localStorage.setItem("results", JSON.stringify(results));
    
}


function loadResultsFromLocalStorage() {
    const storedResults = localStorage.getItem("results");
    if (storedResults) {
        results = JSON.parse(storedResults);
        updateTable();
    }
}
console.log(JSON.stringify(results));
loadResultsFromLocalStorage();
function show(){
    document.getElementById("table").style.visibility="visible";
}
function closedb(){
    document.getElementById("table").style.visibility="hidden";
}

    function destroy(){
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("phone").value="";
        document.querySelector('input[name="gender"]:checked').checked = false;
        document.getElementById("database").checked = false;
    }

    function onlyAlphabets(event) {
        try {
            if (window.event) {
                var charCode = window.event.keyCode;
            } else if (event) {
                var charCode = event.which;
            } else {
                return true;
            }
            if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
                return true;
            else
                return false;
        } catch (err) {
            alert(err.Description);
        }
    }

    function onlyNumber(event) {
        try {
            if (window.event) {
                var charCode = window.event.keyCode;
            } else if (event) {
                var charCode = event.which;
            } else {
                return true;
            }
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;
            else
                return true;
        } catch (err) {
            alert(err.Description);
        }
    }



    let table = document.getElementById("table");


    var character = document.getElementById("character");
    var block = document.getElementById("block");
    var counter = 0;
    var isGameStarted = false;
    
    function jump() {
        if (!isGameStarted || character.classList == "animate") {
            return;
        }
        character.classList.add("animate");
        setTimeout(function () {
            character.classList.remove("animate");
        }, 300);
    }
    
    function handleKeyPress(event) {
        if (event.key === "ArrowUp") {
            jump();
        }
    }
    
    var checkDead = setInterval(function () {
        if (!isGameStarted) {
            return;
        }
    
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    
        if (blockLeft < 20 && blockLeft > -20 && characterTop >= 130) {
            block.style.animation = "none";
            alert("Game Over. score: " + Math.floor(counter / 100));
            counter = 0;
            block.style.animation = "block 1s infinite linear";
        } else {
            counter++;
            document.getElementById("scoreSpan").innerHTML = Math.floor(counter / 100);
        }
    }, 10);
    
    document.getElementById("start").addEventListener("click", function () {
        isGameStarted = true;
    });
    
    document.getElementById("stop").addEventListener("click", function () {
        isGameStarted = false;
    });
    
    document.addEventListener("keydown", handleKeyPress);