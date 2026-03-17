import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/home/HeroSection";
import MarqueeSection from "@/components/home/MarqueeSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyUsSection from "@/components/home/WhyUsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { isFeatured: true, isAvailable: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
  } catch {
    return [];
  }
}

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [products, testimonials] = await Promise.all([
    getFeaturedProducts(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <StatsSection />
      <FeaturedProducts products={products as any} />
      <WhyUsSection />
      <TestimonialsSection testimonials={testimonials as any} />
      <CTASection />
    </>
  );
}