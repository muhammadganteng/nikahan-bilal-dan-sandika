export interface GuestInfo {
  name: string;
  session: number; // 1: Akad & Resepsi, 2: Resepsi Only
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface RSVPEntry {
  id?: string;
  keluarga: string;
  jumlah_tamu: number;
  greeting: string;
  status: 'hadir' | 'mungkin' | 'tidak';
  created_at?: string;
}
