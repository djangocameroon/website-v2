import { AxiosInstance } from 'axios';
import axiosClient from '@/apis/axios';
import {
  EventItem,
  EventListResponse,
  EventDetailResponse,
  Reservation,
  ReservationCreateResponse,
  EventReservationsResponse,
  CheckRegistrationResponse,
  EventFilters,
} from '@/types/events';

class EventsApiService {
  private api: AxiosInstance = axiosClient;

  // GET /events/ — public, paginated
  async getAllEvents(filters?: EventFilters): Promise<EventListResponse> {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.page_size) params.append('page_size', String(filters.page_size));
    if (filters?.upcoming) params.append('upcoming', 'true');
    const { data } = await this.api.get<EventListResponse>('/events/', { params });
    return data;
  }

  // GET /events/{id}/ — public, single event
  async getEventByIdOrSlug(idOrSlug: string): Promise<EventItem> {
    const { data } = await this.api.get<EventDetailResponse>(`/events/${idOrSlug}/`);
    return data.data;
  }

  // POST /reservations/ — auth required, body { for_event: <event-uuid> }
  async registerForEvent(eventId: string): Promise<Reservation> {
    const { data } = await this.api.post<ReservationCreateResponse>('/reservations/', {
      for_event: eventId,
    });
    return data.data;
  }

  // DELETE /reservations/{id}/ — auth required, 204 no body
  async cancelReservation(reservationId: string): Promise<void> {
    await this.api.delete(`/reservations/${reservationId}/`);
  }

  // GET /events/retrieve_event_reservations/?event_id=<uuid> — auth required
  async getEventReservations(eventId: string): Promise<Reservation[]> {
    const { data } = await this.api.get<EventReservationsResponse>(
      '/events/retrieve_event_reservations/',
      { params: { event_id: eventId } }
    );
    return data.data;
  }

  // GET /events/check_registration/?event_id=<uuid> — auth required
  async checkRegistration(eventId: string): Promise<CheckRegistrationResponse['data']> {
    const { data } = await this.api.get<CheckRegistrationResponse>(
      '/events/check_registration/',
      { params: { event_id: eventId } }
    );
    return data.data;
  }
}

export const eventsApi = new EventsApiService();
