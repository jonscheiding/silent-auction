import React from 'react';
import Container from 'react-bootstrap/Container';

import { BidderEmailProvider } from './bidderEmail';
import { AuctionItemList } from './AuctionItemList';
import { Splash } from './Splash';

const auctionItems = [
  {
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    imageUrl: 'https://www.brushwiz.com/images/paintings/m/Mona_Lisa_by_Leonardo_Da_Vinci.jpg',
    bid: 242.5
  },
  {
    title: 'The Starry Night',
    artist: 'Vincent Van Gogh',
    imageUrl: 'https://www.brushwiz.com/images/paintings/t/The_Starry_Night_by_Vincent_Van_Gogh.jpg',
    bid: 220
  },
  {
    title: 'The Scream',
    artist: 'Edvard Munch',
    imageUrl: 'https://www.brushwiz.com/images/paintings/t/The_Scream_by_Edvard_Munch.jpg',
    bid: 207.5
  },
  {
    title: 'The Night Watch',
    artist: 'Rembrandt',
    imageUrl: 'https://www.brushwiz.com/images/paintings/t/The_Night_Watch_by_Rembrandt_M29.jpg',
    bid: 480
  },
  {
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    imageUrl: 'https://www.brushwiz.com/images/paintings/t/The_Kiss_by_Gustav_Klimt.jpg',
    bid: 202
  },
  {
    title: 'The Arnolfini Portrait',
    artist: 'Jan van Eyck',
    imageUrl: 'https://www.brushwiz.com/images/paintings/t/The_Arnolfini_Portrait_by_Jan_van_Eyck_V44.jpg',
    bid: 324
  },
  {
    title: 'The Girl With A Pearl Earring',
    artist: 'Johannes Vermeer',
    imageUrl: 'https://www.brushwiz.com/images/paintings/t/The_Girl_With_A_Pearl_Earring_by_Johannes_Vermeer.jpg',
    bid: 220
  },
  {
    title: 'Impression, Sunrise',
    artist: 'Claude Monet',
    imageUrl: 'https://www.brushwiz.com/images/paintings/i/Impression,_Sunrise_by_Claude_Monet.jpg',
    bid: 207.5
  },
  {
    title: 'Las Meninas',
    artist: 'Diego Vleazquez',
    imageUrl: 'https://www.brushwiz.com/images/paintings/l/Las_Meninas_by_Diego_Velazquez_L36.jpg',
    bid: 291
  },
  {
    title: 'The Creation Of Adam',
    artist: 'Michelangelo',
    imageUrl: 'https://www.brushwiz.com/images/paintings/t/The_Creation_Of_Adam_by_Michelangelo.jpg',
    bid: 379
  }
];

export const App = () => {
  return (
    <BidderEmailProvider>
      <main role="main">
        <Container>
          <Splash />
          <AuctionItemList auctionItems={auctionItems} />
        </Container>
      </main>
    </BidderEmailProvider>
  );
};
