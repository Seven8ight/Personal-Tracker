type photos = {
  next_page: string;
  page: number;
  per_page: number;
  photos: photo[];
  total_results: 747;
};
type photo = {
  alt: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    small: string;
    medium: string;
    large: string;
  };
  url: string;
};
