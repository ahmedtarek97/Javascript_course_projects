// const http = new easyhttp();

// // get posts
// // http.get('https://jsonplaceholder.typicode.com/posts',
// // function(err,posts){
// //     if(err){
// //         console.log(err);
// //     }else{
// //         console.log(posts)
// //     }
   
// // });

// //create data to post
// const data = {
//     title: 'custom post',
//     body: 'this is a custom post'
// };
// // http.post('https://jsonplaceholder.typicode.com/posts',data,function(err,post){
// //     if(err){
// //                console.log(err);
// //            }else{
// //                 console.log(post)
// //             }
// // });

// //update post 
// // http.put('https://jsonplaceholder.typicode.com/posts/1',data,function(err,posts){
// //         if(err){
// //            console.log(err);
// //       }else{
// //             console.log(posts)
// //         }
       
// //      });

// http.delete('https://jsonplaceholder.typicode.com/posts/1',
// function(err,posts){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(posts)
//     }
   
// });

const http = new EassyHttp();

// http.get('https://jsonplaceholder.typicode.com/users')
// .then(data => console.log(data))
// .catch(err => console.log(err));

const data = {
    name:'ahmed tarek3',
    username:'adsada23',
    email:'adad@adasdasd23.com'
}

// http.put('https://jsonplaceholder.typicode.com/posts/2',data)
// .then(data => console.log(data))
// .catch(err => console.log(err));


http.delete('https://jsonplaceholder.typicode.com/users/2')
 .then(data => console.log(data))
 .catch(err => console.log(err));
