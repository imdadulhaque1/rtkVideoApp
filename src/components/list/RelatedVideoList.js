import React, { useEffect } from "react";
import RelatedVideoListItem from "./RelatedVideoListItem";
import { fetchRelatedVideos } from "../../rtk/features/relatedVideos/relatedVideosSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../ui/Loading";

const RelatedVideoList = ({ currentVideoId, tags }) => {
  const dispatch = useDispatch();
  const { relatedVideos, isLoading, isError, error } = useSelector(
    (state) => state.relatedVideos
  );

  useEffect(() => {
    dispatch(fetchRelatedVideos({ tags, id: currentVideoId }));
  }, [dispatch, currentVideoId, tags]);

  // Decide what to render for Related Videos
  let content = null;
  if (isLoading) content = <Loading />;
  if (!isLoading && isError) {
    content = <div className="col-span-12">{error}</div>;
  }
  if (!isLoading && !isError && !relatedVideos?.length === 0) {
    content = (
      <div className="col-span-12">Opss, Related Videos Not Found!</div>
    );
  }
  if (!isLoading && !isError && relatedVideos?.length > 0) {
    content = relatedVideos.map((video) => (
      <RelatedVideoListItem key={video.id} video={video} />
    ));
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
};

export default RelatedVideoList;
