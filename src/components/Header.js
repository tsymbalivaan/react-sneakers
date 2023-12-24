import { Link } from 'react-router-dom';
import React from 'react';
import { StorageAll } from '../App';
export default function Header(props) {
	const { cartItems } = React.useContext(StorageAll);

	const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
	return (
		<header className="d-flex justify-between align-center p-40">
			<div className="headerLeft d-flex align-center">
				<Link to="/">
					<img className="mr-15" id="logo" src="../icons/sneakers.png" alt="icon" />
				</Link>
				<div className="title">
					<h3 className="text-uppercase">React sneakers</h3>
					<p>Магазин лучших кроссовок</p>
				</div>
			</div>

			<ul className="headerRight align-center d-flex">
				<li className="cu-p mr-30" onClick={props.onClickCart}>
					<img src="icons/cart.png" alt="cart" />
					<span> {total} грн.</span>
				</li>
				<li>
					<Link to="/favorites">
						<img className="mr-30" src="icons/favor.svg" alt="fav" />
					</Link>
				</li>
				<li>
					<Link to="/account">
						<img src="icons/user.png" alt="user" />
					</Link>
				</li>
			</ul>
		</header>
	);
}
