import { Tables } from "./supabase-types-gen";

export type Movie = Tables<"movies">;
export type Director = Tables<"directors">;

export type MovieComplete = Movie & { director: Director };
