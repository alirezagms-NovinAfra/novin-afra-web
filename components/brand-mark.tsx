import Image from "next/image";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <div className="brand-mark" aria-label="نوین افرا">
      <span className="brand-icon brand-icon-original" aria-hidden="true">
        <Image
          src={`${basePath}/brand/novin-afra-green-crop.png`}
          alt=""
          width={540}
          height={455}
          priority
        />
      </span>
      {!compact ? (
        <span className="brand-copy">
          <strong>نوین افرا</strong>
          <small>NOVIN AFRA WEB</small>
        </span>
      ) : null}
    </div>
  );
}
