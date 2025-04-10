export interface Profile {
  id: string;
  cabinet_name: string;
  cabinet_logo: string;
  tagline: string;
  public_id: string;
  address: string;
  vision: string;
  instagram: string;
  email: string;
  podcast: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  phone_number: string;
}

export interface ProfileRequest {
  cabinet_name: string;
  cabinet_logo: string;
  tagline: string;
  address: string;
  vision: string;
  instagram: string;
  email: string;
  podcast: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  phone_number: string;
}
