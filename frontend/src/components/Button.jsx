function Button({
  text,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
}) {
  const variants = {
    primary: "bg-[#F8F7F3] hover:bg-[#E8E7E3] text-[#705B46]",
    secondary: "bg-[#705B46] hover:bg-[#5D4B3A] text-[#F8F7F3]",
  };

  const style =
    "px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 active:scale-95 cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${style} ${variants[variant]} ${className}`}
    >{text}</button>
  );
}

export default Button;
