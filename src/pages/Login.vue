<script>
import Button from '../components/Button.vue'
import Alert from '../components/Alert.vue'
import { SUBMIT_LOGIN } from '../store/mutation-types'


export default {
    components: {
        Button, Alert
    },
    data() {
        return {
            email: "",
            password: "",
            isLoading: false,
        }
    },
    computed: {
        alert() {
            return this.$store.state.alert;
        }
    },
    methods: {
        async handleLogin() {
            const data = {
                email: this.email,
                password: this.password
            }
            
            this.isLoading = true;
            await this.$store.dispatch(SUBMIT_LOGIN, data);
            this.isLoading = false;

        }


    }
}
</script>

<template>
    <Transition>
        <Alert v-if="alert">
            {{ alert }}
        </Alert>
    </Transition>
    <main class="flex flex-col items-center justify-center md:flex-row h-screen w-screen">
        <div class="w-1/2 flex items-center justify-center">
            <img src="https://placeimg.com/640/480/arch" alt="gambar hero">
        </div>
        <section class="w-1/2 flex items-center justify-center">
            <form class="card pb-16 pt-12 px-10 bg-base-100 shadow-xl border-solid border-2" action=""
                @submit.prevent="handleLogin">
                <div class="card-header mb-4">
                    <h1 class="text-xl font-semibold">Halo, Selamat Datang Kembali</h1>
                </div>
                <div class="my-3">
                    <label for="email">Email</label>
                    <input v-model="email" type="email" id="email" placeholder="Type email here"
                        class="input input-bordered w-full max-w-xs input-sm" />
                </div>
                <div class="my-3">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" id="password" placeholder="Type password here"
                        class="input input-bordered w-full max-w-xs input-sm" />
                    <label class="label">
                        <router-link to="" class="label-text-alt link">Lupa kata sandi?</router-link>
                    </label>
                </div>
                <Button :class="[isLoading ? 'loading' : '']" class="text-white btn-success">
                    {{ isLoading ? "loading" : "Login" }}
                </Button>
                <p class="label-text-alt my-2">Belum memiliki akun? <b class="link">
                        <router-link to="">Daftar Sekarang</router-link>
                    </b>
                </p>
            </form>
        </section>
    </main>
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>