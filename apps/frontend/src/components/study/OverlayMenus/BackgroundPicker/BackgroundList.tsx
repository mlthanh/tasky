import { useUIStateStore } from '@hooks/stores/useUIStateStore';

const bgList = [
  {
    id: 'image1',
    src: '/study/img/anime1.jpg'
  },
  {
    id: 'image2',
    src: '/study/img/anime2.jpg'
  },
  {
    id: 'image3',
    src: '/study/img/anime3.jpg'
  },
  {
    id: 'image4',
    src: '/study/img/anime4.jpg'
  },
  {
    id: 'image5',
    src: '/study/img/anime5.jpg'
  },
  {
    id: 'image6',
    src: '/study/img/anime6.jpg'
  },
  {
    id: 'image7',
    src: '/study/img/anime7.jpg'
  },
  {
    id: 'image8',
    src: '/study/img/anime8.jpg'
  },
  {
    id: 'image9',
    src: '/study/img/anime9.jpg'
  }
];

export const BackgroundList = () => {
  const { setBackground } = useUIStateStore();

  return (
    <div className="grid grid-cols-3 gap-4 mt-5">
      {bgList.map((img) => (
        <div
          key={img.id}
          className="overflow-hidden transition rounded cursor-pointer w-14 h-14 hover:ring-2 ring-primary"
          onClick={() => setBackground(img.src)}
        >
          <img
            src={img.src}
            alt={img.id}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};
