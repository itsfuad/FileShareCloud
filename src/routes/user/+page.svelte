<script lang="ts">
    import { goto } from "$app/navigation";
    import { account, isEmailVerified } from "$lib/appwrite";

    let user = "User";

    account.get().then((model) => {
        user = model.$id;
        console.log(model);
    }).catch((e) => {
        console.log(e);
        goto("/signin");
    });

    //say greeting based on time of day, like "Good morning, Good afternoon, Good evening"
    const date = new Date();
    const hours = date.getHours();
    let greeting = "Hello";

    if (hours >= 0 && hours < 12) {
        greeting = "Good morning";
    } else if (hours >= 12 && hours < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    function handleNumChange() {
        console.log("Change phone number");
    }

    function handleLogout() {
        console.log("Logout");
        account.deleteSession("current").then(() => {
            goto("/signin");
        }).catch((e) => {
            console.log(e);
        });
    }

    async function handleDelete() {
        console.log("Delete account");
        fetch(`https://cloud.appwrite.io/v1/users/${user}`, {
            method: "DELETE",
        })
            .then((res) => {
                console.log(res);
                account.deleteSession("current").then(() => {
                    goto("/signup");
                }).catch((e) => {
                    console.log(e);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

</script>

<svelte:head>
    <title>User</title>
</svelte:head>

<div class="container">
    <div class="topbar">
        <div class="title">
            {greeting}, {user}!
        </div>
    </div>
    <div class="options">
        <div class="changePhone">
            <div class="title">Change Phone Number</div>
            <div class="description">Change your phone number</div>
            <button on:click={handleNumChange}>
                <i class="fa-solid fa-phone"></i>
            </button>
        </div>
        {#await isEmailVerified() then isVerified}
            {#if !isVerified}
            <div class="verifyEmail">
                <a href="/verify">
                    Verify Email
                    <i class="fa-solid fa-envelope"></i>
                </a>
            </div>
            {/if}
        {/await}
        <div class="logout">
            <div class="title">Logout</div>
            <div class="description">Logout from your account</div>
            <button on:click={handleLogout}>
                <i class="fa-solid fa-sign-out"></i>
            </button>
        </div>
        <div class="delete">
            <div class="title">Delete Account</div>
            <div class="description">Delete your account</div>
            <button on:click={handleDelete}>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    </div>
</div>
