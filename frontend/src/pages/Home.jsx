import heroImg from "../assets/salon.png";
import Button from "../components/Button";
import sisanjeMusko from "../assets/sisanje-musko.png";
import sisanjeZensko from "../assets/sisanje-zensko.png";
import farbanje from "../assets/farbanje.png";
import brada from "../assets/brada.png";
import ServiceCard from "../components/ServiceCard";
import ReviewCard from "../components/ReviewCard";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import { Link } from "react-router-dom";

function Home() {
  const services = [
    {
      id: 1,
      icon: sisanjeMusko,
      title: "MUŠKO ŠIŠANJE",
      desc: "Pranje, šišanje i stilizovanje",
    },
    {
      id: 2,
      icon: sisanjeZensko,
      title: "ŽENSKO ŠIŠANJE",
      desc: "Konsultacije, pranje i feniranje.",
    },
    {
      id: 3,
      icon: farbanje,
      title: "FARBANJE I PRAMENOVI",
      desc: "Premium boje i nega.",
    },
    {
      id: 4,
      icon: brada,
      title: "BRADA I STILIZOVANJE",
      desc: "Oblikovanje, brijanje i tretman.",
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Jelena P.",
      avatarImg: avatar1,
      text: "Ovde su mi ne samo definisali lokne, već su me naučili kako da ih pravilno negujem. Moja kosa nikada nije imala ovoliko volumena i sjaja!",
    },
    {
      id: 2,
      name: "Marko S.",
      avatarImg: avatar2,
      text: "Vrhunski 'fade' i neverovatna posvećenost detaljima. Retko gde se oseti ovoliki nivo profesionalizma i pažnje prema klijentu.",
    },
    {
      id: 3,
      name: "Anđela M.",
      avatarImg: avatar3,
      text: "Balayage izgleda neverovatno prirodno, a kosa je nakon tretmana mekša nego ikada. Ambijent je poseban doživljaj sam po sebi.",
    },
  ];
  return (
    <div className="font-montserrat overflow-x-hidden bg-[#F5F2E9]">
      <div className="relative h-screen md:h-[95vh] flex justify-center items-center text-center text-[#F8F7F3]">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} className="w-full h-full object-cover"></img>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-1 ">
          <h1 className="font-cormorant italic uppercase text-5xl md:text-7xl pb-3 tracking-wider">
            Budite najbolja <br />
            verzija sebe
          </h1>
          <p className="font-montserrat mb-3 text-sm md:text-base max-w-60 md:max-w-none mx-auto">
            Profesionalno šišanje i stilizovanje za žene i muškarce.
          </p>
          <Button
            variant="primary"
            text="ZAKAZI TERMIN"
            className="text-[12px] md:text-sm"
          ></Button>
        </div>
      </div>

      <div className="text-[#705B46] text-center justify-center items-center px-10 py-10 md:p-20">
        <h1 className="font-cormorant uppercase text-3xl md:text-4xl pb-3 tracking-wider">
          Vaša kosa, naša inspiracija
        </h1>
        <p className="font-montserrat text-sm md:text-base">
          Naša priča počela je iz jednostavne strasti prema lepoti i želje da
          svakom klijentu pružimo više od običnog šišanja. U srcu našeg rada je
          uverenje da kosa nije samo ukras, već izraz vaše ličnosti. Naš tim
          čine stručnjaci posvećeni neprestanom usavršavanju i najnovijim
          svetskim trendovima. Koristimo isključivo vrhunske preparate koji
          neguju vašu kosu od korena do krajeva. Zakoračite u naš mali kutak
          estetike, gde se pažljivo slušaju vaše želje, a svaki detalj kreira s
          ljubavlju.
        </p>
      </div>

      <div className="bg-[#EBE5D7] mx-10 md:mx-20 rounded-2xl p-10 text-[#705B46] text-center">
        <h2 className="font-cormorant uppercase text-3xl md:text-4xl pb-3 tracking-wider mb-8 md:mb-12 ">
          Naše najtrazenije usluge
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              iconSrc={service.icon}
              title={service.title}
              description={service.desc}
            ></ServiceCard>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center pt-10">
        <Link to="/services">
          <Button
            text="VIDI SVE USLUGE"
            variant="secondary"
            className="text-[12px] md:text-sm"
          ></Button>
        </Link>
      </div>
      <div className="text-center p-10">
        <h2 className=" text-[#705B46] font-cormorant uppercase text-3xl md:text-4xl pb-3 tracking-wider mb-8 md:mb-12 ">
          ŠTA NAŠI KLIJENTI KAŽU O NAMA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              text={review.text}
              name={review.name}
              avatarImg={review.avatarImg}
            ></ReviewCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
