export default function Home() {

  return (
    <>
    <div className="flex flex-col items-center mt-2">
      {/* school logo div */}
        <img src="https://images.seeklogo.com/logo-png/23/1/government-of-punjab-logo-png_seeklogo-230804.png" alt="school logo" className="h-40 w-auto" />
        <p className="-mt-3 text-center text-sm font-semibold text-lg leading-tight text-[rgb(24,59,78)]">Government High School 01</p>

      </div>

      {/* home page photo */}
      <div className="w-full h-screen relative">
        <img src="https://media.gettyimages.com/id/494552648/video/boy-in-school-uniform-writing-math-lesson-on-his-notebook-with-an-ink-pen-in-the-background.jpg?s=640x640&k=20&c=xr3klfuBWwEM4ClWOThbNZLYNwSnfHVRLJNec5MddcY=" alt="student photo" className="w-full h-full object-cover opacity-60 mt-7" />
      </div>
    
    {/* overlay text */}
      <div className="absolute inset-0 flex items-center justify-center px-8 pointer-events-none mt-[400px]">
    <h2 className="text-[rgb(24,59,78)] text-5xl md:text-6xl font-bold text-center leading-tight">
      No.01 School in Hasilpur 
    </h2>
  </div>
    </>
  );
}
