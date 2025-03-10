import { memo, Suspense, useEffect, useState } from "react";
import Loading from "../Popups/Loading";

type quote = {
  text: string;
  author: string;
};

const Quotes = (): React.ReactNode => {
  const [fetchedquote, setQuote] = useState<quote[]>([]),
    randomNumber = Math.floor(Math.random() * 9),
    options = ["confidence", "success", "inspiration", "win", "winners"];

  useEffect(() => {
    const fetcher = async () => {
      try {
        let response = await fetch(
          `https://thequoteshub.com/api/tags/${
            options[Math.floor(Math.random() * (options.length - 1))]
          }`
        );

        if (response.ok) {
          response.json().then((data) => {
            setQuote(data.quotes);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetcher();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div id="quotes">
        {fetchedquote[randomNumber] && (
          <>
            <p>{fetchedquote[randomNumber].text}</p>
            <p>
              <u>{fetchedquote[randomNumber].author}</u>
            </p>
          </>
        )}
      </div>
    </Suspense>
  );
};

const Quote = memo(Quotes);

export default Quote;
