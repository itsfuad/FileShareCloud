<script lang="ts">
    import { enhance } from "$app/forms";
    import { account, login } from "$lib/appwrite.js";

    import Preload from "$lib/Preload.svelte";
    import { OAuthProvider } from "appwrite";
    import { onMount } from "svelte";

    import { fade, fly } from "svelte/transition";

    let version = __VERSION__;

    let signedIn = false;
    let loaded = false;

    account.get().then((res) => {
        signedIn = true;
    }).catch((e) => {
        signedIn = false;
    }).finally(() => {
        loaded = true;
    });

</script>

{#if loaded}
    <div class="container">
        <div class="hero">
            <div class="top" in:fly={{ y: -5 }}>
                <img class="logo" src="/logo.png" alt="logo" />
                <div class="name">File Basket</div>
                <div class="version-info">
                    <div class="version">v.{version}</div>
                    Free and Open Source
                </div>
            </div>
            <h1 class="moto" in:fly={{ y: 5, duration: 600 }}>
                Share files with anyone, anywhere.
            </h1>
            <div class="info-container">
                <li class="info" in:fade={{ delay: 100 }}>
                    Upload up to 50MB single file at once.
                </li>
                <li class="info" in:fade={{ delay: 150 }}>
                    Your files will be deleted after 30 min.
                </li>
            </div>
        </div>

        {#if signedIn}
            <a href="/dash" class="btn" in:fly={{ delay: 250 }}> Dashboard </a>
        {:else}
            <div class="form">
                <div class="join-title">Login with</div>
                <div class="btnGrp">
                    <button
                        type="submit"
                        class="btn sign google"
                        on:click={() => {
                            login(OAuthProvider.Google);
                        }}
                    >
                        <img src="/images/google.svg" alt="Google" />
                    </button>
                    <button
                        type="submit"
                        class="btn sign github"
                        on:click={() => {
                            login(OAuthProvider.Github);
                        }}
                    >
                        <img src="/images/github.svg" alt="Github" />
                    </button>
                    <button
                        type="submit"
                        class="btn sign discord"
                        on:click={() => {
                            login(OAuthProvider.Discord);
                        }}
                    >
                        <img src="/images/discord.svg" alt="Discord" />
                    </button>
                </div>
            </div>
        {/if}
        <div class="terms" in:fade={{ delay: 300 }}>
            <a href="/terms">Terms of Service</a>
        </div>
        <div class="footer" in:fade>
            &copy; {new Date().getFullYear()} BrainbirdLab
        </div>
    </div>
{:else}
    <Preload />
{/if}

<style lang="scss">
    .container {
        background-color: var(--bg-color);
        background-image: url("/images/bg.svg");
        background-blend-mode: soft-light;
        background-size: cover;
        background-attachment: fixed;
        color: var(--text-color);
    }

    .footer {
        padding: 1rem;
        text-align: center;
        font-size: 0.7rem;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .moto {
        max-width: 500px;
    }

    .join-title {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 5px;
        white-space: nowrap;
        font-size: 0.9rem;
        &::before,
        &::after {
            // make a line before and after the text
            content: "";
            display: inline-block;
            width: 25%;
            height: 2px;
            background: var(--transparent-white);
        }
    }

    .btn.sign {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        gap: 10px;
        font-size: 1.3rem;
        width: 50px !important;
        min-width: 60px;
        background: no-repeat;
        margin: 0;
        img {
            width: 30px;
            height: 30px;
        }
    }

    .top {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 1rem;
        img {
            width: 90px;
            height: 90px;
        }
        .name {
            font-size: 1.5rem;
            color: #ffffff;
        }
    }

    .version-info {
        font-size: 0.65rem;
        color: #ffffff;
        padding: 0 5px 0 0;
        border-radius: 5px;
        width: max-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-weight: normal;
        gap: 5px;
        background: rgba(91, 251, 91, 0.156);
        color: rgb(170, 255, 170);
        .version {
            background: rgba(0, 0, 0, 0.997);
            height: 100%;
            padding: 5px 5px;
            color: ghostwhite;
            font-family: inherit;
            border-top-left-radius: inherit;
            border-bottom-left-radius: inherit;
        }
    }

    .hero {
        text-align: center;
        margin-bottom: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .hero h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .info-container {
        max-width: 300px;
    }

    .info {
        font-size: 0.8rem;
        color: var(--transparent-white);
        text-align: left;
    }

    .terms {
        text-align: center;
        margin-top: 2rem;
    }
</style>
