import React, { useEffect } from "react";
import VideoPlayer from "../components/descriptions/VideoPlayer";
import VideoDescription from "../components/descriptions/VideoDescription";
import RelatedVideoList from "../components/list/RelatedVideoList";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideo } from "../rtk/features/video/videoSlice";
import { useParams } from "react-router-dom";
import Loading from "../components/ui/Loading";

const Video = () => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { video, isLoading, isError, error } = useSelector(
    (state) => state.video
  );
  // console.log("Video Check: ", video.data.link);

  useEffect(() => {
    dispatch(fetchVideo(videoId));
  }, [videoId, dispatch]);

  const { id, link, title, tags } = video || {};
  // console.log("Video Link: ", link);

  // decide what to render
  let content = null;
  if (isLoading) content = <Loading />;
  if (!isLoading && isError)
    content = <div className="col-span-12">{error}</div>;
  if (!isLoading && !isError && !video?.id) {
    content = <div className="col-span-12">Opss, Video Not Found!</div>;
  }
  if (!isLoading && !isError && video?.id) {
    content = (
      <div className="grid grid-cols-3 gap-2 lg:gap-8">
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
          <VideoPlayer link={link} title={title} />
          <VideoDescription video={video} />
        </div>

        <RelatedVideoList currentVideoId={id} tags={tags} />
      </div>
    );
  }
  return (
    <>
      <section className="pt-6 pb-20">
        <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
          {content}
        </div>
      </section>
    </>
  );
};

export default Video;
