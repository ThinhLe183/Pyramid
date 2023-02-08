import { Participant } from "../types/Participant";

export default function (
  participants: Participant[],
  myId?: string,
  
) {
  return participants
    .filter((participant) => participant.id !== myId)
}
