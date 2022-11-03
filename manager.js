const wrapper = document.querySelector(".wrapper");
let customersArr = [];
let number = 0;
const myUrl = "https://nlp-hadassa.herokuapp.com/client";

const doApi = () => {
    fetch(myUrl)
        .then(resp => resp.json())
        .then(data => {
            customersArr = [...data];
            createManagerPage();
        })
}

const createManagerPage = () => {
    wrapper.innerHTML = "";
    number = 0;
    customersArr.forEach(customer => {
        number++;
        const tr = document.createElement("tr");
        tr.className = "tr";
        wrapper.append(tr);
        tr.innerHTML = `
            <td>${number}</td>
            <th>${customer.firstName}</th>
            <th>${customer.lastName}</th>
            <td>${customer.gender}</td>
            <td>${customer.age}</td>
            <th>${customer.phone}</th>
            <th>${customer.mail}</th>
            <td><button class="btn btn-outline-danger" id="${customer._id}">הסר</button></td>
    `
        const btn = tr.querySelector(".btn");
        removeCustomer(btn);
    })
}

const removeCustomer = (_btn) => {
    _btn.addEventListener("click", () => {
        let result = confirm("למחוק לקוח זה?");
        if (result) {
            removeCustomerFromDb(_btn);
        }
    })
}

const removeCustomerFromDb = (_btn) => {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", myUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener("readystatechange", function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            doApi();
        }
    })

    xhr.send(JSON.stringify({ _id: _btn.id }));
}
doApi();