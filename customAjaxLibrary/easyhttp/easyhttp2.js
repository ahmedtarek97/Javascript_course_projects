
class EassyHttp{

    // get request
    get(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));

        });

        

    }
    // post request
    post(url,data){
        return new Promise((resolve,reject)=>{
            fetch(url,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(data)
            })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));

        });

        

    }

    // put request
    put(url,data){
        return new Promise((resolve,reject)=>{
            fetch(url,{
                method:'PUT',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(data)
            })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));

        });

        

    }


    // delete request
    delete(url){
        return new Promise((resolve,reject)=>{
            fetch(url,{
                method:'DELETE',
                headers:{
                    'Content-type':'application/json'
                }
                
            })
        .then(res => res.json())
        .then(() => resolve('deleted successfully'))
        .catch(err => reject(err));

        });

        

    }

}

