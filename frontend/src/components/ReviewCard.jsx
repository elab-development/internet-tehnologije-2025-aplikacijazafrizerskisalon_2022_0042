import { IoStar } from "react-icons/io5";

function ReviewCard({ avatarImg, text, name }) {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <img src={avatarImg} className="w-32 h-32 object-contain" />
      <h5 className="text-[#4B3928] font-semibold uppercase text-sm md:text-lg mt-2">
        {name}
      </h5>
      <div className="flex gap-1 my-2 text-[#705B46]">
        <IoStar size={16} />
        <IoStar size={16} />
        <IoStar size={16} />
        <IoStar size={16} />
        <IoStar size={16} />
      </div>
      <p className="text-[#705B46] font-montserrat text-[10px] md:text-xs max-w-2xs">
        {text}
      </p>
    </div>
  );
}

export default ReviewCard;
