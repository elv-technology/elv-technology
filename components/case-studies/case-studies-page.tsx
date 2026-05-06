import { caseStudiesData } from "@/lib/case-studies-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CaseStudiesPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Case Studies
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            See how we've helped our clients achieve their goals.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudiesData.map((study) => (
            <Link key={study.slug} href={`/case-studies/${study.slug}`}>
              <div className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full">
                <div className="relative h-56">
                  <Image
                    className="w-full h-full object-cover rounded-t-lg"
                    src={study.image}
                    alt={study.project}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {study.client}
                  </h2>
                  <h3 className="mt-1.5 text-sm font-semibold text-red-600 line-clamp-2">
                    {study.project}
                  </h3>
                  <p className="mt-3 text-base text-gray-600 line-clamp-3">
                    {study.overview}
                  </p>
                  <div className="mt-4 flex items-center text-red-600 font-semibold">
                    Read Case Study
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
