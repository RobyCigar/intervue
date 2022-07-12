<script>
import { GET_OFFICES } from '../store/mutation-types'
import CreateMember from './CreateMember.vue'
import Alert from '../components/Alert.vue'

export default {
    components: {
        CreateMember,
        Alert
    },
    data() {
        return { 
            tabs: [ "Dashboard", "Member" ],
            activeTab: "Dashboard",
            isCreate: true
        };
    },
    mounted() {
        this.$store.dispatch(GET_OFFICES)
    },
    computed: {
        offices() {
            return this.$store.state.offices
        },
        alert() {
            return this.$store.state.alert;
        }
    },
    methods: {
        selectTab(selectedTab) {
            this.activeTab = selectedTab
        },
        handleCreate() {
            this.isCreate = !this.isCreate
        },
    }
}
</script>

<template>
    <Transition>
        <Alert v-if="alert" class="flex justify-between">
            {{ alert }}
        </Alert>
    </Transition>
    <header class="flex justify-center mt-6">
        <div v-for="tab in tabs" class="tab tab-bordered" :class="{'tab-active': activeTab === tab }">
            <div @click="selectTab(tab)">{{ tab }}</div>
        </div>
    </header>
    <template v-if="isCreate">
        <section class="md:px-20" v-if="activeTab === 'Dashboard'">
            <div class="flex justify-between mt-10">
                <h1 class="mb-4 text-4xl font-bold">Master Member</h1>
                <button @click="isCreate = !isCreate" class="btn btn-primary">Tambah</button>
            </div>
            <div class="card bg-base-100 shadow-lg overflow-x-auto">
                <table class="table table-zebra w-full">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tipe Member</th>
                            <th>Kode Member</th>
                            <th>Nama Member</th>
                            <th>Alamat</th>
                            <th>Telp</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="({ attributes }, i) in offices">
                            <th>{{ i + 1}}</th>
                            <!-- tipe member -->
                            <td>{{ attributes.office_type }}</td>
                            <!-- kode member -->
                            <td>{{ attributes.code }}</td>
                            <!-- nama member -->
                            <td>{{ attributes.name }}</td>
                            <!-- alamat -->
                            <td>{{ attributes.address }}</td>
                            <!-- telp -->
                            <td>{{ attributes.phone ?? "Tidak ada" }}</td>
                            <!-- status -->
                            <td class="link">Lihat</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div class="flex justify-end mt-8">
                <div class="btn-group">
                    <button class="btn btn-primary">1</button>
                    <button class="btn">2</button>
                    <button class="btn btn-disabled">...</button>
                    <button class="btn">99</button>
                    <button class="btn">100</button>
                </div>
            </div>
        </section>
    </template>
    <template v-else>
        <CreateMember :handleCreate="handleCreate" />
    </template>
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