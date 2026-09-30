import React, { useState } from 'react';
import { usePhotoModal } from './PhotoModal';

interface LazyImageProps {
  name: string;
  alt?: string;
  className?: string;
  modalCaption?: string;
  modalTitle?: string;
  modalBadge?: string;
  enableModal?: boolean;
  onClick?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  name,
  alt = '',
  className = '',
  modalCaption,
  modalTitle,
  modalBadge,
  enableModal = true,
  onClick,
}) => {
  const [hasError, setHasError] = useState(false);
  const { openPhoto } = usePhotoModal();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (enableModal) {
      openPhoto({
        src: name,
        alt: alt,
        title: modalTitle,
        caption: modalCaption || alt,
        badge: modalBadge,
      });
    }
  };

  const src = name.startsWith('/') || name.startsWith('http') ? name : `/images/${name}`;

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-plum-glass text-center ${className}`}>
        <span className="px-3 font-body text-[11px] tracking-wider text-rosegold/60 uppercase">
          {alt || 'Photo'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onClick={handleClick}
      onError={() => setHasError(true)}
      className={`${className} ${enableModal ? 'cursor-pointer' : ''}`}
    />
  );
};
