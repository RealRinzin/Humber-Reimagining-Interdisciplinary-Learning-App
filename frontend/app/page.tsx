import Image from "next/image";

export default async function Home() {
  const topicsResponse = await fetch("http://127.0.0.1:8000/v1/topics/yri9K4n8KOn2fvbJKf");
  const topicsData = await topicsResponse.json();
  // console.log("Topics Data:", topicsData);
  return (
    <>
      {topicsData.data.title}
      Home Page
      <video
        id="my-video"
        className="video-js"
        controls
        width="640"
        height="264"
        preload="auto"
        poster="//vjs.zencdn.net/v/oceans.png"
        data-setup='{}'>
        <source src={topicsData.data.video_url + "#t=5"} type="video/mp4"></source>
        {/* <source src="https://www.pexels.com/download/video/5198159#t=2" type="video/mp4"></source> */}
        {/* <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source> */}
        {/* <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source> */}
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video
          </a>
        </p>
      </video>
      <script src="/app/script.js"></script>
    </>
  );
}
