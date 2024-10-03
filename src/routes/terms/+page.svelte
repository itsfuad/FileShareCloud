<script lang="ts">
    import { fade } from 'svelte/transition';
</script>

<svelte:head>
    <title>Terms of Service</title>
</svelte:head>

<div class="terms-container" in:fade>
    <h1>Terms of Service</h1>
    <p>Welcome to our application. By using our services, you agree to the following terms and conditions:</p>
    
    <h2>1. Acceptance of Terms</h2>
    <p>By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
    
    <h2>2. Provision of Services</h2>
    <p>We are constantly innovating in order to provide the best possible experience for our users. You acknowledge and agree that the form and nature of the services which we provide may change from time to time without prior notice to you.</p>
    
    <h2>3. Use of Services</h2>
    <p>You agree to use the services only for purposes that are permitted by (a) the Terms and (b) any applicable law, regulation or generally accepted practices or guidelines in the relevant jurisdictions.</p>
    
    <h2>4. Privacy and Personal Information</h2>
    <p>
        We do not collect any personal information. We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.
        Your files are stored on our servers for a limited time. We do not access, share, or use your files in any way.
    </p>
    
    <h2>5. Termination</h2>
    <p>We may terminate your access to the services at any time, with or without cause, with or without notice, effective immediately.</p>
    
    <h2>6. Changes to the Terms</h2>
    <p>We may make changes to the Terms from time to time. When these changes are made, we will make a new copy of the Terms available on our website.</p>
    
    <h2>7. Contact Information</h2>
    <p>If you have any questions about these Terms, please contact us at support@example.com.</p>
</div>

<style lang="scss">
    .terms-container {
        padding: 2rem;
        max-width: 800px;
        color: var(--text-color);
        background: var(--bg-color);
    }

    h1, h2 {
        color: var(--text-color);
        width: 100%;
        background: var(--bg-color);
        min-height: 45px;
    }

    p {
        margin-bottom: 1rem;
    }
</style>