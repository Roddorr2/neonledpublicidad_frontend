import Image from "next/image";
import Link from "next/link";

function Producto({
  imgSrc,
  altText,
  title,
  description,
  route,
  imgSrcMobile,
  isLcp = false,
}) {
  const imageSrc = imgSrc || imgSrcMobile;

  return (
    <Link 
      href={route} 
      className="producto-link"
      style={{ contain: "layout style" }}
    >
      <article className="producto">
        <div className="producto-card">
          <div className="producto-img-container" style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={imageSrc}
              alt={altText}
              title={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading={isLcp ? "eager" : "lazy"}
              priority={isLcp}
              quality={75}
              className="producto-img"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>

          <div className="producto-overlay">
            <h3 className="producto-title">
              {description}
            </h3>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default Producto;