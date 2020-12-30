const github = new Github();
const ui = new UI();
// search input
const saerchUser = document.getElementById('searchUser');
saerchUser.addEventListener('keyup',(e)=>{
    // get the input text
    const userText = saerchUser.value;

    if(userText !== ''){
        // make http call to get a user
        github.getUser(userText)
        .then(data => {
            if(data.profile.message ==='Not Found'){
                ui.showAlert('User not found','alert alert-danger');
            }else{
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);

            }
        });
    }else{

        ui.clearProfile();

    }
})