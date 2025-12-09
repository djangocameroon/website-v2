import { Button } from "@/components/layout";
import { HomeImages } from "@/assets";

const Header = () => {
  const FACTS = [
    {
      number: "567",
      title: "Fact #1",
      description: "Small Description",
    },
    {
      number: "78",
      title: "Fact #2",
      description: "Small Description",
    },
    {
      number: "1.5k",
      title: "Fact #3",
      description: "Small Description",
    },
    {
      number: "20+",
      title: "Fact #4",
      description: "Small Description",
    },
  ];

  return (
    <div className="h-full max-md:mt-40 mt-48 mb-12" id="home">
      <div className="flex items-start gap-8 w-full max-h-[95vh]">
        {/* Vertical line with dot */}
        <div className="flex flex-col items-center pt-2 max-md:hidden">
          <div className="w-3 h-3 rounded-full bg-primary mb-2"></div>
          <div className="w-[2px] h-32 bg-gradient-to-b from-primary to-transparent"></div>
        </div>

        <div className="flex-1 max-w-[900px]">
          <h1 className="leading-[1.15] text-primary nohemi-font overflow-hidden text-left text-3xl sm:text-[80px] font-extrabold">
            The Django Ecosystem <br /> in Cameroon
          </h1>
          <p className="leading-normal text-left text-xl max-md:text-base urbanist-font tracking-wide mt-3 md:mt-6 w-full lg:px-0 overflow-hidden text-text-color font-regular">
            Fueling Innovation, Forging Connections. We're a dynamic community
            of developers in Cameroon, passionate about Django! Empowering
            dreams and pioneer change through technology
          </p>

          <div className="flex items-center w-full mt-4 gap-10 max-md:gap-5">
            <Button outline={false} backgroundColor="bg-primary">
              Get Started
            </Button>
            <Button outline={true}>Learn more</Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] w-full mx-auto max-md:mt-5">
        <img
          src={HomeImages.HeaderImage}
          alt=""
          className="rounded-lg object-contain max-md:hidden"
        />
        <img
          src={HomeImages.HeaderImageMobile}
          alt=""
          className="rounded-lg object-contain md:hidden"
        />
      </div>

      <div className="bg-primary max-w-7xl h-56 w-full mx-auto rounded-[32px] relative max-sm:hidden -mt-2.5">
        <img
          src={HomeImages.curlyGrid}
          alt=""
          className="rounded-lg object-contain"
        />
        <div className="absolute inset-0 flex justify-between items-center w-full h-full px-12">
          {FACTS.map((fact, index) => (
            <div key={index} className="space-y-2 text-white">
              <div className="relative">
                <h1 className="nohemi-font font-extrabold text-[80px] leading-[85px]">
                  {fact.number}
                </h1>
                <h1 className="nohemi-font absolute inset-0 font-extrabold header-number-stats text-[80px] leading-[85px] transform translate-y-[3px] translate-x-[3px]">
                  {fact.number}
                </h1>
              </div>
              <div className="flex gap-x-3">
                <div className="w-9 h-9 rounded-lg border border-primary-lighter bg-white/10" />
                <div>
                  <h3 className="font-medium nohemi-font text-lg leading-[18px]">
                    {fact.title}
                  </h3>
                  <p className="urbanist-font text-sm">{fact.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary rounded-2xl sm:hidden grid grid-cols-2 gap-10 p-5 mx-auto -mt-2.5">
        {FACTS.map((fact, index) => (
          <div key={index} className="space-y-2 text-white">
            <div className="relative text-center">
              <h1 className="nohemi-font font-extrabold text-6xl">
                {fact.number}
              </h1>
              <h1 className="nohemi-font absolute inset-0 font-extrabold header-number-stats text-6xl transform translate-y-[3px] translate-x-[3px]">
                {fact.number}
              </h1>
            </div>
            <div className="flex gap-x-3">
              <div className="w-6 h-6 rounded-lg border border-primary-lighter bg-white/10" />
              <div>
                <h3 className="font-medium nohemi-font text-lg leading-[18px]">
                  {fact.title}
                </h3>
                <p className="urbanist-font text-sm">{fact.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
