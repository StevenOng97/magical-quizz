import Image from "next/image";

const PreviewImage = () => {
  return (
    <section className="w-full h-[600px] shadow-custom">
      <Image
        src="/images/previewImage.png"
        alt="Preview"
        width={1000}
        height={600}
      />
    </section>
  );
};

export default PreviewImage;
