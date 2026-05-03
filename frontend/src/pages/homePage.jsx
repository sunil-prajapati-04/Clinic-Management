import React from "react";
import Navbar from "../components/navbar";
import doctorImg from "../assets/ashok-cutout.png";
import { Camera, MapPin, Phone, Play, Users } from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main>
        <section className="bg-white">
          <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="order-2 lg:order-1">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Shree Salasar Balaji Clinic
              </p>
              <h1 className="text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                Dr. Ashok Prajapati
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Trusted care for your family with thoughtful consultation,
                regular checkups, and patient-first treatment.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="tel:+919999999999"
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  <Phone size={18} />
                  Call Doctor
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-indigo-300 hover:text-indigo-600"
                >
                  <MapPin size={18} />
                  Clinic Address
                </a>
              </div>
            </div>

            <div className="order-1 flex justify-center lg:order-2">
              <div className="relative flex min-h-[30rem] w-full max-w-sm items-end justify-center overflow-hidden sm:min-h-[36rem] sm:max-w-md">
                <div className="absolute inset-x-2 bottom-0 h-[78%] rounded-t-full bg-indigo-100" />
                <div className="absolute bottom-0 h-24 w-4/5 rounded-full bg-indigo-200/60 blur-2xl" />
                <img
                  src={doctorImg}
                  alt="Dr. Ashok Prajapati"
                  className="relative z-10 h-[29rem] w-auto max-w-full object-contain object-bottom drop-shadow-2xl sm:h-[34rem]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-500 text-lg font-bold">
                S
              </div>
              <span className="text-xl font-semibold">Shree Salasar Balaji Clinic</span>
            </div>
            <p className="text-sm leading-6 text-slate-300">
              Caring consultation and daily healthcare support by Dr. Ashok
              Prajapati.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Contact
            </h2>
            <div className="space-y-3 text-sm text-slate-300">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0 text-indigo-300" size={18} />
                Main Road, Near Bus Stand, Your City, Gujarat
              </p>
              <p className="flex items-center gap-3">
                <Phone className="shrink-0 text-indigo-300" size={18} />
                +91 99999 99999
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Social
            </h2>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-slate-200 transition hover:bg-indigo-500 hover:text-white"
              >
                <Users size={19} />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-slate-200 transition hover:bg-indigo-500 hover:text-white"
              >
                <Camera size={19} />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-slate-200 transition hover:bg-indigo-500 hover:text-white"
              >
                <Play size={19} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
