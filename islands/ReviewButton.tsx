import { h } from "preact";

export default function ReviewButton({ company = "google" }) {
	const selectedConfig = configs[company.toLowerCase()] || configs.google;

	return (
		<a
			href="#"
			className="inline-flex items-center px-4 py-2 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
		>
			<div className="flex items-center space-x-2">
				{/* Company Logo */}
				<div className="w-6 h-6 relative">{selectedConfig.logo}</div>

				{/* Text Content */}
				<div className="text-left">
					<div className="text-sm text-gray-600">Click here to leave us</div>
					<div className="text-sm font-medium flex items-center">
						a review on
						<span className={`ml-1 ${selectedConfig.textColor}`}>
							{selectedConfig.text}
						</span>
					</div>
				</div>
			</div>
		</a>
	);
}
const configs = {
	google: {
		text: "Google!",
		textColor: "text-blue-500",
		logo: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 326667 333333"
				shape-rendering="geometricPrecision"
				text-rendering="geometricPrecision"
				image-rendering="optimizeQuality"
				fill-rule="evenodd"
				clip-rule="evenodd"
			>
				<path
					d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
					fill="#4285f4"
				/>
				<path
					d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
					fill="#34a853"
				/>
				<path
					d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
					fill="#fbbc04"
				/>
				<path
					d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
					fill="#ea4335"
				/>
			</svg>
		),
	},
	tripadvisor: {
		text: "TripAdvisor!",
		textColor: "text-green-600",
		logo: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1333.31 1333.31"
				shape-rendering="geometricPrecision"
				text-rendering="geometricPrecision"
				image-rendering="optimizeQuality"
				fill-rule="evenodd"
				clip-rule="evenodd"
			>
				<g fill-rule="nonzero">
					<circle cx="666.66" cy="666.66" r="666.66" fill="#34e0a1" />
					<path d="M1078.42 536.6l80.45-87.52h-178.4c-89.31-61.01-197.17-96.54-313.81-96.54-116.5 0-224.06 35.61-313.22 96.54H174.6l80.44 87.52c-49.31 44.99-80.22 109.8-80.22 181.75 0 135.79 110.09 245.88 245.88 245.88 64.51 0 123.27-24.88 167.14-65.55l78.81 85.81 78.81-85.73c43.87 40.67 102.57 65.47 167.07 65.47 135.79 0 246.03-110.09 246.03-245.88.07-72.03-30.84-136.83-80.15-181.75zM420.77 884.75c-91.92 0-166.4-74.48-166.4-166.4s74.49-166.4 166.4-166.4c91.92 0 166.4 74.49 166.4 166.4 0 91.91-74.49 166.4-166.4 166.4zm245.96-171.24c0-109.5-79.63-203.5-184.73-243.65 56.84-23.76 119.18-36.94 184.66-36.94 65.47 0 127.89 13.18 184.73 36.94-105.02 40.23-184.65 134.15-184.65 243.65zm245.88 171.24c-91.92 0-166.4-74.48-166.4-166.4s74.49-166.4 166.4-166.4c91.92 0 166.4 74.49 166.4 166.4 0 91.91-74.49 166.4-166.4 166.4zm0-253.7c-48.2 0-87.23 39.03-87.23 87.23 0 48.19 39.03 87.22 87.23 87.22 48.19 0 87.22-39.03 87.22-87.22 0-48.12-39.03-87.23-87.22-87.23zM508 718.35c0 48.19-39.03 87.22-87.23 87.22-48.19 0-87.22-39.03-87.22-87.22 0-48.2 39.03-87.23 87.22-87.23 48.19-.07 87.23 39.03 87.23 87.23z" />
				</g>
			</svg>
		),
	},
};
