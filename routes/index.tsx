import ReviewButton from "../islands/ReviewButton.tsx";
import GoToFortuneWheelButton from "../islands/GoToFortuneWheelButton.tsx";
export default function ReviewPage() {
	return (
		<div>
			{/* Main header*/}
			<h1>La roue de la Fortune</h1>

			{/* Explanatory pragraph */}
			<p>
				Laisse un avis en ligne et lance la roue de la fortune et tente de
				gagner une boisson ou plus ⭐
			</p>

			{/*Google and TripAdvisor review box bith post a review button */}
			<ReviewButton company="google" />
			<ReviewButton company="tripadvisor" />
			{/*Button to acess to the fortune wheel is first gray and highlights when at least one case above is checked */}
			<GoToFortuneWheelButton />
			{/* Information note on maximising probability of win */}
			<p>
				Donner un avis sur les deux plateformes augmentent tes chance de gagner
				une collation!
			</p>
		</div>
	);
}
