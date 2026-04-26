export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      gov_configs: {
        Row: {
          automation_weight: number
          country_code: string
          created_at: string
          id: string
          language: string | null
          notes: string | null
          offline_mode: boolean | null
          region_name: string | null
          taxonomy: string | null
          updated_at: string
          updated_by: string | null
          wage_currency: string | null
          wage_floor: number | null
        }
        Insert: {
          automation_weight?: number
          country_code: string
          created_at?: string
          id?: string
          language?: string | null
          notes?: string | null
          offline_mode?: boolean | null
          region_name?: string | null
          taxonomy?: string | null
          updated_at?: string
          updated_by?: string | null
          wage_currency?: string | null
          wage_floor?: number | null
        }
        Update: {
          automation_weight?: number
          country_code?: string
          created_at?: string
          id?: string
          language?: string | null
          notes?: string | null
          offline_mode?: boolean | null
          region_name?: string | null
          taxonomy?: string | null
          updated_at?: string
          updated_by?: string | null
          wage_currency?: string | null
          wage_floor?: number | null
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          country_code: string | null
          created_at: string
          description: string | null
          id: string
          isco_code: string | null
          organization: string | null
          posted_by: string
          required_skills: Json
          title: string
          wage_currency: string | null
          wage_max: number | null
          wage_min: number | null
        }
        Insert: {
          country_code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          isco_code?: string | null
          organization?: string | null
          posted_by: string
          required_skills?: Json
          title: string
          wage_currency?: string | null
          wage_max?: number | null
          wage_min?: number | null
        }
        Update: {
          country_code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          isco_code?: string | null
          organization?: string | null
          posted_by?: string
          required_skills?: Json
          title?: string
          wage_currency?: string | null
          wage_max?: number | null
          wage_min?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          country_code: string | null
          created_at: string
          display_name: string | null
          id: string
          language: string | null
          primary_role: Database["public"]["Enums"]["app_role"] | null
          updated_at: string
        }
        Insert: {
          country_code?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          language?: string | null
          primary_role?: Database["public"]["Enums"]["app_role"] | null
          updated_at?: string
        }
        Update: {
          country_code?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          language?: string | null
          primary_role?: Database["public"]["Enums"]["app_role"] | null
          updated_at?: string
        }
        Relationships: []
      }
      skill_profiles: {
        Row: {
          automation_risk: number | null
          country_code: string | null
          created_at: string
          education_level: string | null
          id: string
          informal_experience: string | null
          matched_isco_code: string | null
          matched_occupation: string | null
          skills: Json
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          automation_risk?: number | null
          country_code?: string | null
          created_at?: string
          education_level?: string | null
          id?: string
          informal_experience?: string | null
          matched_isco_code?: string | null
          matched_occupation?: string | null
          skills?: Json
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          automation_risk?: number | null
          country_code?: string | null
          created_at?: string
          education_level?: string | null
          id?: string
          informal_experience?: string | null
          matched_isco_code?: string | null
          matched_occupation?: string | null
          skills?: Json
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "youth" | "employer" | "government" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["youth", "employer", "government", "admin"],
    },
  },
} as const
