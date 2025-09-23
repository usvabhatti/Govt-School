"use client";

import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Phone, Mail, UserCheck } from "lucide-react";

const stories = [
  { image: "/image0.jpg", title: "New computer lab in the CS Department" },
  { image: "/image2.jpg", title: "Annual Sports Gala 2025 celebrated with great spirit" },
  { image: "/image3.jpg", title: "Science Exhibition won district-level award" },
  { image: "/image4.jpg", title: "100% Results in Matric Board Exams 2025" },
];

const slides = [
  { src: "/image11.png", caption: "Sports Training" },
  { src: "/image12.jpg", caption: "Latest Laboratories" },
  { src: "/image13.jpg", caption: "Educational Platform" },
  { src: "/image14.png", caption: "Playing Grounds" },
  { src: "/image10.png", caption: "Free Education" },
  { src: "/image15.png", caption: "Dedicated & Qualified Faculty" },
];

function Counter({ from = 0, to, duration = 2 }: { from?: number; to: number; duration?: number }) {
  const count = useMotionValue(from);
  const [value, setValue] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return controls.stop;
  }, [to, duration, count]);

  return <span>{value}</span>;
}

function CarouselSection() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <section className="relative max-w-6xl mx-auto py-6 px-4">
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-green-600 text-white p-2 rounded-full z-10"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white p-2 rounded-full z-10"
      >
        <ChevronRight size={20} />
      </button>

      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {[0, 1].map((offset) => {
              const slide = slides[(index + offset) % slides.length];
              return (
                <div key={slide.src} className="flex flex-col items-center">
                  <div className="h-56 sm:h-72 w-full flex items-center justify-center rounded-xl">
                    <img
                      src={slide.src}
                      alt={slide.caption}
                      className="max-h-56 sm:max-h-72 w-auto object-contain rounded-lg"
                    />
                  </div>
                  <h2 className="text-lg font-bold text-green-700 mt-2 text-center">
                    {slide.caption}
                  </h2>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}



export default function Home() {
  const [activeTab, setActiveTab] = useState("Students");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % stories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen">
      <CarouselSection />

      <section className="relative max-w-6xl mx-auto py-6 px-4">
        <div className="flex items-center space-x-3 mb-6">
          <h2 className="text-2xl font-bold text-green-700">Latest</h2>
          <h2 className="text-2xl font-light text-green-700">Highlights</h2>
        </div>

        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-2xl shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0 flex items-end bg-cover bg-center text-white"
              style={{ backgroundImage: `url(${stories[index].image})` }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <div className="w-full bg-black/50 p-4 sm:p-6 rounded-b-2xl">
                <h3 className="text-base sm:text-lg md:text-2xl font-semibold">
                  {stories[index].title}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${i === index ? "bg-green-600 scale-110" : "bg-gray-300"
                }`}
            ></button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[
          {
            img: "/image7.jpg",
            title: "Admissions",
            desc: "Free Education from Play to Class 10. Click here to apply now.",
          },
          {
            img: "/image8.jpg",
            title: "Programs",
            desc: "All programs are offered in a variety of fields of study.",
          },
          {
            img: "/image9.jpg",
            title: "Faculties & Departments",
            desc: "Explore our faculties, departments, and research centers.",
          },
        ].map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-green-300"
          >
            <div className="relative overflow-hidden">
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-700 mb-2 group-hover:text-green-800 transition">
                {card.title}
              </h3>
              <p className="text-gray-600 mb-5 leading-relaxed">{card.desc}</p>
              <button className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition">
                Read More +
              </button>
            </div>
          </motion.div>
        ))}
      </section>


      <section className="w-full bg-green-600 text-white py-12">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              <Counter to={2000} duration={3} />+
            </h2>
            <p className="text-lg mt-2">Students</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              <Counter to={150} duration={3} />+
            </h2>
            <p className="text-lg mt-2">Faculty</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold">#1</h2>
            <p className="text-lg mt-2">School</p>
          </motion.div>
        </div>
      </section>

            {/* Portal Section */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-10">
            Access Our Portals
          </h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            {["Students", "Faculty"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-white text-green-700 border border-green-300 hover:bg-green-50"
                }`}
              >
                {tab} Portal
              </button>
            ))}
          </div>

          {/* Portal Content */}
          <AnimatePresence mode="wait">
            {activeTab === "Students" && (
              <motion.div
                key="students"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto border border-green-100"
              >
                <h3 className="text-2xl font-bold text-green-700 mb-4">
                  Students Portal
                </h3>
                <p className="text-gray-600 mb-6">
                  Access your classes, results, and important updates through the Students Portal.
                </p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition">
                  Go to Students Portal
                </button>
              </motion.div>
            )}

            {activeTab === "Faculty" && (
              <motion.div
                key="faculty"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto border border-green-100"
              >
                <h3 className="text-2xl font-bold text-green-700 mb-4">
                  Faculty Portal
                </h3>
                <p className="text-gray-600 mb-6">
                  Faculty members can manage courses, schedules, and communicate with students.
                </p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition">
                  Go to Faculty Portal
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
       <section className="max-w-6xl mx-auto px-4 py-14">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-green-700 text-center mb-10">
        Contact Us
      </h2>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Phone */}
        <div className="bg-white border border-green-500 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <Phone size={40} className="text-green-600 mb-4" />
          <h3 className="text-lg font-semibold text-green-700">Phone Number</h3>
          <p className="text-gray-600 mt-2">+92 300 1234567</p>
        </div>

        {/* Meet Principal */}
        <div className="bg-white border border-green-500 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <UserCheck size={40} className="text-green-600 mb-4" />
          <h3 className="text-lg font-semibold text-green-700">Meet in Office</h3>
          <p className="text-gray-600 mt-2">Visit the Principal Office</p>
        </div>

        {/* Email */}
        <div className="bg-white border border-green-500 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <Mail size={40} className="text-green-600 mb-4" />
          <h3 className="text-lg font-semibold text-green-700">Email</h3>
          <p className="text-gray-600 mt-2">info@govthighschoolno1.edu.pk</p>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-700 font-medium">
          Timings: <span className="text-green-700">Monday – Saturday</span> | 8:00 AM – 4:00 PM
        </p>
      </div>
      {/* Timings */}
    </section>

    </main>
  );
}
