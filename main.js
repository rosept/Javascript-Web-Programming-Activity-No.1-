var input = document.getElementById("inputNum"),
    ibtn = document.getElementById("btnInsert"),
    table = document.getElementById("tb1Records"),
    cibtn = document.getElementById("btnClearItem"),
    tbtn = document.getElementById("btnTotal"),
    records = [];

function clearInput() {
   input.value = "";
   input.focus();
}

ibtn.addEventListener("click", function(e) {
    let regex = /^[1-9][\d]*(,\d+)?$/
    if (!regex.test(input.value)) {
        if (input.value === "") {
            return alert("Please fill up the required field.");
        }
        return alert("Invalid! Please enter whole numbers only!");
    }
    // after identifying if input is a whole number
    let value = Number.parseInt(input.value);
    let identify = (value % 2 == 0) ? "EVEN" : "ODD";
    let row = document.createElement("tr");
    let removebtn = document.createElement("button");
    let editbtn = document.createElement("button");

    

    removebtn.innerText = "Remove";
    editbtn.innerText = "Edit";

    for (let i = 0; i < 3; i++) {
        let col = document.createElement("td");
        col.style.padding = "5px 20px";
        if (i == 0) {
            col.innerText = "" + value;
        } else if (i == 1) {
            let color = identify === "EVEN" ? 'green' : 'red';
            col.innerHTML = `<span style='color: ${color}'>${identify}</span>`;
        } else {
            col.appendChild(removebtn);
            col.appendChild(editbtn);
        }
        row.appendChild(col);
    }
    
    table.appendChild(row);

    removebtn.addEventListener("click", function(e) {
        table.removeChild(row);
        let index = records.indexOf(row);
        if (index > -1) {
            records.splice(index, 1);
        }
    });

    editbtn.addEventListener("click", function(e) {
        value = prompt("Enter a number:");
        if (!regex.test(value)) {
            return alert("Invalid! Please enter whole numbers only!");
        }
        identify = (Number.parseInt(value) % 2 == 0) ? "EVEN" : "ODD";
        let tds = row.children;
        tds[0].innerText = value;
        let color = identify === "EVEN" ? 'green' : 'red';
        tds[1].innerHTML = `<span style='color: ${color}'>${identify}</span>`;
    });
    
    records.push(row);
});


cibtn.addEventListener("click", function(e) {
    for (let i = 0; i < records.length; i++) {
        table.removeChild(records[i]);
    }
    records = [];
});

tbtn.addEventListener("click", function(e) {
    let sum = 0;
    for (let i = 0; i < records.length; i++) {
        let children = records[i].children;
        let value = children[0].innerText;
        sum += Number.parseInt(value);
    }

    let row = document.createElement("tr");
    row.setAttribute("id", "total");
    for (let i = 0; i < 3; i++) {
        let col = document.createElement("td");
        col.style.padding = "5px 20px";
        let style = (i == 0) ? document.createElement("b") : ((i == 1) ? document.createElement("u") : null);
        if (style !== null) {
            style.innerText = (i == 0) ? "TOTAL" : "" + sum;
            col.appendChild(style);
        }
        row.appendChild(col);
    }

    table.appendChild(row);
});