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
        "Kuasai bahasa isyarat melalui pelajaran interaktif, sesi latihan, dan kamus lengkap. Cocok untuk pemula maupun pembelajar tingkat lanjut.",
      cta: [
        { text: "Start Learning", link: "#" },
        { text: "Lihat Demo", link: "#" },
      ],
    };
  }

  getFeatures() {
    return [
      {
        icon: `${div1}`,
        title: "Pembelajaran Interaktif",
        description:
          "Belajar melalui video HD dengan umpan balik waktu nyata dan sesi latihan.",
      },
      {
        icon: `${div2}`,
        title: "Lacak Perkembangan",
        description:
          "Pantau perjalanan belajar Anda dengan pelacakan perkembangan dan analitik yang detail.",
      },
      {
        icon: `${div3}`,
        title: "Kamus Lengkap",
        description:
          "Akses ribuan istilah bahasa isyarat dengan penjelasan dan contoh yang lengkap.",
      },
    ];
  }

  getStats() {
    return [
      { value: "50K+", label: "Pelajar Aktif" },
      { value: "1000+", label: "Video Pembelajaran" },
      { value: "5000+", label: "Istilah Kamus" },
      { value: "4.9/5", label: "Rating Pengguna" },
    ];
  }

  getTestimonials() {
    return [
            {
        avatar: `${img1}`,
        name: "Sarah Johnson",
        role: "Pelajar",
        text: "e-Syarat membuat belajar bahasa isyarat menjadi menyenangkan dan mudah diakses. Pelajaran interaktif dan sesi latihan sangat membantu.",
      },
      {
        avatar: `${img2}`,
        name: "Michael Chen",
        role: "Guru",
        text: "Sebagai pengajar, saya merasa kamus dan rencana pelajaran e-Syarat sangat bermanfaat untuk murid-murid saya.",
      },
      {
        avatar: `${img3}`,
        name: "Emma Rodriguez",
        role: "Orang Tua",
        text: "Fitur pelacakan perkembangan membantu saya memantau perjalanan belajar anak saya. Ini adalah investasi yang sangat baik.",
      },
    ];
  }
}
