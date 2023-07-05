'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import CustomImageRenderer from '@/shared/lib/renderers/CustomImageRenderer';
import { CustomCodeRenderer } from '@/shared/lib/renderers/CustomCodeRenderer';
import { PostContent } from '../../model/types/post';

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: PostContent;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer
};

const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem'
  }
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    // @ts-expect-error
    <Output
      style={style}
      className="text-sm"
      renderers={renderers}
      data={content}
    />
  );
};

export default EditorOutput;
