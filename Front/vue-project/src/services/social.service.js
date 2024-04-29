const search = (query) => {
    return fetch("http://localhost:3333/search?q="+query)

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


const followUser = (user_id) => {
    return fetch("http://localhost:3333/users/"+user_id+"/follow",
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
            throw 'User not found';
        } else if (response.status === 403){
            throw 'Already following'
        }else{
            throw 'Something went wrong'
        }

    })
    .catch(err => {
        console.log(err)
        return Promise.reject(err)
    })

}


const unFollowUser = (user_id) => {
    return fetch("http://localhost:3333/users/"+user_id+"/follow",
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
            throw 'User not found';
        } else if (response.status === 403){
            throw 'You arent following this person'
        }else{
            throw 'Something went wrong'
        }

    })
    .catch(err => {
        console.log(err)
        return Promise.reject(err)
    })

}

const  getUser = (user_id) => {
        return fetch("http://localhost:3333/users/"+user_id,
        {
            headers: {
                "Content-Type":"application/json",
            },
    
        })
        .then(response => {
            if(response.status === 200){
                return response.json();
            }else if (response.status === 404){
                throw 'User not found';
            } else{
                throw 'Something went wrong'
            }
    
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
    
    }

    export const socialService = {
        getUser:getUser,
        search:search,
        followUser:followUser,
        unFollowUser:unFollowUser
    }