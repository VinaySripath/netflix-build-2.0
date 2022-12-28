import React, { useState, useRef, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

type LazyImg = {
  styleClass: string;
  src: string;
  alt: string;
  id: string;
  genre_ids: [];
  type: string | undefined;
  showInfoHandler: (
    id: string,
    movieGenres: [],
    type: string | undefined
  ) => void;
};

const LazyImage = ({
  styleClass,
  src,
  alt,
  id,
  genre_ids,
  type,
  showInfoHandler,
}: LazyImg) => {
  const [showImage, setShowImage] = useState();
  const imageRef = useRef(null);

  const registerObserver = (ref: any, setShowImage: any) => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        setShowImage(true);
        observer.disconnect();
      });
    });
    observer.observe(ref);
  };

  useEffect(() => {
    registerObserver(imageRef.current, setShowImage);
  }, []);

  if (showImage) {
    return (
      <img
        className={styleClass}
        src={src}
        alt={alt}
        onClick={() => showInfoHandler(id, genre_ids, type)}
      ></img>
    );
  }
  return (
    <div ref={imageRef}>
      <Skeleton
        key={0}
        baseColor="#202020"
        highlightColor="#444"
        className={"h-72 w-44"}
      ></Skeleton>
    </div>
  );
};

export default LazyImage;
