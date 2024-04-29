const getFeed = () => {
    return fetch("http://localhost:3333/feed")
    
    .then((response) => {
        if(response.status === 200){
            return response.json();
        }else{
            throw "Something went wrong"
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(error)
    })

}


const getSinglePost = (id) => {
    return fetch("http://localhost:3333/posts/" +id)


    .then((response) => {
        if(response.status === 200){
            return response.json();
        
        }else if(response.status === 404){
            throw "Post not found"
        }else{
            throw "Something went wrong"
        }
    })
    .then((resJson) => {
        localStorage.setItem("author_id", resJson.author.user_id)
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(error)
    })

}

const addPost = (text) => {
    return fetch("http://localhost:3333/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": localStorage.getItem("session_token"),
      },
      body: JSON.stringify({
        text: text,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Missing text';
        } else {
          throw 'Something went wrong';
        }
      })
      .then((rJson) => {
        localStorage.setItem("post_id", rJson.post_id);
        return rJson;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  };
  

  const updatePost = (text, post_id) => {
    return fetch("http://localhost:3333/posts/"+post_id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": localStorage.getItem("session_token"),
      },
      body: JSON.stringify({
        text: text,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
        } else if (response.status === 400) {
          throw 'Misisng text';
        } else  if (response.status === 404){
          throw 'Post not found';
        }else {
            throw 'Something went wrong'
        }
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  };
  

const deletePost = (post_id) => {
    return fetch("http://localhost:3333/posts/"+post_id,
    {
        method:"DELETE",
        headers: {
            "Content-Type":"application/json",
            "X-Authorization": localStorage.getItem("session_token")
        },

        })
        .then(response => {
            if(response.status === 200){
                return response.json();
            }else if (response.status === 404){
                throw 'PSost not found';
            }else if (response.status === 403){
                throw 'Unauthorized (You dont own the post)'
            }
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err)
        })

    }

    const addLike = (post_id) => {
        return fetch("http://localhost:3333/posts/" +post_id+"/like",
        {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
                "X-Authorization": localStorage.getItem("session_token")
            },

        })
        .then(response => {
            if(response.status === 200){
                return response.json();
            }else if (response.status === 404){
                throw 'Post not found';
            } else if (response.status === 403) { 
                throw 'You already liked this post'
            }else{
                throw 'Something went wrong'
            }

        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
   
    }

    const removeLike = (post_id) => {
        return fetch("http://localhost:3333/posts/" +post_id+"/like",
        {
            method:"DELETE",
            headers: {
                "Content-Type":"application/json",
                "X-Authorization": localStorage.getItem("session_token")
            },

        })
        .then(response => {
            if(response.status === 200){
                return response.json();
            }else if (response.status === 404){
                throw 'Post not found';
            } else if (response.status === 403){
                throw 'You havent liked this post'
            }else{
                throw 'Something went wrong'
            }

        })
        .catch(err => {
            cansole.log(err)
            return Promise.reject(err)
        })
    }


export const postService = {
    getSinglePost,
    getFeed,
    addPost,
    updatePost,
    deletePost,
    addLike,
    removeLike

}
