// routes/fortunewheel.tsx
import WheelComponent from "../islands/FortuneWheel.tsx";

export default function FortuneWheelPage() {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100">
      <h1 class="text-4xl font-bold mb-4 text-gray-800">Fortune Wheel</h1>
      <p class="mb-8 text-lg text-gray-600">Faites tourner la roue de la Fortune et tentez de gagner une Boisson🍹</p>
      <div class="w-full max-w-lg">
        <WheelComponent
          buttonText="TOURNER"
          size={150} // Adjusted size for better visibility
          onFinished={(winner) => {
            console.log("Gagnant:", winner);
            // Add your winning logic here
          }}
        />
      </div>
    </div>
  );
}
