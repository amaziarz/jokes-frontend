export interface Joke {
  id: number;
  Title: string;
  Body: string;
  Author: string;
  Views: number;
  CreatedAt: string;
}

export type JokeFormValues = Pick<Joke, 'Title' | 'Body' | 'Author' | 'Views'>;
