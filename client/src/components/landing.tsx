import { Link } from 'react-router-dom';
import { AnimatedTooltipPreview } from './developers';
import { TabsDemo } from './features';
import { Boxes } from './ui/background-boxes';

function Landing() {
  return (
    <>
      <section className="h-screen relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg">
        <div className="z-10 contents">
          <div className="left-10 top-10 h-full absolute hidden sm:hidden lg:block">
            <img
              src="/assets/illustrations/book.svg"
              alt=""
              className="h-48 left-0  w-5/6 transition-transform transform duration-100 hover:scale-105 motion-safe:animate-[moveBackAndForth_15s_ease-in-out_infinite] "
            />
          </div>
          <div className="absolute right-10 top-64 h-full hidden sm:hidden lg:block">
            <img
              src="/assets/illustrations/laptop.svg"
              alt=""
              className="h-48 left-0  w-5/6 transition-transform transform duration-100 hover:scale-105 motion-safe:animate-[moveBackAndForth_15s_ease-in-out_infinite] "
            />
          </div>
          <div className="absolute -bottom-96 left-48  h-full hidden sm:hidden lg:block">
            <img
              src="/assets/illustrations/tickets.svg"
              alt=""
              className="h-48 left-0 w-5/6 transition-transform transform duration-100 hover:scale-105 motion-safe:animate-[moveBackAndForth_15s_ease-in-out_infinite]  "
            />
          </div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl text-sky-900">
          Educative.ai
          </h1>
          <h3 className="mt-8 scroll-m-20 text-3xl font-semibold tracking-tight text-sky-950">
            Your one stop edu Assistant
          </h3>
          <Link to="/dashboard" className="z-10">
            <button
              type="button"
              className="px-8 py-0.5  border-2 border-black dark:border-white  uppercase bg-white text-neutarl-700 transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] w-[60vw] lg:w-[20vw] h-[5vh] mt-8"
            >
              Let's get started
            </button>
          </Link>
        </div>
        <Boxes className="opacity-20" />
      </section>
      <hr />
      <section className="w-full px-2 relative">
        <h1 className="scroll-m-20 flex w-full items-center justify-center pt-10 text-center text-4xl font-extrabold tracking-tight lg:text-8xl text-sky-900">
          Features
        </h1>
        <TabsDemo />
      </section>
      <section className="pb-12 w-full pt-32 flex items-center justify-center flex-col ">
        <h3 className="mt-8 scroll-m-20 text-3xl font-semibold tracking-tight pb-20 underline underline-offset-4">
          Contributors
        </h3>
        <AnimatedTooltipPreview />
      </section>
      <div className="w-full h-16 flex items-center justify-center bg-slate-200">
        <p className="leading-7 [&:not(:first-child)]:mt-6 ">
          Made with ❤️ by the Team Heisenberg
        </p>
      </div>
    </>
  );
}

export default Landing;
