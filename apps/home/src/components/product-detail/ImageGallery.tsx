import Image from "next/image";

interface ImageGalleryProps {
  image: string;
  title: string;
}

export default function ImageGallery({ image, title }: ImageGalleryProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full aspect-square rounded-xl bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-8"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
}
