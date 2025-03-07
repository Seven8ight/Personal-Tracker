import { createContext, memo, useContext, useEffect, useState } from "react";
import { createClient } from "pexels";
import Loading from "../Popups/Loading";
import Error from "../Popups/Error";

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

const Images = createContext<photos | null>(null),
  client = createClient(
    "0tOAdsHjY29NMWloE9V2YQdbg017o4n2Fm7wHcw0hQ3R8hws2OeqL1lk"
  ),
  query: string[] = [
    "retro",
    "lofi",
    "nature",
    "calligraphy",
    "setup",
    "scenery",
    "beach",
    "study",
    "motivation",
  ];

export const usePhotos = () => {
  const photos = useContext(Images);
  return photos;
};

const PictureHandler = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [photos, setPhotos] = useState<photos | any>(),
    [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const photoFetcher = async (): Promise<any | photos> => {
      try {
        let gallery: photos | any = await client.photos.search({
          query: query.at(Math.round(Math.random() * 8)) as string,
          per_page: 10,
        });

        return gallery;
      } catch (error) {
        setError(true);
      }
    };
    const caller = async () => {
      const photos: photos | any = await photoFetcher();
      setPhotos(photos);
    };
    caller();
  }, []);

  return (
    <Images value={photos}>
      {children}
      {typeof photos == "undefined" && error != true && <Loading />}
      {error && <Error type="Photo request invalid" />}
    </Images>
  );
};

const PicturesHandler = memo(PictureHandler);
export default PicturesHandler;
