import ReviewButton from "../islands/ReviewButton.tsx";
import GoToFortuneWheelButton from "../islands/GoToFortuneWheelButton.tsx";
export default function ReviewPage() {
	return (
		// min-h-screen sets minimum of height of 100% vh (where a 1 vh = 1% height of the viewport)
		// bg-gray-50 set background color to gray
		// py-* px-* set padding to x and y
		// sm:px-6 means that for wider screen that small screen 600px then we add padding otherwise the utility class is ignored
		<div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
			{/* 
    - max-w-md maximum width for the container set to medium screen 28rem
    - mx-auto set margin left and right to auto which center the div in parent div
    - bg-white set the background to white 
    - makes the border rounded xl is 0.75rem 
    - shadow-lg applies box shadow
    - p-8 2 rem of padding 
    */}
			<div className="max-w-[34rem] mx-auto bg-white rounded-xl shadow-lg p-8">
				{/*
      Main header 
      - centerd horizontally 
      - Underline with a rainbow gradient 
      - drop shadow
      */}
				{/* */}
				<h1 className="text-3xl font-bold text-center mb-6 pb-3 relative">
					La roue de la Fortune
					<div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 via-green-400 via-yellow-400 via-orange-400 to-red-500"></div>
				</h1>
				{/* Explanatory paragraph */}
				<p className="text-gray-600 text-center mb-8">
					Laisse un avis en ligne pour lancer la roue de la fortune et tenter de
					gagner une boisson ou plus ⭐
				</p>

				{/* Review buttons container */}
				<div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center justify-content">
					<ReviewButton company="google" />
					<ReviewButton company="tripadvisor" />
				</div>

				{/* Fortune wheel button */}
				<div className="mb-8">
					<GoToFortuneWheelButton />
				</div>

				{/* Information note */}
				<p className="text-sm text-gray-500 text-center italic">
					Donner un avis sur les deux plateformes augmentent tes chance de
					gagner une collation!
				</p>
			</div>
		</div>
	);
}
