<script lang="ts">
    import "$lib/forms.scss";
    import { goto } from "$app/navigation";

    import { account, isLoggedIn } from "$lib/appwrite";
    import { fly } from "svelte/transition";

    let loaded = false;

    let uidInput: HTMLInputElement;
    let emailInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let confirmPasswordInput: HTMLInputElement;
    let uid: string = "";
    let email: string = "";
    let password: string = "";
    let confirmPassword: string = "";

    let showPassword: boolean = false;

    let uidLabel: string = "User ID";
    let passwordLabel: string = "Password";
    let confirmPasswordLabel: string = "Confirm Password";

    let errorIn: "uid" | "email" | "password" | "confirmPassword" | "verificationCode" | null = null;

    let error: string = "";

    let errorMsg: string = "";

    let processing: boolean = false;

    const allCountryCodes = [
        "+880", // Bangladesh
        "+1", // United States
        "+44", // United Kingdom
        "+92", // Pakistan
    ];

    const isValidNumber = (number: string) => {
        return allCountryCodes.some((countryCode) =>
            number.startsWith(countryCode),
        );
    };

    const isEmailValid = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    function preValidate() {
        if (!uid) {
            error = "User ID is required";
            errorIn = "uid";
            uidInput.focus();
            return false;
        }

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

        //password validation
        if (!password) {
            error = "Password is required";
            errorIn = "password";
            passwordInput.focus();
            return false;
        }

        if (password.length < 8) {
            error = "Password must be at least 6 characters long";
            errorIn = "password";
            passwordInput.focus();
            return false;
        }

        if (!confirmPassword) {
            error = "Confirm password is required";
            errorIn = "confirmPassword";
            confirmPasswordInput.focus();
            return false;
        }

        if (password !== confirmPassword) {
            error = "Passwords do not match";
            errorIn = "confirmPassword";
            confirmPasswordInput.focus();
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
            await account.create(
                uid,
                email,
                password,
            );
            await account.createEmailPasswordSession(email, password);
            goto("/dash");
        } catch (e: any) {
            console.log(e);
            errorMsg = e.message;
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
    <title>Sign up</title>
</svelte:head>

{#if loaded}
<div class="form-container" in:fly={{y: 10}}>
    <div class="form">
        <h1 class="title">Sign up</h1>
        <div class="errorMsg">
            {errorMsg}
        </div>
        <div class="form-field animated" class:error={errorIn == "uid"}>
            <input
                on:input={() => {
                    if (errorIn === "uid") {
                        error = "";
                        errorIn = null;
                    }
                }}
                bind:this={uidInput}
                type="text"
                name="uid"
                placeholder="User ID"
                bind:value={uid}
            />
            <label for="uid">
                {#if errorIn === "uid"}
                    {error}
                {:else}
                    {uidLabel}
                {/if}
            </label>
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
                    {passwordLabel}
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
        <div
            class="form-field animated"
            class:error={errorIn == "confirmPassword"}
        >
            {#if showPassword}
                <input
                    on:input={() => {
                        if (errorIn === "confirmPassword") {
                            error = "";
                            errorIn = null;
                        }
                    }}
                    bind:this={confirmPasswordInput}
                    type="text"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    bind:value={confirmPassword}
                />
            {:else}
                <input
                    on:input={() => {
                        if (errorIn === "confirmPassword") {
                            error = "";
                            errorIn = null;
                        }
                    }}
                    bind:this={confirmPasswordInput}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    bind:value={confirmPassword}
                />
            {/if}
            <label for="confirmPassword">
                {#if errorIn === "confirmPassword"}
                    {error}
                {:else}
                    {confirmPasswordLabel}
                {/if}
            </label>
        </div>
        <button class="btn signup" on:click={handleSubmit} disabled={processing}>
            {#if processing}
                Signing up...
            {:else}
                Sign up
            {/if}
        </button>
        <div class="dash">
            Already have an account? <a href="/login">Login</a>
        </div>
    </div>
</div>
{/if}

<style lang="scss">

    .signup {
        margin-top: 22px;
    }

</style>
