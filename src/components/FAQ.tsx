import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "Is FlyAuqab certified for real-world training?",
      answer: "We are currently pursuing FAA/EASA validation for both civil and defense use. Our flight dynamics engine (JSBSim) is already validated within 5-10% accuracy, meeting industry standards for professional training simulators."
    },
    {
      question: "Can FlyAuqab replace full simulators?",
      answer: "Not yet for all applications, but FlyAuqab complements traditional simulators at 20x lower cost. It's perfect for initial training, procedure practice, and recurrent training, while full simulators remain necessary for final certification and type ratings."
    },
    {
      question: "Which aircraft are supported?",
      answer: "Currently, we support F-16 and JF-17 for military training, plus A320 and B737 for civil aviation. Our roadmap includes additional aircraft models based on customer demand, including helicopters and general aviation aircraft."
    },
    {
      question: "What hardware is included in the Beta Kit?",
      answer: "The FlyAuqab Beta Kit includes our custom VR goggles with 4K per eye displays, professional-grade joystick and throttle controls, carrying case, and pre-installed software. Optional add-ons include haptic feedback gloves and motion chair."
    },
    {
      question: "Who should use FlyAuqab?",
      answer: "FlyAuqab is designed for air forces, flight schools, universities, airlines, and individual pilots seeking affordable, high-quality training. It's perfect for cadet training, recurrent training, and skill maintenance."
    },
    {
      question: "What are the system requirements?",
      answer: "FlyAuqab runs on standard Windows and Linux systems with dedicated graphics cards. Minimum requirements include Intel i5 or AMD Ryzen 5, 16GB RAM, and GTX 1060 or equivalent. We also support standalone VR headsets."
    },
    {
      question: "How realistic is the training experience?",
      answer: "Our JSBSim physics engine provides 5-10% accuracy compared to real aircraft, with realistic weather simulation, accurate navigation systems, and authentic cockpit procedures. The combination of VR immersion and physical controls delivers professional-grade training."
    },
    {
      question: "Can multiple users train together?",
      answer: "Yes! FlyAuqab supports multiplayer training sessions for squadron exercises, formation flying, air traffic control scenarios, and instructor-student sessions. Multiple units can be networked for large-scale training exercises."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-6">
            <HelpCircle className="h-4 w-4" />
            <span className="font-medium">Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Got Questions?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about FlyAuqab Beta and our VR training platform.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-2xl px-6 py-2 hover:shadow-aviation transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-muted/50 p-8 rounded-2xl border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our team of aviation and VR experts is here to help you understand how 
              FlyAuqab can transform your training programs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <a 
                href="mailto:support@flyauqab.com" 
                className="text-primary hover:text-primary/80 font-medium bg-primary/10 px-4 py-2 rounded-lg transition-colors"
              >
                support@flyauqab.com
              </a>
              <span className="hidden sm:block text-muted-foreground">•</span>
              <a 
                href="tel:+1-555-0123" 
                className="text-primary hover:text-primary/80 font-medium bg-primary/10 px-4 py-2 rounded-lg transition-colors"
              >
                +1 (555) 012-3456
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;