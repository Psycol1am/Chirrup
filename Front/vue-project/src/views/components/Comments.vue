<template>
    <div>
        <h1>Comments </h1>
        <Comment v-for="(comment,index) in comments" :key="index"
        :comment_text="comment.comment_text"
        :author="comment.author"
        :date_published="comment.date_published"
        />
     </div>
</template>

<script>
import Comment from './Comment.vue'
export default{
    data(){
        return{
            comments: [
                {comment_text: "I like Vue", author: "Ben", date_published:"14/11/2022"},
                {comment_text:"Me too!", author: "Charlie", date_published: "14/11/2022"},
                {comment_text:"Me three", author: "Dana", date_published:"14/11/2022"}
            ]
        }
    },
    components: {
    Comment
}
}

</script>