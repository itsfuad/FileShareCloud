<script lang="ts">

    import { account } from "$lib/appwrite";
    import { OAuthProvider } from "appwrite";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    export let data;

    let loaded = false;

    let errorMsg = data.error;

    function loginWithGoogle() {
        account.createOAuth2Session(
            OAuthProvider.Google,
            `${window.location.origin}/dash`, // Success URL
            `${window.location.origin}/join?error=google` // Failure URL
        );
    }

    function loginWithGithub() {
        account.createOAuth2Session(
            OAuthProvider.Github,
            `${window.location.origin}/dash`, // Success URL
            `${window.location.origin}/join?error=github` // Failure URL
        );
    }

    onMount(() => {
        loaded = true;
    });

</script>


<svelte:head>
    <title>Login</title>
</svelte:head>

{#if loaded}
<div class="form-container" in:fly={{x: 10}}>
    <div class="form">
        <h1 class="title">Login</h1>
        <div class="errorMsg">
            {errorMsg}
        </div>
        <div class="btnGrp">
            <button class="btn google" on:click={loginWithGoogle}>
                <img src="/images/google.svg" alt="Google" />
            </button>
            <button class="btn github" on:click={loginWithGithub}>
                <img src="/images/github.svg" alt="Github" />
            </button>
        </div>
    </div>
</div>
{/if}

<style lang="scss">
    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 5px;
        gap: 10px;
        font-size: 0.9rem;
        width: 50px !important;
        min-width: 60px;
        background: rgb(231, 231, 231);
        img {
            width: 20px;
            height: 20px;
        }
    }
</style>