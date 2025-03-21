import Image from "next/image";

function FramerImage() {
  const imageUrl = "https://res.cloudinary.com/dhz4c0oae/image/upload/v1742452098/1f63ed_ed71b284262e42f48dfc0ad2876b2604_mv2_cxl1sn.avif";
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <Image
        src={imageUrl}
        alt="Scrolling Section Background"
        fill
        className="object-cover filter blur-sm"
      />
    </div>
  );
}

export default FramerImage;