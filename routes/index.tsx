// routes/review.tsx
import { h } from "preact";
import ReviewButton from "../components/ReviewButton.tsx";
export default function ReviewPage() {
  const handleReviewClick = () => {
    // TODO!
  };

  return (
    <div class="relative min-h-screen bg-gradient-to-b from-purple-50 to-gray-100 p-4 overflow-hidden">
      {/* Decorative stars */}
      <div class="absolute top-10 left-10 text-purple-200">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      </div>
      <div class="absolute top-1/4 right-20 text-purple-200">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      </div>
      <div class="absolute bottom-1/4 left-20 text-purple-200">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      </div>
      <div class="absolute top-1/3 left-1/4 text-purple-200">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      </div>
      <div class="absolute top-20 right-1/3 text-purple-200">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      </div>

      {/* Main content */}
      <div class="flex flex-col items-center justify-center min-h-screen relative z-10">
        {/* Decorative circle behind the title */}
        <div class="absolute top-0 -mt-8 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50" />

        <div class="relative">
          <h1 class="text-5xl font-bold mb-4 text-gray-800 font-serif tracking-wide">
            Votre Avis Compte!
          </h1>
          <div class="h-1 w-32 bg-gradient-to-r from-purple-300 to-pink-300 mx-auto rounded-full mb-6" />
        </div>

        <p class="mb-12 text-xl text-gray-600 max-w-md font-light text-center">
          Nous serions ravis d'avoir votre retour d'expérience. Partagez votre
          expérience sur Google en laissant un avis !
          <span class="text-2xl ml-1">⭐</span>
        </p>

        {/* Review button */}
        <ReviewButton googleReviewLink="your-actual-google-review-link" />

        {/* Bottom stars */}
        <div class="flex gap-4 text-purple-300 mt-16">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="transform transition-transform duration-300 hover:scale-110"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
