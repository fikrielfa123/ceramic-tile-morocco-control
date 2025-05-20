export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      batches: {
        Row: {
          created_at: string
          created_by: string
          date: string
          id: string
          kiln: string
          material_lot: string
          name: string
          passing_rate: number | null
          status: Database["public"]["Enums"]["batch_status"]
        }
        Insert: {
          created_at?: string
          created_by: string
          date?: string
          id: string
          kiln: string
          material_lot: string
          name: string
          passing_rate?: number | null
          status?: Database["public"]["Enums"]["batch_status"]
        }
        Update: {
          created_at?: string
          created_by?: string
          date?: string
          id?: string
          kiln?: string
          material_lot?: string
          name?: string
          passing_rate?: number | null
          status?: Database["public"]["Enums"]["batch_status"]
        }
        Relationships: []
      }
      defects: {
        Row: {
          batch_id: string
          date: string
          description: string
          id: string
          image_url: string | null
          reported_by: string
          severity: Database["public"]["Enums"]["defect_severity"]
          type: Database["public"]["Enums"]["defect_type"]
        }
        Insert: {
          batch_id: string
          date?: string
          description: string
          id?: string
          image_url?: string | null
          reported_by: string
          severity: Database["public"]["Enums"]["defect_severity"]
          type: Database["public"]["Enums"]["defect_type"]
        }
        Update: {
          batch_id?: string
          date?: string
          description?: string
          id?: string
          image_url?: string | null
          reported_by?: string
          severity?: Database["public"]["Enums"]["defect_severity"]
          type?: Database["public"]["Enums"]["defect_type"]
        }
        Relationships: [
          {
            foreignKeyName: "defects_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      measurements: {
        Row: {
          batch_id: string
          date: string
          id: string
          max: number
          measured_by: string
          min: number
          parameter_id: string
          status: Database["public"]["Enums"]["measurement_status"]
          value: number
        }
        Insert: {
          batch_id: string
          date?: string
          id?: string
          max: number
          measured_by: string
          min: number
          parameter_id: string
          status: Database["public"]["Enums"]["measurement_status"]
          value: number
        }
        Update: {
          batch_id?: string
          date?: string
          id?: string
          max?: number
          measured_by?: string
          min?: number
          parameter_id?: string
          status?: Database["public"]["Enums"]["measurement_status"]
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "measurements_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "measurements_parameter_id_fkey"
            columns: ["parameter_id"]
            isOneToOne: false
            referencedRelation: "quality_parameters"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          avatar?: string | null
          email: string
          id: string
          name: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          avatar?: string | null
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      quality_parameters: {
        Row: {
          category: Database["public"]["Enums"]["parameter_category"]
          created_at: string
          description: string | null
          id: string
          iso_code: string
          max_value: number
          min_value: number
          name: string
          unit: string
        }
        Insert: {
          category: Database["public"]["Enums"]["parameter_category"]
          created_at?: string
          description?: string | null
          id?: string
          iso_code: string
          max_value: number
          min_value: number
          name: string
          unit: string
        }
        Update: {
          category?: Database["public"]["Enums"]["parameter_category"]
          created_at?: string
          description?: string | null
          id?: string
          iso_code?: string
          max_value?: number
          min_value?: number
          name?: string
          unit?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          batch_id: string
          date: string
          generated_by: string
          id: string
          is_compliant: boolean
          summary: string
          title: string
        }
        Insert: {
          batch_id: string
          date?: string
          generated_by: string
          id?: string
          is_compliant: boolean
          summary: string
          title: string
        }
        Update: {
          batch_id?: string
          date?: string
          generated_by?: string
          id?: string
          is_compliant?: boolean
          summary?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      batch_status: "pending" | "inProgress" | "completed" | "failed"
      defect_severity: "low" | "medium" | "high"
      defect_type: "crack" | "chip" | "colorDeviation" | "glazeDefect" | "other"
      measurement_status: "pass" | "fail" | "warning"
      parameter_category: "dimensional" | "visual" | "physical" | "other"
      user_role: "admin" | "qualityManager" | "productionStaff" | "auditor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      batch_status: ["pending", "inProgress", "completed", "failed"],
      defect_severity: ["low", "medium", "high"],
      defect_type: ["crack", "chip", "colorDeviation", "glazeDefect", "other"],
      measurement_status: ["pass", "fail", "warning"],
      parameter_category: ["dimensional", "visual", "physical", "other"],
      user_role: ["admin", "qualityManager", "productionStaff", "auditor"],
    },
  },
} as const
