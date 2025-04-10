export interface Events {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  public_id: string;
  start_date: string;
  end_date: string;
  status: string;
  audience: string;
  period: string;
  ministry_name: string;
  participant_link: string;
  recruitment_link: string;
  audience_link: string;
}

export interface EventRequest {
  name: string;
  description: string;
  thumbnail: string;
  public_id: string;
  start_date: string;
  end_date: string;
  status: string;
  audience: string;
  period: string;
  ministry_name: string;
  participant_link: string;
  recruitment_link: string;
  audience_link: string;
}

export interface EventTimeline {
  id: string;
  title: string;
  description: string;
  event_date: string;
  status: boolean;
}

export interface EventTimelineRequest {
  title: string;
  description: string;
  event_date: string;
}
