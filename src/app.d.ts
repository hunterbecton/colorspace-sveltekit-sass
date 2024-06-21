import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from './DatabaseDefinitions';
import { SupabaseClient, Session } from '@supabase/supabase-js'

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient 
			safeGetSession(): Promise<{ session: Session | null; user: User | null }>
		  }
		  interface PageData {
			session: Session | null
			user: User | null
		  }
		// interface Error {}
		// interface Platform {}
		interface ToastStore {
			id: string;
			message: string;
		}
		interface LikeStore {
			id: number;
			palette: number;
		}
	}
}
