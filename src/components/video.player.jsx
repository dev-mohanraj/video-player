export const VideoPlayer = ({ source }) => {
  return (
    <video className="w-full h-3/7" controls autoPlay muted playsInline>
      <source src={source} type="video/mp4" />
    </video>
  );
};
