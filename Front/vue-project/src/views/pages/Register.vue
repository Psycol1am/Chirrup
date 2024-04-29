<template>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h1 class="text-center">Register</h1>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                    <label>First name:</label>
                    <input type="text" class="form-control" name="firstname" v-model="firstname">
                    <div v-show="submitted && !firstname">Name is required</div>
                    <label>Last name:</label>
                    <input type="text" class="form-control" name="text" v-model="lastname">
                    <div v-show="submitted && !lastname">Name is required</div>

                    <br /> <br />
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" name="email" v-model="email">
                    <div v-show="submitted && !email">Email is required</div>
                    </div>

                    <br /><br />

                    <div class="form-group">
                    <label for="password">Password: </label>
                    <input type="password" class="form-control" name="password" v-model="password" />
                    <div v-show="submitted && !password">Password is required</div>
                    </div>

                    <br /><br />

                    <button class="btn btn-warning btn-block text-center">Register</button>
                    <div v-if="error">{{ error }}</div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { userService } from '../../services/users.service'
import * as validator from 'email-validator';
export default {
    data() {
        return {
            email: "",
            password: "",
            submitted: false,
            error: "",
            firstname: "",
            lastname: ""
        }
    },
    methods: {
        handleSubmit(e) {
            this.error = ""
            this.submitted = true
            const { email, password, firstname,lastname } = this

            

            if (!(email && password && firstname && lastname)) {
                return;
            }

            if (!(validator.validate(email))) {
                this.error = "Email must be a valid email"
                return;
            }

            if(firstname.match(/[0-9*]/)) {
                this.error = "Name cannot contain numbers"
                return;
            }
            if(lastname.match(/[0-9*]/)) {
                this.error = "Name cannot cointain numbers"
                return;
            }


            const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,20}$/
            if (!(password_pattern.test(password))) {
                this.error = "Password not strong enough. "
                return;
            }


            userService.register(firstname,lastname,email,password)
                .then(result => {
                    console.log("Auth successful")
                    this.$router.push("/Login")
                })
                .catch(error => {
                    this.error = error;
                    this.submitted = false;
                })
        }
    }
}

</script>
