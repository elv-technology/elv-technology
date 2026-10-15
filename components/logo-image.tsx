import Image, { type ImageProps } from "next/image";

// Uploaded logos may be SVGs, which the image optimizer rejects, and uploadthing URLs carry no
// file extension, so only URLs that are clearly raster images go through the optimizer.
const RASTER_IMAGE = /\.(png|jpe?g|webp|avif|gif)(\?.*)?$/i;

export default function LogoImage({ src, alt, ...props }: Omit<ImageProps, "src"> & { src: string }) {
  return <Image src={src} alt={alt} unoptimized={!RASTER_IMAGE.test(src)} {...props} />;
}
