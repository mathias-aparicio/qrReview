export default function CheckBox() {
	return (
		<label className="inline-flex items-center cursor-not-allowed">
			<input
				className="appearance-none bg-white m-0 w-5 h-5 border border-gray-400 rounded grid place-content-center disabled:opacity-50 disabled:cursor-not-allowed"
				type="checkbox"
				name="checkbox"
				disabled
			/>
			{/*TODO remove <span className="ml-2 text-gray-500">Checkbox</span>*/}
		</label>
	);
}
