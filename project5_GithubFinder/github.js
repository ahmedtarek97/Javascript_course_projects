class Github{
    constructor(){
        this.client_id = '8f3b0bfd5004b3b7fa04';
        this.client_secret = '1581d1240b8aa63053978857ea52b0cc02a6264a';
        this.repos_count = 5;
        this.repos_sort = 'created: asc'
    }

    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&this.client_secret=${this.client_secret}`);
        const profile = await profileResponse.json();

        const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&this.client_secret=${this.client_secret}`);
        const repos = await reposResponse.json();
        return {
            // same as profile:profile
            profile,
            repos
        }

    }
}