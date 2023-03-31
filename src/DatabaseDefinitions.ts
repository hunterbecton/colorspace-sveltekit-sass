export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      colors: {
        Row: {
          hex: string
          hsl: string
          id: number
          rgb: string
        }
        Insert: {
          hex: string
          hsl: string
          id?: number
          rgb: string
        }
        Update: {
          hex?: string
          hsl?: string
          id?: number
          rgb?: string
        }
      }
      palettes: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
      }
      palettes_colors: {
        Row: {
          color: number
          id: number
          palette: number
        }
        Insert: {
          color: number
          id?: number
          palette: number
        }
        Update: {
          color?: number
          id?: number
          palette?: number
        }
      }
      palettes_likes: {
        Row: {
          created_at: string
          id: number
          palette: number
          profile: string
        }
        Insert: {
          created_at?: string
          id?: number
          palette: number
          profile: string
        }
        Update: {
          created_at?: string
          id?: number
          palette?: number
          profile?: string
        }
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
      }
    }
    Views: {
      random_palettes: {
        Row: {
          id: number | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
