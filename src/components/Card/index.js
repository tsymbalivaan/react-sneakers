import styles from './Card.module.scss';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { StorageAll } from '../../App';

export default function Card({
	parentID,
	id,
	title,
	price,
	imgUrl,
	onPlus,
	onFavorite,
	favorited = false,
	added = false,
}) {
	const { isLoading, isItemAdded } = React.useContext(StorageAll);

	const [isFav, setIsFav] = React.useState(favorited);
	const onClickPlus = () => {
		onPlus({ id, parentID: id, title, price, imgUrl });
	};

	const onClickFav = () => {
		onFavorite({ id, title, price, imgUrl });
		setIsFav(!isFav);
	};

	return (
		<div className={styles.card}>
			{isLoading ? (
				<ContentLoader
					speed={2}
					width={150}
					height={238}
					viewBox="0 0 150 238"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="0" y="0" rx="10" ry="10" width="155" height="150" />
					<rect x="0" y="159" rx="6" ry="6" width="155" height="15" />
					<rect x="0" y="211" rx="5" ry="5" width="80" height="24" />
					<rect x="0" y="180" rx="6" ry="6" width="100" height="15" />
					<rect x="120" y="208" rx="5" ry="5" width="32" height="32" />
				</ContentLoader>
			) : (
				<>
					<div className={styles.favorite}>
						{onFavorite && (
							<img
								onClick={onClickFav}
								src={isFav ? 'icons/liked.svg' : 'icons/unliked.svg'}
								alt="liked"
							/>
						)}
					</div>
					<img width={133} height={112} alt="sneakers" src={imgUrl} />
					<h5>{title}</h5>
					<div className="d-flex justify-between align-center">
						<div className="d-flex flex-column">
							<span>Цена:</span>
							<b>{price} грн.</b>
						</div>
						{onPlus && (
							<img
								onClick={onClickPlus}
								src={isItemAdded(id) ? 'icons/choosen.svg' : 'icons/plus.svg'}
								alt="plus"
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
}
