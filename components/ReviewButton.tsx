import { h } from "preact";

interface ReviewButtonProps {
  googleReviewLink?: string;
}

export default function ReviewButton(
  { googleReviewLink = "https://g.page/r/YOUR-GOOGLE-REVIEW-LINK" }:
    ReviewButtonProps,
) {
  const handleReviewClick = () => {
    window.open(googleReviewLink, "_blank");
  };

  return (
    <button
      onClick={handleReviewClick}
      class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full
             font-semibold text-lg shadow-lg transform transition-transform duration-200
             hover:scale-105 hover:shadow-xl active:scale-95"
    >
      Laisser un Avis sur Google
    </button>
  );
}
