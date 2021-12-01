function Story({ img, username }) {
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-[1.5px] object-contain border-2 border-red-500 cursor-pointer hover:scale-110 transition-transform duration-200 ease-out"
        src={img}
        alt=""
      ></img>
      <p className="text-xs w-14 text-center truncate">{username}</p>
    </div>
  );
}

export default Story;
