export interface Review {
  content: string;
  rating: number;
  date: string;
  isNew: boolean;
}

export const reviews: Review[] = [
  {
    content:
      "I had the opportunity to work with Tamer and Ellen, and their level of support and professionalism was commendable. Their dedication significantly contributed to a smooth and efficient process.",
    rating: 5,
    date: "1 week ago",
    isNew: true,
  },
  {
    content:
      "ELV Technology is the best CCTV company in Abu Dhabi. They are technical experts and have a professional team. Their rates are reasonable, and the services are quite fast. In short, ELV Technology is the Best Integrator for CCTV Installations and Audio and Visual Systems.",
    rating: 5,
    date: "2 weeks ago",
    isNew: true,
  },
  {
    content:
      "Highly recommended for ELV Systems/CCTV Systems & Audio Visual Systems. Positive: Responsiveness, Punctuality, Quality, Professionalism, Value. Services: Security system installation, Security cameras, Surround sound installation, Technical support",
    rating: 5,
    date: "21 Mar 2023",
    isNew: false,
  },
  {
    content: "Very good and excellent service 👍",
    rating: 5,
    date: "3 weeks ago",
    isNew: true,
  },
];
