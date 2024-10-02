<script lang="ts">
    import "$lib/forms.scss";
    import { goto } from "$app/navigation";
    import { account, isLoggedIn } from "$lib/appwrite";
    import { fly } from "svelte/transition";

    let emailInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let email: string = "";
    let password: string = "";
    let showPassword: boolean = false;
    let errorIn: "email" | "password" | null = null;
    let error: string = "";
    let errorMsg: string = "";

    let processing: boolean = false;

    let loaded = false;

    const isEmailValid = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    function preValidate() {
        if (!email) {
            error = "Email is required";
            errorIn = "email";
            emailInput.focus();
            return false;
        }

        if (!isEmailValid(email)) {
            error = "Invalid email";
            errorIn = "email";
            emailInput.focus();
            return false;
        }

        if (!password) {
            error = "Password is required";
            errorIn = "password";
            passwordInput.focus();
            return false;
        }

        return true;
    }

    async function handleSubmit() {
        if (!preValidate()) {
            return;
        }

        try {
            processing = true;
            const res = await account.createEmailPasswordSession(email, password);
            console.log(res);
            goto("/dash");
        } catch (e) {
            errorMsg = "Invalid email or password";
            console.log(e);
        } finally {
            processing = false;
        }
    }

    async function check() {
        if (await isLoggedIn()) {
            goto("/dash");
        } else {
            console.log("Not logged in");
            loaded = true;
        }
    }

    check();

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
        <div class="form-field animated" class:error={errorIn == "email"}>
            <input
                on:input={() => {
                    if (errorIn === "email") {
                        error = "";
                        errorIn = null;
                    }
                }}
                bind:this={emailInput}
                type="email"
                name="email"
                placeholder="Email"
                bind:value={email}
            />
            <label for="email">
                {#if errorIn === "email"}
                    {error}
                {:else}
                    Email
                {/if}
            </label>
        </div>
        <div class="form-field animated" class:error={errorIn == "password"}>
            {#if showPassword}
                <input
                    on:input={() => {
                        if (errorIn === "password") {
                            error = "";
                            errorIn = null;
                        }
                    }}
                    bind:this={passwordInput}
                    type="text"
                    name="password"
                    placeholder="Password"
                    bind:value={password}
                />
            {:else}
                <input
                    on:input={() => {
                        if (errorIn === "password") {
                            error = "";
                            errorIn = null;
                        }
                    }}
                    bind:this={passwordInput}
                    type="password"
                    name="password"
                    placeholder="Password"
                    bind:value={password}
                />
            {/if}
            <label for="password">
                {#if errorIn === "password"}
                    {error}
                {:else}
                    Password
                {/if}
            </label>
            <button
                class="showPassword"
                on:click={() => {
                    showPassword = !showPassword;
                }}
            >
                <i class="fas fa-eye {showPassword ? "fa-eye-slash" : ""}"></i>
            </button>
        </div>
        <button class="btn login" on:click={handleSubmit} disabled={processing}>
            {#if processing}
                Logging in...
            {:else}
                Login
            {/if}
        </button>
        <div class="dash">
            Don't have an account? <a href="/signin">Sign up</a>
        </div>
    </div>
</div>
{/if}

<style lang="scss">
    .login {
        margin-top: 22px;
    }
</style>