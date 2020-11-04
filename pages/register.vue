<template>
    <v-container>
        <div class="form-wrapper mx-auto blue lighten-5">
            <v-form class="form pa-8">
                <h1 class="text-center my-10">註冊帳戶</h1>
                <v-text-field
                    filled
                    color="blue" 
                    dense
                    label="電子郵件" 
                    placeholder="Email">
                </v-text-field>
                <v-text-field 
                    filled
                    dense 
                    label="密碼"
                    placeholder="Password">
                </v-text-field>
                <div class="button">
                    <v-btn  
                        color="green" 
                        outlined type="submit">
                        註冊
                    </v-btn>
                </div>
            </v-form>
        </div>
    </v-container>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .form-wrapper {
        max-width: 600px;
        height: 600px;
    }
    .form {
        margin: 0 0;
    }
    .button {
        text-align: center;
    }
    
</style>