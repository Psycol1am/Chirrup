<template>
    <BNavbar variant="primary" v-b-color-mode="'dark'">
        <BNavForm>
            <BFormInput v-model="searchQuery" placeholder="Search" />
            <BButton @click="searchUsers" variant="light" class="" type="submit">Search</BButton>
        </BNavForm>
        <BNavbarBrand v-if="authenticated">
            <BLink to="/dashboard"><img src="../../../public/favicon.ico"></BLink>
        </BNavbarBrand>
        <BNavbarBrand v-else>
            <BLink to="/"><img src="../../../public/favicon.ico"></BLink>
        </BNavbarBrand>
        <BNavItem v-if="authenticated">
            <BButton variant="light" @click="logout">Logout</BButton>
        </BNavItem>
        <BNavItem v-else>
            <BLink to="/Login">
                <BButton variant="light">Login/Logout</BButton>
            </BLink>
        </BNavItem>
    </BNavbar>
</template>

<script>
import {userService} from "../../services/users.service.js"

export default {
    data() {
        return {
            searchQuery: "",
        };
    },
    props: {
        authenticated: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        searchUsers() {
            this.$router.push({ 
                name: "SearchResults", 
                query: { searchQuery:this.searchQuery}});
                },
        logout() {
            userService.logOut()
                .then(result => {
                    console.log("Logged out")
                    this.$router.push("/")
                })
                .catch(error => this.error = error);
        }
    }

}
</script>