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
      character: {
        Row: {
          created_at: string
          description: string | null
          game_id: number | null
          id: number
          name: string | null
          reference_link: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          game_id?: number | null
          id?: number
          name?: string | null
          reference_link?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          game_id?: number | null
          id?: number
          name?: string | null
          reference_link?: string | null
          updated_at?: string | null
        }
      }
      character_image: {
        Row: {
          character_id: number
          image_id: number
          image_type: string | null
        }
        Insert: {
          character_id?: number
          image_id: number
          image_type?: string | null
        }
        Update: {
          character_id?: number
          image_id?: number
          image_type?: string | null
        }
      }
      character_stat: {
        Row: {
          character_id: number
          comments: string | null
          stat_id: number
          value: number
        }
        Insert: {
          character_id?: number
          comments?: string | null
          stat_id: number
          value: number
        }
        Update: {
          character_id?: number
          comments?: string | null
          stat_id?: number
          value?: number
        }
      }
      character_tag: {
        Row: {
          character_id: number
          comments: string | null
          tag_id: number
          value: number | null
        }
        Insert: {
          character_id?: number
          comments?: string | null
          tag_id: number
          value?: number | null
        }
        Update: {
          character_id?: number
          comments?: string | null
          tag_id?: number
          value?: number | null
        }
      }
      game: {
        Row: {
          abbreviation: string | null
          created_at: string
          description: string | null
          id: number
          name: string | null
          updated_at: string | null
        }
        Insert: {
          abbreviation?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          abbreviation?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
        }
      }
      image: {
        Row: {
          bucket: string | null
          created_at: string | null
          description: string | null
          id: number
          name: string | null
          path: string | null
          updated_at: string | null
        }
        Insert: {
          bucket?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          path?: string | null
          updated_at?: string | null
        }
        Update: {
          bucket?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          path?: string | null
          updated_at?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      stat: {
        Row: {
          abbreviation: string | null
          created_at: string
          description: string | null
          id: number
          name: string | null
          updated_at: string | null
        }
        Insert: {
          abbreviation?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          abbreviation?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
        }
      }
      tag: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
