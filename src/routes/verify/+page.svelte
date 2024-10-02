<script lang="ts">
    import { goto } from "$app/navigation";
    import { account, isEmailVerified } from "$lib/appwrite";
    import { onMount } from "svelte";

    let loaded = false;

    export let data;

    let message = "";

    let isVerified = false;

    let codeSent = false;

    async function check() {
        if (data.status === 200) {
            //verification process
            account.updateVerification(data.props.userId, data.props.secret).then((res) => {
                console.log('Verification successful');
                message = "Verification successful. You can close this tab now";
                localStorage.setItem("verified", "true");
                loaded = true;
                isVerified = true;
            }).catch((e) => {
                console.log(e);
                message = "Verification failed. Please try again";
            });
        } else {
            if (await isEmailVerified()){
                goto("/dash");
            } 
            message = "Please verify your email";
            loaded = true;
        }
    }

    function sendCode() {
        message = "Sending verification email...";
        account.createVerification(`${window.location.origin}/verify`).then((res) => {
            console.log(res);
            message = "Verification email sent. Please check your email";
        }).catch((e) => {
            console.log(e);
        });
    }

    onMount(() => {
        window.addEventListener("storage", async (e) => {
            //close this tab if verification is successful
            console.log(`key: ${e.key}, newValue: ${e.newValue}`);
            if (e.key === "verified" && e.newValue === "true") {
                if (await isEmailVerified()) {
                    isVerified = true;
                    goto("/dash");
                }
            }
        });
    });

    check();

</script>

<svelte:head>
    <title>Verify</title>
</svelte:head>

{#if loaded}
{message}
{#if !isVerified && !codeSent}
    <button on:click={sendCode}>Send verification email</button>
{/if}
{/if}