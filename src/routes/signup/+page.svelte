<script lang="ts">

    import { account } from "$lib/appwrite";

    let uid: string = "";
    let email: string = "";
    let password: string = "";
    let passwordConfirm: string = "";
    let error: string = "";

    async function handleSubmit() {

        if (!email || !password || !passwordConfirm) {
            error = "All fields are required";
            return;
        }

        if (password !== passwordConfirm) {
            error = "Passwords do not match";
            return;
        }

        try {
            let success = "";
            //const oauth = account.createOAuth2("google", "https://appwrite.io/auth/oauth2/callback");
            let oauth = "";
            await account.createOAuth2Session(null, success, error);
            error = "";
        } catch (e) {
            console.log(e);
        }
    }

</script>

<svelte:head>
    <title>Sign up</title>
</svelte:head>

<div class="form-container">
    <div class="title">

    </div>
</div>