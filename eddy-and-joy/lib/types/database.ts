export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type UserRole = "customer" | "admin";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          role?: UserRole;
        };
        Update: {
          full_name?: string | null;
          phone?: string | null;
          role?: UserRole;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          category: string;
          description: string | null;
          price_from: number;
          duration_minutes: number;
          image_url: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          name: string;
          category: string;
          description?: string | null;
          price_from?: number;
          duration_minutes?: number;
          image_url?: string | null;
          is_active?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
      };
      gallery_items: {
        Row: {
          id: string;
          category: string;
          image_url: string;
          caption: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          category: string;
          image_url: string;
          caption?: string | null;
          display_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["gallery_items"]["Insert"]>;
      };
      bookings: {
        Row: {
          id: string;
          user_id: string | null;
          service_id: string | null;
          full_name: string;
          mobile: string;
          booking_date: string;
          booking_time: string;
          message: string | null;
          status: BookingStatus;
          coupon_code: string | null;
          discount_amount: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          service_id?: string | null;
          full_name: string;
          mobile: string;
          booking_date: string;
          booking_time: string;
          message?: string | null;
          status?: BookingStatus;
          coupon_code?: string | null;
          discount_amount?: number;
        };
        Update: {
          status?: BookingStatus;
          booking_date?: string;
          booking_time?: string;
          message?: string | null;
        };
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          discount_amount: number;
          is_active: boolean;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          code: string;
          discount_amount: number;
          is_active?: boolean;
          expires_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["coupons"]["Insert"]>;
      };
      site_content: {
        Row: {
          key: string;
          value: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value?: string | null;
        };
        Update: {
          value?: string | null;
        };
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          photo_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          name: string;
          role: string;
          photo_url?: string | null;
          display_order?: number;
          is_active?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["team_members"]["Insert"]>;
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type GalleryItem = Database["public"]["Tables"]["gallery_items"]["Row"];
export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type Coupon = Database["public"]["Tables"]["coupons"]["Row"];
export type SiteContent = Database["public"]["Tables"]["site_content"]["Row"];
export type TeamMember = Database["public"]["Tables"]["team_members"]["Row"];
