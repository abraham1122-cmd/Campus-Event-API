

export type Event = {

    id: number;
    title: string;
    description: string;
    location: string;
    eventDate: string;
    category: string;
    isPublished: boolean;
}


export type Session = {
 
    id: number;
    title: string;
    eventId: number;
    startAt: string;
    endAt: string;
    room: string;
    

}