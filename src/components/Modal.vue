<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        onReject: Boolean,
        onAccept: Boolean
    }
}
</script>

<template>
    <input type="checkbox" :id="id" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
            <slot></slot>
            <div class="modal-action">
                <label v-if="onReject" :for="id" class="btn btn-primary">Cancel</label>
                <label v-if="onAccept" :for="id" class="btn btn-error">Yes</label>
            </div>
        </div>
    </div>
</template>