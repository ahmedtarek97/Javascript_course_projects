import "core-js/stable";
import "regenerator-runtime/runtime";
import {http} from "./http"
import {ui} from "./ui"

// Event listeners
document.addEventListener('DOMContentLoaded',getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('#posts').addEventListener('click',deletePost);
document.querySelector('#posts').addEventListener('click',enableEdit);
document.querySelector('.card-form').addEventListener('click', cancelEdit);



function getPosts(){
    http.get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitPost() {
        const title = document.querySelector('#title').value;
        const body = document.querySelector('#body').value;
        const id = document.querySelector('#id').value;

        if( title !== "" && body !== ""){ 
            
            const data = {
                title: title,
                body: body
            }

            if(id === ""){                
                // Create a post
                http.post("http://localhost:3000/posts",data)
                .then(data => {
                    ui.showAlert('Post Added','alert alert-success');
                    ui.clearFields();
                    getPosts();
                })
                .catch(err => console.log(err));
                }else{
                    // Update Post
                    http.put(`http://localhost:3000/posts/${id}`, data)
                    .then(data => {
                        ui.showAlert('Post updated', 'alert alert-success');
                        ui.changeFormState('add');
                        getPosts();
                    })
                    .catch(err => console.log(err));
                }

            }else{
                ui.showAlert('Please provide title and body','alert alert-danger');
            }

    
}

function deletePost(e){
    e.preventDefault();
    if(e.target.parentNode.classList.contains('delete')){ 
        const id = e.target.parentNode.getAttribute("data-id");
        if(confirm('Are you sure?')){       
        http.delete(`http://localhost:3000/posts/${id}`)
        .then((out)=>{
            ui.showAlert('Post removed','alert alert-success');
            console.log(out);            
            getPosts();
        })
        .catch(err => console.log(err));       
        
    }
     }  

}

function enableEdit(e) {    
    e.preventDefault();        
    if(e.target.parentNode.classList.contains('edit')){
        const id = e.target.parentNode.getAttribute("data-id");
        const body = e.target.parentNode.previousElementSibling.textContent;
        const title = e.target.parentNode.previousElementSibling.previousElementSibling.textContent;       
        const data = {
            id,
            title,
            body
        }
        
        // fill the form with the post to be edited
        ui.fillForm(data);
    }
}

function cancelEdit(e) {
    if(e.target.classList.contains('post-cancel')) {
      ui.changeFormState('add');
    }
    e.preventDefault();
}
