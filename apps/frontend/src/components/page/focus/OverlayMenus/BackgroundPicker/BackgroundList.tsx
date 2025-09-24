import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { useState } from 'react';

const bgList = [
  {
    id: 'image1',
    src: '/focus/img/anime1.jpg'
  },
  {
    id: 'image2',
    src: '/focus/img/anime2.jpg'
  },
  {
    id: 'image3',
    src: '/focus/img/anime3.jpg'
  },
  {
    id: 'image4',
    src: '/focus/img/anime4.jpg'
  },
  {
    id: 'image5',
    src: '/focus/img/anime5.jpg'
  },
  {
    id: 'image6',
    src: '/focus/img/anime6.jpg'
  },
  {
    id: 'image7',
    src: '/focus/img/anime7.jpg'
  },
  {
    id: 'image8',
    src: '/focus/img/anime8.jpg'
  },
  {
    id: 'image9',
    src: '/focus/img/anime9.jpg'
  }
];

export const BackgroundList = () => {
  const { setBackground } = useUIStateStore();
  const [isSelected, setSelected] = useState<String | null>();

  return (
    <div className="grid grid-cols-3 gap-4 mt-5">
      {bgList.map((img) => {
        const seleted = isSelected === img.id;
        const handleCLick = (img) => {
          setSelected(img.id);
          setBackground(img.src);
        };

        return (
          <div
            key={img.id}
            className={`overflow-hidden transition rounded cursor-pointer size-14 lg:size-16 hover:ring-2 ring-primary ${
              seleted ? 'ring-2' : ''
            }`}
            onClick={() => handleCLick(img)}
          >
            <img
              src={img.src}
              alt={img.id}
              className="object-cover w-full h-full"
            />
          </div>
        );
      })}
    </div>
  );
};
