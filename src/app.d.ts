// See https://kit.svelte.dev/docs/types#app

import type { Session, SupabaseClient } from "@supabase/supabase-js";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			supabase: SupabaseClient,
			session: Session | null
		}
		// interface PageState {}
		// interface Platform {}
	}
	declare const __VERSION__: string;
}

export {};
