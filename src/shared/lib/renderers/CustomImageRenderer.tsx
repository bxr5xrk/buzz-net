'use client';

import Image from 'next/image';

function CustomImageRenderer({ data }: any) {
  return (
    <div className="relative min-h-[15rem] w-full">
      <Image alt="image" className="object-contain" fill src={data.file.url} />
    </div>
  );
}

export default CustomImageRenderer;
