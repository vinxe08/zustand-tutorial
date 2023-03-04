
export interface Movie {
  adult: boolean,
  backdrop_path: string,
  genre_ids: [],
  id: number,
  name: string,
  media_type: string,
  origin_country?: string[],
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  first_air_date:string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

export interface Element {
  type:
    | 'Bloopers'
    | 'Featurette'
    | 'Behind the Scenes'
    | 'Clip'
    | 'Trailer'
    | 'Teaser'
}

export interface Genre{
  id: number
  name: string
}

export interface Result {
  trendingNow: [Movie],
  originals: [Movie],
  topRated: [Movie],
  actionMovies: [Movie],
  comedy: [Movie],
  horror: [Movie],
  romance: [Movie],
  documentaries: [Movie],
}