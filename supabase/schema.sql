create extension if not exists pgcrypto;

create table public.vehicle_settings (
  id uuid primary key default gen_random_uuid(),
  vehicle_type text unique not null,
  passenger_capacity integer not null,
  luggage_capacity integer not null
);

insert into public.vehicle_settings
(vehicle_type, passenger_capacity, luggage_capacity)
values
('Sedan', 3, 2),
('MPV', 6, 4)
on conflict (vehicle_type) do nothing;

create table public.service_prices (
  id uuid primary key default gen_random_uuid(),
  service_name text not null,
  vehicle_type text,
  duration text,
  price numeric(10,2) not null
);

insert into public.service_prices
(service_name, vehicle_type, duration, price)
values
('Local Driver Tour', 'Sedan', '4 Hours', 250),
('Local Driver Tour', 'Sedan', '8 Hours', 350),
('Local Driver Tour', 'MPV', '4 Hours', 350),
('Local Driver Tour', 'MPV', '8 Hours', 450),
('Airport Transfer', 'Sedan', null, 60),
('Airport Transfer', 'MPV', null, 90),
('ATV Fun Ride', null, '1 Hour', 250),
('Langkawi River Cruise', null, '3 Hours', 750);

create table public.hotels (
  id uuid primary key default gen_random_uuid(),
  hotel_name text not null,
  active boolean default true
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_code text unique,
  guest_name text not null,
  whatsapp text not null,
  service_name text not null,
  vehicle_type text,
  booking_date date,
  pickup_time time,
  pickup_location text,
  hotel_name text,
  flight_number text,
  passengers integer,
  luggage integer,
  duration text,
  special_requests text,
  driver_name text,
  driver_phone text,
  booking_status text default 'Pending Review',
  payment_status text default 'Unpaid - Cash',
  amount numeric(10,2),
  created_at timestamptz default now()
);

alter table public.vehicle_settings enable row level security;
alter table public.service_prices enable row level security;
alter table public.hotels enable row level security;
alter table public.bookings enable row level security;
