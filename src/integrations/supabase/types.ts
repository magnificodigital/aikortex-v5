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
      agencies: {
        Row: {
          approved_at: string | null
          asaas_account_id: string | null
          asaas_connected: boolean
          brand_colors: Json | null
          brand_logo_url: string | null
          brand_name: string | null
          created_at: string
          custom_domain: string | null
          description: string | null
          email: string | null
          favicon_url: string | null
          id: string
          name: string
          owner_id: string
          phone: string | null
          segment: string | null
          slug: string | null
          status: string
          trial_ends_at: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          approved_at?: string | null
          asaas_account_id?: string | null
          asaas_connected?: boolean
          brand_colors?: Json | null
          brand_logo_url?: string | null
          brand_name?: string | null
          created_at?: string
          custom_domain?: string | null
          description?: string | null
          email?: string | null
          favicon_url?: string | null
          id?: string
          name: string
          owner_id: string
          phone?: string | null
          segment?: string | null
          slug?: string | null
          status?: string
          trial_ends_at?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          approved_at?: string | null
          asaas_account_id?: string | null
          asaas_connected?: boolean
          brand_colors?: Json | null
          brand_logo_url?: string | null
          brand_name?: string | null
          created_at?: string
          custom_domain?: string | null
          description?: string | null
          email?: string | null
          favicon_url?: string | null
          id?: string
          name?: string
          owner_id?: string
          phone?: string | null
          segment?: string | null
          slug?: string | null
          status?: string
          trial_ends_at?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agencies_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agency_template_licenses: {
        Row: {
          agency_id: string
          client_id: string | null
          created_at: string
          ends_at: string | null
          id: string
          price_charged: number | null
          resale_price: number | null
          starts_at: string
          status: string
          template_id: string
          updated_at: string
        }
        Insert: {
          agency_id: string
          client_id?: string | null
          created_at?: string
          ends_at?: string | null
          id?: string
          price_charged?: number | null
          resale_price?: number | null
          starts_at?: string
          status?: string
          template_id: string
          updated_at?: string
        }
        Update: {
          agency_id?: string
          client_id?: string | null
          created_at?: string
          ends_at?: string | null
          id?: string
          price_charged?: number | null
          resale_price?: number | null
          starts_at?: string
          status?: string
          template_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_template_licenses_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agency_template_licenses_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agency_template_licenses_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "agent_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      agency_wallets: {
        Row: {
          agency_id: string
          balance: number
          currency: string
          id: string
          total_earned: number
          total_withdrawn: number
          updated_at: string
        }
        Insert: {
          agency_id: string
          balance?: number
          currency?: string
          id?: string
          total_earned?: number
          total_withdrawn?: number
          updated_at?: string
        }
        Update: {
          agency_id?: string
          balance?: number
          currency?: string
          id?: string
          total_earned?: number
          total_withdrawn?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_wallets_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: true
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_memories: {
        Row: {
          agent_id: string
          client_id: string | null
          content: string
          created_at: string
          embedding: string | null
          id: string
          memory_type: string
          metadata: Json | null
        }
        Insert: {
          agent_id: string
          client_id?: string | null
          content: string
          created_at?: string
          embedding?: string | null
          id?: string
          memory_type?: string
          metadata?: Json | null
        }
        Update: {
          agent_id?: string
          client_id?: string | null
          content?: string
          created_at?: string
          embedding?: string | null
          id?: string
          memory_type?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_memories_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_memories_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_templates: {
        Row: {
          agent_type: string
          config: Json | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          is_featured: boolean
          name: string
          required_llm_ids: string[] | null
          sector: string | null
          suggested_min_price: number | null
          system_prompt: string | null
          tier_required: string
          updated_at: string
          version: number
          wholesale_price: number | null
        }
        Insert: {
          agent_type: string
          config?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          name: string
          required_llm_ids?: string[] | null
          sector?: string | null
          suggested_min_price?: number | null
          system_prompt?: string | null
          tier_required?: string
          updated_at?: string
          version?: number
          wholesale_price?: number | null
        }
        Update: {
          agent_type?: string
          config?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          name?: string
          required_llm_ids?: string[] | null
          sector?: string | null
          suggested_min_price?: number | null
          system_prompt?: string | null
          tier_required?: string
          updated_at?: string
          version?: number
          wholesale_price?: number | null
        }
        Relationships: []
      }
      agents: {
        Row: {
          agency_id: string
          agent_type: string
          channels: string[] | null
          client_id: string | null
          config: Json | null
          created_at: string
          deerflow_agent_id: string | null
          description: string | null
          execution_engine: string
          id: string
          llm_model_id: string | null
          max_tokens: number | null
          name: string
          persona: Json | null
          status: string
          system_prompt: string | null
          temperature: number | null
          template_id: string | null
          updated_at: string
          voice_id: string | null
          voice_type: string | null
        }
        Insert: {
          agency_id: string
          agent_type?: string
          channels?: string[] | null
          client_id?: string | null
          config?: Json | null
          created_at?: string
          deerflow_agent_id?: string | null
          description?: string | null
          execution_engine?: string
          id?: string
          llm_model_id?: string | null
          max_tokens?: number | null
          name: string
          persona?: Json | null
          status?: string
          system_prompt?: string | null
          temperature?: number | null
          template_id?: string | null
          updated_at?: string
          voice_id?: string | null
          voice_type?: string | null
        }
        Update: {
          agency_id?: string
          agent_type?: string
          channels?: string[] | null
          client_id?: string | null
          config?: Json | null
          created_at?: string
          deerflow_agent_id?: string | null
          description?: string | null
          execution_engine?: string
          id?: string
          llm_model_id?: string | null
          max_tokens?: number | null
          name?: string
          persona?: Json | null
          status?: string
          system_prompt?: string | null
          temperature?: number | null
          template_id?: string | null
          updated_at?: string
          voice_id?: string | null
          voice_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agents_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agents_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agents_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "agent_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      apps: {
        Row: {
          agency_id: string
          app_type: string
          client_id: string | null
          config: Json | null
          created_at: string
          deploy_id: string | null
          description: string | null
          flow_id: string | null
          id: string
          name: string
          published_url: string | null
          source_files: Json | null
          status: string
          updated_at: string
          whatsapp_number_id: string | null
        }
        Insert: {
          agency_id: string
          app_type?: string
          client_id?: string | null
          config?: Json | null
          created_at?: string
          deploy_id?: string | null
          description?: string | null
          flow_id?: string | null
          id?: string
          name: string
          published_url?: string | null
          source_files?: Json | null
          status?: string
          updated_at?: string
          whatsapp_number_id?: string | null
        }
        Update: {
          agency_id?: string
          app_type?: string
          client_id?: string | null
          config?: Json | null
          created_at?: string
          deploy_id?: string | null
          description?: string | null
          flow_id?: string | null
          id?: string
          name?: string
          published_url?: string | null
          source_files?: Json | null
          status?: string
          updated_at?: string
          whatsapp_number_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "apps_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apps_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apps_flow_id_fkey"
            columns: ["flow_id"]
            isOneToOne: false
            referencedRelation: "flows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apps_whatsapp_number_id_fkey"
            columns: ["whatsapp_number_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_numbers"
            referencedColumns: ["id"]
          },
        ]
      }
      attribution_events: {
        Row: {
          agency_id: string
          client_id: string | null
          conversation_id: string | null
          created_at: string
          event_type: string
          google_click_id: string | null
          id: string
          linkedin_click_id: string | null
          meta_click_id: string | null
          revenue_value: number | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          agency_id: string
          client_id?: string | null
          conversation_id?: string | null
          created_at?: string
          event_type: string
          google_click_id?: string | null
          id?: string
          linkedin_click_id?: string | null
          meta_click_id?: string | null
          revenue_value?: number | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          agency_id?: string
          client_id?: string | null
          conversation_id?: string | null
          created_at?: string
          event_type?: string
          google_click_id?: string | null
          id?: string
          linkedin_click_id?: string | null
          meta_click_id?: string | null
          revenue_value?: number | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attribution_events_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attribution_events_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attribution_events_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          agency_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: string | null
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          action: string
          agency_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          action?: string
          agency_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      available_llms: {
        Row: {
          context_window: number | null
          created_at: string
          display_name: string
          id: string
          is_active: boolean
          is_trial_default: boolean
          is_trial_fallback: boolean
          model_id: string
          provider: string
          sort_order: number | null
          tier_required: string
          updated_at: string
        }
        Insert: {
          context_window?: number | null
          created_at?: string
          display_name: string
          id?: string
          is_active?: boolean
          is_trial_default?: boolean
          is_trial_fallback?: boolean
          model_id: string
          provider: string
          sort_order?: number | null
          tier_required?: string
          updated_at?: string
        }
        Update: {
          context_window?: number | null
          created_at?: string
          display_name?: string
          id?: string
          is_active?: boolean
          is_trial_default?: boolean
          is_trial_fallback?: boolean
          model_id?: string
          provider?: string
          sort_order?: number | null
          tier_required?: string
          updated_at?: string
        }
        Relationships: []
      }
      billing_events: {
        Row: {
          agency_amount: number | null
          agency_id: string
          aikortex_amount: number | null
          amount: number
          asaas_payment_id: string | null
          asaas_status: string | null
          client_id: string | null
          created_at: string
          currency: string
          description: string | null
          event_type: string
          id: string
          metadata: Json | null
          occurred_at: string
          split_pct_agency: number | null
          split_pct_aikortex: number | null
          status: string
        }
        Insert: {
          agency_amount?: number | null
          agency_id: string
          aikortex_amount?: number | null
          amount: number
          asaas_payment_id?: string | null
          asaas_status?: string | null
          client_id?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          occurred_at?: string
          split_pct_agency?: number | null
          split_pct_aikortex?: number | null
          status?: string
        }
        Update: {
          agency_amount?: number | null
          agency_id?: string
          aikortex_amount?: number | null
          amount?: number
          asaas_payment_id?: string | null
          asaas_status?: string | null
          client_id?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          occurred_at?: string
          split_pct_agency?: number | null
          split_pct_aikortex?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "billing_events_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billing_events_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      budgets: {
        Row: {
          agency_id: string
          agent_id: string | null
          alert_at_50: boolean
          alert_at_80: boolean
          client_id: string | null
          created_at: string
          current_spend: number
          current_voice_seconds: number
          id: string
          is_paused: boolean
          monthly_limit: number | null
          pause_at_100: boolean
          period_start: string
          scope: string
          updated_at: string
          voice_seconds_limit: number | null
        }
        Insert: {
          agency_id: string
          agent_id?: string | null
          alert_at_50?: boolean
          alert_at_80?: boolean
          client_id?: string | null
          created_at?: string
          current_spend?: number
          current_voice_seconds?: number
          id?: string
          is_paused?: boolean
          monthly_limit?: number | null
          pause_at_100?: boolean
          period_start?: string
          scope: string
          updated_at?: string
          voice_seconds_limit?: number | null
        }
        Update: {
          agency_id?: string
          agent_id?: string | null
          alert_at_50?: boolean
          alert_at_80?: boolean
          client_id?: string | null
          created_at?: string
          current_spend?: number
          current_voice_seconds?: number
          id?: string
          is_paused?: boolean
          monthly_limit?: number | null
          pause_at_100?: boolean
          period_start?: string
          scope?: string
          updated_at?: string
          voice_seconds_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "budgets_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "budgets_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "budgets_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          agency_id: string
          contract_ends_at: string | null
          contract_started_at: string | null
          created_at: string
          email: string | null
          health_score: number | null
          id: string
          monthly_value: number | null
          name: string
          phone: string | null
          self_signup_enabled: boolean
          slug: string | null
          status: string
          updated_at: string
        }
        Insert: {
          agency_id: string
          contract_ends_at?: string | null
          contract_started_at?: string | null
          created_at?: string
          email?: string | null
          health_score?: number | null
          id?: string
          monthly_value?: number | null
          name: string
          phone?: string | null
          self_signup_enabled?: boolean
          slug?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          agency_id?: string
          contract_ends_at?: string | null
          contract_started_at?: string | null
          created_at?: string
          email?: string | null
          health_score?: number | null
          id?: string
          monthly_value?: number | null
          name?: string
          phone?: string | null
          self_signup_enabled?: boolean
          slug?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          agency_id: string
          agent_id: string | null
          channel: string
          client_id: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          external_id: string | null
          id: string
          last_message_at: string | null
          metadata: Json | null
          status: string
          updated_at: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          agency_id: string
          agent_id?: string | null
          channel: string
          client_id?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          external_id?: string | null
          id?: string
          last_message_at?: string | null
          metadata?: Json | null
          status?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          agency_id?: string
          agent_id?: string | null
          channel?: string
          client_id?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          external_id?: string | null
          id?: string
          last_message_at?: string | null
          metadata?: Json | null
          status?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      deerflow_health: {
        Row: {
          circuit_open: boolean
          circuit_opened_at: string | null
          failures_last_minute: number
          id: string
          instance_url: string
          last_failure_at: string | null
          last_success_at: string | null
          updated_at: string
        }
        Insert: {
          circuit_open?: boolean
          circuit_opened_at?: string | null
          failures_last_minute?: number
          id?: string
          instance_url: string
          last_failure_at?: string | null
          last_success_at?: string | null
          updated_at?: string
        }
        Update: {
          circuit_open?: boolean
          circuit_opened_at?: string | null
          failures_last_minute?: number
          id?: string
          instance_url?: string
          last_failure_at?: string | null
          last_success_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      flow_executions: {
        Row: {
          agency_id: string
          agent_id: string | null
          completed_at: string | null
          conversation_id: string | null
          created_at: string
          duration_ms: number | null
          error: string | null
          flow_id: string | null
          id: string
          input: Json | null
          job_id: string | null
          output: Json | null
          started_at: string | null
          status: string
          tokens_used: number | null
        }
        Insert: {
          agency_id: string
          agent_id?: string | null
          completed_at?: string | null
          conversation_id?: string | null
          created_at?: string
          duration_ms?: number | null
          error?: string | null
          flow_id?: string | null
          id?: string
          input?: Json | null
          job_id?: string | null
          output?: Json | null
          started_at?: string | null
          status?: string
          tokens_used?: number | null
        }
        Update: {
          agency_id?: string
          agent_id?: string | null
          completed_at?: string | null
          conversation_id?: string | null
          created_at?: string
          duration_ms?: number | null
          error?: string | null
          flow_id?: string | null
          id?: string
          input?: Json | null
          job_id?: string | null
          output?: Json | null
          started_at?: string | null
          status?: string
          tokens_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "flow_executions_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_executions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_executions_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_executions_flow_id_fkey"
            columns: ["flow_id"]
            isOneToOne: false
            referencedRelation: "flows"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_templates: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          flow_json: Json
          id: string
          is_active: boolean
          name: string
          tier_required: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          flow_json: Json
          id?: string
          is_active?: boolean
          name: string
          tier_required?: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          flow_json?: Json
          id?: string
          is_active?: boolean
          name?: string
          tier_required?: string
          updated_at?: string
        }
        Relationships: []
      }
      flows: {
        Row: {
          agency_id: string
          client_id: string | null
          created_at: string
          description: string | null
          flow_json: Json
          id: string
          name: string
          status: string
          template_id: string | null
          trigger_config: Json | null
          trigger_type: string | null
          updated_at: string
        }
        Insert: {
          agency_id: string
          client_id?: string | null
          created_at?: string
          description?: string | null
          flow_json?: Json
          id?: string
          name: string
          status?: string
          template_id?: string | null
          trigger_config?: Json | null
          trigger_type?: string | null
          updated_at?: string
        }
        Update: {
          agency_id?: string
          client_id?: string | null
          created_at?: string
          description?: string | null
          flow_json?: Json
          id?: string
          name?: string
          status?: string
          template_id?: string | null
          trigger_config?: Json | null
          trigger_type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flows_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flows_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flows_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "flow_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          agency_id: string
          content: string | null
          content_type: string
          conversation_id: string
          cost_usd: number | null
          created_at: string
          external_msg_id: string | null
          id: string
          latency_ms: number | null
          media_url: string | null
          model_used: string | null
          role: string
          status: string | null
          tokens_used: number | null
        }
        Insert: {
          agency_id: string
          content?: string | null
          content_type?: string
          conversation_id: string
          cost_usd?: number | null
          created_at?: string
          external_msg_id?: string | null
          id?: string
          latency_ms?: number | null
          media_url?: string | null
          model_used?: string | null
          role: string
          status?: string | null
          tokens_used?: number | null
        }
        Update: {
          agency_id?: string
          content?: string | null
          content_type?: string
          conversation_id?: string
          cost_usd?: number | null
          created_at?: string
          external_msg_id?: string | null
          id?: string
          latency_ms?: number | null
          media_url?: string | null
          model_used?: string | null
          role?: string
          status?: string | null
          tokens_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_tiers: {
        Row: {
          active_clients_count: number
          agency_id: string
          agency_split_pct: number
          aikortex_split_pct: number
          created_at: string
          eligible_for_upgrade: boolean
          id: string
          monthly_fee: number
          monthly_revenue: number
          regression_risk: boolean
          tier: string
          tier_started_at: string
          training_completed: boolean
          updated_at: string
        }
        Insert: {
          active_clients_count?: number
          agency_id: string
          agency_split_pct?: number
          aikortex_split_pct?: number
          created_at?: string
          eligible_for_upgrade?: boolean
          id?: string
          monthly_fee?: number
          monthly_revenue?: number
          regression_risk?: boolean
          tier?: string
          tier_started_at?: string
          training_completed?: boolean
          updated_at?: string
        }
        Update: {
          active_clients_count?: number
          agency_id?: string
          agency_split_pct?: number
          aikortex_split_pct?: number
          created_at?: string
          eligible_for_upgrade?: boolean
          id?: string
          monthly_fee?: number
          monthly_revenue?: number
          regression_risk?: boolean
          tier?: string
          tier_started_at?: string
          training_completed?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_tiers_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: true
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_config: {
        Row: {
          description: string | null
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_config_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          agency_id: string | null
          avatar_url: string | null
          client_id: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          agency_id?: string | null
          avatar_url?: string | null
          client_id?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          agency_id?: string | null
          avatar_url?: string | null
          client_id?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_agency_id_fk"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_client_id_fk"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          agency_id: string
          agent_id: string | null
          assigned_to: string | null
          conversation_id: string
          created_at: string
          id: string
          priority: string
          resolved_at: string | null
          status: string
          suggestion: string | null
          summary: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          agency_id: string
          agent_id?: string | null
          assigned_to?: string | null
          conversation_id: string
          created_at?: string
          id?: string
          priority?: string
          resolved_at?: string | null
          status?: string
          suggestion?: string | null
          summary?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          agency_id?: string
          agent_id?: string | null
          assigned_to?: string | null
          conversation_id?: string
          created_at?: string
          id?: string
          priority?: string
          resolved_at?: string | null
          status?: string
          suggestion?: string | null
          summary?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_logs: {
        Row: {
          agency_id: string
          agent_id: string | null
          client_id: string | null
          conversation_id: string | null
          cost_brl: number | null
          cost_usd: number | null
          created_at: string
          id: string
          model_used: string | null
          provider: string | null
          tokens_input: number | null
          tokens_output: number | null
          usage_type: string
          voice_cost_brl: number | null
          voice_seconds: number | null
        }
        Insert: {
          agency_id: string
          agent_id?: string | null
          client_id?: string | null
          conversation_id?: string | null
          cost_brl?: number | null
          cost_usd?: number | null
          created_at?: string
          id?: string
          model_used?: string | null
          provider?: string | null
          tokens_input?: number | null
          tokens_output?: number | null
          usage_type: string
          voice_cost_brl?: number | null
          voice_seconds?: number | null
        }
        Update: {
          agency_id?: string
          agent_id?: string | null
          client_id?: string | null
          conversation_id?: string | null
          cost_brl?: number | null
          cost_usd?: number | null
          created_at?: string
          id?: string
          model_used?: string | null
          provider?: string | null
          tokens_input?: number | null
          tokens_output?: number | null
          usage_type?: string
          voice_cost_brl?: number | null
          voice_seconds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_logs_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_logs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_logs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_logs_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_api_keys: {
        Row: {
          agency_id: string | null
          alias: string | null
          client_id: string | null
          created_at: string
          id: string
          is_active: boolean
          key_encrypted: string
          last_test_ok: boolean | null
          last_tested_at: string | null
          owner_type: string
          provider: string
          updated_at: string
        }
        Insert: {
          agency_id?: string | null
          alias?: string | null
          client_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          key_encrypted: string
          last_test_ok?: boolean | null
          last_tested_at?: string | null
          owner_type: string
          provider: string
          updated_at?: string
        }
        Update: {
          agency_id?: string | null
          alias?: string | null
          client_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          key_encrypted?: string
          last_test_ok?: boolean | null
          last_tested_at?: string | null
          owner_type?: string
          provider?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_api_keys_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_api_keys_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_clones: {
        Row: {
          agency_id: string
          client_id: string | null
          created_at: string
          external_voice_id: string | null
          id: string
          name: string
          sample_url: string | null
          status: string
          updated_at: string
          voice_engine: string
        }
        Insert: {
          agency_id: string
          client_id?: string | null
          created_at?: string
          external_voice_id?: string | null
          id?: string
          name: string
          sample_url?: string | null
          status?: string
          updated_at?: string
          voice_engine?: string
        }
        Update: {
          agency_id?: string
          client_id?: string | null
          created_at?: string
          external_voice_id?: string | null
          id?: string
          name?: string
          sample_url?: string | null
          status?: string
          updated_at?: string
          voice_engine?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_clones_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voice_clones_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_numbers: {
        Row: {
          access_token: string
          agency_id: string
          connected_at: string
          created_at: string
          display_name: string | null
          display_number: string
          id: string
          phone_number_id: string
          status: string
          updated_at: string
          waba_id: string
        }
        Insert: {
          access_token: string
          agency_id: string
          connected_at?: string
          created_at?: string
          display_name?: string | null
          display_number: string
          id?: string
          phone_number_id: string
          status?: string
          updated_at?: string
          waba_id: string
        }
        Update: {
          access_token?: string
          agency_id?: string
          connected_at?: string
          created_at?: string
          display_name?: string | null
          display_number?: string
          id?: string
          phone_number_id?: string
          status?: string
          updated_at?: string
          waba_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_numbers_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      my_agency_id: { Args: never; Returns: string }
      my_client_id: { Args: never; Returns: string }
      my_role: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
