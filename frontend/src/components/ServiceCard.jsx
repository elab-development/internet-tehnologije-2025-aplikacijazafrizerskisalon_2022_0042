function ServiceCard({ iconSrc, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-[#705B46] rounded-full flex items-center justify-center text-[#F8F7F3] mb-4 transition-transform group-hover:scale-110">
        <img
          src={iconSrc}
          alt={title}
          className="w-10 h-10 object-contain"
        />{" "}
      </div>
      <h3 className="text-[#4B3928] font-semibold uppercase">{title}</h3>
      <p className="text-[#705B46]">{description}</p>
    </div>
  );
}

export default ServiceCard;
