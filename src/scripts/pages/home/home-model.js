// Model untuk Homepage (MVP Pattern)
import img1 from "../../../assets/testimonial/img1.png";
import img2 from "../../../assets/testimonial/img2.png";
import img3 from "../../../assets/testimonial/img3.png";
import div1 from "../../../assets/icon/div1.png";
import div2 from "../../../assets/icon/div2.png";
import div3 from "../../../assets/icon/div3.png";

export default class HomeModel {
  getHeroSection() {
    return {
      title: "Learn Sign Language the Modern Way",
      description:
        "Master sign language through interactive lessons, practice sessions, and a comprehensive dictionary. Perfect for beginners and advanced learners.",
      cta: [
        { text: "Start Learning", link: "#" },
        { text: "Watch Demo", link: "#" },
      ],
    };
  }

  getFeatures() {
    return [
      {
        icon: `${div1}`,
        title: "Interactive Learning",
        description:
          "Learn through HD video lessons with real-time feedback and practice sessions.",
      },
      {
        icon: `${div2}`,
        title: "Track Progress",
        description:
          "Monitor your learning journey with detailed progress tracking and analytics.",
      },
      {
        icon: `${div3}`,
        title: "Rich Dictionary",
        description:
          "Access thousands of sign language terms with detailed explanations and examples.",
      },
    ];
  }

  getStats() {
    return [
      { value: "50K+", label: "Active Learners" },
      { value: "1000+", label: "Video Lessons" },
      { value: "5000+", label: "Dictionary Terms" },
      { value: "4.9/5", label: "User Rating" },
    ];
  }

  getTestimonials() {
    return [
      {
        avatar: `${img1}`,
        name: "Sarah Johnson",
        role: "Student",
        text: "e-Syarat made learning sign language fun and accessible. The interactive lessons and practice sessions are incredibly helpful.",
      },
      {
        avatar: `${img2}`,
        name: "Michael Chen",
        role: "Teacher",
        text: "As an educator, I find e-Syarat's comprehensive dictionary and lesson plans invaluable for my students.",
      },
      {
        avatar: `${img3}`,
        name: "Emma Rodriguez",
        role: "Parent",
        text: "The progress tracking feature helps me monitor my child's learning journey. It's been a great investment.",
      },
    ];
  }
}
