$("#userName").html(localStorage.getItem('name'));


const baseURL = 'https://assignment-5-kappa.vercel.app/'

const userBaseURL = baseURL + 'users'


async function getUserData() {
    const _id = localStorage.getItem('_id')
    let response = await fetch(`${userBaseURL}/get-profile/${_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let res = await response.json();
    // return res;
    $("#firstName").val(res.firstName);
    $("#lastName").val(res.lastName);
    $("#age").val(res.age);

}
getUserData()


async function updateUser(data) {
    const _id = localStorage.getItem('_id');
    let response = await fetch(`${userBaseURL}/update/${_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    let res = await response.json();
    return res;
}

async function collectUpdateUserData() {
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let age = $("#age").val();

    let data = {
        firstName,
        lastName,
        age,
    };
    let res = await updateUser(data);
    if (res.message == "Done") {
        console.log(`${res.user.firstName} ${res.user.lastName}`);
        localStorage.setItem("name", `${res.user.firstName} ${res.user.lastName}`);
        $("#userName").html(`${res.user.firstName} ${res.user.lastName}`);

        window.location.replace("home.html");
    } else {
        alert(res.message);
    }

}


async function deleteUser() {
    const _id = localStorage.getItem('_id');
    let response = await fetch(`${userBaseURL}/delete/${_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    localStorage.removeItem("_id");
    localStorage.removeItem("name");
    window.location.replace("index.html");
    let res = await response.json();
    return res;
}


