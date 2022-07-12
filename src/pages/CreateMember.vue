<script>
import { GET_PROVINCES, GET_CITIES, POST_OFFICES, CHANGE_ALERT } from '../store/mutation-types'
import Modal from '../components/Modal.vue'

export default {
    props: {
        handleCreate: Function
    },
    data() {
        // get input value from localstorage
        const { name, birthdate, email, address, jenis_kelamin } = JSON.stringify(localStorage.getItem("FormMember"))
        
        return {
            name: name ?? "",
            birthdate: birthdate ?? "",
            address: address ?? "",
            npwp_name: "",
            npwp_number: "",
            bank_name: "",
            bank_account_name: "",
            bank_branch_name: "",
            bank_account_number: "",
            alamat_npwp: "",
            office_registration_id: "", // ??
            office_referral_id: "", // ??
            province_id: "",
            city_id: "",
            status: "",
            isProvinceLoading: false,
            isKotaLoading: false,
            isKotaDisabled: true,
            isSubmitLoading: false,
        };
    },
    mounted() {
        // must be collect the province and cities first
        this.$store.dispatch(GET_PROVINCES);
        this.$store.dispatch(GET_CITIES);
    },
    computed: {
        provinces() {
            return this.$store.state.provinces;
        },
        cities() {
            return this.$store.state.cities;
        }
    },
    methods: {
        async handleSubmit() {
            // data schema that'll send to backend

            const data = {
                "type": "offices",
                "attributes": {
                    "office_type": "member",
                    "office_registration_id": "0b1dd075-ca5e-441f-8a54-5544cd1d1268",
                    "office_referral_id": "753acdfc-6bb6-4225-890c-43f576b75d06",
                    "name": this.name,
                    "birthdate": this.birthdate,

                    "bank_account_number": this.bank_account_number,

                    "bank_account_name": this.bank_account_name,
                    "bank_name": "BRI",
                    "bank_branch_name": this.bank_branch_name,
                    "address": this.address,
                    "npwp_number": this.npwp_number,
                    "npwp_name": this.npwp_name,
                    "address_details": [
                        {
                            "province_id": this.province_id,
                            "city_id": this.city_id
                        }
                    ]
                },
                "relationships": {
                    "office-category": {
                        "data": {
                            "type": "office-categories",
                            "id": "4f34bb7a-d6e6-4d9e-bc59-f21bfab424fe"
                        }
                    }
                }
            }

            // in case if the input is  accidentaly got reset
            localStorage.setItem('FormMember', data)

            this.isSubmitLoading = true;
            await this.$store.dispatch(POST_OFFICES, { data })
            this.isSubmitLoading = false;

        }
    },
    components: { Modal }
}
</script>
<template>
    <form class="md:px-20">
        <div class="flex justify-between mt-10 mb-5">
            <h1 class="mb-4 text-4xl font-bold">Tambah Data Member</h1>
            <button @click="handleCreate()" class="btn btn-secondary shadow-lg" tabindex="-1">Kembali</button>
        </div>
        <section class="card bg-base-100 shadow-lg border-solid border-2 overflow-x-auto">
            <div class="mx-8 my-4 pb-7 pt-4">
                <h2 class="text-xl font-semibold mb-5">Atur Biodata Member</h2>
                <div class="flex">
                    <div class="w-1/2">
                        <label class="label">
                            <span class="label-text">Nama Member <span to="" class="label-text-alt text-red-700">
                                    (*)</span></span>
                        </label>
                        <input v-model="name" type="text" placeholder="Type here" class="input input-bordered w-full"
                            required />
                    </div>
                    <div class="ml-3 w-1/2">
                        <label class="label">
                            <span class="label-text">Tanggal Lahir <span to="" class="label-text-alt text-red-700">
                                    (*)</span></span>
                        </label>
                        <input v-model="birthdate" type="date" placeholder="Type here"
                            class="input input-bordered w-full" required />
                    </div>
                </div>
                <div>
                    <label class="label">
                        <span class="label-text">Alamat <span to="" class="label-text-alt text-red-700">
                                (*)</span></span>
                    </label>
                    <input v-model="address" type="text" placeholder="Type here" class="input input-bordered w-full"
                        required />
                </div>
            </div>
        </section>
        <section class="card bg-base-100 shadow-lg border-solid border-2 overflow-x-auto mt-10">
            <div class="mx-8 my-4 pb-7 pt-4">
                <h2 class="text-xl font-semibold mb-5">Atur NPWP</h2>
                <div>
                    <label class="label">
                        <span class="label-text">Nama NPWP<span to="" class="label-text-alt text-red-700">
                                (*)</span></span>
                    </label>
                    <input v-model="npwp_name" type="text" placeholder="Type here"
                        class="input input-bordered w-full" />
                </div>
                <div>
                    <label class="label">
                        <span class="label-text">Nomer NPWP<span to="" class="label-text-alt text-red-700">
                                (*)</span></span>
                    </label>
                    <input v-model="npwp_number" type="text" placeholder="Type here"
                        class="input input-bordered w-full" />
                </div>
                <div>
                    <label class="label">
                        <span class="label-text">Alamat NPWP<span to="" class="label-text-alt text-red-700">
                                (*)</span></span>
                    </label>
                    <input v-model="alamat_npwp" type="text" placeholder="Type here"
                        class="input input-bordered w-full" />
                </div>
                <div>
                    <label class="label">
                        <span class="label-text">Nama Bank<span to="" class="label-text-alt text-red-700">
                                (*)</span></span>
                    </label>
                    <input v-model="bank_name" type="text" placeholder="Type here"
                        class="input input-bordered w-full" />
                </div>
                <div>
                    <label class="label">
                        <span class="label-text">Lokasi Cabang Bank<span to="" class="label-text-alt text-red-700">
                                (*)</span></span>
                    </label>
                    <input v-model="bank_branch_name" type="text" placeholder="Type here"
                        class="input input-bordered w-full" />
                </div>
                <div>
                    <label class="label">
                        <span class="label-text">Nama Akun di Bank<span to="" class="label-text-alt text-red-700">
                                (*)</span></span>
                    </label>
                    <input v-model="bank_account_name" type="text" placeholder="Type here"
                        class="input input-bordered w-full" />
                </div>
                <div>
                    <label class="label">
                        <span class="label-text">Nomer Akun di Bank<span to="" class="label-text-alt text-red-700">
                                (*)</span></span>
                    </label>
                    <input v-model="bank_account_number" type="text" placeholder="Type here"
                        class="input input-bordered w-full" />
                </div>
            </div>
        </section>
        <section class="card bg-base-100 shadow-lg border-solid border-2 overflow-x-auto mt-10">
            <div class="mx-8 my-4 pb-7 pt-4">
                <h2 class="text-xl font-semibold mb-5">Atur Kantor</h2>
                <div>
                    <label class="label">
                        <span class="label-text">Kode Kantor<span to="" class="label-text-alt text-red-700">
                                (*)</span></span>
                    </label>
                    <input v-model="office_registration_id" type="text" placeholder="Type here"
                        class="input input-bordered w-full" required />
                </div>
                <div>
                    <label class="label">
                        <span class="label-text">Alamat Kantor<span to="" class="label-text-alt text-red-700">
                                (*)</span></span>
                    </label>
                    <input v-model="office_referral_id" type="text" placeholder="Type here"
                        class="input input-bordered w-full" required />
                </div>
                <div class="flex">
                    <div class="w-1/2 form-control">
                        <label class="label">
                            <span class="label-text">Pilih Provinsi<span to="" class="label-text-alt text-red-700">
                                    (*)</span></span>
                        </label>
                        <select v-model="province_id" class="select select-bordered">
                            <option disabled selected> {{ isProvinceLoading ? "Loading..." : "Pilih Provinsi"}}</option>
                            <option v-for="item in provinces" :value="item.id">{{
                                item.attributes.name }}
                            </option>
                        </select>
                    </div>
                    <div class="ml-3 w-1/2">
                        <label class="label">
                            <span class="label-text">Kota<span to="" class="label-text-alt text-red-700">
                                    (*)</span></span>
                        </label>
                        <select v-model="city_id" class="select select-bordered w-full">
                            <option disabled selected>Pilih Kota</option>
                            <option v-for="item in cities" :value="item.id">{{ item.attributes.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
        <div class="flex justify-between my-12">
            <label for="my-modal-1" class="btn modal-button">Kembali</label>
            <Modal id="my-modal-1" onReject onAccept>
                <h3 class="font-bold text-lg">Yakin?</h3>
                <p class="py-4">Yakin pengen kembali?</p>
            </Modal>
            <div class="flex">
                <label for="my-modal-2" class="btn btn-warning modal-button mx-10">Reset</label>
                <Modal id="my-modal-2" onReject onAccept>
                    <h3 class="font-bold text-lg">Are you sure?</h3>
                    <p class="py-4">Yakin pengen ngereset? nanti susah baliknya loh</p>
                </Modal>
                <button @click.prevent="handleSubmit" :class="[isSubmitLoading ? 'loading' : '']"
                    class="btn btn-primary">Simpan</button>
            </div>
        </div>
    </form>
</template>