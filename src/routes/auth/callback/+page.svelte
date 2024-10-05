<script lang="ts">
    import { goto } from "$app/navigation";
    import { account, userID } from "$lib/appwrite";
    import { onMount } from "svelte";

    export let data;

    let state: string = "";

    onMount(() => {
        if (!data.ok) {
            state = "Invalid data";
            goto("/");
        } else {
            state = "Creating session...";
            account.createSession(data.props.userId, data.props.secret)
            .then((res) => {
                state = "Session created";
                console.log(res);
                userID.set(data.props.userId);
            }).catch((e) => {
                console.log(e);
                state = "Error creating session";
            }).finally(() => {
                state = "Redirecting...";
                goto("/");
            });
        }
    });

</script>

<div class="content">
    {state}
</div>

<style lang="scss">
    .content {
        color: var(--text-color);
    }
</style>