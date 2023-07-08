

const baseURL = 'https://assignment-5-kappa.vercel.app/'

const userBaseURL = baseURL + 'users'
const postBaseURL = baseURL + 'posts'
async function display() {
    let res = await getPosts();
    let posts = res.posts;
    console.log(res);
    if (posts.length) {
        let cartoona = ``;
        for (let i = 0; i < posts.length; i++) {
            //   const element = array[i];
            cartoona +=
                `
                    <div class="col-md-3 mb-3">
                          <div class="p-3 rounded rounded-5 border border-secondary">
                              <div class="note ">
                                  <div  class="title d-flex">
                                      <div id="title" class="title-text w-50">${posts[i].title}</div>
                                      <div class="note-icons  w-50 d-flex justify-content-end">
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
    let response = await fetch(`${postBaseURL}/posts`, {
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




















/*


delete

*/



async function deleteNote(id) {
    let confirm = window.confirm("Are you sure you want to delete this note")
    if (confirm) {
        const Token = `hambozoo ${localStorage.getItem("token")}`;
        let data = {
            id
        };
        console.log(data);
        let response = await fetch("http://localhost:3000/note/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: Token,
            },
            body: JSON.stringify(data),
        });
        let res = await response.json();
        console.log(res);

        display()

        return res;

    }
}
