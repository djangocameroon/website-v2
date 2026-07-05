import { SocialMediaPlatform } from "@/utils/constants";

export type EventCategory = "Workshops" | "Talks";
export type EventType = "Online" | "In-person" | "Hybrid";
export type EventCommunity = "Django Cameroon" | "Django Girls Cameroon";
export type SocialMediaPlatformOptions = typeof SocialMediaPlatform[keyof typeof SocialMediaPlatform];

export interface EventRegionMin {
  id: number;
  name: string;
}

export interface EventCityMin {
  id: number;
  name: string;
  region: EventRegionMin;
}

export interface EventLocation {
  id: number;
  name: string;
  city: EventCityMin;
}

export interface Speaker {
  id: string;
  name: string;
  photo: string | null;
  bio: string | null;
  speciality: string | null;
  slug: string | null;
  social_media: SpeakerSocialMedia[];
  created_at: string;
  updated_at: string;
}

export interface SpeakerSocialMedia {
  id: string;
  platform: SocialMediaPlatformOptions;
  profile_link: string | null;
  active: true;
}

export interface EventItem {
  id: string;
  category: EventCategory;
  for_community: EventCommunity;
  title: string;
  slug: string;
  description: string;
  location_data: EventLocation | null;
  date: string; // ISO datetime
  thumbnail: string | null;
  type: EventType;
  published: boolean;
  created_at: string;
  updated_at: string;
  speakers_data: Speaker[];
  tags_list: string[];
}

export interface ReservationUser {
  id: string;
  email: string;
  username: string;
  profile_image: string | null;
  gender: string | null;
}

export interface Reservation {
  id: string;
  for_event: string;
  user: ReservationUser;
  check_in: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventListResponse {
  status: boolean;
  message: string;
  data: EventItem[];
  status_code: number;
  pagination: {
    next: string | null;
    previous: string | null;
    count: number;
    current_page: number;
    total_pages: number;
  };
}

export interface EventDetailResponse {
  status: boolean;
  message: string;
  data: EventItem;
}

export interface ReservationCreateResponse {
  status: boolean;
  message: string;
  data: Reservation;
}

export interface EventReservationsResponse {
  status: boolean;
  message: string;
  data: Reservation[];
}

export interface CheckRegistrationResponse {
  status: boolean;
  message: string;
  data: {
    registered: boolean;
    reservation_id: string | null;
  };
}

export interface EventFilters {
  page?: number;
  page_size?: number;
  /** Only published events with a future date, ordered soonest first. */
  upcoming?: boolean;
}
