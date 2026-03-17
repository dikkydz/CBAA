import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyUsSection from "@/components/home/WhyUsSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import MarqueeSection from "@/components/home/MarqueeSection";
import CTASection from "@/components/home/CTASection";
import { Product, Testimonial } from "@/types";

export default function Home() {
  // Mock data for homepage
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Cimol Bojot Original",
      slug: "cimol-bojot-original",
      description: "Cimol kenyal dengan bumbu rahasia turun-temurun khas Sumedang",
      price: 15000,
      image: "/images/cimol-original.jpg",
      isAvailable: true,
      isFeatured: true,
      spicyLevel: 0,
      weight: "100g",
      categoryId: "1",
      category: {
        id: "1",
        name: "Cimol",
        slug: "cimol",
        icon: "🍴"
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "2",
      name: "Cimol Isi Keju",
      slug: "cimol-isi-keju",
      description: "Cimol dengan isian keju melimpah di dalamnya",
      price: 20000,
      image: "/images/cimol-keju.jpg",
      isAvailable: true,
      isFeatured: true,
      spicyLevel: 0,
      weight: "100g",
      categoryId: "1",
      category: {
        id: "1",
        name: "Cimol",
        slug: "cimol",
        icon: "🍴"
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "3",
      name: "Cimol Pedas",
      slug: "cimol-pedas",
      description: "Cimol dengan level kepedasan yang bisa disesuaikan",
      price: 18000,
      image: "/images/cimol-pedas.jpg",
      isAvailable: true,
      isFeatured: true,
      spicyLevel: 2,
      weight: "100g",
      categoryId: "1",
      category: {
        id: "1",
        name: "Cimol",
        slug: "cimol",
        icon: "🍴"
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const mockTestimonials: Testimonial[] = [
    {
      id: "1",
      name: "Ahmad Rahman",
      message: "Cimol Bojot AA adalah yang terbaik! Kenyal dan gurihnya mantap. Sudah jadi langganan keluarga kami.",
      rating: 5,
      avatar: null,
      location: "Bandung",
      createdAt: new Date()
    },
    {
      id: "2",
      name: "Siti Nurhaliza",
      message: "Pengiriman cepat dan cimolnya fresh. Recomended banget buat yang suka cimol!",
      rating: 5,
      avatar: null,
      location: "Jakarta",
      createdAt: new Date()
    },
    {
      id: "3",
      name: "Budi Santoso",
      message: "Rasanya autentik khas Sumedang. Bumbunya pas, tidak terlalu asin atau manis.",
      rating: 5,
      avatar: null,
      location: "Sumedang",
      createdAt: new Date()
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProducts products={mockProducts} />
        <WhyUsSection />
        <StatsSection />
        <TestimonialsSection testimonials={mockTestimonials} />
        <MarqueeSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
