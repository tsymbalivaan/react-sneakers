import Card from '../components/Card';
export default function favorites({ items, onFav }) {
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>Закладки</h1>
			</div>

			<div className="d-flex flex-wrap ">
				{items.map((item, index) => (
					<Card onFavorite={onFav} key={index} favorited={true} {...item} />
				))}
			</div>
		</div>
	);
}
