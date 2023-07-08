$("#userName").html(localStorage.getItem('name'));


const baseURL = 'https://assignment-5-kappa.vercel.app/'

const userBaseURL = baseURL + 'users'
const postBaseURL = baseURL + 'posts'


async function display() {
    let res = await getPosts();
    let posts = res.posts;

    if (posts.length) {
        let cartoona = ``;
        for (let i = 0; i < posts.length; i++) {
            //   const element = array[i];
            cartoona +=
                `
                    <div class="col-md-3 mb-3">
                          <div class="p-3 rounded rounded-5 border border-secondary">
                              <div id="${i}" class="note ">
                              <p class="d-none" id="id">${posts[i]._id}</p>
                                  <div  class="title d-flex">
                                      <div id="title" class="title-text w-50">${posts[i].title}</div>
                                      <div class="note-icons  w-50 d-flex justify-content-end">
                                          <i onclick="getUpdateData(${i})"  class="icon-hover fa-solid fa-pen icon rounded me-3  d-flex align-items-center justify-content-center"></i>
                                          <i onclick="deleteNote('${posts[i]._id}')"  class="icon-hover fa-solid fa-trash  icon rounded  d-flex align-items-center justify-content-center"></i>
                                      </div>
                                  </div>
                                  <div id="content" class="description mt-3 border-top border-secondary  p-2 pt-2 overflow-auto">${posts[i].content}</div>
                              </div>
                          </div>
                      </div>
            `;
        }
        $("#posts").html(cartoona);
    } else {
        const message = `
                        <p class="text-center h2"> no posts added yet</p>
                    `
        $("#posts").html(message);
    }
}
display()





async function getPosts() {
    const _id = localStorage.getItem('_id')
    let response = await fetch(`${userBaseURL}/get-profile/${_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let res = await response.json();
    return res;
}





async function collectDataAddPost() {
    let title = $("#title").val();
    let content = $("#description").val();
    let data = {
        title,
        content,
    };
    let res = await addPost(data);
    console.log({ res });
    if (res.content) {
        display();
        $("#title").val("");
        $("#description").val("");
    } else {
        console.log({ res });
    }
}


// {
//     "title": "post two",
//     "content": "post one content",
//     "userID": "649611d6379c7a3b64408c7b"
// }

async function addPost(data) {
    const userID = localStorage.getItem("_id");
    data.userID = userID
    let response = await fetch(`${postBaseURL}/add-post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    let res = await response.json();
    return res;
}





//   Update


function getUpdateData(index) {
    let title = $(`#${index} #title`).text()
    let content = $(`#${index} #content`).text()
    let id = $(`#${index} #id`).text();
    $("#title").val(title);
    $("#description").val(content);
    $("#add").attr("disabled", "disabled");
    $("#update").prop("disabled", false);
    $("#update").attr("onclick", `update("${id}")`);
    $(window).scrollTop(0)
}
async function update(id) {
    const _id = localStorage.getItem("_id");
    const title = $(`#title`).val();
    const content = $(`#description`).val();
    let data = {
        title,
        content,
        userID:_id
    };
    console.log(data);
    let response = await fetch(`${postBaseURL}/update-post/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    let res = await response.json();
    console.log(res);



    document.getElementById('add').disabled = false
    document.getElementById('update').disabled = true
    $("#title").val("");
    $("#description").val("");

    display()
    return res;
}








async function deleteNote(id) {
    let confirm = window.confirm("Are you sure you want to delete this note")
    if (confirm) {
        const userID = localStorage.getItem("_id");
        let data = {
            userID
        };
        console.log(data);
        let response = await fetch(`${postBaseURL}/delete-post/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        let res = await response.json();
        console.log(res);

        display()

        return res;

    }
}


