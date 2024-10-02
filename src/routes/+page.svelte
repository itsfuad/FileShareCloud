<script>
    import { isSignedIn } from "$lib/store";


    import { fade, fly } from "svelte/transition";

    let version = __VERSION__;

</script>

<div class="hero">
    <div class="top" in:fly={{y: -5}}>
        <img
            class="logo"
            src="/logo.png"
            alt="logo"
        />
        <div class="name">File Share Cloud</div>
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

{#if $isSignedIn}
    <a href="/dash" class="btn" in:fly={{ delay: 250 }}> Dashboard </a>
{:else}
    <a href="/signin" class="btn" in:fly={{ delay: 250 }}> Get Started </a>
{/if}

<div class="terms" in:fade={{ delay: 300 }}>
    <a href="/terms">Terms of Service</a>
</div>

<style lang="scss">

    .moto {
        max-width: 500px;
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
