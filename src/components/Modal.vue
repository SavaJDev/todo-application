<template>
    <div class="modal-backdrop">
        <div class="modal">
            <div class="modal__content">
                <h1>Exactly remove?</h1>
            </div>
            <div class="modal__footer">
                <div class="btn-cancel" @click="btnCancel">
                    <p>Cancel</p>
                </div>
                <div class="btn-delete" @click="btnDelete">
                    <p>Delete</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        data () {
            return {
            }
        },
        components: {
        },
        methods: {
            btnCancel() {
                this.$emit("btnCancel")
            },
            btnDelete() {
                this.$emit("btnDelete")
            }
        }
    }
</script>

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-y: auto;
        z-index: 20;
        align-items: flex-start;
    }
    
    .modal {
        width: 500px;
        height: 150px;
        background: #ffffff;
        border-radius: 5px;
        margin-top: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    }
    
    .modal__content {
        margin-top: 30px;
        margin-bottom: 20px;
    }
    
    h1 {
        color: red;
    }
    
    .modal__footer {
        display: flex;
    }
    
    .btn-cancel {
        width: 80px;
        height: 25px;
        background: #a7a7a7;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 50px;
    }
    
    .btn-cancel p {
        color: white;
    }
    
    .btn-cancel:hover {
        background: #919191;
    }
    
    .btn-delete {
        width: 80px;
        height: 25px;
        background: red;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 50px;
    }
    
    .btn-delete p {
        color: white;
    }
    
    .btn-delete:hover {
        background: #d63f3f;
    }
</style>