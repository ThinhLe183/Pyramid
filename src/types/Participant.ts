export interface Participant {
  id: string;
  name: string;
  username: string;
  avatar?: string | undefined;
  nickname?: string;
  last_read?: string; // Message id
}
