export interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  tag: string;
  price_label: string;
  icon_name: string;
  image_url: string;
  category: string;
  sort_order: number;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  client_location: string;
  image_url: string;
  sort_order: number;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  link_to: string;
  sort_order: number;
  created_at: string;
}

export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  request_type: string;
  project_details: string;
}
