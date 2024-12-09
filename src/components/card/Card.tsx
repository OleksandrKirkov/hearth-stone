import { CardType } from '@/types/card.type'
import Image from 'next/image'
import { CSSProperties, FC } from 'react'
import styles from './Card.module.css'

interface ICard {
	card: CardType
	onClick?: () => void
	enemy?: boolean
	style?: CSSProperties
}

const Card: FC<ICard> = ({ card, onClick, style, enemy = false }) => {
	if (!card.data) return

	return (
		<div
			className={`${styles.card} ${enemy && styles.enemy}`}
			style={style}
			onClick={onClick}
		>
			{enemy ? (
				<Image
					src={'/card/card.png'}
					alt='back card'
					layout='fill'
					objectFit='cover'
				/>
			) : (
				<>
					<Image
						className={styles.image}
						src={card.data.image.url}
						alt={card.data.name}
						layout='fill'
						objectFit='cover'
					/>
					<div className={styles.characteristic}>
						<div className={styles.left}>
							<div className={styles.item}>
								<div className={styles.type}>
									<div className={styles.media}>
										<Image
											className={styles.item_image}
											src={'/card/image1.png'}
											alt={card.data.powerstats.strength}
											layout='fill'
											objectFit='cover'
										/>
									</div>
								</div>
								<p className={styles.item_value}>
									{card.data.powerstats.strength}
								</p>
							</div>
							<div className={styles.item}>
								<div className={styles.type}>
									<div className={styles.media}>
										<Image
											className={styles.item_image}
											src={'/card/image2.png'}
											alt={card.data.powerstats.power}
											layout='fill'
											objectFit='cover'
										/>
									</div>
								</div>
								<p className={styles.item_value}>
									{card.data.powerstats.power}
								</p>
							</div>
							<div className={styles.item}>
								<div className={styles.type}>
									<div className={styles.media}>
										<Image
											className={styles.item_image}
											src={'/card/image3.png'}
											alt={card.data.powerstats.speed}
											layout='fill'
											objectFit='cover'
										/>
									</div>
								</div>
								<p className={styles.item_value}>
									{card.data.powerstats.speed}
								</p>
							</div>
							<div className={styles.item}>
								<div className={styles.type}>
									<div className={styles.media}>
										<Image
											className={styles.item_image}
											src={'/card/image4.png'}
											alt={card.data.powerstats.durability}
											layout='fill'
											objectFit='cover'
										/>
									</div>
								</div>
								<p className={styles.item_value}>
									{card.data.powerstats.durability}
								</p>
							</div>
							<div className={styles.item}>
								<div className={styles.type}>
									<div className={styles.media}>
										<Image
											className={styles.item_image}
											src={'/card/image5.png'}
											alt={card.data.powerstats.intelligence}
											layout='fill'
											objectFit='cover'
										/>
									</div>
								</div>
								<p className={styles.item_value}>
									{card.data.powerstats.intelligence}
								</p>
							</div>
							<div className={styles.item}>
								<div className={styles.type}>
									<div className={styles.media}>
										<Image
											className={styles.item_image}
											src={'/card/image6.png'}
											alt={card.data.powerstats.combat}
											layout='fill'
											objectFit='cover'
										/>
									</div>
								</div>
								<p className={styles.item_value}>
									{card.data.powerstats.combat}
								</p>
							</div>
						</div>
						<div className={styles.right}>
							<div className={styles.mana}>
								<Image
									className={styles.mana_image}
									src={'/card/image8.png'}
									alt='mana'
									layout='fill'
									objectFit='cover'
								/>

								<p className={styles.mana_value}>{card.mana}</p>
							</div>
							<div className={styles.health}>
								<Image
									className={styles.health_image}
									src={'/card/image7.png'}
									alt='health'
									layout='fill'
									objectFit='cover'
								/>

								<p className={styles.health_value}>{card.health}</p>
							</div>
						</div>
					</div>
					<div className={styles.card_data}>
						<div className={styles.card_block}>
							<div className={styles.name}>
								<p className={styles.name_value}>{card.data.name}</p>
							</div>
							<div className={styles.description}>
								<p className={styles.description_value}>
									{card.data.connections.relatives}
								</p>
							</div>
							<div className={styles.class}>
								<p className={styles.class_value}>{card.class}</p>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Card
